"use client";

import { DollarSign, Package, ShoppingCart, Activity, Bell } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import AIInsights from '@/components/dashboard/AIInsights';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', revenue: 4000, orders: 2400 },
    { name: 'Tue', revenue: 3000, orders: 1398 },
    { name: 'Wed', revenue: 2000, orders: 9800 },
    { name: 'Thu', revenue: 2780, orders: 3908 },
    { name: 'Fri', revenue: 1890, orders: 4800 },
    { name: 'Sat', revenue: 2390, orders: 3800 },
    { name: 'Sun', revenue: 3490, orders: 4300 },
];

const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Created new order', target: '#ORD-2024-001', time: '2 mins ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated stock', target: 'MacBook Pro M3', time: '15 mins ago' },
    { id: 3, user: 'System', action: 'Low stock alert', target: 'Wireless Mouse', time: '1 hour ago' },
    { id: 4, user: 'Mike Johnson', action: 'Added new supplier', target: 'TechCorp Inc.', time: '3 hours ago' },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your inventory performance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                        Last updated: Just now
                    </span>
                </div>
            </div>

            {/* AI Insights Widget */}
            <AIInsights />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Revenue"
                    value="$45,231.89"
                    trend="+20.1% from last month"
                    trendUp={true}
                    icon={DollarSign}
                />
                <StatsCard
                    title="Active Orders"
                    value="+2350"
                    trend="+180.1% from last month"
                    trendUp={true}
                    icon={ShoppingCart}
                />
                <StatsCard
                    title="Products"
                    value="12,234"
                    trend="+19% from last month"
                    trendUp={true}
                    icon={Package}
                />
                <StatsCard
                    title="Low Stock"
                    value="12"
                    trend="-4 since last hour"
                    trendUp={false}
                    icon={Activity}
                    className="border-l-4 border-l-rose-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-4 glass-panel p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Revenue Overview</h3>
                        <button className="text-sm text-primary hover:underline">View Report</button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenueDash" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--card))', borderColor: 'rgb(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'rgb(var(--foreground))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="rgb(var(--primary))"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorRevenueDash)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity / Secondary Chart */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="glass-panel p-6 rounded-xl h-full">
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                        <Bell size={14} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            <span className="font-bold">{activity.user}</span> {activity.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{activity.target}</p>
                                        <p className="text-[10px] text-muted-foreground/70 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-sm text-center text-muted-foreground hover:text-primary transition-colors border border-border rounded-lg hover:bg-muted/50">
                            View All Activity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
