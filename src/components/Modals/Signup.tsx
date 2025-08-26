import { authModalState } from '@/atoms/authModalAtoms';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
    const setAuthModal = useSetRecoilState(authModalState);
     const setAuthModalState=useSetRecoilState(authModalState);
        const handleClick =(p0: string)=>{
            setAuthModalState((prev) => ({ ...prev, type: "login" }));
        }

    const [input, setInput] = React.useState({
        email: "",
        displayName: "",
        password: ""
    });

    const router = useRouter();
    const [
        createUserWithEmailAndPassword, 
        user, 
        loading, 
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.email || !input.password || !input.displayName) return alert("Please fill all fields");
        
        try {
            toast.loading("Creating your account",{position: "top-center",toastId:"loadingToast"});
            const newUser = await createUserWithEmailAndPassword(input.email, input.password);
            if (!newUser) return;
            const userData={
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: input.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: [],
            };
            await setDoc(doc(firestore, "users", newUser.user.uid), userData);
            router.push("/");
        } catch (error: any) {
            toast.error(error.message,{position: "top-center", });
        }finally{
            toast.dismiss("loadingToast");
        }
    };
    useEffect(() => {
        if(error) alert(error.message);
    }, [error]);

    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
            <h3 className="text-xl font-semibold text-white">Register to Code With Me</h3>
            
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
                    />
                </div>
                
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-300">
                        Display Name
                    </label>
                    <input
                        onChange={handleChangeInput}
                        type="text"
                        id="displayName"
                        name="displayName"
                        required
                        placeholder="Full Name"
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 shadow-sm placeholder-gray-400 text-white"
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
                {loading ? 'Registering...' : 'Register'}
            </button>
            
            <div className='text-sm font-medium text-gray-300'>
                Already have an account?{"  "} 
                <a 
                    href="#" 
                    className="text-blue-500 hover:underline" 
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("login");
                    }}
                >
                    Log In
                </a>
            </div>
        </form>
    );
};

export default Signup;