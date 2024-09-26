import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletedUser } from './UserReducer';

const Main = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deletedUser({ id: id }));
    };

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">CRUD App</h2>
            <Link to="/create">
                <button className="mb-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
                    Create +
                </button>
            </Link>
            <table className="min-w-full bg-yellow-200">
                <thead>
                    <tr className="bg-yellow-300">
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-yellow-100">
                            <td className="py-2 px-4 border">{user.id}</td>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">
                                <Link to={`/edit/${user.id}`}>
                                    <button className="mr-2 bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600">
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Main;
