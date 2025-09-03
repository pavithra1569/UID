import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Exercise5() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount((c) => c + Number(step || 0));
  const decrement = () => setCount((c) => c - Number(step || 0));
  const reset = () => setCount(0);

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 16, color: '#333' }}>
          Exercise 5: Counter
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 24 }}>
          Increment or decrement the counter using a user-defined step.
        </p>

        <div style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#4f46e5' }}>{count}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button className="btn" onClick={decrement}>
              - Decrement
            </button>
            <button className="btn" onClick={increment}>
              + Increment
            </button>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="step" style={{ fontWeight: 600, color: '#333' }}>
              Step
            </label>
            <input
              id="step"
              type="number"
              min="0"
              value={step}
              onChange={(e) => setStep(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 16,
              }}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-outline" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Exercise5;


