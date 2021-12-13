$(document).not(function () {
    $.getJSON('http://localhost:5000/get-text?page=about', function (data) {
        $.each(data, function (key, val) {
            $("body table").append($(`<tr><td><label for=${key}>${key}</label></td><td><input id=${key} value="${val}"></td></tr>`));
            $(`#${key}`).on("change", function () {
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
        url: `http://localhost:5000/change-text?db=text&page=about&id=${text_id}&text=${text}`,
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

function request(url, method, query) {
    $.ajax({
        url: url + query,
        method: method,
        xhrFields: {
            withCredentials: true
        }
    });
}
