"use strict"


function editItem() {

}

function deleteItem() {


    for (let index in coffees) {

        if (coffees[index].name === stagedItem.coffeeName) {
            //delete the item
            coffees.splice(index, 1);
        }
    }

    localStorage.setItem("coffees", JSON.stringify(coffees));
    stagedItem.innerText = '';
    delete stagedItem.coffeeName;
    delete stagedItem.coffeeRoast;
    editCoffee.value = '';
    editRoastSelection.value = '';

    updateCoffees();
}

//handles events to update filters, which updates the screen
addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('keyup', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
editRoastSelection.addEventListener('change', updateEdit);

function updateEdit(){
    let text = stagedItem.innerText.replace(/(\r\n|\n|\r)/gm," ");
    let array = text.split("  ");

    array[1] = editRoastSelection.value;

    stagedItem.innerText = array.join("  ");
}

//returns whether user-inputted text matches and part of a coffee name; case-insensitive
function hasCoffee(coffee){

    var coffeeName = searchCoffee.value.toLowerCase();
    return(coffee.name.toLowerCase().indexOf(coffeeName) !== -1);

}

//updates the screen
function addCoffee(e){
    e.preventDefault()

    var coffeeName = newCoffee.value;
    var newRoast = addRoast.value;
    var updatedCoffee = {
        id: coffees.length + 1,
        name: coffeeName,
        roast: newRoast
    }

    coffees.push(updatedCoffee);

    if(localStorage) {
        //JSON.stringify used as you can only use localStorage with strings
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }

    updateCoffees(e);
}

