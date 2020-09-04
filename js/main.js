"use strict";

// "deletes" the item by changing its ID to a negative number;
// data is retained for potential use in an undo function similar to trash/recycle bin;
function deleteItem(coffeeToDelete) {

    //searches and returns the correct coffee object to stage for deletion
    let elementToRemove = function() {
        for (let coffee of coffees) {

            if (coffee.id === coffeeToDelete.id) {
                return coffee;
            }
        }
    }();

    let coffeeID = "coffee" + elementToRemove.id;

    //set the "deleted" item to have 'display: none'
    document.getElementById(coffeeID).classList.add("d-none");

    //indicates that the item will not be drawn by changing its ID to a negative number
    elementToRemove.id *= -1;

    //update local storage on every "deletion"
    localStorage.setItem("coffees", JSON.stringify(coffees));

    updateCoffees();
}

//returns whether user-inputted text matches and part of a coffee name; case-insensitive
function hasPartialNameMatch(coffee){

    let coffeeName = coffee.name.toLowerCase();
    let searchText = searchCoffee.value.toLowerCase();

    return (coffeeName.indexOf(searchText) !== -1);

}

//updates the screen
function addCoffee(e){
    e.preventDefault()

    let coffeeName = newCoffee.value;
    let newRoast = addRoast.value;
    let updatedCoffee = {
        id: coffees.length + 1,
        name: coffeeName,
        roast: newRoast
    }

    //add new coffee to the main array
    coffees.push(updatedCoffee);

    //update the local storage to make it persistent, if possible
    if(localStorage) {
        //JSON.stringify used as you can only use localStorage with strings
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }

    //create and attach a new HTML element to represent the new coffe
    coffeeDiv.appendChild(renderCoffee(updatedCoffee));

    //makes sure the newly appended coffee is only show if it still meets
    updateCoffees();
}

function addHoverOn() {
    addIcon.style.color = "#AB947E";
    searchIcon.style.color = "#AB947E";
}

function addHoverOff() {
    addIcon.style.color = "floralwhite";
    searchIcon.style.color = "floralwhite";
}

//passes in an HTML element and returns true if it contains the class "d-none"
function hasDisplayNone(element) {
    return (element.classList.value.indexOf("d-none") !== -1);
}

function toggle() {

    //organizes the data to be toggled
    let addSectionElements = [newCoffee, addRoast, searchIcon, addCoffeeButton];
    let searchSectionElements = [searchCoffee, roastSelection, resultsText, addIcon];
    let elementsToUpdate = addSectionElements.concat(searchSectionElements);

    //when toggle is triggered, it will always swap every element's "d-none" class
    elementsToUpdate.forEach(element => {
        if (hasDisplayNone(element)) {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
}

//handles the edge case of '1 result' so it doesn't display at '1 results'
function updatePlurality(count) {
    let element = document.querySelector("#plural");

    if (count === 1) {
        element.innerText = "";
    } else {
        element.innerText = "s";
    }
}

function updateResults(count) {
    updatePlurality(count);
    setResultsNumber(count);
}

function setResultsNumber(count) {
    numOfResults.innerText = count.toString();
}