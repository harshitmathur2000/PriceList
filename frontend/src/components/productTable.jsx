import React from 'react';
import './table.css';

const ProductTable = ({ products, handleEdit, handleDelete, toggleDropdown, dropdownOpenId }) => {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Article No.</th>
            <th>Product/Service</th>
            <th>In Price</th>
            <th>Price</th>
            <th>Unit</th>
            <th>In Stock</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>

      <div className="table-scroll-body">
        <table className="product-table">
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.article_no}</td>
                <td>{p.product_service}</td>
                <td>{p.in_price}</td>
                <td>{p.price}</td>
                <td>{p.unit}</td>
                <td>{p.in_stock}</td>
                <td>{p.description}</td>
                <td style={{ position: 'relative' }}>
                  <button onClick={() => toggleDropdown(p.id)}>⋯</button>
                  {dropdownOpenId === p.id && (
                    <div className="dropdown-menu">
                      <div onClick={() => handleEdit(p)}>Edit</div>
                      <div onClick={() => handleDelete(p.id)}>Delete</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
