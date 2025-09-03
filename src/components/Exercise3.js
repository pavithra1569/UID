import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Calculator Button Component
const CalcButton = ({ value, onClick, className = '' }) => (
  <button 
    className={`calc-btn ${className}`}
    onClick={() => onClick(value)}
  >
    {value}
  </button>
);

// Calculator Display Component
const CalculatorDisplay = ({ display, history }) => (
  <div>
    <div className="calculator-display">
      {display}
    </div>
    {history.length > 0 && (
      <div style={{
        background: '#f8f9fa',
        border: '2px solid #e9ecef',
        borderTop: 'none',
        borderRadius: '0 0 8px 8px',
        padding: '10px 20px',
        fontSize: '14px',
        color: '#666',
        minHeight: '40px',
        maxHeight: '120px',
        overflowY: 'auto'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>History:</div>
        {history.slice(-3).map((item, index) => (
          <div key={index} style={{ marginBottom: '2px' }}>
            {item}
          </div>
        ))}
      </div>
    )}
  </div>
);

function Exercise3() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to history
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [...prev, historyEntry]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (!operation || previousValue === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const newValue = calculate(previousValue, inputValue, operation);
    
    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
    
    // Add to history
    const historyEntry = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
    setHistory(prev => [...prev, historyEntry]);
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const handlePlusMinus = () => {
    const currentValue = parseFloat(display);
    const newValue = -currentValue;
    setDisplay(String(newValue));
  };

  const handleSquareRoot = () => {
    const currentValue = parseFloat(display);
    if (currentValue >= 0) {
      const newValue = Math.sqrt(currentValue);
      setDisplay(String(newValue));
      
      // Add to history
      const historyEntry = `√${currentValue} = ${newValue}`;
      setHistory(prev => [...prev, historyEntry]);
    }
  };

  const handleSquare = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue * currentValue;
    setDisplay(String(newValue));
    
    // Add to history
    const historyEntry = `${currentValue}² = ${newValue}`;
    setHistory(prev => [...prev, historyEntry]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
          Exercise 3: Calculator with State Management
        </h1>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', marginBottom: '32px' }}>
          A fully functional calculator that demonstrates React state management for performing arithmetic operations.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div className="calculator">
            <CalculatorDisplay display={display} history={history} />
            
            <div className="calculator-buttons">
              <CalcButton value="C" onClick={clearAll} className="clear" />
              <CalcButton value="CE" onClick={clearDisplay} className="clear" />
              <CalcButton value="%" onClick={handlePercentage} className="operator" />
              <CalcButton value="÷" onClick={performOperation} className="operator" />
              
              <CalcButton value="7" onClick={inputDigit} />
              <CalcButton value="8" onClick={inputDigit} />
              <CalcButton value="9" onClick={inputDigit} />
              <CalcButton value="×" onClick={performOperation} className="operator" />
              
              <CalcButton value="4" onClick={inputDigit} />
              <CalcButton value="5" onClick={inputDigit} />
              <CalcButton value="6" onClick={inputDigit} />
              <CalcButton value="-" onClick={performOperation} className="operator" />
              
              <CalcButton value="1" onClick={inputDigit} />
              <CalcButton value="2" onClick={inputDigit} />
              <CalcButton value="3" onClick={inputDigit} />
              <CalcButton value="+" onClick={performOperation} className="operator" />
              
              <CalcButton value="±" onClick={handlePlusMinus} />
              <CalcButton value="0" onClick={inputDigit} />
              <CalcButton value="." onClick={inputDecimal} />
              <CalcButton value="=" onClick={handleEquals} className="equals" />
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <div className="calculator-buttons">
                <CalcButton value="√" onClick={handleSquareRoot} className="operator" />
                <CalcButton value="x²" onClick={handleSquare} className="operator" />
                <CalcButton value="Clear History" onClick={clearHistory} className="clear" />
              </div>
            </div>
          </div>
          
          <div style={{ maxWidth: '300px' }}>
            <div className="card">
              <h3 style={{ color: '#333', marginBottom: '16px' }}>Calculator Features</h3>
              <ul style={{ color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Basic arithmetic operations (+, -, ×, ÷)</li>
                <li>Percentage calculations</li>
                <li>Square and square root functions</li>
                <li>Plus/minus toggle</li>
                <li>Decimal point support</li>
                <li>Operation history</li>
                <li>Clear all (C) and clear entry (CE)</li>
                <li>Responsive design</li>
              </ul>
            </div>
            
            <div className="card" style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#333', marginBottom: '16px' }}>State Management</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                This calculator demonstrates React state management with multiple state variables:
              </p>
              <ul style={{ color: '#666', lineHeight: '1.6', paddingLeft: '20px', marginTop: '10px' }}>
                <li><strong>display:</strong> Current display value</li>
                <li><strong>previousValue:</strong> Stored value for operations</li>
                <li><strong>operation:</strong> Current operation being performed</li>
                <li><strong>waitingForOperand:</strong> Tracks input state</li>
                <li><strong>history:</strong> Stores calculation history</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Exercise3; 