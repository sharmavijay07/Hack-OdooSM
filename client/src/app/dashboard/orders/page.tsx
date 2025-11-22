"use client";

import { Search, Filter, MoreHorizontal, ArrowUpDown, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const orders = [
    { id: "ORD-001", customer: "Alice Johnson", date: "2024-03-10", total: "$1,200.00", status: "Delivered", items: 3 },
    { id: "ORD-002", customer: "Bob Smith", date: "2024-03-11", total: "$850.50", status: "Processing", items: 2 },
    { id: "ORD-003", customer: "Charlie Brown", date: "2024-03-12", total: "$2,300.00", status: "Shipped", items: 5 },
    { id: "ORD-004", customer: "Diana Prince", date: "2024-03-12", total: "$450.00", status: "Pending", items: 1 },
    { id: "ORD-005", customer: "Evan Wright", date: "2024-03-13", total: "$3,100.00", status: "Processing", items: 8 },
    { id: "ORD-006", customer: "Fiona Green", date: "2024-03-13", total: "$120.00", status: "Delivered", items: 1 },
    { id: "ORD-007", customer: "George King", date: "2024-03-14", total: "$900.00", status: "Pending", items: 2 },
];

const statusStyles = {
    Delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Shipped: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">Manage and track customer orders.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download size={16} /> Export
                    </Button>
                    <Button className="gap-2">
                        + New Order
                    </Button>
                </div>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search orders..." className="pl-10 bg-background/50" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-none">
                            <Filter size={16} /> Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Items</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-primary">{order.id}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                                    <td className="px-6 py-4">{order.items}</td>
                                    <td className="px-6 py-4 font-medium">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", statusStyles[order.status as keyof typeof statusStyles])}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Eye size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing 1-7 of 7 orders</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
