"use client";

import Sidebar from './Sidebar';
import Header from './Header';
import AIChatbot from '@/components/ai/AIChatbot';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
            <AIChatbot />
        </div>
    );
}
