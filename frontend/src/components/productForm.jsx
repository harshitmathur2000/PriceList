// ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ formData, setFormData, handleSubmit, editingId }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {[
        'article_no',
        'product_service',
        'in_price',
        'price',
        'unit',
        'in_stock',
        'description'
      ].map((field) => (
        <input
          key={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field.replace(/_/g, ' ')}
          style={{ marginRight: 8, marginBottom: 10 }}
        />
      ))}
      <button onClick={handleSubmit}>
        {editingId ? 'Update' : 'Add'} Product
      </button>
    </div>
  );
};

export default ProductForm;
