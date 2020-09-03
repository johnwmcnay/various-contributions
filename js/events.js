//handles events to update filters, which updates the screen
function addHoverOn() {
    addIcon.style.color = "#AB947E";

}

function addHoverOff() {
    addIcon.style.color = "floralwhite";
}

function toggle() {
    if(newCoffee.classList.value.indexOf("d-none") !== -1) {
        newCoffee.classList.remove("d-none");
        searchCoffee.classList.add("d-none");
        addRoast.classList.remove("d-none");
        roastSelection.classList.add("d-none");
        addCoffeeButton.classList.remove("d-none");
        document.getElementById("results").classList.add("d-none");
        document.getElementById("add-icon").classList.add("d-none");
        searchBtn.classList.remove("d-none");
        searchCoffee.value = '';
        updateCoffees();
    }else {
        newCoffee.classList.add("d-none");
        searchCoffee.classList.remove("d-none");
        addRoast.classList.add("d-none");
        roastSelection.classList.remove("d-none");
        addCoffeeButton.classList.add("d-none");
        document.getElementById("results").classList.remove("d-none");
        document.getElementById("add-icon").classList.remove("d-none");
        searchBtn.classList.add("d-none");
    }
}


addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
editRoastSelection.addEventListener('change', updateEdit);
addDiv.addEventListener('mouseenter', addHoverOn)
addDiv.addEventListener('mouseleave', addHoverOff);
addDiv.addEventListener('click', toggle);


