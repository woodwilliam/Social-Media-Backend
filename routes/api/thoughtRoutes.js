const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    plusReacto,
    sansReacto} = require('../../controllers/thoughtControllers');
// /api/thoughts
router.route('/').get(getThoughts, createThought);

router.route('/:thoughtId/reaction')
.put(plusReacto).delete(sansReacto)

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;