import React from 'react';

const ProductTable = ({ products, handleEdit, handleDelete, toggleDropdown, dropdownOpenId }) => {
  return (
    <table  cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th className="table-column-article_no">Article No.</th>
          <th className="table-column-product_service">Product/Service</th>
          <th className="table-column-in_price">In Price</th>
          <th className="table-column-price">Price</th>
          <th className="table-column-unit">Unit</th>
          <th className="table-column-in_stock">In Stock</th>
          <th className="table-column-description">Description</th>
          <th className="table-column-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td className="table-column-article_no">{p.article_no}</td>
            <td className="table-column-product_service">{p.product_service}</td>
            <td className="table-column-in_price">{p.in_price}</td>
            <td className="table-column-price">{p.price}</td>
            <td className="table-column-unit">{p.unit}</td>
            <td className="table-column-in_stock">{p.in_stock}</td>
            <td className="table-column-description">{p.description}</td>
            <td className="table-column-actions" style={{ position: 'relative' }}>
              <button onClick={() => toggleDropdown(p.id)}>⋯</button>
              {dropdownOpenId === p.id && (
                <div
                  style={{
                    position: 'absolute',
                    border: '1px solid #ccc',
                    padding: '5px',
                    right: 0,
                    zIndex: 100,
                    background: '#fff'
                  }}
                >
                  <div style={{ cursor: 'pointer' }} onClick={() => handleEdit(p)}>
                    Edit
                  </div>
                  <div style={{ cursor: 'pointer' }} onClick={() => handleDelete(p.id)}>
                    Delete
                  </div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
