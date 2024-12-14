import React, { useState, useEffect } from 'react';

const AddRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    // Load saved draft if exists
    const savedDraft = JSON.parse(localStorage.getItem('recipeDraft'));
    if (savedDraft) {
      setTitle(savedDraft.title);
      setDescription(savedDraft.description);
      setIngredients(savedDraft.ingredients);
      setInstructions(savedDraft.instructions);
      setImage(savedDraft.image);
      setDraftSaved(true);
    }
  }, []);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const saveDraft = () => {
    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      image,
    };
    localStorage.setItem('recipeDraft', JSON.stringify(recipeData));
    setDraftSaved(true);
    alert('Draft saved successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      image,
    };

    console.log('Submitted Recipe:', recipeData);
    localStorage.removeItem('recipeDraft');
    alert('Recipe submitted successfully!');

    // Reset form
    setTitle('');
    setDescription('');
    setIngredients(['']);
    setInstructions('');
    setImage(null);
  };

  return (
    <div className="add-recipe-page">
      <h2>Add a New Recipe</h2>
      {draftSaved && <p>Draft loaded successfully. Continue editing or submit.</p>}
      <form onSubmit={handleSubmit} className="add-recipe-form">
        {/* Recipe Title and Description */}
        <div className="form-group">
          <label>Recipe Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        {/* Ingredients List */}
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-group">
            <input type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} required />
            <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>+ Add Ingredient</button>

        {/* Cooking Instructions */}
        <div className="form-group">
          <label>Instructions</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </div>

        {/* Save Draft and Submit Buttons */}
        <button type="button" onClick={saveDraft}>Save Draft</button>
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
