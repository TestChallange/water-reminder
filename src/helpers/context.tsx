import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { createContext, useState, useContext, ReactElement } from 'react'

interface AuthStateInterface {
  user: FirebaseAuthTypes.User | null
  isAuthenticating: boolean
  isInitializing: boolean
}

interface ContextInterface {
  authState: AuthStateInterface
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateInterface>>
}

const initialState: ContextInterface['authState'] = {
  user: null,
  isAuthenticating: false,
  isInitializing: true,
}

const AuthContext = createContext<Partial<ContextInterface>>({})

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [authState, setAuthState] = useState(initialState)
  const value = { authState, setAuthState }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export const useLogout = () => {
  const { setAuthState } = useAuthContext()
  const logout = () => {
    setAuthState && setAuthState({ user: null, isAuthenticating: false, isInitializing: false })
    auth().signOut()
  }
  return [logout] as const
}
