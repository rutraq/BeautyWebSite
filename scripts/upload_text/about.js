$(document).not(function () {
    $.getJSON('http://localhost:5000/get-text?page=about', function(data) {
        $("#firstArticle .bigFont").text(data.article1_slogan);
        $("#firstArticle .smallFont").text(data.article1);
        $("#secondArticle .bigFont").text(data.article2_slogan);
        $("#secondArticle .smallFont").text(data.article2);
        $("#thirdArticle .bigFont").text(data.article3_slogan);
        $("#thirdArticle .smallFont").text(data.article3);
    });
})
