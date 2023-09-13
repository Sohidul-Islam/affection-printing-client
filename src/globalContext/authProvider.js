import React, { createContext } from 'react'
import useFirebase from '../hooks/Auth';

export const AuthContext = createContext();
function AuthContextProvider({children}) {
  const authenications = useFirebase();
  return (
    <AuthContext.Provider value={authenications}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider