import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <img 
      src={product.image} 
      alt={product.name}
      className="product-image"
      onError={(e) => {
        e.target.src = `https://via.placeholder.com/300x200/667eea/ffffff?text=${product.name}`;
      }}
    />
    <div className="product-info">
      <h3 className="product-title">{product.name}</h3>
      <div className="product-price">${product.price}</div>
      <p className="product-description">{product.description}</p>
      <button 
        className="btn" 
        onClick={() => onAddToCart(product)}
        style={{ width: '100%' }}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

// Cart Item Component
const CartItem = ({ item, onUpdateQuantity, onRemoveFromCart }) => (
  <div className="cart-item">
    <img 
      src={item.image} 
      alt={item.name}
      className="cart-item-image"
      onError={(e) => {
        e.target.src = `https://via.placeholder.com/80x80/667eea/ffffff?text=${item.name}`;
      }}
    />
    <div className="cart-item-info">
      <div className="cart-item-title">{item.name}</div>
      <div className="cart-item-price">${item.price}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button 
        className="btn" 
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        style={{ 
          padding: '8px 12px', 
          fontSize: '14px',
          opacity: item.quantity <= 1 ? 0.5 : 1
        }}
      >
        -
      </button>
      <span style={{ fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
        {item.quantity}
      </span>
      <button 
        className="btn" 
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        style={{ padding: '8px 12px', fontSize: '14px' }}
      >
        +
      </button>
      <button 
        className="btn" 
        onClick={() => onRemoveFromCart(item.id)}
        style={{ 
          padding: '8px 12px', 
          fontSize: '14px',
          background: '#dc3545',
          border: 'none'
        }}
      >
        Remove
      </button>
    </div>
  </div>
);

// Home Page Component
const HomePage = ({ products, onAddToCart }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h1 style={{ color: '#333', marginBottom: '16px' }}>Welcome to TechStore</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        Discover amazing tech products at great prices!
      </p>
    </div>
    
    <div className="ecommerce-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  </div>
);

// Products Page Component
const ProductsPage = ({ products, onAddToCart }) => {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => 
    category === 'all' || product.category === category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#333', marginBottom: '24px' }}>Our Products</h1>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Category:
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Sort by:
            </label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <p style={{ color: '#666' }}>
          Showing {sortedProducts.length} products
          {category !== 'all' && ` in ${category}`}
        </p>
      </div>
      
      <div className="ecommerce-grid">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

// Cart Page Component
const CartPage = ({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: '#333', marginBottom: '16px' }}>Your Cart is Empty</h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>
          Add some products to your cart to get started!
        </p>
        <Link to="/exercise4/products" className="btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ color: '#333' }}>Shopping Cart</h1>
        <button 
          className="btn" 
          onClick={onClearCart}
          style={{ background: '#dc3545', border: 'none' }}
        >
          Clear Cart
        </button>
      </div>
      
      <div className="card">
        {cart.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onUpdateQuantity={onUpdateQuantity}
            onRemoveFromCart={onRemoveFromCart}
          />
        ))}
        
        <div className="cart-total">
          Total ({itemCount} items): ${total.toFixed(2)}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button className="btn" style={{ fontSize: '18px', padding: '16px 32px' }}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

// E-commerce Navigation Component
const EcommerceNav = ({ cartItemCount }) => (
  <nav style={{
    background: 'white',
    padding: '16px 0',
    marginBottom: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    }}>
      <Link to="/exercise4" style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#667eea',
        textDecoration: 'none'
      }}>
        TechStore
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/exercise4" className="btn" style={{ background: 'transparent', color: '#333', border: '2px solid #667eea' }}>
          Home
        </Link>
        <Link to="/exercise4/products" className="btn" style={{ background: 'transparent', color: '#333', border: '2px solid #667eea' }}>
          Products
        </Link>
        <Link to="/exercise4/cart" className="btn" style={{ position: 'relative' }}>
          Cart
          {cartItemCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#dc3545',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  </nav>
);

function Exercise4() {
  const [cart, setCart] = useState([]);
  
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "audio",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Smartphone",
      price: 699.99,
      category: "mobile",
      description: "Latest smartphone with advanced camera system and powerful processor.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Laptop",
      price: 1299.99,
      category: "computers",
      description: "Professional laptop with high-performance specs for work and gaming.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 299.99,
      category: "wearables",
      description: "Feature-rich smartwatch with health monitoring and GPS tracking.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Wireless Mouse",
      price: 49.99,
      category: "accessories",
      description: "Ergonomic wireless mouse with precision tracking and long battery life.",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 79.99,
      category: "audio",
      description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop"
    }
  ];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
          Exercise 4: E-commerce Website with React Router
        </h1>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', marginBottom: '32px' }}>
          A complete e-commerce website with multiple pages, shopping cart, and React Router navigation.
        </p>
        
        <EcommerceNav cartItemCount={cartItemCount} />
        
        <Routes>
          <Route path="/" element={<HomePage products={products} onAddToCart={addToCart} />} />
          <Route path="/products" element={<ProductsPage products={products} onAddToCart={addToCart} />} />
          <Route path="/cart" element={
            <CartPage 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
            />
          } />
        </Routes>
        
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Exercise4; 