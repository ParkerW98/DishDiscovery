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
        .then(data => displayRecipes(data.results))
        .catch(error => console.log(error))
}


function displayRecipes(results) {
    const resultsContainer = document.getElementById('results-container');

// Clear any previous search results
recipesContainer.innerHTML = '';

results.forEach((result) => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeTitle = document.createElement('h2');
    recipeTitle.innerText = result.title;
    recipeCard.appendChild(recipeTitle);

    const recipeImage = document.createElement('img');
    recipeImage.src = result.image;
    recipeCard.appendChild(recipeImage);

    const recipeLink = document.createElement('a');
    recipeLink.href = result.sourceUrl;
    recipeLink.target = '_blank';
    recipeLink.innerText = 'View Recipe';
    recipeCard.appendChild(recipeLink);

    recipesContainer.appendChild(recipeCard);
});
}
