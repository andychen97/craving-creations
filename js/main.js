// /* global data */
var $navSearch = document.querySelector('form[name="navSearch"]');
var $search = document.querySelector('form[name="heroSearch"]');
var $navCustomerInput = document.querySelector('input[name="navInput"]');
var $regularCustomerInput = document.querySelector('input[name="heroInput"]');
var $ul = document.querySelector('ul');
var $h4Results = document.querySelector('h4[id="results"]');

$navSearch.addEventListener('submit', searchCallback);
$search.addEventListener('submit', searchCallback);

function searchCallback(event) {
  event.preventDefault();
  resetSearch();
  var customerInput;
  if ($navCustomerInput.value) {
    customerInput = $navCustomerInput.value;
  }
  if ($regularCustomerInput.value) {
    customerInput = $regularCustomerInput.value;
  }
  apiSearch(customerInput);
  $navSearch.reset();
  $search.reset();
  $h4Results.className = '';
}

function apiSearch(customerInput) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.withCredentials = false;

  var originalUrl = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=8&q=';
  originalUrl += customerInput;

  xhr.addEventListener('load', function () {
    var results = xhr.response.results;
    parseResponse(results);
  });

  xhr.open('GET', originalUrl);
  xhr.setRequestHeader('X-RapidAPI-Key', '0cee8fcae5mshc138c2d6a69e94cp1c0984jsn59f501227ea8');
  xhr.setRequestHeader('X-RapidAPI-Host', 'tasty.p.rapidapi.com');

  xhr.send(data);
}

function parseResponse(apiResponse) {
  for (let i = 0; i < apiResponse.length; i++) {
    if (!apiResponse[i].recipes) {
      var recipe = apiResponse[i];
      var name = recipe.name;
      var description = recipe.description;
      var recipeImage = recipe.thumbnail_url;
      var recipeIngredients = recipe.sections[0].components;
      var recipeInstructions = recipe.instructions;
      var singleRecipe = {
        name,
        description,
        image: recipeImage,
        recipeIngredients,
        recipeInstructions,
        tempEntryId: data.tempNextEntryId++
      };
      data.tempEntries.unshift(singleRecipe);
      $ul.prepend(createCards(data.tempEntries[0]));
    } else {
      parseResponse(apiResponse[i].recipes);
    }
  }
}

var $resultcount = document.querySelector('span[id="result-count"]');
var matchCount = 0;

function createCards(entries) {
  var $li = document.createElement('li');
  var $divCol = document.createElement('div');
  $divCol.className = 'col-4';
  $li.appendChild($divCol);
  var $divCard = document.createElement('div');
  $divCard.className = 'picture-card';
  $divCol.appendChild($divCard);
  var $image = document.createElement('img');
  $image.setAttribute('src', entries.image);
  $image.className = 'picture';
  $divCard.appendChild($image);
  var $h3Title = document.createElement('h3');
  $h3Title.className = 'card-title-text';
  $h3Title.textContent = entries.name;
  $divCard.appendChild($h3Title);
  matchCount++;
  $resultcount.textContent = matchCount;

  return $li;
}

function resetSearch() {
  matchCount = 0;
  data.tempEntries = [];
  var $createdLi = document.querySelectorAll('li');
  for (let i = 0; i < $createdLi.length; i++) {
    $ul.removeChild($createdLi[i]);
  }
}
