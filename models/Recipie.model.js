import { model, Schema } from 'mongoose';

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const recipieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {
      type: String,
      required: true
    },
    cuisine: {
      type: String,
      required: true
    },
    dishType: {
      type: String,
      enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
    },
    image: { 
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Creator"
    }
  },
  {
    timestamps: true
  }
);

// const Recipe = mongoose.model('Recipe', recipeSchema);

// module.exports = Recipe;

const RecipieModel = model("Recipie", recipieSchema);

export default RecipieModel;