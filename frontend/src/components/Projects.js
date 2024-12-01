import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import placeholder1 from './placeholder1.png';
import placeholder2 from './placeholder2.png';
import placeholder3 from './placeholder3.png';

const Projects = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const projects = [
    {'name': "Project 1", 'link': "/project1", 'img': placeholder1},
    {'name': "Project 2", 'link': "/project2", 'img': placeholder2},
    {'name': "Project 3", 'link': "/project3", 'img': placeholder3},
  ]
  const moveSlide = (direction) => {
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex >= projects.length) return 0;
      if (newIndex < 0) return projects.length - 1;
      return newIndex;
    });
  };

  return (
    <div className="projects-content">
      <div className="slider" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
        {projects.map((project, index) => (
          <div className="slide" key={index}>
            <Link to={project.link}>
              <img src={project.img} alt={project.name} />
            </Link>
          <h1>{project.name}</h1>
          </div>
        ))}
      </div>
      <div className="slider-buttons">
        <button className="left-arrow" onClick={() => moveSlide(-1)}>&#10094;</button>
        <button className="right-arrow" onClick={() => moveSlide(1)}>&#10095;</button>
      </div>
    </div>
  );
};

export default Projects;


