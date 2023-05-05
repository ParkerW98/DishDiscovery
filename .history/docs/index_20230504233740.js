document.addEventListener('DOMContentLoaded', () => {

    const randomRecipe = "https://api.spoonacular.com/recipes/random?number=1&addRecipeInformation=true&apiKey=1b895093492742b1a06fd7a7daecb281";

    function loadRandomRecipes() {
        fetch(randomRecipe)
            .then(response => response.json())
            .then(data => {
                displayRandomRecipes(data.recipes);
                console.log(data.recipes);
            })
    }

    function displayRandomRecipes(recipes) {

            const randomRecipe = document.getElementById('random-recipe');
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
                    <div class="accordion" id="accordionSummary">
                    <div class="accordion-item">
                    <h2 class="accordion-header" style="background-color: green;">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSummary" aria-expanded="true" aria-controls="collapseSummary">
                    Show Recipe Summary
                    </button>
                    </h2>
                    <div id="collapseSummary" class="accordion-collapse collapse show" data-bs-parent="#accordionSummary">
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
                randomRecipe.appendChild(recipeElem);
            }
    }

    loadRandomRecipes();
});