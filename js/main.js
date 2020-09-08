"use strict";

// "deletes" the item by changing its ID to a negative number;
// data is retained for potential use in an undo function similar to trash/recycle bin;
function deleteItem(coffeeToDelete) {

    //searches and returns the correct coffee object to stage for deletion
    let elementToRemove = function() {
        for (let coffee of coffees) {
            if (!coffee) {
                continue;
            }

            if (coffee.id === coffeeToDelete.id) {
                return coffee;
            }
        }
    }();

    let coffeeID = "#coffee" + elementToRemove.id;

    //set the "deleted" item to have 'display: none'
    // document.getElementById(coffeeID).classList.add("d-none");
    $(coffeeID).addClass("d-none");

    //indicates that the item will not be drawn by changing its ID to a negative number
    elementToRemove.id *= -1;

    //update local storage on every "deletion"
    localStorage.setItem("coffees", JSON.stringify(coffees));

    updateCoffees();
    updateRestoreList();
}

//returns whether user-inputted text matches and part of a coffee name; case-insensitive
function hasPartialNameMatch(coffee){

    let coffeeName = coffee.name.toLowerCase();
    let searchText = $('#search').val().toLowerCase().trim();

    return (coffeeName.indexOf(searchText) !== -1);

}

//updates the screen
function addCoffee(e){
    e.preventDefault()

    let coffeeName = $('#add-coffee').val().trim();
    let newRoast = $('#add-roast-selection').val();
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

    //create and attach a new HTML element to represent the new coffee
    $('#coffees').append(renderCoffee(updatedCoffee));
    $('#add-coffee').val('');
    $('#add-submit').attr('disabled', true);

    //makes sure the newly appended coffee is only show if it still meets
    updateCoffees();
}

function addHoverOn() {
    $('#add-icon').css('color', '#AB947E');
    $('#search-icon').css('color', "#AB947E");
}

function addHoverOff() {
    $('#add-icon').css('color', 'floralwhite');
    $('#search-icon').css('color', "floralwhite");
}

//passes in an HTML element and returns true if it contains the class "d-none"
function hasDisplayNone(element) {
    return ($(element).hasClass("d-none"));
}

function toggle() {

    //organizes the data to be toggled
    let addSectionElements = [newCoffee, addRoast, searchIcon, addCoffeeButton];
    let searchSectionElements = [searchCoffee, roastSelection, resultsText, addIcon];
    let elementsToUpdate = addSectionElements.concat(searchSectionElements);

    //when toggle is triggered, it will always swap every element's "d-none" class
    elementsToUpdate.forEach(element => {
        if (hasDisplayNone(element)) {
            $(element).removeClass("d-none");
        } else {
            $(element).addClass("d-none");
        }
    });

    resetFieldsToDefault();
    updateCoffees();
}

//handles the edge case of '1 result' so it doesn't display at '1 results'
function updatePlurality(count) {
    if (count === 1) {
        $('#plural').text("");
    } else {
        $('#plural').text("s");
    }
}

function updateResults(count) {
    updatePlurality(count);
    setResultsNumber(count);
}

function setResultsNumber(count) {
    if (count === 0) {
        $(numOfResults).text("No");
    } else {
        $(numOfResults).text(count.toString());
    }
}

function updateAddButton() {
    let isBlank = ( $('#add-coffee').val().trim() === "" );
    $('#add-submit').attr('disabled', isBlank);
}

function resetFieldsToDefault() {
    $('#search').val('');
    $('#add-coffee').val('');
    $('#roast-selection').val('all');
    $('#add-roast-selection').val('light');
    $('#add-submit').attr('disabled', true);
}

function matchesFilters(coffee) {

    let selectedRoast = $('#roast-selection').val();
    let matchesRoastFilter = (coffee.roast === selectedRoast || selectedRoast === "all");

    return (matchesRoastFilter & hasPartialNameMatch(coffee));

}