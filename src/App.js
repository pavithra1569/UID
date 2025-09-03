import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';
import Exercise3 from './components/Exercise3';
import Exercise4 from './components/Exercise4';
import Exercise5 from './components/Exercise5';
import Exercise6 from './components/Exercise6';

function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <h1 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          React Exercises Lab
        </h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/exercise1">Exercise 1</Link></li>
          <li><Link to="/exercise2">Exercise 2</Link></li>
          <li><Link to="/exercise3">Exercise 3</Link></li>
          <li><Link to="/exercise4">Exercise 4</Link></li>
          <li><Link to="/exercise5">Exercise 5</Link></li>
          <li><Link to="/exercise6">Exercise 6</Link></li>
        </ul>
      </div>
    </nav>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const availableExercises = [
    {
      exerciseId: 1,
      exerciseTitle: "Exercise 1: React Website",
      exerciseDescription: "A React-based website using components, elements, and styles with modern UI design.",
      exercisePath: "/exercise1",
      exerciseIcon: "🌐"
    },
    {
      exerciseId: 2,
      exerciseTitle: "Exercise 2: User Profile",
      exerciseDescription: "A user profile page using React props to display user information dynamically.",
      exercisePath: "/exercise2",
      exerciseIcon: "👤"
    },
    {
      exerciseId: 3,
      exerciseTitle: "Exercise 3: Calculator",
      exerciseDescription: "A calculator application that performs basic arithmetic operations using React state management.",
      exercisePath: "/exercise3",
      exerciseIcon: "🧮"
    },
    {
      exerciseId: 4,
      exerciseTitle: "Exercise 4: E-commerce",
      exerciseDescription: "A simple e-commerce website with multiple pages using React Router for navigation.",
      exercisePath: "/exercise4",
      exerciseIcon: "🛒"
        },
        {
          exerciseId: 5,
          exerciseTitle: "Exercise 5: Counter",
          exerciseDescription: "A simple counter that increments or decrements based on user-defined step.",
          exercisePath: "/exercise5",
          exerciseIcon: "🔢"
        },
        {
          exerciseId: 6,
          exerciseTitle: "Exercise 6: Item Form",
          exerciseDescription: "A form to add items with name, description, and quantity to a list.",
          exercisePath: "/exercise6",
          exerciseIcon: "📝"
    }
  ];

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
          Welcome to React Exercises Lab
        </h1>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', marginBottom: '32px' }}>
          Click on any exercise below to explore the different React concepts and features.
        </p>
        
        <div className="exercise-grid">
          {availableExercises.map((exercise) => (
            <div 
              key={exercise.exerciseId} 
              className="exercise-card"
              onClick={() => navigate(exercise.exercisePath)}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {exercise.exerciseIcon}
              </div>
              <h3>{exercise.exerciseTitle}</h3>
              <p>{exercise.exerciseDescription}</p>
              <button className="btn">View Exercise</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise1" element={<Exercise1 />} />
          <Route path="/exercise2" element={<Exercise2 />} />
          <Route path="/exercise3" element={<Exercise3 />} />
          <Route path="/exercise4/*" element={<Exercise4 />} />
          <Route path="/exercise5" element={<Exercise5 />} />
          <Route path="/exercise6" element={<Exercise6 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 