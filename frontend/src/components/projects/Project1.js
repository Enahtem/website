import React, { useState } from 'react';
import axios from 'axios';

const Project1 = () => {

    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Reset error

        try {
            // Use relative URL for production
            const response = await axios.post('/api/project1/', {
                number: Number(number),
            });
            setResult(response.data.result);
        } catch (err) {
            setError(err.response?.data?.error || 'Error');
            setResult(null);
        }
    };

    return (
        <div className="project1-content">
            <p>PROJECT 1: Cube Root!</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Enter a number:
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {result !== null && <p>Result: {result}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Project1;

