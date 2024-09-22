export const Modal = ({ isVisible, onClose, user, handleUpdate }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update User</h2>
        <form onSubmit={handleUpdate}>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            defaultValue={user.name}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          
          <label className="block mb-2">Email</label>
          <input
            type="email"
            defaultValue={user.email}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          
          <label className="block mb-2">Password</label>
          <input
            type="password"
            defaultValue={user.password}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button type="button" onClick={onClose} className="ml-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </form>
      </div>
    </div>
  );
};
