"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import SocialAuth from '@/components/ui/SocialAuth';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] opacity-30" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="w-full max-w-md p-4 relative z-10">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Home
                </Link>

                <div className="glass-panel p-8 rounded-2xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500 mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to your Inventra account</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm flex items-center animate-in fade-in slide-in-from-top-2">
                            <span className="mr-2">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                                className="bg-background/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-foreground ml-1">Password</label>
                                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="bg-background/50"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 text-base shadow-lg shadow-primary/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <SocialAuth />
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-primary hover:underline font-medium">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
