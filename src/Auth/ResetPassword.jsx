import { useState } from "react";

export default function ResetPassword({onSubmit}) {
 const [username, setUsername] = useState("");
 const [code, setCode] = useState("");
 const [newPassword, setNewPassword] = useState("");

 const handleSubmit = (event) => {
    event.preventDefault();
    console.log({username})
    onSubmit({username, code, newPassword})
  };

  return (
      <form onSubmit={handleSubmit} className="w-1/2 p-6 rounded-md bg-gray-200">
        <div className="flex items-center mb-4">
          <h1 className="text-xl">Reset Password - Code provided in sent e-mail.</h1>
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
          <label className="block mb-1 font-bold text-gray-700">Code</label>
          <input
            type="text"
            name="code"
            value={code}
            onChange={(event)=>setCode(event.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(event)=>setNewPassword(event.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700">
          Update Password
        </button>
      </form>
  );
}