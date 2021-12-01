async function getData() {
    $.getJSON('http://localhost:5000/get-text?page=about', function(data) {
        return data;
    });
}

function insertText() {
    let text = getData();
    $("#firstArticle .bigFont").text(text.about_article1_slogan);
}

insertText();