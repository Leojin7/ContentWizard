import React, { useState } from 'react';
import { LogoIcon } from '../icons/Icons';

interface LandingPageProps {
    onLogin: (email: string, password?: string) => void;
    onSignup: (name: string, email: string, password?: string) => void;
}

const AuthForm = ({ isLogin, onSubmit, setMode }: { 
    isLogin: boolean; 
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setMode: (mode: 'login' | 'signup') => void;
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {!isLogin && (
                <div>
                    <label className="block text-sm font-bold text-light-2 mb-2" htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full bg-dark-2 border border-dark-3 rounded-lg p-3 text-light-text placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-purple-dark"
                        placeholder="Alisa Williams"
                    />
                </div>
            )}
            <div>
                <label className="block text-sm font-bold text-light-2 mb-2" htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-dark-2 border border-dark-3 rounded-lg p-3 text-light-text placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-purple-dark"
                    placeholder="you@example.com"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-light-2 mb-2" htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full bg-dark-2 border border-dark-3 rounded-lg p-3 text-light-text placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-purple-dark"
                    placeholder="••••••••"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-purple-dark text-white font-bold py-3 rounded-lg hover:bg-opacity-80 transition-colors"
            >
                {isLogin ? 'Log In' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-text">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    type="button"
                    onClick={() => setMode(isLogin ? 'signup' : 'login')}
                    className="font-bold text-purple-dark hover:underline"
                >
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
            </p>
        </form>
    );
};


const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (mode === 'login') {
            onLogin(email, password);
        } else {
            const name = formData.get('name') as string;
            onSignup(name, email, password);
        }
    };
    
    return (
        <div className="min-h-screen bg-dark text-light-text flex flex-col justify-center items-center p-4">
             <div className="absolute top-0 left-0 w-full h-full bg-grid-dark-2 [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>
            <div className="w-full max-w-md z-10">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center space-x-3 mb-4">
                        <LogoIcon className="w-10 h-10 text-light-text" />
                        <h1 className="text-4xl font-bold">Content Wizard</h1>
                    </div>
                    <p className="text-gray-text text-lg">Your AI-powered content & collaboration hub.</p>
                </div>

                <div className="bg-dark-3/50 backdrop-blur-lg border border-dark-3 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                   <AuthForm isLogin={mode === 'login'} onSubmit={handleSubmit} setMode={setMode} />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
