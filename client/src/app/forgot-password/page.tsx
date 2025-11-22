"use client";

import { useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState(''); // For demo purposes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        setResetToken('');

        try {
            const res = await api.post('/auth/forgotpassword', { email });
            setMessage(res.data.message);
            if (res.data.data) {
                setResetToken(res.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <div className="max-w-md w-full bg-card p-8 rounded-xl border border-border shadow-lg">
                <Link href="/login" className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Login
                </Link>

                <h2 className="text-3xl font-bold mb-2 text-primary">Forgot Password</h2>
                <p className="text-muted-foreground mb-6">Enter your email to receive a reset link.</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3 rounded-lg mb-4 text-sm">
                        {message}
                        {resetToken && (
                            <div className="mt-2 pt-2 border-t border-emerald-500/20">
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono break-all">
                                    Mock Link: <Link href={`/reset-password/${resetToken}`} className="underline">/reset-password/{resetToken}</Link>
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
