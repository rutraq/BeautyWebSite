let left = $("#galleryMainPage .left")
let right = $("#galleryMainPage .right")
right.click(animatePhotosRight);
left.click(animatePhotosLeft);
let circle = 3;
let photos = ["photo1", "photo2", "photo3", "photo4", "photo5"];

function animatePhotosRight() {
    if (circle > 1) {
        for (let i = 0; i < photos.length; i++) {
            $(`#${photos[i]}`).css("position", "relative").animate({left: "+=300px"}, 500);
        }
        $(`#photo${circle} img`).css("width", "328px").css("height", "390px");
        $(`#photo${circle-1} img`).css({width: "504px", height: "522px"});
        changeCircles(-1);
    }
}

function animatePhotosLeft() {
    if (circle < 5) {
        for (let i = 0; i < photos.length; i++) {
            $(`#${photos[i]}`).css("position", "relative").animate({left: "-=300px"}, 500);
        }
        $(`#photo${circle} img`).css({width: "328px", height: "390px"});
        $(`#photo${circle+1} img`).css({width: "504px", height: "522px"});
        changeCircles(1);
    }
}

function changeCircles(n) {
    $(".circles .active").removeClass("active");
    let previousCircle = circle;
    circle += n;
    if (circle === 1) {
        right.addClass("inactive").css("cursor", "default");
    } else if (circle === 5) {
        left.addClass("inactive").css("cursor", "default");
    }
    if (previousCircle === 5 && circle === 4) {
        left.removeClass("inactive").css("cursor", "pointer");
    } else if (previousCircle === 1 && circle === 2) {
        right.removeClass("inactive").css("cursor", "pointer");
    }
    $(`.circles #circle${circle}`).addClass("active");
}
