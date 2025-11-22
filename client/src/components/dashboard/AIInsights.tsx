"use client";

import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

export default function AIInsights() {
    const [insight, setInsight] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInsights = async () => {
        setIsLoading(true);
        try {
            // Mock data to send for analysis
            const dashboardData = {
                revenue: 45231.89,
                revenueTrend: "+20.1%",
                activeOrders: 2350,
                lowStockItems: ["Wireless Mouse", "Monitor 4K"],
                topSelling: "MacBook Pro M3"
            };

            const res = await api.post('/ai/insights', { data: dashboardData });
            setInsight(res.data.text);
        } catch (error) {
            console.error('Insights error:', error);
            // Fallback to mock insights if API fails
            setInsight(`• Revenue is trending up by 20.1% compared to last month, driven by strong sales of MacBook Pro M3.
• Stock levels for "Wireless Mouse" are critically low; consider restocking immediately to avoid lost sales.
• Active orders have increased significantly; ensure logistics capacity is sufficient for the weekend rush.`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    return (
        <div className="glass-panel p-6 rounded-xl relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="h-24 w-24 text-primary" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">AI Daily Insights</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchInsights}
                        disabled={isLoading}
                        className="h-8 w-8 p-0"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                <div className="min-h-[100px]">
                    {isLoading && !insight ? (
                        <div className="space-y-2 animate-pulse">
                            <div className="h-4 bg-muted/50 rounded w-3/4" />
                            <div className="h-4 bg-muted/50 rounded w-full" />
                            <div className="h-4 bg-muted/50 rounded w-5/6" />
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                {insight || "Click refresh to generate AI insights based on your current data."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
