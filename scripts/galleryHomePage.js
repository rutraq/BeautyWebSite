let left = $("#galleryMainPage .left")
let right = $("#galleryMainPage .right")
right.click(animatePhotosRight);
left.click(animatePhotosLeft);
let circle = 3;

function animatePhotosRight() {
    if (circle < 5) {
        let photos = ["photo1", "photo2", "photo3", "photo4", "photo5"];
        for (let i = 0; i < photos.length; i++) {
            $(`#${photos[i]}`).css("position", "relative").animate({left: "+=150px"}, 500);
        }
        $(`#photo${circle} img`).css({width: "-=200px"});
        changeCircles(1);
    }
}

function animatePhotosLeft() {
    if (circle > 1) {
        let photos = ["firstPhoto", "secondPhoto", "thirdPhoto", "fourthPhoto", "fifthPhoto"];
        for (let i = 0; i < photos.length; i++) {
            $(`#${photos[i]}`).css("position", "relative").animate({left: "-=150px"}, 500);
        }
        changeCircles(-1);
    }
}

function changeCircles(n) {
    $(".circles .active").removeClass("active");
    let previousCircle = circle;
    circle += n;
    if (circle === 5) {
        right.addClass("inactive").css("cursor", "default");
    } else if (circle === 1) {
        left.addClass("inactive").css("cursor", "default");
    }
    if (previousCircle === 5 && circle === 4) {
        right.removeClass("inactive").css("cursor", "pointer");
    } else if (previousCircle === 1 && circle === 2) {
        left.removeClass("inactive").css("cursor", "pointer");
    }
    $(`.circles #circle${circle}`).addClass("active");
}
