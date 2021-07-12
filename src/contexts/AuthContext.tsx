import React from 'react'
import { useContext, useState, useEffect } from 'react';
import {auth} from '../config/firebase';

// interface AuthContextProps {
//   value:useAuthInterface
// }

const AuthContext = React.createContext({} as useAuthInterface);

export interface useAuthInterface {
  currentUser: any;
  searchError: boolean;
  searchErrorSet: (boo: boolean) => void;
  login:(email:string, password:string)=>void;
  signup:(email:string, password:string)=>any;
  logout:()=>Promise<void>;
  resetPassword:(email: string) => Promise<void>;
  updateEmail: (email: string) => any;
  updatePassword: (password: string) => any;
  updateDisplayName: (name: string) => any
}

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider( {children}:any ) {


    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>()
    const [searchError, setSearchError] = useState(false);

    function signup(email:string, password:string) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

      function login(email:string, password:string) {
        return auth.signInWithEmailAndPassword(email, password)
      }

      function searchErrorSet(boo:boolean) {
        setSearchError(boo);
      }
    
      function logout() {
        return auth.signOut()
      }
    
      function resetPassword(email:string) {
        return auth.sendPasswordResetEmail(email)
      }
      
      function updateEmail(email:string) {
        if(currentUser){
        return currentUser.updateEmail(email)
      }
      }
    
      function updatePassword(password:string) {
        if(currentUser){
        return currentUser.updatePassword(password)
        }
      }
      
      function updateDisplayName(name:string) {
        if(currentUser){
        return currentUser.updateProfile({
          displayName: name
        })
      }
      }
    
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])
    
      const value:useAuthInterface = {
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