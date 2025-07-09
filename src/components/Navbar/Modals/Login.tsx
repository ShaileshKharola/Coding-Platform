import React from 'react';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    
    return <form className="space-y-6 px-6 pb-4">
        <h3 className="text-xl font-semibold text-white">Sign in to  Code With Me</h3>
       <div className="space-y-4">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email address
            </label>
        <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="name@company.com"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 shadow-sm placeholder-gray-400 text-white"/>
        </div>
    <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
        Password
    </label>
    <input
        type="password"
        id="password"
        name="password"
        required
        placeholder="********"
        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 shadow-sm placeholder-gray-400 text-white"/>
    </div>
</div>
<button type="submit" className="py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    Login
</button>

    </form>
}
export default Login;