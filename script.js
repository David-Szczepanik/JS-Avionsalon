function validate(event) {
  let key = event.which || event.keyCode || 0;
  return ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key >= 48 && key <= 57));
}
document.addEventListener('DOMContentLoaded', function () {

  var citiesSelect = document.getElementById('cities');
  var flightCountSelect = document.getElementById('flight-count');
  var returnCheckbox = document.getElementById('return-chkbx');
  var totalPriceDiv = document.getElementById('total-price');

  citiesSelect.addEventListener('change', updateTotalPrice);
  flightCountSelect.addEventListener('change', updateTotalPrice);
  returnCheckbox.addEventListener('change', updateTotalPrice);

  function updateTotalPrice() {
    var cityPrice = getCitiesPrice(citiesSelect.value);
    var ticketCount = parseInt(flightCountSelect.value);
    var totalPrice = cityPrice * ticketCount;

    if (returnCheckbox.checked) {
      totalPrice *= 2;
    }

    var selectedClass = getSelectedFlightClass();

    switch (selectedClass) {
      case 'class-economy':
        break;
      case 'class-type-0':
        totalPrice *= 1.25; // 25% 
        break;
      case 'class-royal':
        totalPrice *= 1.5; // 50% 
        break;
    }

    totalPriceDiv.textContent = 'Celková cena letenek: ' + totalPrice + ' Kč';
  }

  function getSelectedFlightClass() {
    let selectedClass = document.querySelector('.flight-class-wrap input[type="radio"]:checked');
    return selectedClass ? selectedClass.id : null;
  }

  function getCitiesPrice(city) {
    switch (city) {
      case 'praha':
        return 500;
      case 'frankfurt':
        return 3000;
      case 'new-york':
        return 15000;
      case 'sydney':
        return 30000;
      default:
        return 0;
    }
  }





});
