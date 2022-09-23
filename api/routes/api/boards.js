const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;

const User = require('../../models/User');
const Board = require('../../models/Board');

// Add a board
router.post('/', [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { title, backgroundURL } = req.body;

      // Create and save the board
      const newBoard = new Board({ title, backgroundURL: backgroundURL || 'https://wallpaperaccess.com/full/2866863.jpg' });
      const board = await newBoard.save();

      // Add board to user's boards
      const user = await User.findById(req.user.id);
      user.boards.unshift(board._id);
      await user.save();

      // Add user to board's members as admin
      board.members.push({ user: user._id, username: user.username });

      // Log activity
      board.activity.unshift({ text: `${user.username} created this board` });
      await board.save();

      res.json({title: board.title, _id: board._id});
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// Get user's boards
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('boards', { _id: 1, title: 1 }).select('boards');
    if(!user) throw {message: 'User not found', status: 404}
    res.json(user.boards);
  } catch (err) {
    res.status(err.status||500).send(err.message);
  }
});

//Get a full board object by id
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate({
      path: 'lists',
      populate: {
        path: 'cards',
      }
    }).select("-activity");
    if (!board) return res.status(404).json({ msg: 'Board not found' });
    res.json(board)
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a board's activity
router.get('/activity', auth, async (req, res) => {
  try {
    if(!req.header('boardId')) res.status(404).json({ msg: 'No ID was provived' });
    const board = await Board.findById(req.header('boardId').toString())?.select('activity');
    if (!board) return res.status(404).json({ msg: 'Board not found' });

    res.json(board.activity);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Move a board's lists
router.patch('/sort', [auth, member], async (req, res) => {
  const boardId = req.header('boardId');
  const { newListSort } = req.body;

  try {
    const board = await Board.findById(boardId).select('lists activity');
    if (!board) throw { message: 'Board not found', status: 404 };

    board.lists=newListSort;

    await board.save();
    res.json('Lists moved');

  } catch (err) {
    res.status(500).send(err.message);
  }
})

// Change a board's title
router.patch('/rename/:id', [auth, member],
  async (req, res) => {
    
    try {
      const { title } = req.body;
      if(!title) throw {message: 'Title is required', status: 400}
      const board = await Board.findById(req.params.id).select('title activity');
      if (!board) throw {message: 'Board not found', status: 404}
      
      // Log activity
      if (title !== board.title) {
        const user = await User.findById(req.user.id);
        if(!user) throw {message: 'User not found', status: 404}
        board.activity.unshift({
          text: `${user.username} renamed this board (from '${board.title}')`,
        });
      }
      
      board.title = title;
      res.send("Board successfully renamed to "+title);
      await board.save();
      
    } catch (err) {
      res.status(err.status||500).send(err.message);
    }
  }
);

// Change a board's background
router.patch('/background/:id', [auth, member],
  async (req, res) => {
    
    try {
      const { backgroundURL } = req.body;
      if(!backgroundURL) throw {message: 'Background url is required', status: 400}
      const board = await Board.findById(req.params.id).select('backgroundURL activity');
      if (!board) throw {message: 'Board not found', status: 404}
      
      // Log activity
      if (backgroundURL !== board.backgroundURL) {
        const user = await User.findById(req.user.id);
        if(!user) throw {message: 'User not found', status: 404}
        board.activity.unshift({
          text: `${user.username} changed this board's background`,
        });
      }
      
      board.backgroundURL = backgroundURL;
      res.send("Board's background successfully changed");
      await board.save();
      
    } catch (err) {
      res.status(err.status||500).send(err.message);
    }
  }
);

// Add or remove a board member
router.put('/members/:action/:userId', [auth, member], async (req, res) => {
  try {
    const { action, userId } = req.params;

    if(!ObjectId.isValid(req.header('boardId'))) throw {message: 'Invalid board Id', status: 400}
    if(!ObjectId.isValid(userId)) throw {message: 'Invalid user Id', status: 400}

    if(!action || !userId) throw {message: 'User Id and action are required', status: 400}
    if(action !== 'add' && action !== 'remove') throw {message: 'Action must be add or remove', status: 400}
  
    const board = await Board.findById(req.header('boardId')).select('members activity');
    if (!board) throw {message: 'Board not found', status: 404}

    const user = await User.findById(userId);
    if (!user) throw {message: 'User not found', status: 404}

    const member = board.members.find(member => member.user.toString() === userId)

    if((action==='add' && member) || (action==='remove' && !member)){
      throw {message: `User is ${member? 'already' : 'not'} a member of board`, status: 400}
    }

    // Add or remove user from board's members
    if (action === 'add') {
      board.members.push({ user: user._id, username: user.username, role: 'normal' });
      user.boards.unshift(board.id);
    } else {
      board.members = board.members.filter(member => member.user.toString() !== userId);
      user.boards = user.boards.filter(board => board !== board.id);
    }

    // Log activity
    board.activity.unshift({ text: `${user.username} ${action==='add'? 'joined' : 'left'} this board`,});
    await user.save();
    await board.save();

    res.json(board.members);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

module.exports = router;
