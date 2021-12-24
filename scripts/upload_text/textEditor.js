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
                $("body table").append($(`<tr><td><label for=${key.replace(/\s+/g, '')}>${key}</label></td><td><textarea id=${key.replace(/\s+/g, '')} rows="1" cols="15"></textarea></td></tr>`));
                $(`#${key.replace(/\s+/g, '')}`).val(val).on("change", function () {
                    $(this).addClass("changed");
                });
            });
        });
    }
});

$("#button").click(function () {
    makeListForUpdate();
});

$("button").click(function () {
    uploadText($("#id").val(), $("#text").val());
});

function makeListForUpdate() {
    let update = $(".changed");
    for (let i = 0; i < update.length; i++) {
        uploadText($(update[i]).attr("id"), $(update[i]).val());
    }
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
