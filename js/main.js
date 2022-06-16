// /* global data */
var $navSearch = document.querySelector('form[name="navSearch"]');
var $search = document.querySelector('form[name="heroSearch"]');
var $navCustomerInput = document.querySelector('input[name="navInput"]');
var $regularCustomerInput = document.querySelector('input[name="heroInput"]');
var $ulSearchResults = document.querySelector('ul[id="ul-search-result"]');
var $h4Results = document.querySelector('h4[id="results"]');
var $homePage = document.querySelector('div[data-view="home-page"]');
var $singeRecipePage = document.querySelector('div[data-view="recipe-page"]');

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
  data.view = 'home-page';
  viewSwap();
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
      // console.log(recipe);
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
        calories: recipe.nutrition.calories,
        carbs: recipe.nutrition.carbohydrates,
        fats: recipe.nutrition.fat,
        protein: recipe.nutrition.protein,
        fiber: recipe.nutrition.fiber,
        sugar: recipe.nutrition.sugar,
        tempEntryId: data.tempNextEntryId++
      };
      data.tempEntries.unshift(singleRecipe);
      $ulSearchResults.prepend(createCards(data.tempEntries[0]));
    } else {
      parseResponse(apiResponse[i].recipes);
    }
  }
}

var $resultcount = document.querySelector('span[id="result-count"]');
var matchCount = 0;

function createCards(entries) {
  var $li = document.createElement('li');
  $li.className = 'li-inline-block';
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
  var $h5Title = document.createElement('h5');
  $h5Title.className = 'card-title-text';
  $h5Title.textContent = entries.name;
  $divCard.appendChild($h5Title);
  matchCount++;
  $resultcount.textContent = matchCount;
  $li.addEventListener('click', singleRecipeInstruction);
  return $li;
}

function resetSearch() {
  matchCount = 0;
  data.tempEntries = [];
  var $createdLi = document.querySelectorAll('li.li-inline-block');
  for (let i = 0; i < $createdLi.length; i++) {
    $ulSearchResults.removeChild($createdLi[i]);
  }
}

function singleRecipeInstruction(event) {
  data.view = 'recipe-page';
  viewSwap();
  var $div = document.createElement('div');
  $div.className = 'row';
  var $divTitle = document.createElement('div');
  $divTitle.className = 'col-1 margin-20px';
  $div.appendChild($divTitle);
  // var $h2Title = document.createElement('h2');
  // $h2Title.textContent = data.tempEntries
}

function viewSwap() {
  if (data.view === 'home-page') {
    $homePage.classList.remove('hidden');
    $singeRecipePage.classList.add('hidden');
  } else if (data.view === 'single-recipe') {
    $homePage.classList.add('hidden');
    $singeRecipePage.classList.remove('hidden');
  }
}
