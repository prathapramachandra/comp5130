import React, { useState, useEffect } from 'react';
import '../App.css'; // From components folder to src


const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [recipeSuggestion, setRecipeSuggestion] = useState('');
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);

  // Adding a futuristic set of recipes
  useEffect(() => {
    const fetchedRecipes = [];
    const categories = [
      'Chicken', 'Mutton', 'Fish', 'Prawns', 'Vegetarian Dishes', 'Biriyanis', 
      'Dal', 'Tomato Rice', 'Carrot Fried Rice', 'Premium Cakes', 'Croissants', 
      'Bagels', 'Smoothies'
    ];
    
    // Generating 10000 recipes with various categories
    for (let i = 1; i <= 10000; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      fetchedRecipes.push({
        id: i,
        title: `${category} Recipe ${i}`,
        cookingTime: `${20 + (i % 40)} mins`,
        img: `/images/${category.toLowerCase().replace(/ /g, '-')}.jpg`,
        description: `This is a delicious ${category} recipe, perfect for any occasion.`,
        ingredients: [`Ingredient ${i}1`, `Ingredient ${i}2`, `Ingredient ${i}3`],
        instructions: [
          `Step 1: Prepare the ${category.toLowerCase()}.`,
          `Step 2: Cook it for a while.`,
          `Step 3: Serve hot and enjoy!`
        ],
      });
    }
    
    setFeaturedRecipes(fetchedRecipes);
    setRecipeOfTheDay(fetchedRecipes[Math.floor(Math.random() * fetchedRecipes.length)]);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === 'enabled') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkMode ? 'disabled' : 'enabled');
  };

  const getAISuggestions = () => {
    const suggestions = [
      'Spaghetti Carbonara', 'Chicken Tikka Masala', 'Vegan Buddha Bowl', 'Grilled Salmon', 
      'Paneer Tikka', 'Caesar Salad', 'Chocolate Lava Cake'
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setRecipeSuggestion(randomSuggestion);
    alert('AI suggests: ' + randomSuggestion);
  };

  return (
    <div>
      {/* Hero Section with Futuristic Gradient */}
      <header className="hero-section">
        <h1>Welcome to Recipe Kavala Bro</h1>
        <p>Share your best recipes with the world!</p>
        <div className="cta-buttons">
          <button className="futuristic-btn" onClick={() => window.location.href = '/add-recipe'}>Share a Recipe</button>
          <button className="futuristic-btn" onClick={() => window.location.href = '/menu'}>Browse Recipes</button>
          <button className="futuristic-btn" onClick={getAISuggestions}>🧠 Get AI Recipe Suggestions</button>
        </div>
        {recipeSuggestion && <p className="ai-suggestion">AI Suggestion: {recipeSuggestion}</p>}
      </header>

      {/* Recipe of the Day with 3D Card */}
      <section className="recipe-day-section">
        <h2>Recipe of the Day</h2>
        {recipeOfTheDay && (
          <div className="recipe-card-3d">
            <div className="recipe-card-content">
              <img src={recipeOfTheDay.img} alt={recipeOfTheDay.title} />
              <h3>{recipeOfTheDay.title}</h3>
              <p>Cooking Time: {recipeOfTheDay.cookingTime}</p>
              <p>{recipeOfTheDay.description}</p>
              <button className="futuristic-btn" onClick={() => window.location.href = `/recipe/${recipeOfTheDay.id}`}>View Recipe</button>
            </div>
          </div>
        )}
      </section>

      {/* Featured Recipes with Futuristic Stacked Cards */}
      <section className="featured-recipes-section">
        <h2>Our Featured Recipes</h2>
        <div className="recipe-card-stack">
          {featuredRecipes.slice(0, 10).map(recipe => (
            <div key={recipe.id} className="recipe-card-stack-item">
              <img src={recipe.img} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>Cooking Time: {recipe.cookingTime}</p>
              <p>{recipe.description}</p>
              <button className="futuristic-btn" onClick={() => window.location.href = `/recipe/${recipe.id}`}>View Recipe</button>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Form */}
      <section className="newsletter-section">
        <h2>Subscribe to our Newsletter</h2>
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="futuristic-btn">Subscribe</button>
        </form>
      </section>

      {/* Dark Mode Toggle */}
      <button className="dark-mode-toggle futuristic-btn" onClick={toggleDarkMode}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default HomePage;
