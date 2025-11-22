"use client";

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    description?: string;
    className?: string;
}

export default function StatsCard({ title, value, trend, trendUp, icon: Icon, description, className }: StatsCardProps) {
    return (
        <div className={cn("glass-panel p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-all duration-300 group", className)}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary h-6 w-6" />
                </div>
                {trend && (
                    <span className={cn(
                        "flex items-center text-xs font-medium px-2.5 py-1 rounded-full",
                        trendUp
                            ? "text-emerald-500 bg-emerald-500/10"
                            : "text-rose-500 bg-rose-500/10"
                    )}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-foreground tracking-tight mb-1">{value}</h3>
                <p className="text-sm text-muted-foreground font-medium">{title}</p>
                {description && (
                    <p className="text-xs text-muted-foreground/70 mt-2">{description}</p>
                )}
            </div>
        </div>
    );
}
