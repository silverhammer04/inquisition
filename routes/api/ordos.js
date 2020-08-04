const express = require('express');
const router = express.Router();
const {
    readOrdos
} = require('../../data/dal')

router.get('/', async function(req, res) {
    const data = await readOrdos();
        res.send(data);
});

module.exports = router;