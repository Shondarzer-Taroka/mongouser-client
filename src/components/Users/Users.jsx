// import { useEffect, useState } from "react";
// import axios from "axios";

// export let my=false
// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [toggle,setToggle]=useState(true)
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/users");
//                 setUsers(response.data); // Store users in state
//             } catch (err) {
//                 setError(err.message); // Handle error
//             } finally {
//                 setLoading(false); // Set loading to false
//             }
//         };

//         fetchUsers(); // Call the function to fetch users
//     }, [toggle]);

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
//             console.log("User deleted successfully", response.data);
//             setToggle(!toggle)
//             // Optional: Refresh the user list or remove the user from the UI after deletion
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     const handleUpdate=async (id) => {
//         try {
//             const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
//             console.log("User deleted successfully", response.data);
//             setToggle(!toggle)
//             // Optional: Refresh the user list or remove the user from the UI after deletion
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         } 
//     }
    

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h1 className="text-2xl font-bold">User List</h1>
//             <table className="min-w-full mt-4 border border-gray-200">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th className="border border-gray-300 px-4 py-2">ID</th>
//                         <th className="border border-gray-300 px-4 py-2">Name</th>
//                         <th className="border border-gray-300 px-4 py-2">Email</th>
//                         <th className="border border-gray-300 px-4 py-2">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id}>
//                             <td className="border border-gray-300 px-4 py-2">{user._id}</td>
//                             <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//                             <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//                             <td className="border border-gray-300 px-4 py-2">
//                                 <div>
//                                     <button className="px-4 py-2 rounded-3xl text-white bg-green-400" onClick={()=> handleDelete(user._id)}>Delete</button>
//                                     <button className="px-4 py-2 rounded-3xl text-white bg-red-400">Update</button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Users;





import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "./Modal";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toggle]);

  const handleUpdateClick = async(user) => {
     setIsModalVisible(true); // Show modal

    setSelectedUser(user);
   
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
      setToggle(!toggle);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Add the logic to update the user here, e.g., calling an API.
    setIsModalVisible(false);
    setToggle(!toggle); // Refresh the user list after update
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close modal
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">User List</h1>
      <table className="min-w-full mt-4 border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{user._id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div>
                  <button className="px-4 py-2 rounded-3xl text-white bg-green-400" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                  <button className="px-4 py-2 rounded-3xl text-white bg-red-400 ml-2" onClick={() => handleUpdateClick(user)}>
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Modal */}
      <Modal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        user={selectedUser}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Users;
