import { create } from 'zustand'

// This is our Zustand store that manages all recipe data
// Think of it like a container that holds all our recipes and lets us change them
export const useRecipeStore = create(set => ({
  // recipes: This is where we store all the recipes (starts as empty array)
  recipes: [],
  
  // addRecipe: This function adds a brand new recipe to our list
  // It takes a newRecipe object and adds it to the existing recipes
  addRecipe: (newRecipe) => set(state => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  
  // deleteRecipe: This function removes a recipe from our list
  // It takes the recipe id and filters it out, keeping only recipes that don't match
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  // updateRecipe: This function updates an existing recipe
  // It finds the recipe with matching id and replaces it with updated data
  updateRecipe: (id, updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  // setRecipes: This function lets us set all recipes at once
  // Useful if you fetch recipes from a server
  setRecipes: (recipes) => set({ recipes })
}));
