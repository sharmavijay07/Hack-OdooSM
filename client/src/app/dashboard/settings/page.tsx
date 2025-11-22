"use client";

import { User, Bell, Shield, Palette, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account and preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="glass-panel p-4 rounded-xl h-fit lg:col-span-1">
                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-primary/10 text-primary">
                            <User size={18} /> Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                            <Bell size={18} /> Notifications
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                            <Shield size={18} /> Security
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                            <Palette size={18} /> Appearance
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                            <Globe size={18} /> Language
                        </button>
                        <div className="pt-4 mt-4 border-t border-border/50">
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="glass-panel p-8 rounded-xl lg:col-span-3">
                    <h2 className="text-xl font-bold mb-6">Profile Information</h2>

                    <div className="flex items-center gap-6 mb-8">
                        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground border-4 border-background shadow-lg">
                            JD
                        </div>
                        <div>
                            <Button variant="outline" size="sm" className="mb-2">Change Avatar</Button>
                            <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                    </div>

                    <form className="space-y-6 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input defaultValue="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input defaultValue="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input defaultValue="john.doe@example.com" type="email" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bio</label>
                            <textarea
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                defaultValue="Product Manager at TechCorp. Love building things."
                            />
                        </div>

                        <div className="pt-4">
                            <Button>Save Changes</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
