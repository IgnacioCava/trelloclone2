const { Schema, model } = require('mongoose');

const ListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'cards',
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
  position: {
    type: Number,
    required: true,
  }
});

module.exports = List = model('lists', ListSchema);
