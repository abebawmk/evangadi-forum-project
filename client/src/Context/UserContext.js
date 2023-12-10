import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });
  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, useUserContext, UserProvider };

// import React, { createContext, useContext, useState } from "react";

// export const UserContext = createContext();

// export const useUserContext = () => useContext(UserContext);

// export const UserProvider(props) {
//   const [userData, setUserData] = useState({
//     user: undefined,
//     token: undefined,
//   });
//   return (
//     <UserContext.Provider value={[userData, setUserData]}>
//       {props.children}
//     </UserContext.Provider>
//   );
// }
