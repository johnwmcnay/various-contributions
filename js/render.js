
//creates elements, and returns group of elements
function renderCoffee(coffee) {

    let wrapper = document.createElement("div");
    wrapper.classList.add("card", "col-5", "m-2");

    let div = document.createElement("div");
    div.classList.add("card-body");

    let heading = document.createElement("h3");
    heading.classList.add("card-title");
    heading.innerText = coffee.name;

    let p = document.createElement("p");
    p.innerText = coffee.roast;
    p.classList.add("card-text");

    let edit = document.createElement("div");
    edit.innerHTML = '<i class="far fa-edit"></i>';
    edit.style.display = "none";

    div.addEventListener("mouseenter", function( event ) {
        edit.style.display = "inline-block";
    });

    div.addEventListener("click", function( event ) {
        stagedItem.innerText = "Name: " + coffee.name + "\nRoast: " + coffee.roast;
        stagedItem.coffeeName = coffee.name;
        stagedItem.coffeeRoast = coffee.roast;

        editCoffee.value = coffee.name;
        editRoastSelection.value = coffee.roast;

    });

    div.addEventListener("mouseleave", function( event ) {
        edit.style.display = "none";
    });


    div.appendChild(heading);
    div.appendChild(p);
    div.appendChild(edit);
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
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {

        //looks to include coffees with the correct roast and search string filter
        if ((coffee.roast === selectedRoast || selectedRoast === "All") && hasCoffee(coffee)) {
            filteredCoffees.push(coffee);
        }
    });

    //updates the screen based on user input
    renderCoffees(filteredCoffees);
}