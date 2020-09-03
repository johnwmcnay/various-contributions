//creates elements, and returns group of elements
function renderCoffee(coffee) {

    let wrapper = document.createElement("div");
    wrapper.classList.add("card", "col-5", "col-lg-3", "col-xl-2", "m-2");
    // wrapper.setAttribute("data-toggle", "popover");
    // wrapper.setAttribute("title", "title");
    wrapper.id = "coffee" + coffee.id;

    let div = document.createElement("div");
    div.classList.add("card-body");

    let heading = document.createElement("h3");
    heading.classList.add("card-title");
    heading.innerText = coffee.name;

    let p = document.createElement("p");
    p.innerText = coffee.roast;
    p.classList.add("card-text");

    let deleteDiv = document.createElement("div");
    deleteDiv.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteDiv.classList.add("d-none");

    deleteDiv.addEventListener('click', function() {
        deleteItem(coffee);
    });

    wrapper.addEventListener("mouseenter", function( event ) {
        wrapper.classList.remove('card');
        wrapper.classList.add('card-hover');
        deleteDiv.classList.remove("d-none");
    });

    wrapper.addEventListener("mouseleave", function( event ) {
        wrapper.classList.add('card');
        wrapper.classList.remove('card-hover');
        deleteDiv.classList.add("d-none");
    });

    div.appendChild(heading);
    div.appendChild(p);
    div.appendChild(deleteDiv);
    wrapper.appendChild(div);

    return wrapper;
}

function renderCoffees(coffees) {

    coffeeDiv.innerHTML = '';

    for(var i = 0; i < coffees.length; i++) {
        let child = renderCoffee(coffees[i]);
        coffeeDiv.appendChild(child);
    }

    let element = document.getElementById("numOfResults")
    element.innerText = coffees.length.toString();
}

//triggered on events to update the screen based on user input
function updateCoffees(e) {
    if (e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
    }
    var selectedRoast = roastSelection.value;

    coffees.forEach(function(coffee) {

        //looks to include coffees with the correct roast and search string filter
        let coffeeID = "coffee" + coffee.id;
        if ((coffee.roast === selectedRoast || selectedRoast === "all") && hasCoffee(coffee)) {
            document.getElementById(coffeeID).classList.remove("d-none");
        } else {
            document.getElementById(coffeeID).classList.add("d-none");
        }
    });

}

//returns whether user-inputted text matches and part of a coffee name; case-insensitive
function hasCoffee(coffee){

    var coffeeName = searchCoffee.value.toLowerCase();
    return (coffee.name.toLowerCase().indexOf(coffeeName) !== -1);

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

    coffeeDiv.appendChild(renderCoffee(updatedCoffee));
    updateCoffees(e);
}