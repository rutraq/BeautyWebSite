let left = $("#textAndNav .left");
let right = $("#textAndNav .right");
right.click(animatePhotosLeft);
left.click(animatePhotosRight);
let photo = 1;

function animatePhotosLeft() {
    if (!right.hasClass("inactive")) {
        photo++;
        $("#photos").animate({right: "+=100%"}, 1000);
        if (left.hasClass("inactive")) {
            left.removeClass("inactive");
        }
        if (photo === 3) {
            right.addClass("inactive");
        }
    }
}

function animatePhotosRight() {
    if (!left.hasClass("inactive")) {
        photo--;
        $("#photos").animate({right: "-=100%"}, 1000);
        if (right.hasClass("inactive")) {
            right.removeClass("inactive");
        }
        if (photo === 1) {
            left.addClass("inactive");
        }
    }
}