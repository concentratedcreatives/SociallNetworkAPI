const router = require('express').Router();
const apiRoutes = require('./API');

router.use('/api', apiRoutes);

// Fallback route for handling invalid routes
router.use((req, res) => res.status(404).send('Not Found'));

module.exports = router;
