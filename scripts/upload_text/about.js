$(document).not(function () {
    $.getJSON('http://localhost:5000/get-text?page=about', function(data) {
        $("#firstArticle .bigFont").text(data.about_article1_slogan);
        $("#firstArticle .smallFont").text(data.about_article1);
    });
})
