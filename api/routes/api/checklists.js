const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const Card = require('../../models/Card');

// Add a checklist item
router.post(
  '/:cardId',
  [auth, member, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) return res.status(404).json({ msg: 'Card not found' });

      card.checklist.push({ text: req.body.text, complete: false });
      res.json(card);
      await card.save();

    } catch (err) {
      
      res.status(500).send(err.message);
    }
  }
);

// Edit a checklist's item's text
router.patch(
  '/:cardId/:itemId',
  [auth, member, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const card = await Card.findById(req.params.cardId).select('checklist');
      if (!card) throw new Error({ message: 'Card not found', status: 404 });
      
      res.json("Checklist item updated");
      card.checklist.find((item) => item.id === req.params.itemId).text = req.body.text;
      await card.save();

    } catch (err) {
      res.status(err.status).send(err.message);
    }
  }
);

// Complete/Uncomplete a checklist item
router.patch('/:cardId/:complete/:itemId', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).select('checklist');
    if (!card) return res.status(404).json({ msg: 'Card not found' });

    res.send(`Item ${req.params.complete?"checked":"unchecked"}`);
    card.checklist.find((item) => item.id === req.params.itemId).complete = (req.params.complete === 'true')
    await card.save();

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a checklist item
router.delete('/:cardId/:itemId', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).select('checklist');
    if (!card)  return res.status(404).json({ msg: 'Card not found' });

    const index = card.checklist.findIndex((item) => item.id === req.params.itemId);
    if(index !== -1) {
      res.send("Item deleted");
      card.checklist.splice(index, 1);
      await card.save();
    }
    else return res.status(404).json({ msg: 'Item not found' });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
