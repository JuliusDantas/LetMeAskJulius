import {createContext, ReactNode, useEffect, useState} from 'react';

import {auth, firebase } from '../services/firebase'

export const AuthContext = createContext({} as AuthContextType);

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWhithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps = {
      children: ReactNode;
  }

  
export function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        const { displayName, photoURL, uid } = user;

          if(!displayName || !photoURL) {
            throw new Error('Missing information from google acount.')
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL

          })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWhithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

      
        if(result.user) {
          const { displayName, photoURL, uid } = result.user;

          if(!displayName || !photoURL) {
            throw new Error('Missing information from google acount.')
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL

          })
        }
        
  }
    return (
        <AuthContext.Provider value={{ user, signInWhithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}