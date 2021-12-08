function getData(login, password) {
    $.ajax({
        url: `http://localhost:5000/admin?login=${login}&password=${password}`,
        method: "get",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            console.log(data.message);
        }
    });
}

function request(type, url, query) {
    $.ajax({
        url: url + query,
        method: type,
        xhrFields: {
            withCredentials: true
        }
    });
}

function changeText(text) {
    $.ajax({
        url: "http://localhost:5000/change-text?page=about&id=article1",
        method: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if (data.message === "expired signature") {
                request("get", "http://localhost:5000/refresh-token", "");
            }
        }
    });
}

$("#button").click(function () {
    getData($("#login").val(), $("#password").val());
})

$("#button2").click(function () {
    changeText("test value");
})