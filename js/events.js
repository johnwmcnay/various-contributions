addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
addSearchToggle.addEventListener('mouseenter', addHoverOn)
addSearchToggle.addEventListener('mouseleave', addHoverOff);
addSearchToggle.addEventListener('click', toggle);
newCoffee.addEventListener('input', updateAddButton);
discardButton.addEventListener('click', discardChanges);
saveButton.addEventListener('click', saveChanges);

function saveChanges(e) {
    e.preventDefault();

    let coffee = saveButton.coffee;

    let editedCoffee = {
        id: coffee.id,
        name: editName.value.trim(),
        roast: editRoast.value.trim(),
    };

    coffees.splice(coffee.id - 1, 1, editedCoffee);

    if(localStorage) {
        //JSON.stringify used as you can only use localStorage with strings
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }

    editWindow.classList.add("d-none");

    let newElement = renderCoffee(editedCoffee);

    coffeeDiv.replaceChild(newElement, document.getElementById("coffee" + coffee.id))

    updateCoffees();
}

function discardChanges(e) {
    e.preventDefault();
    editWindow.classList.add("d-none");
}

$(function() {
    $('#edit-window').draggable({
        containment: "parent",
    });
})
