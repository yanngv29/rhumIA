const express = require('express');
const router = express.Router();
const { 
  getAllRhums, 
  getRhumById, 
  createRhum, 
  updateRhum, 
  deleteRhum 
} = require('../controllers/rhumController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getAllRhums)
  .post(protect, createRhum);

router.route('/:rhumId')
  .get(protect, getRhumById)
  .put(protect, updateRhum)
  .delete(protect, authorize('admin'), deleteRhum);

module.exports = router;