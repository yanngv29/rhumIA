const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['Fruit', 'Sweetener', 'Spice', 'Herb', 'Spirit', 'Liqueur', 'Mixer', 'Garnish']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ingredient', IngredientSchema);