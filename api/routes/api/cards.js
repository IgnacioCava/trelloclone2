const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Board = require('../../models/Board');
const List = require('../../models/List');
const Card = require('../../models/Card');

// Add a card
router.post('/', [auth, member, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { title, listId } = req.body;
      const boardId = req.header('boardId');

      // Create and save the card
      const newCard = new Card({ title });
      const card = await newCard.save();
      res.json({ card, listId });

      // Assign the card to the list
      const list = await List.findById(listId);
      list.cards.push(card.id);
      await list.save();
      

      // Log activity
      const user = await User.findById(req.user.id);
      const board = await Board.findById(boardId);
      board.activity.unshift({
        text: `${user.name} added '${title}' to '${list.title}'`,
      });
      await board.save();

    } catch (err) {
      
      res.status(500).send(err.message);
    }
  }
);

// Get all of a list's cards
router.get('/listCards/:listId', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.listId).populate('cards');
    if (!list) return res.status(404).json({ msg: 'List not found' });
    res.json(list.cards);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a card by id
router.get('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ msg: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit a card's title, description, and/or label
router.patch('/edit/:id', [auth, member], async (req, res) => {
  try {
    const { title, description, label } = req.body;
    if (title === '') throw new Error({ message: 'Title is required', status: 400 });

    const card = await Card.findById(req.params.id);
    if (!card) throw new Error({ message: 'Card not found', status: 404 });

    card.title = title ? title : card.title;

    if (description || description === '') card.description = description;
    if (label || label === 'none') card.label = label;

    await card.save();

    res.json(card);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Archive/Unarchive a card
router.patch('/archive/:archive/:id', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).select('archived title');
    if (!card) return res.status(404).json({ msg: 'Card not found' });

    card.archived = req.params.archive === 'true';
    res.json(card);
    await card.save();
    

    // Log activity
    const user = await User.findById(req.user.id);
    const board = await Board.findById(req.header('boardId')).select('activity');
    board.activity.unshift({
      text: card.archived
      ? `${user.name} archived card '${card.title}'`
      : `${user.name} sent card '${card.title}' to the board`,
    });
    await board.save();

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Move a card
router.patch('/move/:id', [auth, member], async (req, res) => {
  try {
    const { fromId, toId, toIndex } = req.body;
    const boardId = req.header('boardId');

    const cardId = req.params.id;
    const from = await List.findById(fromId).select('cards');
    let to
    if (fromId === toId) to = from;
    else to = await List.findById(toId).select('cards');
    
    if (!cardId || !from || !to) return res.status(404).json({ msg: `${!from?"Sender list":!to?"Receiver list":"Elements"} not found` });

    const fromIndex = from.cards.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cards.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cards.includes(cardId)) {
      if (toIndex === 0 || toIndex) to.cards.splice(toIndex, 0, cardId);
      else to.cards.push(cardId);
      await to.save();
    }

    res.send({ cardId, from, to });

    // Log activity
    if (fromId !== toId) {
      const user = await User.findById(req.user.id);
      const board = await Board.findById(boardId);
      const card = await Card.findById(cardId);
      board.activity.unshift({ text: `${user.name} moved '${card.title}' from '${from.title}' to '${to.title}'`});
      await board.save();
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add/Remove a member
router.put('/addMember/:add/:cardId/:userId', [auth, member], async (req, res) => {
  try {
    const { cardId, userId } = req.params;
    const card = await Card.findById(cardId).select('members title');
    const user = await User.findById(userId);
    if (!card || !user) return res.status(404).json({ msg: 'Card/user not found' });

    const add = req.params.add === 'true';
    const members = card.members.map((member) => member.user);
    const index = members.indexOf(userId);
    if ((add && index !== -1) || (!add && index)) return res.json(card)

    if (add) card.members.push({ user: user.id, name: user.name });
    else card.members.splice(index, 1);

    await card.save();
    res.json(card);
    
    // Log activity
    const board = await Board.findById(req.header('boardId'));
    board.activity.unshift({ text: `${user.name} ${add ? 'joined' : 'left'} '${card.title}'`});
    await board.save();

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a card
router.delete('/:listId/:id', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).select('title');
    const list = await List.findById(req.params.listId).select('cards title');
    if (!card || !list) return res.status(404).json({ msg: 'List/card not found' });

    list.cards.splice(list.cards.indexOf(req.params.id), 1);
    await list.save();
    await card.remove();
    res.send("Removed card "+req.params.id);

    // Log activity
    const user = await User.findById(req.user.id);
    const board = await Board.findById(req.header('boardId'));
    board.activity.unshift({ text: `${user.name} deleted '${card.title}' from '${list.title}'` });
    await board.save();

  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
