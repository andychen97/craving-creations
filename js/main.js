// /* global data */

// Search querySelectors
var $navSearch = document.querySelector('form[name="navSearch"]');
var $search = document.querySelector('form[name="heroSearch"]');
var $navCustomerInput = document.querySelector('input[name="navInput"]');
var $regularCustomerInput = document.querySelector('input[name="heroInput"]');

// Search results querySelectors
var $ulSearchResults = document.querySelector('ul[id="ul-search-result"]');
var $h4Results = document.querySelector('h4[id="results"]');
var $resultcount = document.querySelector('span[id="result-count"]');

// Pages of the Website
var $homePage = document.querySelector('div[data-view="home-page"]');
var $singleRecipePage = document.querySelector('div[data-view="recipe-page"]');
var $resultPage = document.querySelector('div[data-view="results"]');
var $favoritesPage = document.querySelector('div[data-view="favorites"]');
var $logo = document.querySelector('h1.logo');
var $favoritesIcon = document.querySelector('i.bookmark');

// favorite results
var $favoriteResult = document.querySelector('ul[id="favorite-result"]');

$navSearch.addEventListener('submit', searchCallback);
$search.addEventListener('submit', searchCallback);
$logo.addEventListener('click', logoClick);
$favoritesIcon.addEventListener('click', favoritesClick);

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
  data.view = 'results';
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
  $li.addEventListener('click', clickedReceipe);
  $li.entries = entries;
  return $li;
}

function resetSearch() {
  matchCount = 0;
  data.tempEntries = [];
  var $createdLi = document.querySelectorAll('li.li-inline-block');

  for (let i = 0; i < $createdLi.length; i++) {
    if ($ulSearchResults.hasChildNodes()) {
      $ulSearchResults.removeChild($createdLi[i]);
    }
  }
}

function clickedReceipe(event) {
  data.view = 'recipe-page';
  viewSwap();
  var clickedEntry = event.currentTarget.entries;
  $singleRecipePage.appendChild(GenerateSingleRecipe(clickedEntry));
}

function GenerateSingleRecipe(entry) {
  if ($singleRecipePage.hasChildNodes()) {
    var $createdClickedDiv = document.querySelector('div.generate-clicked-div');
    $singleRecipePage.removeChild($createdClickedDiv);
  }

  var $divClicked = document.createElement('div');
  $divClicked.className = 'generate-clicked-div';
  var $div = document.createElement('div');
  $div.className = 'row';
  var $divTitle = document.createElement('div');
  $divTitle.className = 'col-1 margin-20px';
  $div.appendChild($divTitle);
  var $h2Title = document.createElement('h2');
  $h2Title.textContent = entry.name;
  $divTitle.appendChild($h2Title);
  var $pDescript = document.createElement('p');
  $pDescript.textContent = entry.description;
  $divTitle.appendChild($pDescript);
  $divClicked.appendChild($div);

  var $divServing = document.createElement('div');
  $divServing.className = 'row align-center';
  var $h4Calories = document.createElement('h4');
  $h4Calories.className = 'serving-facts';
  if (entry.calories === undefined) {
    $h4Calories.textContent = 'Calories' + '\r\n' + '-';
  } else {
    $h4Calories.textContent = 'Calories' + '\r\n' + entry.calories;
  }
  $divServing.appendChild($h4Calories);
  var $h4Carbs = document.createElement('h4');
  $h4Carbs.className = 'serving-facts';
  if (entry.carbohydrates === undefined) {
    $h4Carbs.textContent = 'Carbs' + '\r\n' + '-';
  } else {
    $h4Carbs.textContent = 'Carbs' + '\r\n' + entry.carbohydrates;
  }
  $divServing.appendChild($h4Carbs);
  var $h4Fats = document.createElement('h4');
  $h4Fats.className = 'serving-facts';
  if (entry.fats === undefined) {
    $h4Fats.textContent = 'Fats' + '\r\n' + '-';
  } else {
    $h4Fats.textContent = 'Fats' + '\r\n' + entry.fats;
  }
  $divServing.appendChild($h4Fats);
  var $h4Protein = document.createElement('h4');
  $h4Protein.className = 'serving-facts';
  if (entry.protein === undefined) {
    $h4Protein.textContent = 'Protein' + '\r\n' + '-';
  } else {
    $h4Protein.textContent = 'Protein' + '\r\n' + entry.protein;
  }
  $divServing.appendChild($h4Protein);
  var $h4Fiber = document.createElement('h4');
  $h4Fiber.className = 'serving-facts';
  if (entry.fiber === undefined) {
    $h4Fiber.textContent = 'Fiber' + '\r\n' + '-';
  } else {
    $h4Fiber.textContent = 'Fiber' + '\r\n' + entry.fiber;
  }
  $divServing.appendChild($h4Fiber);
  var $h4Sugar = document.createElement('h4');
  $h4Sugar.className = 'serving-facts-last';
  if (entry.sugar === undefined) {
    $h4Sugar.textContent = 'Sugar' + '\r\n' + '-';
  } else {
    $h4Sugar.textContent = 'Sugar' + '\r\n' + entry.sugar;
  }
  $divServing.appendChild($h4Sugar);
  $divClicked.appendChild($divServing);

  var $divImageIngredient = document.createElement('div');
  $divImageIngredient.className = 'row';
  var $divImageCol = document.createElement('div');
  $divImageCol.className = 'col-3-5';
  $divImageIngredient.appendChild($divImageCol);
  var $divImageBox = document.createElement('div');
  $divImageBox.className = 'image-box relative';
  $divImageCol.appendChild($divImageBox);
  var $recipeImage = document.createElement('img');
  $recipeImage.className = 'image-ingredient-page';
  $recipeImage.setAttribute('src', entry.image);
  $divImageBox.appendChild($recipeImage);
  var $divSaveRecipe = document.createElement('div');
  $divSaveRecipe.className = 'save-recipe';
  $divSaveRecipe.setAttribute('tempEntryId', entry.tempEntryId);
  $divImageBox.appendChild($divSaveRecipe);
  var $saveRecipeIcon = document.createElement('i');
  $saveRecipeIcon.className = 'fa fa-regular fa-bookmark fa-lg save-recipe-icon';
  $saveRecipeIcon.setAttribute('ttempEntryId', entry.tempEntryId);
  $divSaveRecipe.appendChild($saveRecipeIcon);
  var $saveRecipeText = document.createElement('span');
  $saveRecipeText.className = 'save-recipe-font';
  $saveRecipeText.textContent = ' Save Recipe';
  $saveRecipeText.setAttribute('tempEntryId', entry.tempEntryId);
  $saveRecipeIcon.appendChild($saveRecipeText);

  var $divIngredientCol = document.createElement('div');
  $divIngredientCol.className = 'col-2-5';
  $divImageIngredient.appendChild($divIngredientCol);
  var $h4IngredientTitle = document.createElement('h4');
  $h4IngredientTitle.textContent = 'INGREDIENTS';
  $h4IngredientTitle.className = 'ingredient-title';
  $divIngredientCol.appendChild($h4IngredientTitle);
  var $ulIngredients = document.createElement('ul');
  $ulIngredients.className = 'ingredient-list';
  $divIngredientCol.append($ulIngredients);
  for (var i = 0; i < entry.recipeIngredients.length; i++) {
    var $liIngredients = document.createElement('li');
    $liIngredients.textContent = $liIngredients.textContent + entry.recipeIngredients[i].raw_text;
    $ulIngredients.appendChild($liIngredients);
  }
  $divClicked.appendChild($divImageIngredient);
  var $divInstructionCol = document.createElement('div');
  $divInstructionCol.className = 'col-1';
  var $h4InstructionTitle = document.createElement('h4');
  $h4InstructionTitle.className = 'instructions-title';
  $h4InstructionTitle.textContent = 'INSTRUCTIONS';
  $divInstructionCol.appendChild($h4InstructionTitle);
  var $olInstructions = document.createElement('ol');
  $olInstructions.className = 'instructions-list';
  $divInstructionCol.appendChild($olInstructions);
  for (var j = 0; j < entry.recipeInstructions.length; j++) {
    var $liInstructions = document.createElement('li');
    $liInstructions.textContent = $liInstructions.textContent + entry.recipeInstructions[j].display_text;
    $olInstructions.appendChild($liInstructions);
  }
  $divClicked.appendChild($divInstructionCol);
  $divSaveRecipe.addEventListener('click', saveRecipe);
  return $divClicked;
}

