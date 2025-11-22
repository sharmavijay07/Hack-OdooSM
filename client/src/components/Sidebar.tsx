"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Package,
    ArrowDownToLine,
    ArrowUpFromLine,
    ArrowRightLeft,
    History,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    if (!user || ['/login', '/signup', '/'].includes(pathname)) return null;

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/inventory', label: 'Inventory', icon: Package },
        { href: '/operations/receipts', label: 'Receipts', icon: ArrowDownToLine },
        { href: '/operations/deliveries', label: 'Deliveries', icon: ArrowUpFromLine },
        { href: '/operations/transfers', label: 'Internal Transfers', icon: ArrowRightLeft },
        { href: '/history', label: 'Stock Ledger', icon: History },
    ];

    return (
        <aside className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 flex flex-col z-50">
            <div className="p-6 border-b border-border flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary">
                        Inventra
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">v2.0.0</p>
                </div>
                <ThemeToggle />
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname.startsWith(link.href);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
