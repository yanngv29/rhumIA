const Rhum = require('../models/Rhum');
const logger = require('../utils/logger'); // Import logger

// Get all rhums with pagination
exports.getAllRhums = async (req, res) => {
  try {
    logger.info('Fetching all rhums from the database');
    // Pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Query with pagination
    const rhums = await Rhum.find()
      .skip(skip)
      .limit(limit);

    logger.info('getting all rhums with pagination : OK');
    // Get total count for pagination metadata
    const total = await Rhum.countDocuments();
    
    logger.info(`Retrieved ${rhums.length} rhums from the database (page ${page}, limit ${limit})`);
    logger.debug(`Rhums data: ${JSON.stringify(rhums)}`);
    
    res.status(200).json({
      success: true,
      count: rhums.length,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: rhums
    });
  } catch (error) {
    logger.error(`Error in getAllRhums: ${error.message}`);
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
    logger.error(`Error in getRhumById: ${error.message}`);
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
    logger.error(`Error in createRhum: ${error.message}`);
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
    logger.error(`Error in updateRhum: ${error.message}`);
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
    logger.error(`Error in deleteRhum: ${error.message}`);    
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Get random rhums
exports.getRandomRhums = async (req, res) => {
  try {
    // Get the count parameter from query or default to 3
    const count = parseInt(req.query.count, 10) || 3;
    
    // Limit the maximum number of random rhums to 10 for performance reasons
    const safeCount = Math.min(count, 10);
    
    // Get random rhums using MongoDB aggregation
    const randomRhums = await Rhum.aggregate([
      { $sample: { size: safeCount } }
    ]);
    
    logger.info(`Retrieved ${randomRhums.length} random rhums from the database`);
    
    res.status(200).json({
      success: true,
      count: randomRhums.length,
      data: randomRhums
    });
  } catch (error) {
    logger.error(`Error in getRandomRhums: ${error.message}`);
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};