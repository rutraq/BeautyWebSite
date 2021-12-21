$(document).ready(function () {
    // let images = $("#content img");
    // $.getJSON(`http://localhost:5000/get-photo?page=${ $(document).find("title").text() }`, function (data) {
    //     $.each(data, function (key, val) {
    //         images[key - 1].src = val;
    //     });
    // });
    upload();
});

function upload() {
    let images = $("#content img");
    for (let i = 0; i < images.length; i++) {
        $.ajax({
            url: `http://localhost:5000/upload-url?src=${images[i].src}&id=${i + 1}&page=${ $(document).find("title").text() }`,
            method: "get",
            xhrFields: {
                withCredentials: true
            }
        });
    }
}