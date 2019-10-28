var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/chargers', (req, res) => { 
    db.query('SELECT * FROM chargers').then(results => {
        res.json(results)
    })
    .catch(() => {
        res.sendStatus(500);
    })    
});

module.exports = router;