//creates elements, and returns group of elements
function renderCoffee(coffee) {

    //creates a div as a card along with other bootstrap classes
    let coffeeCard = document.createElement("div");
    $(coffeeCard)
        .addClass("card col-11 col-sm-5 col-lg-3 col-xl-2 m-2")
        .attr('id', "coffee" + coffee.id);

    let cardBody = document.createElement("div");
    $(cardBody).addClass("card-body");

    let cardTitle = document.createElement("h3");
    $(cardTitle)
        .addClass("card-title")
        .text(coffee.name)
        .attr('id', "coffee" + coffee.id + "name");

    let cardText = document.createElement("p");
    $(cardText)
        .text(coffee.roast)
        .addClass("card-text")
        .attr('id', "coffee" + coffee.id + "roast");

    let deleteIcon = document.createElement("div");
    $(deleteIcon)
        .html('<i class="fas fa-trash-alt"></i>')
        .addClass("d-none")
        .click(function() {
            deleteItem(coffee);
        });

    let editIcon = document.createElement("div");
    $(editIcon)
        .html('<i class="fas fa-edit"></i>')
        .addClass("d-none")
        .click(function(event) {
            if ($('#restore-window').hasClass("d-none")) {

                $('#edit-window').removeClass("d-none");

                $('#edit-name')
                    .val(coffee.name)
                    .focus()

                $('#edit-roast').val(coffee.roast);

                $('#save-button').data('coffee', coffee);

            }
        });

    $(coffeeCard).hover(
        function( event ) {
            $(coffeeCard)
                .removeClass('card')
                .addClass('card-hover');
            $(deleteIcon).removeClass("d-none");
            $(editIcon).removeClass("d-none");
        },
        function( event ) {
            $(coffeeCard)
                .addClass('card')
                .removeClass('card-hover');
            $(deleteIcon).addClass("d-none");
            $(editIcon).addClass("d-none");
        }
    );

    // attach all the elements to the card body
    $(cardBody).append(cardTitle, cardText, deleteIcon, editIcon);
    $(coffeeCard).append(cardBody);

    // returned the new card element
    return coffeeCard;
}

function renderCoffees(coffees) {

    $('#coffees').html('');

    let coffeeCount = 0;

    //goes the an array of coffee objects and renders it to the screen only if it has a positive ID
    for (let coffee of coffees) {
        if (coffee === null) {
            continue;
        }

        if (coffee.id > 0) {
            let child = renderCoffee(coffee);
            $('#coffees').append(child);
            coffeeCount++;
        }
    }

    updateResults(coffeeCount);
}

//triggered on events to update the screen based on user input
function updateCoffees(e) {

    if (e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
    }

    let coffeeCount = 0;

    coffees.forEach(function(coffee) {

        //looks to include coffees with the correct roast and search string filter
        //will only include objects with a positive number ID
        if (coffee !== null) {
            if (coffee.id > 0) {
                let coffeeID = "#coffee" + coffee.id;
                let element = $(coffeeID);

                if (matchesFilters(coffee)) {
                    $(element).removeClass("d-none");
                    coffeeCount++;
                } else {
                    $(element).addClass("d-none");
                }
            }
        }
    });

    updateResults(coffeeCount);
}