"use strict"


function editItem() {
    //TODO: create ability to edit
}

function deleteItem(x) {

    let elementToRemove = function() {
        for (let coffee of coffees) {

            if (coffee.name === x.name) {
                //delete the item
                coffees.splice(coffees.indexOf(coffee), 1);
                return coffee;
            }
        }
    }();


    document.getElementById("coffee" + elementToRemove.id).classList.add("d-none");
    localStorage.setItem("coffees", JSON.stringify(coffees));
    // stagedItem.innerText = '';
    // editCoffee.value = '';
    // editRoastSelection.value = '';

    updateCoffees();
}

function undoDelete() {
    //TODO: add the ability to undo deletes
}

function updateEdit(){
    let text = stagedItem.innerText.replace(/(\r\n|\n|\r)/gm," ");
    let array = text.split("  ");

    array[1] = editRoastSelection.value;

    stagedItem.innerText = array.join("  ");
}






