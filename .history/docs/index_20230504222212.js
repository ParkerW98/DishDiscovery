document.addEventListener('DOMContentLoaded', () => {

    const randomRecipe = "https://api.spoonacular.com/recipes/random?number=2&addRecipeInformation=true&apiKey=1b895093492742b1a06fd7a7daecb281";

    function loadRandomRecipes() {
        fetch(randomRecipe)
            .then(response => {
                if (!response.ok) {
                    throw new Error("network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.results && data.results.length > 0) {
                    displayRandomRecipes(data.results);
                } else {
                    console.error("Failed to load recipes:", data);
                }
            })
            .catch(error => {
                console.error("failed to load recipes:", error);
            });
                //displayRandomRecipes(data.results);
                //console.log(data.results);
            //})
            //.catch(error => console.log(error));
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
                    <p class="card-text">${recipe.summary}</p>
                    <a href="${recipe.sourceUrl}" class="btn btn-primary" id="recipe-link-btn" style="background-color: green; border-color: green;">Recipe Page</a>
                    </div>
                </div>
                `;

                // Append the recipe element to the container
                randomRecipe.appendChild(recipeElem);
            }
    }

    loadRandomRecipes();
});