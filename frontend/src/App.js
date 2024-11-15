// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import mail from './mail.png';
import linkedin from './linkedin.png';
import github from './github.png';
import Home from './components/Home';
import Projects from './components/Projects';
import Project1 from './components/projects/Project1';
import Project2 from './components/projects/Project2';
import Project3 from './components/projects/Project3';
import About from './components/About';

function App() {
  return (
    <Router>
      <header className="app-header">
        <a href="/" className="app-brand">
          <img src={logo} className="app-logo" alt="Logo" />
          <h1 className="app-title">Hector Chen</h1>
        </a>

        <ul className="app-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <ul className="app-social">
          <li>
            <a href="mailto:hector.chen@mail.utoronto.ca">
              <img src={mail} alt="Email" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/hectorchen-ch4/">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Enahtem">
              <img src={github} alt="GitHub" />
            </a>
          </li>
        </ul>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project1" element={<Project1 />} />
          <Route path="/project2" element={<Project2 />} />
          <Route path="/project3" element={<Project3 />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

