"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

interface Warehouse {
    _id: string;
    name: string;
    shortCode: string;
    address: string;
}

export default function WarehousesPage() {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [newWarehouse, setNewWarehouse] = useState({ name: '', shortCode: '', address: '' });

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const fetchWarehouses = async () => {
        try {
            const res = await api.get('/warehouses');
            setWarehouses(res.data);
        } catch (error) {
            console.error("Failed to fetch warehouses", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            await api.post('/warehouses', newWarehouse);
            setNewWarehouse({ name: '', shortCode: '', address: '' });
            fetchWarehouses();
        } catch (error) {
            console.error("Failed to create warehouse", error);
            alert("Failed to create warehouse");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/warehouses/${id}`);
            fetchWarehouses();
        } catch (error) {
            console.error("Failed to delete warehouse", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Warehouses</h1>
            </div>

            {/* Create Form */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Add New Warehouse</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Warehouse Name"
                        value={newWarehouse.name}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                        className="bg-muted border border-border rounded-lg px-4 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Short Code (e.g., WH1)"
                        value={newWarehouse.shortCode}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, shortCode: e.target.value })}
                        className="bg-muted border border-border rounded-lg px-4 py-2 uppercase"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={newWarehouse.address}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
                        className="bg-muted border border-border rounded-lg px-4 py-2"
                    />
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                    <Plus size={18} /> Create Warehouse
                </button>
            </div>

            {/* List */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-muted text-muted-foreground border-b border-border">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Short Code</th>
                            <th className="p-4">Address</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {warehouses.map((wh) => (
                            <tr key={wh._id} className="hover:bg-muted/50">
                                <td className="p-4 font-medium">{wh.name}</td>
                                <td className="p-4 font-mono text-sm">{wh.shortCode}</td>
                                <td className="p-4 text-muted-foreground">{wh.address}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(wh._id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {warehouses.length === 0 && !loading && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                    No warehouses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
