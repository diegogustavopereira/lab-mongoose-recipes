import express, { request, response } from 'express';
import RecipieModel from '../models/Recipie.model.js';
import CreatorModel from '../models/Creator.model.js';

const router = express.Router();



//GET
router.get('/', async (request, response) => {
    try {
        const recipies = await RecipieModel.find();

        return response.status(200).json(recipies);

    } catch {
        console.log(error);
        return response.status(500).json({ msg: "Algo está errado."});

    }
});

//GET BY ID
router.get('/:id', async (request, response) => {

    try {

        const { id } = request.params;

    const recipie = await RecipieModel.findById(id);

    if(!recipie) {
        return response.status(404).json("A receita não foi encontrada");
    }

    return response.status(200).json(recipe);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Algo está errado."});
    }
    
});

//POST
router.post('/create/:creatorId', async (request, response) => {
    try {

        const { creatorId } = request.params;

        const create = await RecipieModel.create(
            {
            ...request.body,
            creator: creatorId
            }
        );
        
       await CreatorModel.findByIdAndUpdate (
        creatorId,
        { $push: { recipies: create._id } }

       );
    
        return response.status(201).json(create);

    } catch (error) {
        console.log(error);

        return response.status(500).json({ msg: "Algo está errado."});
    }
});

//PUT
router.put('/edit/:id', async (request, response) => {

    try {
        const { id } = request.params;
                                      
        const update = await RecipieModel.findByIdAndUpdate(

            id, 
            { ...request.body },
            
            { new: true, runValidators: true }

        );

        return response.status(200).json(update);

    } catch {

        console.log(error);

        return response.status(500).json({ msg: "Algo está errado."});

    }
    
});

//DELETE
router.delete('/delete/:id', async (request, response) => {

    try {
        const { id } = request.params

        const deleteRecipie = await RecipieModel.findByIdAndDelete(id);

        await CreatorModel.findByIdAndUpdate(
            deleteRecipie.creator,
            { $pull: { recipies: deleteRecipie._id } }
        )
    
        return response.status(200).json(deleteRecipie)

    } catch {
        console.log(error);
        return response.status(500).json({ msg: "Algo está errado."});
    }
});



//DELETE MANY
router.delete('/deleteall', async (request, response) => {
    try {
        const deleteAllRecipies = await RecipieModel.deleteMany();
        return response.status(200).json(deleteAllRecipies);

    } catch {
        console.log(error);
        return response.status(500).json({msg: "Algo está errado."});

    }
});

export default router;


