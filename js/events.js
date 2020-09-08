$('#add-submit').click(addCoffee);
$('#search').on('input', updateCoffees);
$('#roast-selection').on('change', updateCoffees);
$("#add-search-toggle")
    .hover(addHoverOn, addHoverOff)
    .click(toggle);
$('#add-coffee').on('input', updateAddButton);
$("#discard-button").click(discardChanges);
$("#save-button").click(saveChanges);
$("#restore-trash-icon").click(toggleRestoreList);
$("#restore-select-all").click(selectAll);
$("#restore-unselect-all").click(unselectAll);
$("#restore-annihilate").click(annihilate);
$("#restore-item").click(restore);
$("#restore-close").click(closeRestore);

function closeRestore() {
    $('#restore-window').addClass("d-none");
}

function annihilate() {

    for (let item of document.getElementById("restore-window").childNodes[0].childNodes) {
        let input = item.childNodes[0];
        if (input.checked) {
            let coffeeID = "coffee" + (input.coffee.id * -1);
            let coffeeIndex = (input.coffee.id * -1) - 1;
            delete coffees[coffeeIndex];
            if (document.getElementById(coffeeID) !== null) {

                document.getElementById("coffees").removeChild(document.getElementById(coffeeID));
            }
        }
    }
    if(localStorage) {
        //JSON.stringify used as you can only use localStorage with strings
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }
    updateRestoreList();
}

function restore() {

    for (let item of document.getElementById("restore-window").childNodes[0].childNodes) {
        let input = item.childNodes[0];
        let coffee = $(input).data('coffee');

        if (input.checked) {
            let coffeeToAdd = {
                id: coffee.id * -1,
                name: coffee.name,
                roast: coffee.roast,
            }
            coffees.splice(coffeeToAdd.id - 1, 1, coffeeToAdd);

            let element = renderCoffee(coffeeToAdd);
            if (document.getElementById("coffee" + coffeeToAdd.id) !== null) {
                document.getElementById("coffees")
                    .replaceChild(element, document.getElementById("coffee" + coffeeToAdd.id));
            } else {
                document.getElementById("coffees").appendChild(element);
            }
            updateCoffees();
        }
    }
    if(localStorage) {
        //JSON.stringify used as you can only use localStorage with strings
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }

    updateRestoreList();
}

function unselectAll() {
    for (let item of document.getElementById("restore-window").childNodes[0].childNodes) {
        item.childNodes[0].checked = false;
    }
}

function selectAll() {
    for (let item of document.getElementById("restore-window").childNodes[0].childNodes) {
        item.childNodes[0].checked = true;
    }
}

function toggleRestoreList() {
    if ($('#restore-window').hasClass("d-none") && $('#edit-window').hasClass("d-none")) {
        $('#restore-window').removeClass("d-none");
    } else {
        $('#restore-window').addClass("d-none");
    }
    updateRestoreList();
}

function updateRestoreList() {

    let even = true;
    let items = document.createElement("div");
    $(items).addClass("col-8 p-0 restore-list")

    for (let coffee of coffees) {
        if (!coffee) {
            continue;
        }

        if (coffee.id < 0) {
            let element = document.createElement("input");
            $(element)
                .attr('id', "coffee" + coffee.id + "restore")
                .attr('type', 'checkbox')
                .css('margin-right', '5px')
                .data('coffee', coffee)

            let label = document.createElement("label");
            $(label)
                .attr('for', "test")
                .html("<strong>" + coffee.name + "</strong> <em>" + coffee.roast + "</em>")
                .addClass("restore-label")
                .prepend(element)

            if (even) {
                $(label).addClass("even");
            } else {
                $(label).addClass("odd");
            }

            $(items).append(label);

            even = !even;
        }
    }
    document.getElementById('restore-window')
        .replaceChild(items, document.getElementById('restore-window').childNodes[0]);
}

function saveChanges(e) {
    e.preventDefault();

    let coffee = $('#save-button').data('coffee');
    let name = $('#edit-name').val().trim();
    let roast = $('#edit-roast').val().trim();

    let editedCoffee = {
        id: coffee.id,
        name: name,
        roast: roast,
    };

    coffees.splice(coffee.id - 1, 1, editedCoffee);

    if(localStorage) {
        //JSON.stringify used as you can only use localStorage with strings
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }

    $('#edit-window').addClass("d-none");

    let newElement = renderCoffee(editedCoffee);

    document.getElementById('coffees')
        .replaceChild(newElement, document.getElementById("coffee" + coffee.id))

    updateCoffees();
}

function discardChanges(e) {
    e.preventDefault();
    $('#edit-window').addClass("d-none");
}

$(function() {
    $('#edit-window').draggable({
        containment: "parent",
    });
})
