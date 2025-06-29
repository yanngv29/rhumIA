const express = require('express');
const router = express.Router();
const { 
  getAllRhums, 
  getRhumById, 
  createRhum, 
  updateRhum, 
  deleteRhum,
  getRandomRhums
} = require('../controllers/rhumController');
const { protect, authorize } = require('../middleware/auth');

// Add the random rhums endpoint - make it public by removing the protect middleware
router.get('/random', getRandomRhums);

router.route('/')
  .get(protect, getAllRhums)
  .post(protect, createRhum);

router.route('/:rhumId')
  .get(protect, getRhumById)
  .put(protect, updateRhum)
  .delete(protect, deleteRhum);

module.exports = router;