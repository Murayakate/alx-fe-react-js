import { create } from 'zustand'

// This is our Zustand store that manages all recipe data and search functionality
// Think of it like a container that holds all our recipes and lets us change them
export const useRecipeStore = create((set, get) => ({
  // recipes: This is where we store all the recipes (starts as empty array)
  recipes: [],
  
  // searchTerm: This stores what the user is searching for
  // Example: if user types "pasta", searchTerm = "pasta"
  searchTerm: '',
  
  // filteredRecipes: This stores the recipes that match the search term
  // This gets updated whenever searchTerm changes or recipes are added/deleted
  filteredRecipes: [],
  
  // addRecipe: This function adds a brand new recipe to our list
  // It takes a newRecipe object and adds it to the existing recipes
  addRecipe: (newRecipe) => set(state => {
    const newRecipes = [...state.recipes, newRecipe];
    return {
      recipes: newRecipes,
      // Automatically update filtered recipes after adding
      filteredRecipes: state.filterRecipesHelper(newRecipes, state.searchTerm)
    };
  }),
  
  // deleteRecipe: This function removes a recipe from our list
  // It takes the recipe id and filters it out, keeping only recipes that don't match
  deleteRecipe: (id) => set(state => {
    const newRecipes = state.recipes.filter(recipe => recipe.id !== id);
    return {
      recipes: newRecipes,
      // Automatically update filtered recipes after deleting
      filteredRecipes: state.filterRecipesHelper(newRecipes, state.searchTerm)
    };
  }),
  
  // updateRecipe: This function updates an existing recipe
  // It finds the recipe with matching id and replaces it with updated data
  updateRecipe: (id, updatedRecipe) => set(state => {
    const newRecipes = state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    return {
      recipes: newRecipes,
      // Automatically update filtered recipes after updating
      filteredRecipes: state.filterRecipesHelper(newRecipes, state.searchTerm)
    };
  }),
  
  // setRecipes: This function lets us set all recipes at once
  // Useful if you fetch recipes from a server
  setRecipes: (recipes) => set(state => ({
    recipes,
    // Automatically update filtered recipes when setting recipes
    filteredRecipes: state.filterRecipesHelper(recipes, state.searchTerm)
  })),

  // setSearchTerm: This function updates the search term when user types in search bar
  // It automatically filters recipes based on the new search term
  setSearchTerm: (term) => set(state => ({
    searchTerm: term,
    // Filter recipes based on the new search term
    filteredRecipes: state.filterRecipesHelper(state.recipes, term)
  })),

  // filterRecipesHelper: This is a helper function that does the actual filtering
  // It searches through recipe titles AND descriptions to find matches
  // This is like looking through a cookbook and finding all recipes that mention the search term
  filterRecipesHelper: (recipes, searchTerm) => {
    // If search term is empty, show all recipes
    if (searchTerm.trim() === '') {
      return recipes;
    }

    // Convert search term to lowercase for case-insensitive matching
    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filter recipes: keep only those where title OR description contains the search term
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerSearchTerm) ||
      recipe.description.toLowerCase().includes(lowerSearchTerm)
    );
  }
}));