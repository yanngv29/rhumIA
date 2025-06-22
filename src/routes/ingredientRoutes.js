const express = require('express');
const router = express.Router();
const { 
  getAllIngredients, 
  getIngredientById, 
  createIngredient, 
  updateIngredient, 
  deleteIngredient 
} = require('../controllers/ingredientController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getAllIngredients)
  .post(protect, createIngredient);

router.route('/:ingredientId')
  .get(protect, getIngredientById)
  .put(protect, updateIngredient)
  .delete(protect, authorize('admin'), deleteIngredient);

module.exports = router;