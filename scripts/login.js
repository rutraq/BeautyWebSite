async function getData() {
    $.getJSON('http://localhost:5000/', function(data) {
        console.log(data.user);
    });
}
