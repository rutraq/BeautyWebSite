function getData(login, password) {
    $.getJSON(`http://localhost:5000/admin?login=${login}&password=${password}`, function(data) {
        console.log(data.message);
    });
}

$("#button").click(function () {
    getData($("#login").val(), $("#password").val())
})
