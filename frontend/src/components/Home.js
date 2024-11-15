//Based on https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html


import React, { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
  const numBoids = 100;
  const seperation = 0.05;
  const alignment = 0.05;
  const cohesion = 0.0005;
  const protectedRange = 8;
  const visualRange = 40;
  const margin = 150;
  const turnFactor = 0.2;
  const minSpeed = 3;
  const maxSpeed = 6;
  const trailLength = 50;

  const canvasRef = useRef(null);

  const boids = [];

  const Boid = function(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.history = Array(trailLength).fill([x,y]);
    this.historyIndex = 0;
  };

  const updateBoids = () => {
    seperationUpdate();
    alignmentUpdate();
    cohesionUpdate();
    borderUpdate();
    boids.forEach(boid => {
      boid.x += boid.vx
      boid.y += boid.vy
      boid.history[boid.historyIndex] = [boid.x, boid.y];
      boid.historyIndex = (boid.historyIndex + 1) % trailLength;
      const speed = Math.sqrt(boid.vx*boid.vx + boid.vy*boid.vy);
      if (speed>maxSpeed){
        boid.vx*=maxSpeed/speed
        boid.vy*=maxSpeed/speed
      }
      if (speed<minSpeed){
        boid.vx*=minSpeed/speed
        boid.vy*=minSpeed/speed
      }
    });
  };

  const distance = (boid1, boid2) => {
    return Math.sqrt(Math.pow((boid1.x-boid2.x),2)+Math.pow(boid1.y-boid2.y,2));
  }

  const boidsInRange = (boid1, innerRange, outerRange) => {
    return boids.filter((boid2) => distance(boid1, boid2)<outerRange && distance(boid1, boid2)>innerRange);
  }

  const seperationUpdate = () => {
    boids.forEach(boid => {
      const closeBoids = boidsInRange(boid, 0, protectedRange);
      closeBoids.forEach(closeBoid => {
        boid.vx += seperation*(boid.x-closeBoid.x);
        boid.vy += seperation*(boid.y-closeBoid.y);
      });
    });
  };

  const alignmentUpdate = () => {
    boids.forEach(boid => {
      const closeBoids = boidsInRange(boid, protectedRange, visualRange);
      let closeBoidCount = 0;
      let vx_sum = 0;
      let vy_sum = 0;
      closeBoids.forEach(closeBoid => {
        vx_sum+=closeBoid.vx;
        vy_sum+=closeBoid.vy;
        closeBoidCount+=1;
      });
      if (closeBoidCount > 0){
        boid.vx+=alignment*(vx_sum/closeBoidCount-boid.vx);
        boid.vy+=alignment*(vy_sum/closeBoidCount-boid.vy);
      }
    });
  };

  const cohesionUpdate = () => {
    boids.forEach(boid => {
      const closeBoids = boidsInRange(boid, protectedRange, visualRange);
      let closeBoidCount = 0;
      let x_sum = 0;
      let y_sum = 0;
      closeBoids.forEach(closeBoid => {
        x_sum+=closeBoid.x;
        y_sum+=closeBoid.y;
        closeBoidCount+=1;
      });
      if (closeBoidCount > 0){
        boid.vx+=cohesion*(x_sum/closeBoidCount-boid.x);
        boid.vy+=cohesion*(y_sum/closeBoidCount-boid.y);
      }
    });
  };

  const borderUpdate = () => {
    boids.forEach(boid => {
      if (boid.x > window.innerWidth - margin){
        boid.vx-=turnFactor;
      }
      if (boid.x < margin){
        boid.vx+=turnFactor;
      }
      if (boid.y > window.innerHeight - margin){
        boid.vy-=turnFactor;
      }
      if (boid.y < margin){
        boid.vy+=turnFactor;
      } 
    });
  };


  const setupBoids = () => {
    for (let i = 0; i < numBoids; i++) {
      boids.push(new Boid(Math.random() * window.innerWidth, Math.random() * window.innerHeight,Math.random() * 2 - 1,Math.random() * 2 - 1));
    }
  };


  const drawBoids = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    boids.forEach(boid => {
      const angle = Math.atan2(boid.vy, boid.vx);
      ctx.translate(boid.x, boid.y);
      ctx.rotate(angle);
      ctx.translate(-boid.x, -boid.y);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(boid.x, boid.y);
      ctx.lineTo(boid.x - 20, boid.y + 7);
      ctx.lineTo(boid.x - 20, boid.y - 7);
      ctx.lineTo(boid.x, boid.y);
      ctx.fill();
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(boid.history[0][0], boid.history[0][1]);
      for (let i = 1; i < boid.historyIndex; i++) {
        ctx.lineTo(boid.history[i][0], boid.history[i][1]);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(boid.history[boid.historyIndex][0], boid.history[boid.historyIndex][1]);
      for (let i = boid.historyIndex+1; i < trailLength; i++) {
        ctx.lineTo(boid.history[i][0], boid.history[i][1]);
      }
      if (boid.historyIndex != 0){
        ctx.lineTo(boid.history[0][0], boid.history[0][1]);      
      }
      
      ctx.stroke();

    });
  };


  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      updateBoids();   
      drawBoids(ctx);
      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setupBoids();
      animate();
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="home-content">
      <canvas ref={canvasRef} className="boids-canvas"/>
      <h1 className="boids-quote">Welcome to my Portfolio!</h1>
    </div>
  );
};

export default Home;

