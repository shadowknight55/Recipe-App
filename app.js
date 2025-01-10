import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';
import expressEjsLayouts from 'express-ejs-layouts'; // Import express-ejs-layouts

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set up EJS and layouts
app.set('view engine', 'ejs');
app.use(expressEjsLayouts); // Use express-ejs-layouts
app.set('layout', 'layouts/layout'); // Set the default layout file

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
import recipeRoutes from './routes/recipes.js';
app.use('/recipes', recipeRoutes);

// Database connection
connectDB();

// Redirect root route to /recipes
app.get('/', (req, res) => res.redirect('/recipes'));

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});