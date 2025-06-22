const mongoose = require('mongoose');

const RecipeIngredientSchema = new mongoose.Schema({
  ingredientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: [true, 'Ingredient ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  }
});

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  rhumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rhum',
    required: [true, 'Rhum ID is required']
  },
  ingredients: {
    type: [RecipeIngredientSchema],
    required: [true, 'At least one ingredient is required'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Recipe must have at least one ingredient'
    }
  },
  preparationTimeMinutes: {
    type: Number,
    min: 0
  },
  agingTimeDays: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);