function viewSwap() {
  if (data.view === 'home-page') {
    $homePage.classList.remove('hidden');
    $singleRecipePage.classList.add('hidden');
    $resultPage.classList.add('hidden');
    $favoritesPage.classList.add('hidden');
  } else if (data.view === 'results') {
    $homePage.classList.remove('hidden');
    $resultPage.classList.remove('hidden');
    $singleRecipePage.classList.add('hidden');
    $favoritesPage.classList.add('hidden');
  } else if (data.view === 'recipe-page') {
    $singleRecipePage.classList.remove('hidden');
    $homePage.classList.add('hidden');
    $resultPage.classList.add('hidden');
    $favoritesPage.classList.add('hidden');
  } else if (data.view === 'favorites') {
    $homePage.classList.remove('hidden');
    $favoritesPage.classList.remove('hidden');
    $singleRecipePage.classList.add('hidden');
    $resultPage.classList.add('hidden');
  }
}

function logoClick(event) {
  data.view = 'home-page';
  $h4Results.className = 'hidden';
  viewSwap();
}

function favoritesClick(event) {
  data.view = 'favorites';
  viewSwap();
}

function saveRecipe(event) {
  for (var i = 0; i < data.tempEntries.length; i++) {
    if (Number(event.target.attributes.tempentryId.value) === data.tempEntries[i].tempEntryId) {
      var favorite = {
        name: data.tempEntries[i].name,
        description: data.tempEntries[i].description,
        image: data.tempEntries[i].image,
        recipeIngredients: data.tempEntries[i].recipeIngredients,
        recipeInstructions: data.tempEntries[i].recipeInstructions,
        calories: data.tempEntries[i].calories,
        carbs: data.tempEntries[i].carbs,
        fats: data.tempEntries[i].fats,
        protein: data.tempEntries[i].protein,
        fiber: data.tempEntries[i].fiber,
        sugar: data.tempEntries[i].sugar,
        entryId: data.nextEntryId++
      };
      data.favorite.unshift(favorite);
    }
  }
  $favoriteResult.prepend(createCards(data.favorite[0]));
}
