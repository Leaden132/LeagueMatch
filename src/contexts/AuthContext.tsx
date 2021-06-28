import React from 'react'
import { useContext, useState, useEffect } from 'react';
import {auth} from '../config/firebase';

const AuthContext = React.createContext('');


export function useAuth():any{
    return useContext(AuthContext);
}


export function AuthProvider({ children }:any) {


    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>()

    function signup({email, password}:any) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

      function login({email, password}:any) {
        return auth.signInWithEmailAndPassword(email, password)
      }
    
      function logout() {
        return auth.signOut()
      }
    
      function resetPassword(email:any) {
        return auth.sendPasswordResetEmail(email)
      }
    
      function updateEmail(email:any) {
        return currentUser.updateEmail(email)
      }
    
      function updatePassword(password:any) {
        return currentUser.updatePassword(password)
      }
    
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user:any) => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])
    
      const value:any = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
      }

    console.log(children);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}