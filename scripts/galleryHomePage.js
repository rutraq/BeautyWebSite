click_nav_buttons()

function click_nav_buttons() {
    let left = document.querySelector(".left")
    let right = document.querySelector(".right")
    left.addEventListener("click", function () {
        if (!left.classList.contains("inactive")) {
            left.classList.add("inactive")
        } else {
            left.classList.remove("inactive")
        }
    })
    right.addEventListener("click", function () {
        if (!right.classList.contains("inactive")) {
            right.classList.add("inactive")
        } else {
            right.classList.remove("inactive")
        }
    })
}
