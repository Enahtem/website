import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const Project1 = () => {
    const [points, setPoints] = useState([]);
    const [average, setAverage] = useState({ x: 0, y: 0 });
    const [error, setError] = useState('');
    const svgRef = useRef(null);

    // Draw the graph when points change
    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', 600)
            .attr('height', 400)
            .style('border', '1px solid black');

        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([50, 550]);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([350, 50]);

        // Clear existing points and draw new ones
        svg.selectAll('*').remove();

        svg.append('g')
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y))
            .attr('r', 5)
            .style('fill', 'blue');

        svg.on('click', function (event) {
            const [x, y] = d3.pointer(event);
            const newPoint = {
                x: xScale.invert(x),
                y: yScale.invert(y),
            };
            setPoints((prevPoints) => [...prevPoints, newPoint]);
        });
    }, [points]);

    const handleCalculateAverage = async () => {
        if (points.length === 0) {
            setError('Please add some points before calculating the average.');
            return;
        }

        try {
            const response = await axios.post('/api/project1/', { points });
            setAverage(response.data.average);
            setError('');
        } catch (err) {
            setError('Error calculating average');
        }
    };

    return (
        <div>
            <h1>Project 1: Graph Visualization</h1>
            <div>
                <svg ref={svgRef}></svg>
            </div>
            <button onClick={handleCalculateAverage}>Calculate Average</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <p>Average X: {average.x}</p>
                <p>Average Y: {average.y}</p>
            </div>
        </div>
    );
};

export default Project1;

