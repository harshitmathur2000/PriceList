
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './components/productForm';
import ProductTable from './components/productTable';
import NavBar from './components/NavBar';
import './App.css';
const API = import.meta.env.VITE_API;


function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    article_no: '',
    product_service: '',
    in_price: '',
    price: '',
    unit: '',
    in_stock: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [addProductForm, setAddProductForm] = useState(false);
  const fetchProducts = async () => {
    const res = await axios.get(API);
    console.log('API response:', res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    
    fetchProducts();
  }, []);

  const handleSubmit = async () => {

    const data = {
      ...formData,
      in_price: parseFloat(formData.in_price),
      price: parseFloat(formData.price),
      in_stock: parseInt(formData.in_stock),
    };

    if (editingId) {
      await axios.put(`${API}/${editingId}`, data);
      setEditingId(null);
    } else {
      await axios.post(API, data);
    }

    setFormData({
      article_no: '',
      product_service: '',
      in_price: '',
      price: '',
      unit: '',
      in_stock: '',
      description: '',
    });
    fetchProducts();
    setAddProductForm(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };

  const handleEdit = async (product) => {
    setEditingId(product.id);
    setDropdownOpenId(null);
    setFormData({
      article_no: product.article_no,
      product_service: product.product_service,
      in_price: product.in_price,
      price: product.price,
      unit: product.unit,
      in_stock: product.in_stock,
      description: product.description,
    });
    const data = {
      ...formData,
      in_price: parseFloat(formData.in_price),
      price: parseFloat(formData.price),
      in_stock: parseInt(formData.in_stock),
    };
    await axios.put(`${API}/${editingId}`, data);
    setEditingId(null);


    fetchProducts();
  };

  const toggleDropdown = (id) => {
    setAddProductForm(false);
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };
  const filteredProducts = Array.isArray(products) ? products.filter((p) => {
    const articleMatch = searchArticle === '' || p.article_no.toString() === searchArticle;
    const productMatch = p.product_service?.toString().toLowerCase().includes(searchProduct.toLowerCase());
    return articleMatch && productMatch;
  }) : [];
  return (
    <div className="app-container">
      <NavBar />
      <div className='main-layout'>
        <div className='left-pannel'>
          <h2>Menu</h2>
          <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
            <li>F</li>
          </ul>
        </div>
        <div style={{ padding: 30 }}>
          <div className='right-pannel'>
            <div className='right-pannel-top' >
              <div className="search-container" >
                <div>
                  <input
                    placeholder="Search by Article No"
                    value={searchArticle}
                    onChange={(e) => setSearchArticle(e.target.value)}
                    style={{ marginRight: 1 }}
                  />
                </div>
                <div>
                  <input
                    placeholder="Search by Product Name"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                  />
                </div>
              </div>
              <div className="button-group">
                <div style={{ display: 'flex' }}>
                  <div>
                    {(
                      <button onClick={() => setAddProductForm(true)}>
                        New Product
                      </button>
                    )}
                    <div >
                      {(addProductForm && editingId === null) && (
                        <ProductForm
                          formData={formData}
                          setFormData={setFormData}
                          handleSubmit={handleSubmit}
                          editingId={editingId}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <button><div className='button-text'>Print list</div></button>
                  </div>
                  <div>
                    <button>Advanced</button>
                  </div>
                </div>

              </div>

            </div>
            <div className='right-pannel-down'>
              {(editingId) && (
                <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleEdit}
                  editingId={editingId}
                />
              )}
            </div>
            <div >
            <ProductTable
              products={filteredProducts}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              toggleDropdown={toggleDropdown}
              dropdownOpenId={dropdownOpenId}
            />
          </div>


        </div>


      </div>
    </div>
    </div >
  );
}

export default App;
