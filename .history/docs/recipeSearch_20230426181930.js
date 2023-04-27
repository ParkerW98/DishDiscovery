const recipeSearch = "https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=1b895093492742b1a06fd7a7daecb281";

const searchBtn = document.getElementById('search-btn');
let searchWord = document.getElementById('search-input');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // prevent form from submitting and reloading the page
        searchWord = document.getElementById('search-input').value;
        searchRecipes(searchWord);
    });
});

function searchRecipes(searchWord) {
    fetch(recipeSearch + "&query=" + searchWord)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.results);
        })
        .catch(error => console.log(error));
}


function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    const resultsContainer = document.getElementById('results-container');
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Get the DOM element for the current recipe
        const recipeElem = document.getElementById(`result-${i}`);

        let recipeCard = document.write('<div class="card text-center" style="width: 100%;">' +
        '<img src="' + recipe.image + '" class="card-img-top" alt="recipe photo">' +
        '<div class="card-body">' +
            '<h5 class="card-title">' + recipe.title + '</h5>' +
            '<p class="card-text">'+ recipe.summary + '</p>' +
            '<a href="'+ recipe.sourceUrl + '" class="btn btn-primary">Recipe Page</a>' +
        '</div>' +
        '</div>');

        // Show the recipe element
        resultsContainer.innerHTML = recipeCard;
    }
}

