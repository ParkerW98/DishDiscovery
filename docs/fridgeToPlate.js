let counter = 0;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("search-btn").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        var numOfIngredients = document.getElementById("num-of-ing").value;
        generateIngredientInputs(numOfIngredients);
    });
});

function generateIngredientInputs(numOfIngredients) {
    var searchForm = document.getElementById("search-form-ing");
    searchForm.innerHTML = ""; // Clear existing inputs

    for (var i = 0; i < numOfIngredients; i++) {
        var inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-control");
        input.placeholder = "Ingredient " + (i + 1);

        var inputGroupAppend = document.createElement("div");
        inputGroupAppend.classList.add("input-group-append");

        var removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function() {
            this.parentNode.parentNode.remove(); // Remove the parent input group
        });

        inputGroupAppend.appendChild(removeButton);
        inputGroup.appendChild(input);
        inputGroup.appendChild(inputGroupAppend);
        searchForm.appendChild(inputGroup);

    }

    var submitButton = document.createElement("button");
    submitButton.classList.add("btn", "btn-primary");
    submitButton.type = "button";
    submitButton.textContent = "Discover";
    submitButton.style = "background-color: green; border-color: green; margin-top: 5px;";
    submitButton.addEventListener("click", function() {
        var ingredientInputs = document.querySelectorAll("#search-form-ing input");
        var ingredients = Array.from(ingredientInputs).map(function(input) {
        return input.value;
        });

        SearchIngredients(ingredients);
    });

    if (numOfIngredients > 0) {
        submitButton.style.display = "block";
    } else {
        submitButton.style.display = "none";
    }

    searchForm.appendChild(submitButton);
}

    document.addEventListener('DOMContentLoaded', function() {
    generateIngredientInputs(0); // Initialize with 0 ingredients

    document.getElementById("search-btn").addEventListener("click", function(event) {
      event.preventDefault(); // Prevent form submission
        var numOfIngredients = document.getElementById("num-of-ing").value;
        generateIngredientInputs(numOfIngredients);
    });
});

function SearchIngredients(ingredients) {
    var apiURL = "https://api.spoonacular.com/recipes/findByIngredients?";
    var params = {
        ingredients: ingredients.join(","),
        number: 10,
        apiKey: "1b895093492742b1a06fd7a7daecb281"
    };

    var queryString = Object.keys(params)
    .map(key => key + "=" + encodeURIComponent(params[key]))
    .join("&");

    fetch(apiURL + queryString) // make a request to the API with the search word
        .then(response => response.json()) // convert the response to JSON
        .then(data => {
            displayRecipes(data); // call the displayRecipes function with the search results
            console.log(data);
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