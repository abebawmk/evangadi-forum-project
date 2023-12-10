import { useEffect } from "react";
import "./App.css";
import { useUserContext } from "./Context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import axios from "axios";
import SharedLayout from "./Shared/SharedLayout";
import Question from "./Pages/Question/Question";
import Answer from "./Pages/Answer/Answer";

function App() {
  const [userData, setUserData] = useUserContext();

  const BASE_URL = "http://localhost:5500/api/users";

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (!token) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        const response = await axios.get(`${BASE_URL}/login`, {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: {
            id: response.data.data.user_id,
            display_name: response.data.data.user_name,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SharedLayout logout={logout} />}>
            <Route
              path="/signup"
              element={
                <>
                  <SignUp />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route
              path="/question"
              element={
                <>
                  <Question />
                </>
              }
            />
            <Route
              path="/answer"
              element={
                <>
                  <Answer />
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import { useEffect } from "react";
// import "./App.css";
// import { useUserContext } from "./Context/UserContext";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Login from "./Pages/Login/Login";
// import SignUp from "./Pages/SignUp/SignUp";
// import axios from "axios";
// import SharedLayout from "./Shared/SharedLayout";
// import Question from "./Pages/Question/Question";
// import Answer from "./Pages/Answer/Answer";

// function App() {
//   const [userData, setUserData] = useUserContext();

//   const checkLoggedIn = async () => {
//     //check if token already exists in localStorage
//     let token = localStorage.getItem("auth-token");
//     if (!token) {
//       //token not in localStorage then set auth token empty
//       localStorage.setItem("auth-token", "");
//       token = "";
//     } else {
//       //if token exists in localStorage then use auth to verify token and get user info
//       const userRes = await axios.get("http://localhost:5500/api/users/login", {
//         headers: { "x-auth-token": token },
//       });

//       //set the global state with user info
//       setUserData({
//         token,
//         user: {
//           id: userRes.data.data.user_id,
//           display_name: userRes.data.data.user_name,
//         },
//       });
//     }
//   };

//   const logout = () => {
//     //set global state to undefined will logout the user
//     setUserData({
//       token: undefined,
//       user: undefined,
//     });

//     //resetting localStorage
//     localStorage.setItem("auth-token", "");
//   };

//   useEffect(() => {
//     //check if the user is logged in
//     checkLoggedIn();
//   },[]);

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<SharedLayout logout={logout} />}>
//             <Route
//               path="/signup"
//               element={
//                 <>
//                   <SignUp />
//                 </>
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <>
//                   <Login />
//                 </>
//               }
//             />
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Home />
//                 </>
//               }
//             />
//             <Route
//               path="/question"
//               element={
//                 <>
//                   <Question />
//                 </>
//               }
//             />
//             <Route
//               path="/answer"
//               element={
//                 <>
//                   <Answer />
//                 </>
//               }
//             />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
