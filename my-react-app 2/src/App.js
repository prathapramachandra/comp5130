import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import MealPlanningPage from './components/MealPlanningPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import AddRecipePage from './components/AddRecipePage';
import './App.css'; // Global CSS

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar for navigation */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/mealplanning">Meal Planning</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/add-recipe">Add Recipe</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/mealplanning" element={<MealPlanningPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
