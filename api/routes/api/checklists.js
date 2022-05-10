const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const ObjectId = require('mongodb').ObjectId;

const Card = require('../../models/Card');

// Add a checklist
router.post('/:cardId', [auth, member], async (req, res) => {
  try {
      const { title } = req.body;
      const cardId = req.params.cardId;

      if(!title) throw {message: 'Title is required', status: 400}
      if(!ObjectId.isValid(cardId)) throw {message: 'Invalid card Id', status: 400}

      const card = await Card.findById(cardId);
      if (!card) throw {message: 'Card not found', status: 404}

      card.checklists.push({ title, items: [] });
      await card.save();
      res.json(card.checklists.slice(-1)[0].id);

    } catch (err) {
      console.log(err)
      res.status(err.status||500).send(err.message);
    }
  }
);

// Edit a checklist
router.patch('/:cardId/:checklistId', [auth, member], async (req, res) => {
  try {
      const { title } = req.body;
      const { cardId, checklistId } = req.params;

      if(!title) throw {message: 'Title is required', status: 400}
      if(!cardId || !checklistId) throw {message: 'Missing card or checklist Id fields', status: 400}
      if(!ObjectId.isValid(cardId) || !ObjectId.isValid(checklistId)) throw {message:'Invalid card or checklist Id', status: 400}

      const card = await Card.findById(cardId);
      if (!card) throw {message: 'Card not found', status: 404}

      const checklist = card.checklists.find(e => e.id === checklistId).title=title;
      if (!checklist) throw {message:'Checklist not found', status: 404};

      res.json(checklist);
      await card.save();

    } catch (err) {
      console.log(err)
      res.status(err.status||500).send(err.message);
    }
  }
);

// Delete a checklist
router.delete('/:cardId/:checklistId', [auth, member], async (req, res) => {
  try {
    const { cardId, checklistId } = req.params;
    
    if(!cardId || !checklistId) throw {message: 'Missing card or checklist Id fields', status: 400}
    if(!ObjectId.isValid(cardId) || !ObjectId.isValid(checklistId)) throw {message:'Invalid card or checklist Id', status: 400}

    const card = await Card.findById(cardId);
    if (!card) throw {message:'Card not found', status: 404};

    const index = card.checklists.findIndex(checklist => checklist.id === checklistId);
    if(index === -1) throw {message:'Checklist not found', status: 404};

    const checklist = card.checklists[index];

    card.checklists.splice(index, 1);

    await card.save();
    res.send(`Removed checklist '${checklist.title}'`);

  } catch (err) {
    console.log(err)
    res.status(err.status||500).send(err.message);
  }
});

// Add an item to a checklist
router.post('/item/:cardId/:checklistId', [auth, member], async (req, res) => {
  try {
    const { cardId, checklistId } = req.params;
    const { text } = req.body;
    
    if(!cardId || !checklistId) throw {message: 'Missing card or checklist Id fields', status: 400}
    if(!text) throw {message: 'Checklist item text is required', status: 400}

    const card = await Card.findById(cardId);
    if (!card) throw {message: 'Card not found', status: 404}

    const checklist = card.checklists.find(checklist => checklist.id === checklistId)
    if (!checklist) throw {message: 'Checklist not found', status: 404}
    checklist.items.push({ text, checked: false });

    res.json(checklist.items.slice(-1)[0]);
    await card.save();

  } catch (err) {
    console.log(err)
    res.status(err.status||500).send(err.message);
  }
});

// Edit a checklist's item
router.patch('/item/:cardId/:checklistId/:itemId', [auth, member], async (req, res) => {
  try {
    const { cardId, checklistId, itemId } = req.params;
    const { text, completed } = req.body;

    if(!cardId || !checklistId || !itemId) throw {message: 'Missing Id fields', status: 400}
    //if(!text) throw {message: 'Checklist item text is required', status: 400}
    if(!ObjectId.isValid(cardId) || !ObjectId.isValid(checklistId) || !ObjectId.isValid(itemId)) throw {message:'Invalid Ids were sent', status: 400}

    const card = await Card.findById(cardId).select('checklists');
    if (!card) throw { message: 'Card not found', status: 404 }

    const checklist = card.checklists.find(checklist => checklist.id === checklistId)
    if (!checklist) throw {message: 'Checklist not found', status: 404}

    const index = checklist.items.findIndex(item => item.id === itemId);
    if (index === -1) throw {message: 'Checklist item not found', status: 404}

    checklist.items[index] = {...checklist.items[index].toJSON(), text:text??checklist.items[index].text, completed:completed??checklist.items[index].completed};
    res.json(checklist.items[index]);
    await card.save()

  } catch (err) {
    res.status(err.status||500).send(err.message);
  }
}
);

// Delete an item from a checklist
router.delete('/item/:cardId/:checklistId/:itemId', [auth, member], async (req, res) => {
  try {
    const { cardId, checklistId, itemId } = req.params;
    
    if(!cardId || !checklistId) throw {message: 'Missing card or checklist Id fields', status: 400}

    const card = await Card.findById(cardId);
    if (!card) throw {message: 'Card not found', status: 404}

    const checklist = card.checklists.find(checklist => checklist.id === checklistId)
    if (!checklist) throw {message: 'Checklist not found', status: 404}

    const index = checklist.items.findIndex(item => item.id === itemId);
    if (index === -1) throw {message: 'Checklist item not found', status: 404}
    
    checklist.items.splice(index, 1);

    res.send(`Deleted item n°${index+1} from checklist '${checklist.title}'`);
    await card.save();

  } catch (err) {
    console.log(err)
    res.status(err.status||500).send(err.message);
  }
});

module.exports = router;
