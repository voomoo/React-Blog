import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn, setSignedIn, setUserData } from "../features/userSlice";
import "../styling/home.css"

function Homepage() {

    const dispatch = useDispatch();

  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj))
  };

  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="home__page" style={{display: isSignedIn ? "none" : ""}}>
      {!isSignedIn ? (
        <div className="login__message">
          <h2>📗</h2>
          <h1>A Readers favourite place!</h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <GoogleLogin
            clientId="1065168915805-5lbgqnhjd1uvmlj5en8084hkrmktgtno.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button"
              >
                Login With Google
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Homepage;
