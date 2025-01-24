import React from 'react';

function AdminLogin() {
  return (
    <div className="w-full lg:w-1/2 p-16">
      <h2 className="text-3xl font-bold mb-6">COHESIONX</h2>
      <h3 className="text-2xl font-semibold mb-8">User Login</h3>
      <form>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">YOUR EMAIL</label>
          <input
            type="email"
            id="username"
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Login</button>
        
        
      </form>
    </div>
  );
}

export default AdminLogin;