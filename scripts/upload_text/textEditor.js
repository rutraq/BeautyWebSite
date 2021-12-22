$(document).not(function () {
    $.getJSON(`http://localhost:5000/get-photo?page=${ $(document).find("title").text() }`, function (data) {
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
    $.getJSON(`http://localhost:5000/get-text?page=${ $(document).find("title").text() }`, function (data) {
        $.each(data, function (key, val) {
            $("body table").append($(`<tr><td><label for=${key}>${key}</label></td><td><textarea id=${key} rows="10" cols="65"></td></tr>`));
            $(`#${key}`).val(val).on("change", function () {
                $(this).addClass("changed");
            });
        });
    });
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
        url: `http://localhost:5000/change-text?db=text&page=contacts&id=${text_id}&text=${text}`,
        method: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.message === "expired signature") {
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
                }
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
            }
        }
    });
}
