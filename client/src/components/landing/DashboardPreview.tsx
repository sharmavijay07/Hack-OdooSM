"use client";

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, DollarSign, Package, ShoppingCart, Activity } from 'lucide-react';

const data = [
    { name: 'Mon', revenue: 4000, orders: 2400 },
    { name: 'Tue', revenue: 3000, orders: 1398 },
    { name: 'Wed', revenue: 2000, orders: 9800 },
    { name: 'Thu', revenue: 2780, orders: 3908 },
    { name: 'Fri', revenue: 1890, orders: 4800 },
    { name: 'Sat', revenue: 2390, orders: 3800 },
    { name: 'Sun', revenue: 3490, orders: 4300 },
];

export default function DashboardPreview() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-[400px] w-full bg-muted/10 animate-pulse rounded-xl" />;

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Stat Card 1 */}
                <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <DollarSign className="text-primary h-5 w-5" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                            +12.5% <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-foreground">$45,231.89</h3>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <ShoppingCart className="text-blue-500 h-5 w-5" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                            +8.2% <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Active Orders</p>
                        <h3 className="text-2xl font-bold text-foreground">+573</h3>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Package className="text-purple-500 h-5 w-5" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-rose-500 bg-rose-500/10 px-2 py-1 rounded-full">
                            -2.1% <Activity className="h-3 w-3 ml-1" />
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Low Stock Items</p>
                        <h3 className="text-2xl font-bold text-foreground">12</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[300px]">
                {/* Main Chart */}
                <div className="lg:col-span-2 glass-panel p-4 rounded-xl flex flex-col">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Revenue Overview</h3>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Secondary Chart */}
                <div className="glass-panel p-4 rounded-xl flex flex-col">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Orders by Day</h3>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgb(var(--muted)/0.5)' }}
                                    contentStyle={{ backgroundColor: 'rgb(var(--card))', borderColor: 'rgb(var(--border))', borderRadius: '8px' }}
                                />
                                <Bar dataKey="orders" fill="rgb(var(--secondary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
