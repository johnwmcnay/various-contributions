//handles events to update filters, which updates the screen
addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
editRoastSelection.addEventListener('change', updateEdit);