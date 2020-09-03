//handles events to update filters, which updates the screen
function addHoverOn() {
    addIcon.style.color = "#AB947E";

}

function addHoverOff() {
    addIcon.style.color = "floralwhite";
}

function hasDisplayNone(element) {
    return (element.classList.value.indexOf("d-none") !== -1);
}

function toggle() {

    let addSectionElements = [newCoffee, addRoast, searchIcon, addCoffeeButton];
    let searchSectionElements = [searchCoffee, roastSelection, resultsText, addIcon];
    let elementsToUpdate = addSectionElements.concat(searchSectionElements);

    elementsToUpdate.forEach(element => {
        if (hasDisplayNone(element)) {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
}

addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
// editRoastSelection.addEventListener('change', updateEdit);
addDiv.addEventListener('mouseenter', addHoverOn)
addDiv.addEventListener('mouseleave', addHoverOff);
addDiv.addEventListener('click', toggle);

$(function () {
    $('[data-toggle="popover"]').popover({
        'html': true,
        'container': 'body',
        'content': function() {
            return $("#testers").html()}
    }

    );
})
