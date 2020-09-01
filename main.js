"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h3>' + coffee.name + '</h3>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if ((coffee.roast === selectedRoast || selectedRoast === "All") && hasCoffee(coffee)) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeDiv.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var coffeeDiv = document.querySelector('#coffees');
var roastSelection = document.querySelector('#roast-selection');
var addCoffeeButton = document.querySelector('#add-submit');
var addRoast = document.querySelector('#add-roast-selection');
var newCoffee = document.querySelector('#add-coffee');
var searchCoffee = document.querySelector("#search")

coffeeDiv.innerHTML = renderCoffees(coffees);


addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('keyup', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);

function hasCoffee(coffee){
    //
    // var coffeeFilter = [];
    var coffeeName = document.querySelector('#search').value.toLowerCase();
    // // console.log(coffeeName.value);
    // for(var i = 0; i < coffees.length; i++) {
        return(coffee.name.toLowerCase().indexOf(coffeeName) !== -1);

}

function addCoffee(e){
    e.preventDefault()
    console.log("Coffee added");
    var coffeeName = newCoffee.value;
    var newRoast = addRoast.value;
    var updatedCoffee = {
        id: coffees.length + 1,
        name: coffeeName,
        roast: newRoast
    }
    console.log(coffeeName);
    console.log(newRoast);
    coffees.push(updatedCoffee);
    searchCoffee();
}

