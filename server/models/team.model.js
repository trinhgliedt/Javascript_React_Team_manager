const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "{PATH} is required."],
      minlength: [2, "{PATH} must be at least {MINLENGTH} characters."],
    },

    preferredPosition: {
        type: String,
      },

    game1: {
        type: String,
        required: [true, "{PATH} is required."],
        enum : ['Playing','Not Playing','Undecided'], 
        default: 'Undecided',
        minlength: [7, "{PATH} must be at least {MINLENGTH} characters."],
      },

      game2: {
        type: String,
        required: [true, "{PATH} is required."],
        enum : ['Playing','Not Playing','Undecided'], 
        default: 'Undecided',
        minlength: [7, "{PATH} must be at least {MINLENGTH} characters."],
      },

      game3: {
        type: String,
        required: [true, "{PATH} is required."],
        enum : ['Playing','Not Playing','Undecided'], 
        default: 'Undecided',
        minlength: [7, "{PATH} must be at least {MINLENGTH} characters."],
      },
  },
  { timestamps: true }
);

// register our model and enforce the schema
const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
