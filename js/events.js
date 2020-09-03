//handles events to update filters, which updates the screen
function addHoverOn() {

    addIcon.style.color = "#AB947E";

}

function addHoverOff() {
    addIcon.style.color = "floralwhite";
}

function add() {
    newCoffee.classList.remove("d-none");
    searchCoffee.classList.add("d-none");
}

addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
editRoastSelection.addEventListener('change', updateEdit);
addDiv.addEventListener('mouseenter', addHoverOn)
addDiv.addEventListener('mouseleave', addHoverOff);
addDiv.addEventListener('click', add);


