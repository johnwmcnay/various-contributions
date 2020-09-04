//creates elements, and returns group of elements
function renderCoffee(coffee) {

    //creates a div as a card along with other bootstrap classes
    let coffeeCard = document.createElement("div");
    coffeeCard.classList.add("card", "col-5", "col-lg-3", "col-xl-2", "m-2");
    coffeeCard.id = "coffee" + coffee.id;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = coffee.name;

    let cardText = document.createElement("p");
    cardText.innerText = coffee.roast;
    cardText.classList.add("card-text");

    let deleteIcon = document.createElement("div");
    deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteIcon.classList.add("d-none");

    //adds delete functionality to the delete icon
    deleteIcon.addEventListener('click', function() {
        deleteItem(coffee);
    });

    // the next two events toggle between background colors based on hover state
    // the delete icon is only displayed when the card is hovered over
    coffeeCard.addEventListener("mouseenter", function( event ) {
        coffeeCard.classList.remove('card');
        coffeeCard.classList.add('card-hover');
        deleteIcon.classList.remove("d-none");
    });

    coffeeCard.addEventListener("mouseleave", function( event ) {
        coffeeCard.classList.add('card');
        coffeeCard.classList.remove('card-hover');
        deleteIcon.classList.add("d-none");
    });

    // attach all the elements to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(deleteIcon);

    // attach the card body to the card
    coffeeCard.appendChild(cardBody);

    // returned the new card element
    return coffeeCard;
}

function renderCoffees(coffees) {

    coffeeDiv.innerHTML = '';
    let coffeeCount = 0;

    for (let coffee of coffees) {
        if (coffee.id > 0) {
            let child = renderCoffee(coffee);
            coffeeDiv.appendChild(child);
            coffeeCount++;
        }
    }

    numOfResults.innerText = coffeeCount.toString();
}

//triggered on events to update the screen based on user input
function updateCoffees(e) {

    if (e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
    }

    let selectedRoast = roastSelection.value;
    let coffeeCount = 0;

    coffees.forEach(function(coffee) {

        //looks to include coffees with the correct roast and search string filter
        //will only include objects with a positive number ID
        if (coffee.id > 0) {
            let coffeeID = "coffee" + coffee.id;
            if ((coffee.roast === selectedRoast || selectedRoast === "all") && hasCoffee(coffee)) {
                coffeeCount++;
                document.getElementById(coffeeID).classList.remove("d-none");
            } else {
                document.getElementById(coffeeID).classList.add("d-none");
            }
        }
    });

    if (coffeeCount === 1) {
        document.querySelector("#plural").innerText = "";
    } else {
        document.querySelector("#plural").innerText = "s";
    }

    numOfResults.innerText = coffeeCount.toString();
}