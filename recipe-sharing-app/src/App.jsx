// App.jsx
// This is the main component that sets up our entire application
// It includes routing so we can navigate between different pages

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

function App() {
  return (
    // BrowserRouter enables routing in our app
    <BrowserRouter>
      {/* Routes manages different pages based on the URL */}
      <Routes>
        {/* Home page - shows the form and list of recipes */}
        <Route path="/" element={
          <div>
            <AddRecipeForm />
            <RecipeList />
          </div>
        } />
        
        {/* Recipe Details page - shows one recipe with edit and delete options */}
        {/* The :recipeId part captures the recipe ID from the URL */}
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
