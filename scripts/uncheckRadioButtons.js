let radioButton = document.querySelectorAll("input[type=radio]");
for (let i = 0; i < radioButton.length; i++) {
    radioButton[i].addEventListener("click", function () {
        if (radioButton[i].classList.item("click")) {
            radioButton[i].checked = false;
            radioButton[i].classList.remove("click");
        } else {
            radioButton[i].classList.add("click");
        }
    })
}
