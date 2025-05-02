import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    getAuth,
  } from "firebase/auth";
 

  export function onUserStateChange(callback: (user: User | null) => void)  {
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
}

import { auth } from "./firebaseConfig";

  /**
   * Registra un nuevo usuario con email y contraseña.
   */
  export async function register(email: string, password: string): Promise<User | null> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error("Error al registrar:", error);
      return null;
    }
  }
  
  /**
   * Inicia sesión con email y contraseña.
   */
  export async function login(email: string, password: string): Promise<User | null> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  }
  
  /**
   * Cierra la sesión actual.
   */
  export async function logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }
  
  /**
   * Escucha cambios en el estado de autenticación.
   */
  export function onUserChange(callback: (user: User | null) => void): void {
    onAuthStateChanged(auth, callback);
  }

  
  