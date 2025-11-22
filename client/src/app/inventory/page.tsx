"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p: any) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Inventory</h1>
                <Link
                    href="/inventory/new"
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    placeholder="Search by Name or SKU..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-muted text-muted-foreground border-b border-border">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">SKU</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">UOM</th>
                            <th className="p-4">Min Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredProducts.map((product: any) => (
                            <tr key={product._id} className="hover:bg-muted/50 transition-colors">
                                <td className="p-4 font-medium text-foreground">{product.name}</td>
                                <td className="p-4 text-muted-foreground">{product.sku}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full bg-muted text-xs text-foreground border border-border">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4 text-muted-foreground">{product.uom}</td>
                                <td className="p-4 text-muted-foreground">{product.minStockLevel}</td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
