const mongoose = require('mongoose');

const RhumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['blanc', 'ambré', 'vieux', 'agricole', 'arrangé', 'spiced']
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true
  },
  abv: {
    type: Number,
    required: [true, 'ABV is required'],
    min: 0,
    max: 100
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true,
    default: null
  },
  // New fields
  age: {
    type: Number,
    min: 0,
    default: null
  },
  alcoholPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: function() {
      return this.abv; // Default to abv if not specified
    }
  },
  price: {
    type: Number,
    min: 0,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rhum', RhumSchema);