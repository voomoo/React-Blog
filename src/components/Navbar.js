import React, { useState } from "react";
import {Avatar} from "@material-ui/core"
import { useSelector } from "react-redux";
import { selectSignedIn, selectUserData, setSignedIn, setUserData, setSearchInput } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { GoogleLogout } from "react-google-login";
import "../styling/navbar.css"

const Navbar = () => {
    const [inputValue, setInputValue] = useState("tech")
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData)
  const dispatch = useDispatch();
  const logout = (response) => {
    dispatch(setSignedIn(false))
    dispatch(setUserData(null))
  }
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(inputValue));
  };
  return (
    <div className="navbar">
      <h1 className="navbar__header">React Blog 📝</h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            type="text"
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>Search</button>
        </div>
      )}

      {isSignedIn ? <div className="navbar__user__data">
          <Avatar className="user" src={userData?.imageUrl} alt={userData?.name}/>
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="1065168915805-5lbgqnhjd1uvmlj5en8084hkrmktgtno.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout 😦
              </button>
            )}
            onLogoutSuccess={logout}
          />
      </div> : (<h1 className="notSignedIn">User not available 😞</h1>)}
    </div>
  );
};

export default Navbar;
