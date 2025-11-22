"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Plus, Trash2 } from 'lucide-react';

interface Warehouse {
    _id: string;
    name: string;
}

interface Location {
    _id: string;
    name: string;
    shortCode: string;
    warehouse: Warehouse;
}

export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(true);
    const [newLocation, setNewLocation] = useState({ name: '', shortCode: '', warehouse: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [locRes, whRes] = await Promise.all([
                api.get('/locations'),
                api.get('/warehouses')
            ]);
            setLocations(locRes.data);
            setWarehouses(whRes.data);
            if (whRes.data.length > 0) {
                setNewLocation(prev => ({ ...prev, warehouse: whRes.data[0]._id }));
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            await api.post('/locations', newLocation);
            setNewLocation({ ...newLocation, name: '', shortCode: '' });
            // Refresh locations
            const res = await api.get('/locations');
            setLocations(res.data);
        } catch (error) {
            console.error("Failed to create location", error);
            alert("Failed to create location");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/locations/${id}`);
            const res = await api.get('/locations');
            setLocations(res.data);
        } catch (error) {
            console.error("Failed to delete location", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Locations</h1>
            </div>

            {/* Create Form */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Add New Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <select
                        value={newLocation.warehouse}
                        onChange={(e) => setNewLocation({ ...newLocation, warehouse: e.target.value })}
                        className="bg-muted border border-border rounded-lg px-4 py-2"
                    >
                        <option value="" disabled>Select Warehouse</option>
                        {warehouses.map(wh => (
                            <option key={wh._id} value={wh._id}>{wh.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Location Name (e.g., Row A)"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                        className="bg-muted border border-border rounded-lg px-4 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Short Code (e.g., LOC-A)"
                        value={newLocation.shortCode}
                        onChange={(e) => setNewLocation({ ...newLocation, shortCode: e.target.value })}
                        className="bg-muted border border-border rounded-lg px-4 py-2 uppercase"
                    />
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                    <Plus size={18} /> Create Location
                </button>
            </div>

            {/* List */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-muted text-muted-foreground border-b border-border">
                        <tr>
                            <th className="p-4">Warehouse</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Short Code</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {locations.map((loc) => (
                            <tr key={loc._id} className="hover:bg-muted/50">
                                <td className="p-4">{loc.warehouse?.name || 'Unknown'}</td>
                                <td className="p-4 font-medium">{loc.name}</td>
                                <td className="p-4 font-mono text-sm">{loc.shortCode}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(loc._id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {locations.length === 0 && !loading && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                    No locations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
