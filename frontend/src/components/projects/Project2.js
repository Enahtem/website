import React, { useState } from 'react';
import axios from 'axios';

const Project2 = () => {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Reset error

        try {
            const response = await axios.post('/api/project2/', {
                number: Number(number),
            });
            setResult(response.data.result);
        } catch (err) {
            setError(err.response?.data?.error || 'Error');
            setResult(null);
        }
    };

    return (
        <div className="project2-content">
            <p>PROJECT 2: Testing</p>

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

export default Project2;

