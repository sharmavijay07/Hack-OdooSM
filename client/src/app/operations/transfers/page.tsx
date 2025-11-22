"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Search } from 'lucide-react';
import { ViewToggle } from '@/components/ViewToggle';

export default function TransfersPage() {
    const [operations, setOperations] = useState([]);
    const [view, setView] = useState<'list' | 'kanban'>('list');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOperations = async () => {
            try {
                const res = await api.get('/operations?type=TRANSFER');
                setOperations(res.data);
            } catch (error) {
                console.error("Failed to fetch transfers", error);
            }
        };
        fetchOperations();
    }, []);

    const filteredOperations = operations.filter((op: any) =>
        (op.reference || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (op.contact || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Link
                        href="/operations/new?type=TRANSFER"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-bold transition-colors shadow-sm"
                    >
                        NEW
                    </Link>
                    <h1 className="text-2xl font-bold text-primary">Internal Transfers</h1>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <ViewToggle view={view} setView={setView} />
                </div>
            </div>

            {/* Content */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                {view === 'list' ? (
                    <table className="w-full text-left">
                        <thead className="bg-muted text-muted-foreground border-b border-border">
                            <tr>
                                <th className="p-4 font-semibold">Reference</th>
                                <th className="p-4 font-semibold">From</th>
                                <th className="p-4 font-semibold">To</th>
                                <th className="p-4 font-semibold">Responsible</th>
                                <th className="p-4 font-semibold">Schedule Date</th>
                                <th className="p-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredOperations.map((op: any) => (
                                <tr key={op._id} className="hover:bg-muted/50 transition-colors">
                                    <td className="p-4 font-medium text-primary">
                                        <Link href={`/operations/${op._id}`}>{op.reference || 'WH/TRF/XXXX'}</Link>
                                    </td>
                                    <td className="p-4 text-foreground">Main Warehouse</td>
                                    <td className="p-4 text-foreground">Production Floor</td>
                                    <td className="p-4 text-muted-foreground">{op.responsible || 'Admin'}</td>
                                    <td className="p-4 text-muted-foreground">{new Date(op.scheduleDate || op.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${op.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-500' :
                                                op.status === 'READY' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-slate-500/10 text-slate-500'
                                            }`}>
                                            {op.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredOperations.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                        No transfers found. Create your first internal transfer to move stock between locations.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-muted-foreground">
                        Kanban view coming soon...
                    </div>
                )}
            </div>
        </div>
    );
}
