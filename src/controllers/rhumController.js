const Rhum = require('../models/Rhum');

// Get all rhums
exports.getAllRhums = async (req, res) => {
  try {
    const rhums = await Rhum.find();
    res.status(200).json(rhums);
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Get a single rhum by ID
exports.getRhumById = async (req, res) => {
  try {
    const rhum = await Rhum.findById(req.params.rhumId);
    if (!rhum) {
      return res.status(404).json({ message: `Resource with ID ${req.params.rhumId} not found` });
    }
    res.status(200).json(rhum);
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Create a new rhum
exports.createRhum = async (req, res) => {
  try {
    const rhum = await Rhum.create(req.body);
    res.status(201).json(rhum);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Invalid input provided', errors: messages });
    }
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Update a rhum
exports.updateRhum = async (req, res) => {
  try {
    const rhum = await Rhum.findByIdAndUpdate(req.params.rhumId, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!rhum) {
      return res.status(404).json({ message: `Resource with ID ${req.params.rhumId} not found` });
    }
    
    res.status(200).json(rhum);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Invalid input provided', errors: messages });
    }
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Delete a rhum
exports.deleteRhum = async (req, res) => {
  try {
    const rhum = await Rhum.findByIdAndDelete(req.params.rhumId);
    
    if (!rhum) {
      return res.status(404).json({ message: `Resource with ID ${req.params.rhumId} not found` });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};