// var $navSearch = document.querySelector('form.first');
// var $search = document.querySelector('form[data-view="second"]');
// var navCustomerInput = document.querySelector('input[name="navSearch"]');
// var regularCustomerInput = document.querySelector('input[name="search"]');
// var apiResponse;

// $navSearch.addEventListener('submit', searchCallback);
// $search.addEventListener('submit', searchCallback);
// function searchCallback(event) {
//   event.preventDefault();
//   var customerInput;
//   if (navCustomerInput.value) {
//     customerInput = navCustomerInput.value;
//   }
//   if (regularCustomerInput.value) {
//     customerInput = regularCustomerInput.value;
//   }
//   apiSearch(customerInput);
//   $navSearch.reset();
// }

// function apiSearch(customerInput) {
//   var data = null;

//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = false;

//   var originalUrl = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&';
//   originalUrl += 'q=' + customerInput;

//   xhr.addEventListener('readystatechange', function () {
//     if (this.readyState === this.DONE) {
//       apiResponse = this.responseText;
//     }
//   });

//   xhr.open('GET', originalUrl);
//   xhr.setRequestHeader('X-RapidAPI-Key', '0cee8fcae5mshc138c2d6a69e94cp1c0984jsn59f501227ea8');
//   xhr.setRequestHeader('X-RapidAPI-Host', 'tasty.p.rapidapi.com');

//   xhr.send(data); asdasd;
// }

// var waitForResponseInterval = setInterval(waitForResponse, 1000);

// function waitForResponse() {
//   if (apiResponse) {
//     console.log('apiResponse: ', apiResponse);
//   }
// }
