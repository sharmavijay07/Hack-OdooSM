"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import { Lock } from 'lucide-react';

export default function ResetPassword() {
    const router = useRouter();
    const params = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.put(`/auth/resetpassword/${params.token}`, { password });
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <div className="max-w-md w-full bg-card p-8 rounded-xl border border-border shadow-lg">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Lock size={24} />
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-2 text-center text-primary">Reset Password</h2>
                <p className="text-muted-foreground mb-6 text-center">Enter your new password below.</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3 rounded-lg mb-4 text-sm">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
