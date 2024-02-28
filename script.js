function validate(event) {
  let key = event.which || event.keyCode || 0;
  return ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key >= 48 && key <= 57));
}

const priceValidate = () => {
  let priceOffer = document.getElementById('price-offer').value;
  let totalPrice = parseInt(document.getElementById('total-price').textContent.split(':')[1]);
  let canAfford = priceOffer - totalPrice >= 0;
  document.querySelector('#price-validation').value = canAfford ? 'Můžete si to dovolit' : 'Nemáte na to dost peněz';
  document.getElementById('send-btn').disabled = !canAfford;
};

var sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', priceValidate);

document.addEventListener('DOMContentLoaded', function () {

  var citiesSelect = document.getElementById('cities');
  var flightCountSelect = document.getElementById('flight-count');
  var returnCheckbox = document.getElementById('return-chkbx');
  var totalPriceDiv = document.getElementById('total-price');

  citiesSelect.addEventListener('change', updateTotalPrice);
  flightCountSelect.addEventListener('change', updateTotalPrice);
  returnCheckbox.addEventListener('change', updateTotalPrice);

  var radios = document.querySelectorAll('.flight-class-wrap .class-type-rad');
  radios.forEach(function(radio) {
    radio.addEventListener('change', updateTotalPrice);
  });

  

  var calculateButton = document.getElementById('calculate-btn');
  
  calculateButton.addEventListener('click', function() {
    var userValue = parseInt(document.getElementById('price-offer').value);
    var totalPrice = parseInt(document.getElementById('total-price').textContent.split(':')[1]);
    if (userValue > totalPrice) {
      alert('Zadal jsi vyšší cenu než je celková cena letenek.');
    } else {
      alert('Zadal jsi nižší cenu než je celková cena letenek.');
    }
  });
  
  

  var sendButton = document.getElementById('send-btn');

  calculateButton.addEventListener('click', function() {
    var userValue = parseInt(document.getElementById('price-offer').value);
    var totalPrice = parseInt(document.getElementById('total-price').textContent.split(':')[1]);
    if (userValue > totalPrice) {
      sendButton.disabled = false;
    } else {
      sendButton.disabled = true;
    }
  });


  
  function updateTotalPrice() {
    var cityPrice = getCitiesPrice(citiesSelect.value);
    var ticketCount = parseInt(flightCountSelect.value);
    var totalPrice = cityPrice * ticketCount;

    if (returnCheckbox.checked) {
      totalPrice *= 2;
    }

    var selectedClass = getSelectedFlightClass();

    switch (selectedClass) {
      case 'class-type-0':
        break;
      case 'class-type-1':
        totalPrice *= 1.25; // 25%
        break;
      case 'class-type-2':
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
