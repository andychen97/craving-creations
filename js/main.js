var $navSearch = document.querySelector('form[name="navSearch"]');
var $search = document.querySelector('form[name="heroSearch"]');
var $navCustomerInput = document.querySelector('input[name="navInput"]');
var $regularCustomerInput = document.querySelector('input[name="heroInput"]');

$navSearch.addEventListener('submit', searchCallback);
$search.addEventListener('submit', searchCallback);

function searchCallback(event) {
  event.preventDefault();
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
}

function apiSearch(customerInput) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  var originalUrl = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=8&q=';
  originalUrl += customerInput;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      var jsonResponse = JSON.parse(this.responseText);
      var results = jsonResponse.results;
      parseResponse(results);
    }
  });

  xhr.open('GET', originalUrl);
  xhr.setRequestHeader('X-RapidAPI-Key', '0cee8fcae5mshc138c2d6a69e94cp1c0984jsn59f501227ea8');
  xhr.setRequestHeader('X-RapidAPI-Host', 'tasty.p.rapidapi.com');

  xhr.send(data);
}

function parseResponse(apiResponse) {
  for (let i = 0; i < apiResponse.length; i++) {
    if (!apiResponse[i].recipes) {
      // var recipe = apiResponse[i];
      // var name = recipe.name;
      // var description = recipe.description;
      // var recipeImage = recipe.thumbnail_url;
      // var recipeIngredients = recipe.sections[0].components;
      // var recipeInstructions = recipe.instructions;
      // console.log('recipe: ', recipe);
      // console.log('name: ', name);
      // console.log('description: ', description);
      // console.log('recipeImage: ', recipeImage);
      // console.log('recipeIngredients: ', recipeIngredients);
      // console.log('recipeInstructions: ', recipeInstructions);
      // console.log('\n');
    } else {
      parseResponse(apiResponse[i].recipes);
    }
  }
}

// var data = null;

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener('readystatechange', function () {
//   if (this.readyState === this.DONE) {
//     var jsonResponse = JSON.parse(this.responseText);
//     var results = jsonResponse.results[8].item.recipes;
//     // var topTenRecipes = results.recipes.slice(0, 10);
//     // console.log('topTenRecipes', results);
//     for (let i = 0; i < results.length; i++) {
//       var recipe = results[i];
//       var name = recipe.name;
//       var recipeImage = recipe.thumbnail_url;
//       var recipeIngredients = recipe.sections[0].components;
//       var recipeInstructions = recipe.instructions;
//       // console.log('example: receipe[0]: ', recipe);
//       // console.log('name: ', name);
//       // console.log('recipeImage: ', recipeImage);
//       // console.log('recipeIngredients: ', recipeIngredients);
//       // console.log('recipeInstructions: ', recipeInstructions);
//     }
//   }
// });

// xhr.open('GET', 'https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0');
// xhr.setRequestHeader('X-RapidAPI-Key', '0cee8fcae5mshc138c2d6a69e94cp1c0984jsn59f501227ea8');
// xhr.setRequestHeader('X-RapidAPI-Host', 'tasty.p.rapidapi.com');
// xhr.withCredentials = false;
// xhr.send(data);
