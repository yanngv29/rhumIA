const Ingredient = require('../models/Ingredient');

// Get all ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Get a single ingredient by ID
exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.ingredientId);
    if (!ingredient) {
      return res.status(404).json({ message: `Resource with ID ${req.params.ingredientId} not found` });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Create a new ingredient
exports.createIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Invalid input provided', errors: messages });
    }
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Update an ingredient
exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.ingredientId, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!ingredient) {
      return res.status(404).json({ message: `Resource with ID ${req.params.ingredientId} not found` });
    }
    
    res.status(200).json(ingredient);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Invalid input provided', errors: messages });
    }
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Delete an ingredient
exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.ingredientId);
    
    if (!ingredient) {
      return res.status(404).json({ message: `Resource with ID ${req.params.ingredientId} not found` });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};