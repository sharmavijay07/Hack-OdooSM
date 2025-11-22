"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Github, Chrome, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function SocialAuth() {
    const { login } = useAuth();
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingGithub, setLoadingGithub] = useState(false);

    const handleMockLogin = async (provider: 'google' | 'github') => {
        const setLoading = provider === 'google' ? setLoadingGoogle : setLoadingGithub;
        setLoading(true);

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Call mock endpoint
            const res = await api.post('/auth/mock-login', { provider });
            login(res.data);
        } catch (error) {
            console.error("Mock login failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    onClick={() => handleMockLogin('google')}
                    disabled={loadingGoogle || loadingGithub}
                    className="w-full bg-background hover:bg-muted transition-colors"
                >
                    {loadingGoogle ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
                    Google
                </Button>
                <Button
                    variant="outline"
                    onClick={() => handleMockLogin('github')}
                    disabled={loadingGoogle || loadingGithub}
                    className="w-full bg-background hover:bg-muted transition-colors"
                >
                    {loadingGithub ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
                    GitHub
                </Button>
            </div>
        </div>
    );
}
