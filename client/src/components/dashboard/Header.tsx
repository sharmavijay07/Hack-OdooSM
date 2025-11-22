"use client";

import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="h-16 sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl px-6 flex items-center justify-between transition-all duration-300">
            {/* Search Bar */}
            <div className="hidden md:flex items-center w-full max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search inventory, orders, or products..."
                        className="pl-10 bg-muted/50 border-transparent focus:bg-background transition-all"
                    />
                </div>
            </div>

            {/* Mobile Title (Visible only on small screens) */}
            <div className="md:hidden font-bold text-lg">
                Inventra
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </Button>

                <div className="h-8 w-[1px] bg-border mx-1 hidden md:block" />

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                        <p className="text-xs text-muted-foreground mt-1">{user?.email || 'admin@inventra.com'}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-emerald-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
                        <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            <User size={18} className="text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
