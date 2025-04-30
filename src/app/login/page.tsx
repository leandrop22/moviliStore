"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(message);
    }
  };

  return (
    <div className="form-container login">
      <h1 className="form-title">Iniciar sesión</h1>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleLogin} className="form">
        <input className="form-input" type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="form-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="form-button" type="submit">Ingresar</button>
      </form>
    </div>
  );
}
