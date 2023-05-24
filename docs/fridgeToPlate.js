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
        number: 6,
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
    resultsContainer.innerHTML = ""; // Clear previous results

    const promises = recipes.map(recipe => {
        return fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=1b895093492742b1a06fd7a7daecb281`)
        .then(response => response.json())
        .then(data => {
            const recipeElem = createRecipeElement(data);
            resultsContainer.appendChild(recipeElem);
        })
        .catch(error => console.log(error));
    });

    Promise.all(promises)
        .then(() => {
        console.log("All recipes displayed");
        });
}

function createRecipeElement(recipe) {
    const recipeElem = document.createElement('div');
    recipeElem.classList.add('col-md-4');

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('card');

    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = recipe.image;
    image.alt = 'Recipe Photo';
    recipeCard.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h4');
    title.classList.add('card-title');
    title.textContent = recipe.title;
    cardBody.appendChild(title);

    const accordion = document.createElement('div');
    accordion.classList.add('accordion');

    const accordionItem = document.createElement('div');
    const itemId = `accordionItem${counter}`; // Unique ID for accordion item
    accordionItem.classList.add('accordion-item');
    accordionItem.innerHTML = `
        <h2 class="accordion-header" id="accordionHeader${counter}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${itemId}" aria-expanded="false" aria-controls="${itemId}">
        Show Recipe Summary
        </button>
        </h2>
        <div id="${itemId}" class="accordion-collapse collapse" aria-labelledby="accordionHeader${counter}" data-bs-parent="#accordionSummary${counter}">
        <div class="accordion-body">
        <p>${recipe.summary}</p>
        </div>
        </div>
    `;

    accordion.appendChild(accordionItem);
    cardBody.appendChild(accordion);

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('btn', 'btn-primary');
    recipeLink.href = recipe.sourceUrl;
    recipeLink.textContent = 'Recipe Page';
    recipeLink.style = 'background-color: green; border-color: green; margin-top: 5px;';
    cardBody.appendChild(recipeLink);

    recipeCard.appendChild(cardBody);
    recipeElem.appendChild(recipeCard);

    // Increment the counter for unique IDs
    counter++;

    return recipeElem;
}
