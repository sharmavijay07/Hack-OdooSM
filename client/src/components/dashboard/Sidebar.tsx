"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, FileText, Settings, LogOut, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Box, label: 'Inventory', href: '/dashboard/inventory' },
    { icon: Package, label: 'Products', href: '/dashboard/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders' },
    { icon: Users, label: 'Suppliers', href: '/dashboard/suppliers' },
    { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-border bg-card/30 backdrop-blur-xl z-40 transition-all duration-300">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border/50">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                        I
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        Inventra
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Main Menu
                </div>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <Icon size={18} className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            {item.label}
                        </Link>
                    );
                })}

                <div className="mt-8 px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    System
                </div>
                <Link
                    href="/dashboard/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                        pathname === '/dashboard/settings'
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    <Settings size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    Settings
                </Link>
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-border/50 bg-muted/10">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    onClick={logout}
                >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}
