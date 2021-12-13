function loginWithCredentials(login, password) {
    $.ajax({
        url: `http://localhost:5000/login?login=${login}&password=${password}`,
        method: "get",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            if (data.message === "logged in") {
                window.location.href = "textEditor.html"
            }
        }
    });
}

function loginWithToken() {
    $.ajax({
        url: "http://localhost:5000/refresh-token",
        method: "get",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            if (data.message === "logged in") {
                window.location.href = "textEditor.html"
            }
        }
    });
}

$(document).ready(function () {
    loginWithToken();
});

$("#button").click(function () {
    loginWithCredentials($("#login").val(), $("#password").val());
});
$("#password").keydown(function (e) {
   if (e.keyCode === 13) {
       loginWithCredentials($("#login").val(), $("#password").val());
   }
});
