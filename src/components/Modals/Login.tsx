import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtoms';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    
    const router = useRouter();

    const handleClick = (type: "login" | "register" | "resetPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.email || !input.password) {
            alert("Please fill all fields");
            return;
        }
        
        try {
            const newUser = await signInWithEmailAndPassword(input.email, input.password);
            if (!newUser) return;
            router.push("/");
        } catch (error: any) {
          
        }
    };
    useEffect(() => {
        if (error) alert(error.message);
    }, [error]);
    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
            <h3 className="text-xl font-semibold text-white">Sign in to Code With Me</h3>
            
            {error && (
                <p className="text-red-500 text-sm">
                    {error.message}
                </p>
            )}
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email address
                    </label>
                    <input
                        onChange={handleChangeInput}
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 shadow-sm placeholder-gray-400 text-white"
                        value={input.email}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Password
                    </label>
                    <input
                        onChange={handleChangeInput}
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="********"
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 shadow-sm placeholder-gray-400 text-white"
                        value={input.password}
                    />
                </div>
            </div>
            
            <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <button 
                type="button"
                className="flex w-full justify-center"
                onClick={(e) => {
                    e.preventDefault();
                    handleClick("resetPassword");
                }}
            >
                <span className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
                    Forgot your password?
                </span>
            </button>
            
            <div className='text-sm font-medium text-gray-300'>
                Not registered?{"  "} 
                <a 
                    href="#" 
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("register");
                    }}
                >
                    Create an account
                </a>
            </div>
        </form>
    );
};

export default Login;