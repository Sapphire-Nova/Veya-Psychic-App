import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Go home after success
    } catch (err) {
      setError("Divine connection interrupted. Try again.");
      console.error(err);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      setError("The sanctuary did not recognize those credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-20">
      <div className="max-w-md w-full space-y-8 bg-zinc-900/40 p-10 rounded-[40px] border border-white/5 backdrop-blur-2xl">
        <h2 className="text-3xl font-bold text-white text-center uppercase tracking-tighter">
          {isLogin ? "Sanctuary Entrance" : "Join the Codex"}
        </h2>
        
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-black border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500" onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-4 bg-black border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500" onChange={(e)=>setPassword(e.target.value)} required />
          {error && <p className="text-red-400 text-[10px] text-center uppercase tracking-widest">{error}</p>}
          <button className="w-full py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all">
            {isLogin ? "Enter Sanctuary" : "Begin Journey"}
          </button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-zinc-900/0 px-2 text-zinc-600 tracking-widest">Or</span></div>
        </div>

        <button onClick={handleGoogle} className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest hover:border-purple-500/50 transition-all">
          Sign in with Google
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="text-center text-zinc-500 text-[10px] uppercase tracking-widest cursor-pointer hover:text-purple-400 transition-colors">
          {isLogin ? "New Seeker? Create Account" : "Already a member? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;