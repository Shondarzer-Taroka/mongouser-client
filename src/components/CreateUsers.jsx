import { useState } from 'react';
import axios from 'axios';


const CreateUsers = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users', {
                name,
                email,
                password
            });
            setMessage('User created successfully!');
            setName('');
            setEmail('');
            setPassword('');
            
        } catch (err) {
            setMessage('Error creating user!');
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-4">Create User</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-2 border border-gray-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUsers;
