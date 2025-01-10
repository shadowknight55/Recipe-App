import express from 'express';
const app = express();
import Recipe from '../models/recipe.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const recipes = await Recipe.findAll();
      res.render('recipes/index', { recipes, title: 'Recipe List' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error rendering recipe list');
    }
  });
  
  router.get('/create', (req, res) => {
    try {
      res.render('recipes/create', { title: 'Create Recipe' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error rendering create recipe page');
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const { title, ingredients, instructions } = req.body;
      const recipe = await Recipe.create({ title, ingredients, instructions });
      res.redirect(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating recipe');
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findByPk(req.params.id);
      if (!recipe) {
        res.status(404).send('Recipe not found');
      } else {
        res.render('recipes/details', { recipe, title: recipe.title });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error rendering recipe details');
    }
  });
  
  router.get('/:id/edit', async (req, res) => {
    try {
      const recipe = await Recipe.findByPk(req.params.id);
      if (!recipe) {
        res.status(404).send('Recipe not found');
      } else {
        res.render('recipes/edit', { recipe, title: `Edit ${recipe.title}` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error rendering edit recipe page');
    }
  });
  
  router.post('/:id', async (req, res) => {
    try {
      const { title, ingredients, instructions } = req.body;
      const recipe = await Recipe.findByPk(req.params.id);
      if (!recipe) {
        res.status(404).send('Recipe not found');
      } else {
        recipe.title = title;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        await recipe.save();
        res.redirect(`/recipes/${req.params.id}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating recipe');
    }
  });
  
  router.post('/:id/delete', async (req, res) => {
    try {
      await Recipe.destroy({ where: { id: req.params.id } });
      res.redirect('/recipes');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting recipe');
    }
  });

export default router;
