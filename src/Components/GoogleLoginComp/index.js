// import React, { useState, useEffect } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
// import "./index.css";
// import { useNavigate } from "react-router-dom";
// import { connect } from "react-redux";

// const GoogleLoginComp = React.memo(({ errorMessage }) => {
//   const [userDetails, setUserDetails] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userDetails.email) {
//       localStorage.setItem("userDetails", JSON.stringify(userDetails));
//       navigate("/dashboard", { state: { userDetails } });
//     }
//   }, [userDetails, navigate]);

//   return (
//     <GoogleOAuthProvider clientId="776626639075-gmjoit7ivmc9tck898rbc9gn1u7cv7l2.apps.googleusercontent.com">
//       <div className="login-button">
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             const details = jwt_decode(credentialResponse.credential);
//             setUserDetails(details);
//           }}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />
//       </div>
//       <div>
//         {errorMessage === "Request failed with status code 500" && (
//           <div className="error-msg">
//             Invalid User: Please check the account !!
//           </div>
//         )}
//       </div>
//     </GoogleOAuthProvider>
//   );
// });

// const mapStateToProps = (state) => {
//   return {
//     userIsValid: state.user,
//     errorMessage: state.message,
//     userLoaded: state.isUserLoaded,
//   };
// };

// export default connect(mapStateToProps)(GoogleLoginComp);
