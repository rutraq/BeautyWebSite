$(document).not(function () {
    $.getJSON('http://localhost:5000/get-text?page=about', function(data) {
        $("#t").val(data.article1_slogan);
        $("#t2").val(data.article1);
    });

    $("#t").on("change", function () { changedText(this) });
    $("#t2").on("change", function () { changedText(this) });
    $("#button").click(function () {
        makeListForUpdate();
    });
});

function changedText(input) {
    $(input).addClass("changed");
}

function makeListForUpdate() {
    let update = $(".changed")
    for (let i = 0; i < update.length; i++) {

    }
}

function uploadText(text_id, text) {
    $.ajax({
        url: `http://localhost:5000/change-text?db=text&page=about&id=${text_id}&text=${text}`,
        method: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if (data.message === "expired signature") {
                request("http://localhost:5000/refresh-token", "get", "");
                $.ajax({
                    url: `http://localhost:5000/change-text?db=text&page=about&id=${text_id}&text=${text}`,
                    method: "post",
                    xhrFields: {
                        withCredentials: true
                    }
                });
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