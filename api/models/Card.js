const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label:{
    color: {
      type: String,
    },
    text: {
      type: String,
    }
  }
  ,
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  checklist: [
    {
      text: {
        type: String,
      },
      complete: {
        type: Boolean,
      },
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Card = model('cards', CardSchema);
