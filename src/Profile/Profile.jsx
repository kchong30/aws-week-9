import { useState, useEffect } from "react";
import * as cognito from "../Cognito.js";
import jwtDecode from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getUser() {
      // Decode token
      const token = await cognito.getAccessToken();
      const decoded = jwtDecode(token);

      // Get user data from db
      const fetchuser = await fetch(
        `https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/users/${decoded.sub}`
      ).then((res) => res.json());

      setUser(fetchuser);
    }
    getUser();
  }, []);
  return (
    <div className="max-w-xl  m-auto">
      <div className="flex flex-col items-center p-5 mt-10 bg-white m-5 shadow-lg rounded-lg">
        <h1 className="text-center text-2xl font-bold text-emerald-500 mt-7 pb-5">Profile</h1>
        {user ? (
          <>
            <div className="h-32 w-32 rounded-full bg-emerald-500"></div>
            <div className="font-bold p-2 mt-2 mb-5">
              {user.firstname} {user.lastname}
            </div>
            <div className="text-emerald-500 text-sm">Username</div>
            <div className="mb-5">{user.username}</div>
            <div className="text-emerald-500 text-sm">Email</div>
            <div className="mb-5">{user.email}</div>
          </>
        ) : (
          ""
        )}
        <div className="w-full flex ">
          <button className="w-full bg-emerald-500 text-white m-3 py-2 rounded-lg hover:bg-emerald-700">
            Edit Profile
          </button>
          <button className="w-full bg-rose-400 text-white m-3 py-2 rounded-lg hover:bg-rose-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;