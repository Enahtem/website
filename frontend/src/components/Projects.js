import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-content">
      <h1>My Projects</h1>
      <ul>
	  <li><Link to="/project1">Project 1</Link></li>
	  <li><Link to="/project2">Project 2</Link></li>
	  <li><Link to="/project3">Project 3</Link></li>
      </ul>
    </div>
  );
};

export default Projects;


