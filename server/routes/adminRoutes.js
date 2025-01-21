const express = require('express');
const authController = require('../controllers/authController');
const chatBotController = require('../controllers/chatBotController')
const visitorController = require('../controllers/visitorController')
const router = express.Router();

// router.use(authController.restrictTo('Admin'));
router.get('/getAllTickets', chatBotController.getAllTickets)
router.get('/getTicket/:id', chatBotController.getTicketById)
router.post('/updateTicket/:id', chatBotController.updateTicket)
router.get('/getTicketsStat', chatBotController.getTicketStats)

module.exports = router;
