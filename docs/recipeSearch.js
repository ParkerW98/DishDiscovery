const recipeSearch = "https://api.spoonacular.com/recipes/complexSearch?number=12&addRecipeInformation=true&apiKey=1b895093492742b1a06fd7a7daecb281";

let counter = 0;

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
    counter++;

    // Create a new recipe element
    const recipeElem = document.createElement('div');
    recipeElem.classList.add('col-md-4');

    // Create the recipe card HTML using template literals
    recipeElem.innerHTML = `
    <div class="card">
        <img src="${recipe.image}" class="card-img-top" alt="recipe photo">
        <div class="card-body">
        <h4 class="card-title">${recipe.title}</h4>
        <div class="accordion" id="accordionSummary${counter}"> <!-- Use a unique id for each accordion -->
        <div class="accordion-item">
        <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSummary${counter}" aria-expanded="false" aria-controls="collapseSummary${counter}">
        Show Recipe Summary
        </button>
        </h2>
        <div id="collapseSummary${counter}" class="accordion-collapse collapse" data-bs-parent="#accordionSummary${counter}"> <!-- Use a unique id for each collapsible element -->
        <div class="accordion-body">
        <p>${recipe.summary}</p>
        </div>
        </div>
        </div>
        <a href="${recipe.sourceUrl}" class="btn btn-primary" id="recipe-link-btn" style="background-color: green; border-color: green; margin-top: 5px;">Recipe Page</a>
        </div>
    </div>
    `;

    // Append the recipe element to the container
    resultsContainer.appendChild(recipeElem);
}
}
