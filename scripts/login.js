function getData(login, password) {
    $.ajax({
        url: `http://localhost:5000/login?login=${login}&password=${password}`,
        method: "get",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            if (data.message === "logged in") {
                alert("Заебок")
            }
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

function changeText(db, collection, text_id, text) {
    $.ajax({
        url: `http://localhost:5000/change-text?db=${db}&page=${collection}&id=${text_id}&text=${text}`,
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
});
$("#password").keydown(function (e) {
   if (e.keyCode === 13) {
       getData($("#login").val(), $("#password").val());
   }
});
