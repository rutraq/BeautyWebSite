$(document).ready(function () {
    $.getJSON(`http://localhost:5000/get-text?db=prices&page=liposuction`, function (data) {
        addPrice(data, "facialSurgery");
        console.log(data);
    });

    function addPrice(db, ulId) {
        if (db.length !== 0) {
            $.each(db, function (key, val) {
                let li = document.createElement("li");
                let name = document.createElement("div");
                let price = document.createElement("div");
                name.innerText = key;
                price.innerText = val;
                li.append(name);
                li.append(price);
                $(`#${ulId} ul`).append(li);
            });
        } else {
            $(`#${ulId}`).css("display", "none");
        }
    }
});
