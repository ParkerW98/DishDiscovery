let recipeName = document.getElementById("recipe-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");


let getRecipe = () =>{
    let recipeName = query.value;
    url = 'https://api.spoonacular.com/recipes/query&apikey=${key}';
}