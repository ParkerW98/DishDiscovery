const recipeSearch = "https://api.spoonacular.com/recipes/search?apiKey=1b895093492742b1a06fd7a7daecb281&number=10&includeNutrition=true";

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
let searchWord = document.getElementById('search-input');
//searchWord == "";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    form.addEventListener('search-btn', (event) => {
      event.preventDefault(); // prevent form from submitting and reloading the page
    });
    console.log("hi");
    console.log(searchWord);
});


/* $(document).ready(function() {
addEventListener(searchBtn, function(event) {
    event.preventDefault();
    const searchWord = document.getElementById('search-input').value;
    console.log(searchWord);
    searchRecipes(searchWord);
})}); */

function searchRecipes(query) {
    fetch(recipeSearch)
        .then(response => response.json())
        .then(data => displayRecipes(data.results))
        .catch(error => console.log(error))
}


function displayRecipes(recipes) {
    console.log(recipes);
    const resultsContainer = document.getElementById('results-container');

    // Clear any previous search results
    resultsContainer.innerHTML = '';

    // Loop through the recipes and create HTML elements for each one
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const titleElement = document.createElement('h2');
        titleElement.textContent = recipe.title;
        recipeElement.appendChild(titleElement);

        const imageElement = document.createElement('img');
        imageElement.src = recipe.image;
        recipeElement.appendChild(imageElement);

        const summaryElement = document.createElement('p');
        summaryElement.textContent = recipe.summary;
        recipeElement.appendChild(summaryElement);

        resultsContainer.appendChild(recipeElement);
    });
}
