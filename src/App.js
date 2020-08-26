import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'f5d72cca';
  const APP_KEY = '3f914c7e2e22d35eeb63fd9b85c87b72';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( ()=>{
    getRecipes();
  }, [query]);

const getRecipes = async () => {
  //requesting data for a recipe from an external api
  // we are taking the data from an external api - we don't know when it will arrive so we have to use await
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
 //turning that into a json
  const data = await response.json();
  //logging the data
  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
  console.log(search);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch = '';
}

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe=>(
          <Recipe key={recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))};
      </div>
    </div>
  )
}

export default App;
