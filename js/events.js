addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
addSearchToggle.addEventListener('mouseenter', addHoverOn)
addSearchToggle.addEventListener('mouseleave', addHoverOff);
addSearchToggle.addEventListener('click', toggle);
newCoffee.addEventListener('input', updateAddButton);
discardButton.addEventListener('click', discardChanges);
saveButton.addEventListener('click', saveChanges);
restoreTrashIcon.addEventListener('click', restoreDeletedItems);
restoreSelectAll.addEventListener('click', selectAll);
restoreUnselectAll.addEventListener('click', unselectAll);
restoreAnnihilate.addEventListener('click', test);
restoreButton.addEventListener('click', restore);

function test() {

}

function restore() {

    for (let item of restoreWindow.childNodes[0].childNodes) {
        let input = item.childNodes[0]
        if (input.checked) {
            console.log(input.coffee.id * -1);
            let coffeeToAdd = {
                id: input.coffee.id * -1,
                name: input.coffee.name,
                roast: input.coffee.roast,
            }
            coffees.splice(coffeeToAdd.id - 1, 1, coffeeToAdd);
        }
    }
    if(localStorage) {
        //JSON.stringify used as you can only use localStorage with strings
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }
    updateCoffees();
    restoreDeletedItems();
}

function unselectAll() {
    for (let item of restoreWindow.childNodes[0].childNodes) {
        item.childNodes[0].checked = false;
    }
}

function selectAll() {
    for (let item of restoreWindow.childNodes[0].childNodes) {
        item.childNodes[0].checked = true;
    }
}

function restoreDeletedItems() {

    if (restoreWindow.classList.contains("d-none")) {
        restoreWindow.classList.remove("d-none");
    }

    let even = true;
    let items = document.createElement("div");
    items.classList.add("col-8");
    items.classList.add("p-0");
    items.classList.add("restore-list");

    for (let coffee of coffees) {
        if (coffee.id < 0) {
            let element = document.createElement("input");
            let label = document.createElement("label");
            label.setAttribute("for", "test");
            label.innerHTML = "<strong>" + coffee.name + "</strong> <em>" + coffee.roast + "</em>";
            label.classList.add("restore-label");

            if (even) {
                label.classList.add("even");
            } else {
                label.classList.add("odd");
            }

            even = !even;
            element.coffee = coffee;
            element.id = "coffee" + coffee.id + "restore";
            element.type = "checkbox";
            element.style.marginRight = "5px";
            label.prepend(element);
            items.appendChild(label);
        }
    }
    restoreWindow.replaceChild(items, restoreWindow.childNodes[0]);


}

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
