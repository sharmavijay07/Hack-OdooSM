"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        uom: 'pcs',
        minStockLevel: 0,
        initialStock: 0,
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/products', formData);
            router.push('/inventory');
        } catch (error) {
            console.error("Failed to create product", error);
            alert("Failed to create product");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <Link href="/inventory" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
                    <ArrowLeft size={20} />
                    Back to Inventory
                </Link>
                <h1 className="text-3xl font-bold text-primary">Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border shadow-sm space-y-6 max-w-2xl">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-muted-foreground mb-2 text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-muted-foreground mb-2 text-sm font-medium">SKU / Code</label>
                        <input
                            type="text"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-muted-foreground mb-2 text-sm font-medium">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Raw Material">Raw Material</option>
                            <option value="Finished Goods">Finished Goods</option>
                            <option value="Spares">Spares</option>
                            <option value="Packaging">Packaging</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-muted-foreground mb-2 text-sm font-medium">Unit of Measure</label>
                        <select
                            value={formData.uom}
                            onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="pcs">Pieces (pcs)</option>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="m">Meters (m)</option>
                            <option value="box">Box</option>
                            <option value="l">Liters (l)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-muted-foreground mb-2 text-sm font-medium">Initial Stock</label>
                        <input
                            type="number"
                            value={formData.initialStock}
                            onChange={(e) => setFormData({ ...formData, initialStock: Number(e.target.value) })}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-muted-foreground mb-2 text-sm font-medium">Min Stock Alert Level</label>
                        <input
                            type="number"
                            value={formData.minStockLevel}
                            onChange={(e) => setFormData({ ...formData, minStockLevel: Number(e.target.value) })}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-muted-foreground mb-2 text-sm font-medium">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 h-24"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link
                        href="/inventory"
                        className="px-6 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors shadow-sm"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}
