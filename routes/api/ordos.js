const express = require('express');
const router = express.Router();
const {
    createOrdos,
    readOrdos,
    deleteOrdos
} = require('../../data/dal')

router.get('/', async function(req, res) {
    const data = await readOrdos();
        res.send(data);
});

router.post('/', async function(req, res) {
    const body = req.body;
    const data = await createOrdos(body);
        res.send(data);
});

router.delete('/:id', async function(req, res) {
    const data = await deleteOrdos(req.params.id); 
        res.send(data)
    });

module.exports = router;