import React, { useState, useEffect } from 'react';
import '/src/Components/AdminPanel/adminpanel.css';

const Adminpanel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="users-list">
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.phone}
                    </li>
                ))}

            </ul>

        </div>
    );
};

export default Adminpanel;
