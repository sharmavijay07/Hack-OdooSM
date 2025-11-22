"use client";

import { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const inventoryData = [
    { id: 1, name: 'MacBook Pro M3', sku: 'APP-MBP-M3', category: 'Electronics', stock: 45, status: 'In Stock', price: '$1,299.00' },
    { id: 2, name: 'Wireless Mouse', sku: 'LOG-MX-3', category: 'Accessories', stock: 12, status: 'Low Stock', price: '$99.00' },
    { id: 3, name: 'Mechanical Keyboard', sku: 'KEY-K2-PRO', category: 'Electronics', stock: 0, status: 'Out of Stock', price: '$149.00' },
    { id: 4, name: 'USB-C Hub', sku: 'ANK-HUB-7', category: 'Accessories', stock: 120, status: 'In Stock', price: '$49.99' },
    { id: 5, name: 'Monitor 4K', sku: 'DEL-U2723', category: 'Electronics', stock: 8, status: 'Low Stock', price: '$599.00' },
];

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
                    <p className="text-muted-foreground">Manage your stock levels and products.</p>
                </div>
                <Button className="shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Search inventory..." className="pl-10 bg-background/50" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none">
                            Export
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                            <tr>
                                <th className="px-6 py-3 font-medium">Product Name</th>
                                <th className="px-6 py-3 font-medium">SKU</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Stock</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {inventoryData.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{item.sku}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{item.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-500' :
                                                item.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-red-500/10 text-red-500'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{item.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing 1-5 of 5 items</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
