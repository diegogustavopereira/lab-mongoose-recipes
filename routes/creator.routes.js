import express, { request, response } from 'express';
import CreatorModel from '../models/Creator.model.js';
import RecipieModel from '../models/Recipie.model.js';

const router = express.Router();


//GET
router.get('/', async (request, response) => {
    try {
        const creator = await CreatorModel.find();

        return response.status(200).json(creator);

    } catch {
        console.log(error);
        return response.status(500).json({ msg: "Algo está errado."});

    }
});

//GET BY ID
router.get('/:id', async (request, response) => {

    try {

        const { id } = request.params;

    const Creator = await CreatorModel.findById(id);

    if(!Creator) {
        return response.status(404).json("A receita não foi encontrada");
    }

    return response.status(200).json(recipe);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Algo está errado."});
    }
    
});

//POST
router.post('/create/', async (request, response) => {
    try {
        
        const newCreator = await CreatorModel.create(request.body);
    
        return response.status(201).json(newCreator);

    } catch (error) {
        console.log(error);

        return response.status(500).json({ msg: "Algo está errado."});
    }
});

//PUT
router.put('/edit/:id', async (request, response) => {

    try {
        const { id } = request.params;
                                      
        const update = await CreatorModel.findByIdAndUpdate(

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

        const deleteCreator = await CreatorModel.findByIdAndDelete(id);
    
        return response.status(200).json(deleteCreator)

    } catch {
        console.log(error);
        return response.status(500).json({ msg: "Algo está errado."});
    }
});



//DELETE MANY
router.delete('/deleteall', async (request, response) => {
    try {
        const deleteAllCreators = await CreatorModel.deleteMany();
        return response.status(200).json(deleteAllCreators);

    } catch {
        console.log(error);
        return response.status(500).json({msg: "Algo está errado."});

    }
});

export default router;