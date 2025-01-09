import express from 'express';
const app = express();
import Recipe from '../models/recipe.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const recipes = await Recipe.findAll();
    res.render('recipes/index', { recipes });
});
router.get('/', (req, res) => {
    res.render('home', { layout: 'layouts/layout' });
});

router.get('/create', (req, res) => {
    res.render('recipes/create');
});

router.post('/', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    await Recipe.create({ title, ingredients, instructions });
    res.redirect('/recipes');
});

router.get('/:id', async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id);
    res.render('recipes/details', { recipe });
});

router.post('/:id/edit', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    await Recipe.update({ title, ingredients, instructions }, { where: { id: req.params.id } });
    res.redirect('/recipes');
});

router.post('/:id/delete', async (req, res) => {
    await Recipe.destroy({ where: { id: req.params.id } });
    res.redirect('/recipes');
});

router.get('/', async (req, res) => {
    const recipes = await Recipe.findAll();
    res.render('recipes/index', { recipes, content: 'recipes/index' });
});



router.get('/:id/edit', async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id);
    res.render('recipes/edit', { recipe });
});

export default router;
