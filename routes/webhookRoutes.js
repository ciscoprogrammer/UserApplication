const express = require('express');
const router = express.Router();

// Webhook endpoint
router.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    // Emit to all connected clients
    req.app.locals.io.emit('webhook-event', req.body);
    res.status(200).send('Webhook received');
});

module.exports = router;
