import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Exercise6() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || Number(quantity) <= 0) {
      return;
    }
    const newItem = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      quantity: Number(quantity),
    };
    setItems((prev) => [newItem, ...prev]);
    setName('');
    setDescription('');
    setQuantity(1);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 16, color: '#333' }}>
          Exercise 6: Add Items Form
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 24 }}>
          Add new items with name, description, and quantity.
        </p>

        <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: 16 }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item name"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 16,
              }}
            />
          </div>

          <div>
            <label htmlFor="description" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Item description"
              required
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 16,
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label htmlFor="quantity" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Quantity</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 16,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="reset" className="btn btn-outline" onClick={() => { setName(''); setDescription(''); setQuantity(1); }}>
              Clear
            </button>
            <button type="submit" className="btn">
              Add Item
            </button>
          </div>
        </form>

        <div className="card" style={{ marginTop: 24 }}>
          <h2 style={{ color: '#333', marginBottom: 12 }}>Items</h2>
          {items.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No items yet. Add some using the form above.</p>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {items.map((item) => (
                <div key={item.id} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1f2937' }}>{item.name}</div>
                    <div style={{ color: '#6b7280', margin: '6px 0' }}>{item.description}</div>
                    <div style={{ fontWeight: 600 }}>Quantity: {item.quantity}</div>
                  </div>
                  <button className="btn" onClick={() => removeItem(item.id)} style={{ background: '#ef4444' }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/" className="btn">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Exercise6;


