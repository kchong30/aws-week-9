import { useState } from "react";

export default function LoginForm({onSubmit}) {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = (event) => {
  event.preventDefault();
  console.log("Form submitted", {username, password})
  onSubmit({username, password})
};
  return (
      <form onSubmit={handleSubmit} className="w-1/2 p-6 rounded-md bg-gray-200">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold">Login</h1>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700">
          Login
        </button>
      </form>
      
  );
}
