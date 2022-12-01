import { model, Schema } from 'mongoose';



const CreatorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true, //significa que esse campo não pode ser repetido no db
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, //regex
      lowercase:true,
      required: true
    },
    recipies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipie"
        }
    ]
    },
    {
        timestamps: true
    }
);

// const Recipe = mongoose.model('Recipe', recipeSchema);

// module.exports = Recipe;

const CreatorModel = model("Creator", CreatorSchema);

export default CreatorModel;