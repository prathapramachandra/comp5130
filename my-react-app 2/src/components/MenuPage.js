import React, { useState } from 'react';

const MenuPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  // Example recipe data
  const recipes = [
    { id: 1, title: 'Butter Chicken', type: 'non-vegetarian', rating: 4, img: '/images/butter-chicken.jpg' },
    { id: 2, title: 'Chocolate Cake', type: 'desserts', rating: 5, img: '/images/chocolate-cake.jpg' },
    { id: 3, title: 'Vegan Buddha Bowl', type: 'vegetarian', rating: 4, img: '/images/buddha-bowl.jpg' },
    // More recipes...
  ];

  // Pagination Logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter and sort recipes
  const filteredRecipes = currentRecipes
    .filter(recipe => {
      if (filter === 'all') return true;
      return recipe.type === filter;
    })
    .filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'popular') return b.rating - a.rating;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div>
      {/* Search and Filter Section */}
      <section className="filter-section">
        <input 
          type="text" 
          placeholder="Search Recipes..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Recipes</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          <option value="desserts">Desserts</option>
          {/* Additional dietary filters */}
          <option value="gluten-free">Gluten-Free</option>
          <option value="nut-free">Nut-Free</option>
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
        </select>
      </section>

      {/* Recipe Cards */}
      <section className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.img} alt={recipe.title} loading="lazy" />
            <h3>{recipe.title}</h3>
            <p>⭐ {recipe.rating}</p>
            <button onClick={() => window.location.href = `/recipe/${recipe.id}`}>View Recipe</button>
          </div>
        ))}
        {/* Pagination Component */}
        <div className="pagination">
          {[...Array(Math.ceil(recipes.length / recipesPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Chefs Section */}
      <section className="featured-chefs">
        <h2>Featured Chefs</h2>
        <div className="chef-grid">
          {/* Dynamic content for featured chefs */}
          <div className="chef-card">
            <img src="/images/chef1.jpg" alt="Chef Name" />
            <h3>Chef Alice</h3>
            <p>Known for Vegan Dishes</p>
          </div>
          <div className="chef-card">
            <img src="/images/chef2.jpg" alt="Chef Name" />
            <h3>Chef Bob</h3>
            <p>Specializes in Desserts</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
