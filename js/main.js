"use strict"

function deleteItem(x) {

    let elementToRemove = function() {
        for (let coffee of coffees) {

            if (coffee.id === x.id) {
                return coffee;
            }
        }
    }();

    let coffeeID = "coffee" + elementToRemove.id;

    document.getElementById(coffeeID).classList.add("d-none");
    elementToRemove.id *= -1;

    //update local storage
    localStorage.setItem("coffees", JSON.stringify(coffees));

    updateCoffees();
}



