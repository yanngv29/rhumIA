const Recipe = require('../models/Recipe');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('rhumId')
      .populate('ingredients.ingredientId');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate('rhumId')
      .populate('ingredients.ingredientId');
    
    if (!recipe) {
      return res.status(404).json({ message: `Resource with ID ${req.params.recipeId} not found` });
    }
    
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    const populatedRecipe = await Recipe.findById(recipe._id)
      .populate('rhumId')
      .populate('ingredients.ingredientId');
    
    res.status(201).json(populatedRecipe);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Invalid input provided', errors: messages });
    }
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
      new: true,
      runValidators: true
    })
    .populate('rhumId')
    .populate('ingredients.ingredientId');
    
    if (!recipe) {
      return res.status(404).json({ message: `Resource with ID ${req.params.recipeId} not found` });
    }
    
    res.status(200).json(recipe);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Invalid input provided', errors: messages });
    }
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    
    if (!recipe) {
      return res.status(404).json({ message: `Resource with ID ${req.params.recipeId} not found` });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};