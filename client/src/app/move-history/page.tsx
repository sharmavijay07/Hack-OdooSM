"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Search, Filter } from 'lucide-react';

interface LedgerEntry {
    _id: string;
    product: {
        _id: string;
        name: string;
        sku: string;
    };
    warehouse: string;
    location: string;
    change: number;
    balanceAfter: number;
    operationType: string;
    createdAt: string;
    performedBy?: {
        name: string;
    };
}

export default function MoveHistoryPage() {
    const [entries, setEntries] = useState<LedgerEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await api.get('/ledger');
            setEntries(res.data);
        } catch (error) {
            console.error("Failed to fetch ledger entries", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEntries = entries.filter((entry) =>
        entry.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
        entry.product?.sku?.toLowerCase().includes(search.toLowerCase()) ||
        entry.warehouse?.toLowerCase().includes(search.toLowerCase())
    );

    const getOperationColor = (type: string) => {
        switch (type) {
            case 'RECEIPT': return 'text-emerald-500';
            case 'DELIVERY': return 'text-rose-500';
            case 'TRANSFER': return 'text-blue-500';
            case 'ADJUSTMENT': return 'text-yellow-500';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Move History</h1>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    placeholder="Search by Product, SKU, or Warehouse..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-muted text-muted-foreground border-b border-border">
                        <tr>
                            <th className="p-4">Date & Time</th>
                            <th className="p-4">Product</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Warehouse</th>
                            <th className="p-4">Location</th>
                            <th className="p-4 text-right">Change</th>
                            <th className="p-4 text-right">Balance After</th>
                            <th className="p-4">Performed By</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredEntries.map((entry) => (
                            <tr key={entry._id} className="hover:bg-muted/50 transition-colors">
                                <td className="p-4 text-muted-foreground">
                                    {new Date(entry.createdAt).toLocaleString()}
                                </td>
                                <td className="p-4">
                                    <div className="font-medium text-foreground">{entry.product?.name}</div>
                                    <div className="text-sm text-muted-foreground">{entry.product?.sku}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`font-medium ${getOperationColor(entry.operationType)}`}>
                                        {entry.operationType}
                                    </span>
                                </td>
                                <td className="p-4 text-muted-foreground">{entry.warehouse}</td>
                                <td className="p-4 text-muted-foreground">{entry.location}</td>
                                <td className={`p-4 text-right font-medium ${entry.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {entry.change >= 0 ? '+' : ''}{entry.change}
                                </td>
                                <td className="p-4 text-right font-medium text-foreground">{entry.balanceAfter}</td>
                                <td className="p-4 text-muted-foreground">{entry.performedBy?.name || 'System'}</td>
                            </tr>
                        ))}
                        {filteredEntries.length === 0 && !loading && (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                                    No move history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
