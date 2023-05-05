const recipeSearch = "https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=1b895093492742b1a06fd7a7daecb281";

// Get the search button and search input
const searchBtn = document.getElementById('search-btn');
let searchWord = document.getElementById('search-input');

// When the DOM is loaded, add an event listener to the search form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // prevent form from submitting and reloading the page
        searchWord = document.getElementById('search-input').value;
        searchRecipes(searchWord); // call the searchRecipes function with the search word
    });
});

// Function to search recipes using the API
function searchRecipes(searchWord) {
    fetch(recipeSearch + "&query=" + searchWord) // make a request to the API with the search word
        .then(response => response.json()) // convert the response to JSON
        .then(data => {
            displayRecipes(data.results); // call the displayRecipes function with the search results
            console.log(data.results);
        })
        .catch(error => console.log(error)); // log any errors to the console
}


function displayRecipes(recipes) {
const resultsContainer = document.getElementById('results-container');
resultsContainer.innerHTML = ""; //clear previous results
for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]; // get the current recipe object

    // Create a new recipe element
    const recipeElem = document.createElement('div');
    recipeElem.classList.add('col-md-4');

    // Create the recipe card HTML using template literals
    recipeElem.innerHTML = `
    <div class="card">
        <img src="${recipe.image}" class="card-img-top" alt="recipe photo">
        <div class="card-body">
        <h4 class="card-title">${recipe.title}</h4>
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#summary-${recipe.id}" aria-expanded="false" aria-controls="summary-${recipe.id}">
        Show Summary
        </button>
        <div class="collapse" id="summary-${recipe.id}">
        <p class="card-text">${recipe.summary}</p>
        </div>
        <a href="${recipe.sourceUrl}" class="btn btn-primary" id="recipe-link-btn" style="background-color: green; border-color: green;">Recipe Page</a>
        </div>
    </div>
    `;

    // Append the recipe element to the container
    resultsContainer.appendChild(recipeElem);
}
}
