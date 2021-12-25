$(document).not(function () {
    let name = $(document).find("title").text();
    $.getJSON(`http://localhost:5000/get-photo?page=${name}`, function (data) {
        $.each(data, function (key, val) {
            $("#photoEdit").append($(`<div id="div${key}"><img src="${val}" id="${key}" alt="photo"><input id="inp${key}" type="file" accept="jpg, img, jpeg, png, svg"/></div>`));
            $(`#${key}`).on("click", function () {
                $(`#inp${key}`).click();
            });
            $(`#inp${key}`).on("change", function (e) {
                $(this).addClass("changedPhoto");
                if ($(this).val() !== "") {
                    $(`#${key}`).remove();
                    $(`#photoEdit > #div${key}`).append($(`<img src=${URL.createObjectURL(e.target.files[0])} alt="photo" id="${key}">`)).on("click", function () {
                        $(`#inp${key}`).click();
                    });
                    uploadPhoto($(this), "about", key)
                }
            });
        });
    });
    if (name !== "prices") {
        $.getJSON(`http://localhost:5000/get-text?db=text&page=${name}`, function (data) {
            $.each(data, function (key, val) {
                $("body table").append($(`<tr><td><label for=${key}>${key}</label></td><td><textarea id=${key} rows="10" cols="65"></textarea></td></tr>`));
                $(`#${key}`).val(val).on("change", function () {
                    $(this).addClass("changed");
                });
            });
        });
    } else {
        $.getJSON(`http://localhost:5000/get-text?db=prices&page=liposuction`, function (data) {
            $.each(data, function (key, val) {
                $("body table").append($(`<tr id="tr_${key.replace(/\s+/g, '_')}"><td><textarea id="name_${key.replace(/\s+/g, '_')}" rows="1" cols="15"></textarea></td><td><textarea id=${key.replace(/\s+/g, '_')} rows="1" cols="15"></textarea></td><td><div id="button_${key.replace(/\s+/g, '_')}">Delete</div></td></tr>`));
                $(`#${key.replace(/\s+/g, '_')}`).val(val).on("change", function () {
                    $(this).addClass("changed");
                });
                $(`#name_${key.replace(/\s+/g, '_')}`).val(key).on("change", function () {
                    $(`#${key.replace(/\s+/g, '_')}`).addClass("changed");
                });
                $(`#button_${key.replace(/\s+/g, '_')}`).click(function () {
                    $(`#tr_${key.replace(/\s+/g, '_')}`).css({"display": "none"}).addClass("removed");
                });
            });
        });
    }
});
let newPos = 1;
$("#liposuction").click(function () {
    $("body table").append($(`<tr id="tr_${newPos}"><td><textarea id="name_${newPos}" rows="1" cols="15"></textarea></td><td><textarea id="${newPos}" rows="1" cols="15"></textarea></td><td><div id="button_${newPos}">Delete</div></td></tr>`));
    $(`#${newPos}`).on("change", function () {
        $(this).addClass("new");
    });
    $(`#name_${newPos}`).on("change", function () {
        $(`#${newPos}`).addClass("new");
    });
    let tr = $(`#tr_${newPos}`);
    $(`#button_${newPos}`).click(function () {
        tr.css({"display": "none"}).addClass("removedNew");
    });
    newPos++;
});

$("#button").click(function () {
    makeListForUpdate();
});

$("button").click(function () {
    uploadText($("#id").val(), $("#text").val());
});

function makeListForUpdate() {
    let update = $(".changed");
    if ($(document).find("title").text() !== "prices") {
        for (let i = 0; i < update.length; i++) {
            uploadText($(update[i]).attr("id"), $(update[i]).val());
        }
    } else {
        for (let i = 0; i < update.length; i++) {
            let id = $(update[i]).attr("id");
            uploadPrice(id.replace('_', ' '), $(`#name_${id}`).val(), $(update[i]).val());
        }
        let remove = $(".removed td:nth-child(2) textarea");
        for (let i = 0; i < remove.length; i++) {
            deletePrice("liposuction", ($(remove[i]).attr("id")).replace("_", " "));
        }
        let newPrice = $(".new");
        for (let i = 0; i < newPrice.length; i++) {
            let newId = $(`#name_${ $(newPrice[i]).attr("id") }`).val();
            if ($(newPrice[i]).val() !== '' && newId !== '') {
                uploadPrice(newId, newId, $(newPrice[i]).val());
            }
        }
    }
}

function uploadPrice(text_id, text, price) {
    $.ajax({
        url: `http://localhost:5000/change-price?page=liposuction&id=${text_id}&text=${text}&price=${price}`,
        method: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.message === "expired signature") {
                $.ajax({
                    url: "http://localhost:5000/refresh-token",
                    method: "get",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function () {
                        uploadPrice(text_id, text, price);
                    }
                });
            } else if (data.message === "missing token") {
                alert("User not logged in");
                window.open("login.html", "_self");
            }
        }
    });
}

function deletePrice(page, text_id) {
    $.ajax({
        url: `http://localhost:5000/delete-price?page=${page}&id=${text_id}`,
        method: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.message === "expired signature") {
                $.ajax({
                    url: "http://localhost:5000/refresh-token",
                    method: "get",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function () {
                        deletePrice(page, text_id);
                    }
                });
            } else if (data.message === "missing token") {
                alert("User not logged in");
                window.open("login.html", "_self");
            }
        }
    });
}

function uploadText(text_id, text) {
    $.ajax({
        url: `http://localhost:5000/change-text?db=prices&page=liposuction&id=${text_id}&text=${text}`,
        method: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.message === "expired signature") {
                $.ajax({
                    url: "http://localhost:5000/refresh-token",
                    method: "get",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function () {
                        uploadText(text_id, text);
                    }
                });
            } else if (data.message === "missing token") {
                alert("User not logged in");
                window.open("login.html", "_self");
            }
        }
    });
}

$("#button2").click(function () {
    makePhotoForUpdate();
});

$("#button3").click(function () {
    uploadPhoto($("#newFile"), $("#page").val(), $("#id").val())
});


function uploadPhoto(input, page, id) {
    let inputFile = $(input);
    let formData = new FormData;

    formData.append('img', inputFile.prop('files')[0]);
    $.ajax({
        url: `http://localhost:5000/change-photo?page=${page}&id=${id}`,
        method: "post",
        data: formData,
        processData: false,
        contentType: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.message === "expired signature") {
                $.ajax({
                    url: "http://localhost:5000/refresh-token",
                    method: "get",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function () {
                        uploadPhoto(input, page, id);
                    }
                });
            } else if (data.message === "missing token") {
                alert("User not logged in");
                window.open("login.html", "_self");
            }
        }
    });
}
