addCoffeeButton.addEventListener('click', addCoffee);
searchCoffee.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
addSearchToggle.addEventListener('mouseenter', addHoverOn)
addSearchToggle.addEventListener('mouseleave', addHoverOff);
addSearchToggle.addEventListener('click', toggle);
newCoffee.addEventListener('input', updateAddButton);