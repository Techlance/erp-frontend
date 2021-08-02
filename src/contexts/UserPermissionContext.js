import React, { createContext, useEffect, useReducer } from "react";

const JWTContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);


  useEffect(() => {
    const init = async () => {
      try {
        
        
      } catch (err) {
        
      }
    };

    init();
  }, []);

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
