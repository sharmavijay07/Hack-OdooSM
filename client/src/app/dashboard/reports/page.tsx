"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const salesData = [
    { name: 'Jan', sales: 4000, profit: 2400 },
    { name: 'Feb', sales: 3000, profit: 1398 },
    { name: 'Mar', sales: 2000, profit: 9800 },
    { name: 'Apr', sales: 2780, profit: 3908 },
    { name: 'May', sales: 1890, profit: 4800 },
    { name: 'Jun', sales: 2390, profit: 3800 },
];

const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Home', value: 300 },
    { name: 'Sports', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground">Visualize your business performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar size={16} /> Last 30 Days
                    </Button>
                    <Button className="gap-2">
                        <Download size={16} /> Export PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales & Profit Chart */}
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-6">Sales vs Profit</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgb(var(--muted-foreground))' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgb(var(--muted-foreground))' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--card))', borderColor: 'rgb(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'rgb(var(--foreground))' }}
                                />
                                <Bar dataKey="sales" fill="rgb(var(--primary))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-6">Sales by Category</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--card))', borderColor: 'rgb(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'rgb(var(--foreground))' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {categoryData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-muted-foreground">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inventory Value Trend */}
                <div className="glass-panel p-6 rounded-xl lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-6">Inventory Value Trend</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgb(var(--muted-foreground))' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgb(var(--muted-foreground))' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--card))', borderColor: 'rgb(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'rgb(var(--foreground))' }}
                                />
                                <Line type="monotone" dataKey="sales" stroke="rgb(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
