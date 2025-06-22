const express = require('express');
const router = express.Router();
const { 
  getAllRecipes, 
  getRecipeById, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe 
} = require('../controllers/recipeController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getAllRecipes)
  .post(protect, createRecipe);

router.route('/:recipeId')
  .get(protect, getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, authorize('admin'), deleteRecipe);

module.exports = router;