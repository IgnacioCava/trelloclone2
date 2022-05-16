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
  checklists: [
    {
      title : {
        type: String,
        required: true,
      },
      items: [
        {
          text: {
            type: String,
            required: true,
          },
          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    }
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Card = model('cards', CardSchema);
