const randomRecipe = "https://api.spoonacular.com/recipes/random?number=12&apiKey=1b895093492742b1a06fd7a7daecb281";

fetch (randomRecipe)
    .then(response => response.json())
    .then(data => {
        const randomRecipe = document.querySelector("#random-recipe");
        data.recipe.forEach(recipe => {
            const randomRecipeCards = document.createElement("div");
            randomRecipeCards.classList.add("random-recipe-cards");
            randomRecipeCards.classList.add("col-md-4");
            randomRecipeCards.innerHTML = `
            <div class="card">
            <img src="${recipe.image}" class="card-img-top" alt="recipe photo">
            <div class="card-body">
            <h4 class="card-title">${recipe.title}</h4>
            <p class="card-text">${recipe.summary}</p>
            <a href="${recipe.sourceUrl}" class="btn btn-primary" id="recipe-link-btn" style="background-color: green; border-color: green;">Recipe Page</a>
            </div>
            `;

            randomRecipe.appendChild(randomRecipeCards);
        })
    })
    .catch(error => console.log(error));