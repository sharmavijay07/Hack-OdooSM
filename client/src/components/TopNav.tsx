"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { LogOut, User, LayoutDashboard, Package, ArrowRightLeft, History, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TopNav() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // Hide nav on auth pages and landing page (optional, but requested to be improved)
    // Actually, let's keep it hidden on auth pages but maybe show a simplified version on landing?
    // For now, following existing logic but improving the look.
    if (!user || ['/login', '/signup', '/'].includes(pathname)) return null;

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/operations', label: 'Operations', icon: ArrowRightLeft },
        { href: '/inventory', label: 'Products', icon: Package },
        { href: '/history', label: 'History', icon: History },
        { href: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">
                                Inventra
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-1">
                            {links.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon size={16} />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-medium text-foreground">{user.name}</span>
                                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={logout}
                                className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
