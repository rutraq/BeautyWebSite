$(document).not(function () {
    $.getJSON(`http://localhost:5000/get-text?page=${ $(document).find("title").text() }`, function (data) {
        $.each(data, function (key, val) {
            $("body table").append($(`<tr><td><label for=${key}>${key}</label></td><td><textarea id=${key} rows="10" cols="65"></td></tr>`));
            $(`#${key}`).val(val).on("change", function () {
                $(this).addClass("changed");
            });
        });
    });
    $.getJSON(`http://localhost:5000/get-photo?page=${ $(document).find("title").text() }`, function (data) {
        $.each(data, function (key, val) {
            $("#photoEdit").append($(`<div><img src=${val} id="${key}" alt="photo"><input id="inp${key}" type="file" accept="jpg, img, jpeg, png, svg"/></div>`));
            $(`#${key}`).on("click", function () {
                $(`#inp${key}`).click();
            });
            $(`#inp${key}`).on("change", function (e) {
                $(this).addClass("changedPhoto");
                if ($(this).val() !== "") {
                    $("#photoEdit > div img").remove();
                    $("#photoEdit > div").append($(`<img src=${URL.createObjectURL(e.target.files[0])} alt="photo" id="${key}">`));
                    $(`#${key}`).on("click", function () {
                        $(`#inp${key}`).click();
                    });
                }
            });
        });
    });
});

$("#button").click(function () {
    makeListForUpdate();
});

function makePhotoForUpdate() {
    let update = $(".changedPhoto");
    for (let i = 0; i < update.length; i++) {
        uploadPhoto(update[i]);
    }
}

function makeListForUpdate() {
    let update = $(".changed");
    for (let i = 0; i < update.length; i++) {
        uploadText($(update[i]).attr("id"), $(update[i]).val());
    }
}

function uploadText(text_id, text) {
    $.ajax({
        url: `http://localhost:5000/change-text?db=text&page=${ $(document).find("title").text() }&id=${text_id}&text=${text}`,
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


function uploadPhoto(input) {
    let inputFile = $(input);
    let formData = new FormData;

    formData.append('img', inputFile.prop('files')[0]);
    $.ajax({
        url: `http://localhost:5000/change-photo?page=about`,
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
                        uploadPhoto(input);
                    }
                });
            }
        }
    });
}
