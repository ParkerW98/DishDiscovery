const recipeSearch = "https://api.spoonacular.com/recipes/search?apiKey=1b895093492742b1a06fd7a7daecb281&number=10&includeNutrition=true";

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

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Get the DOM element for the current recipe
        const recipeElem = document.getElementById(`result-${i}`);

        // Update the recipe name and image
        const nameElem = recipeElem.querySelector('.recipe-name');
        const imageElem = recipeElem.querySelector('.recipe-image');

        nameElem.textContent = recipe.title;
        imageElem.src = recipe.image;

        // Show the recipe element
        recipeElem.style.display = 'block';
    }
}

