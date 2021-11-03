let left = $("#galleryMainPage .left")
let right = $("#galleryMainPage .right")
right.click(animatePhotosLeft);
left.click(animatePhotosRight);
let circle = 3;
let photos = ["photo1", "photo2", "photo3", "photo4", "photo5"];

function animatePhotosRight() {
    if (circle > 1) {
        for (let i = 0; i < photos.length; i++) {
            $(`#${photos[i]}`).css("position", "relative").animate({left: "+=12%"}, 500);
        }
        $(`#photo${circle} img`).animate({width: "328px", height: "390px"}, 500);
        $(`#photo${circle-1} img`).animate({width: "504px", height: "522px"}, 500);
        $(`#photo${circle+1} img`).animate({width: "128px", height: "220px"}, 500);
        $(`#photo${circle-2} img`).animate({width: "328px", height: "390px"}, 500);

        $(`#photo${circle}`).css("opacity", ".6");
        $(`#photo${circle-1}`).css("opacity", "1");
        $(`#photo${circle+1}`).css("opacity", ".3");
        $(`#photo${circle-2}`).css("opacity", ".6");
        changeCircles(-1);
    }
}

function animatePhotosLeft() {
    if (circle < 5) {
        for (let i = 0; i < photos.length; i++) {
            $(`#${photos[i]}`).css("position", "relative").animate({left: "-=12%"}, 500);
        }
        $(`#photo${circle} img`).animate({width: "328px", height: "390px"}, 500);
        $(`#photo${circle+1} img`).animate({width: "504px", height: "522px"}, 500);
        $(`#photo${circle-1} img`).animate({width: "128px", height: "220px"}, 500);
        $(`#photo${circle+2} img`).animate({width: "328px", height: "390px"}, 500);

        $(`#photo${circle}`).css("opacity", ".6");
        $(`#photo${circle+1}`).css("opacity", "1");
        $(`#photo${circle-1}`).css("opacity", ".3");
        $(`#photo${circle+2}`).css("opacity", ".6");
        changeCircles(1);
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
