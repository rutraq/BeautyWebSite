$(document).not(function () {
    $.getJSON(`http://localhost:5000/get-text?page=${ $(document).find("title").text() }`, function (data) {
        $.each(data, function (key, val) {
            $("body table").append($(`<tr><td><label for=${key}>${key}</label></td><td><textarea id=${key} rows="10" cols="65"></td></tr>`));
            $(`#${key}`).val(val).on("change", function () {
                changedText(this)
            });
        });
    });
    $("#button").click(function () {
        makeListForUpdate();
    });
});

function changedText(input) {
    $(input).addClass("changed");
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
                request("http://localhost:5000/refresh-token", "get", "");
                uploadText(text_id, text);
            }
        }
    });
}
$("#button2").click(function () {
    uploadPhoto($("#fileSelect"));
});

function uploadPhoto(input) {
    let inputFile = $(input);
    let formData = new FormData;

    formData.append('img', inputFile.prop('files')[0]);
    $.ajax({
        url: `http://localhost:5000/upload-file`,
        method: "post",
        data: formData,
        processData: false,
        contentType: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.message === "expired signature") {
                request("http://localhost:5000/refresh-token", "get", "");
            }
        }
    });
}

function request(url, method, query, callback) {
    $.ajax({
        url: url + query,
        method: method,
        xhrFields: {
            withCredentials: true
        }
    });
}
