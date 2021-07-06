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
    const [searchError, setSearchError] = useState(false);

    function signup({email, password}:any) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

      function login({email, password}:any) {
        return auth.signInWithEmailAndPassword(email, password)
      }

      function searchErrorSet(boo:boolean) {
        setSearchError(boo);
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
      
      function updateDisplayName(name:string) {
        return currentUser.updateProfile({
          displayName: name
        })
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
        searchError,
        searchErrorSet,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateDisplayName
      }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}