"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Plus, Trash2, Printer, X } from 'lucide-react';
import { StatusBar } from '@/components/StatusBar';

interface Product {
    _id: string;
    name: string;
    sku: string;
    price: number;
}

interface OperationItem {
    product: string;
    quantity: number;
    name?: string; // For display
}

export default function NewOperation() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'RECEIPT'; // RECEIPT, DELIVERY, TRANSFER, ADJUSTMENT

    const [products, setProducts] = useState<Product[]>([]);
    const [items, setItems] = useState<OperationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('DRAFT');

    // Form Fields
    const [contact, setContact] = useState('');
    const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().split('T')[0]);
    const [responsible, setResponsible] = useState('');

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

        // Mock user as responsible for now
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setResponsible(user.name);
        }
    }, []);

    const addItem = () => {
        setItems([...items, { product: '', quantity: 1 }]);
    };

    const updateItem = (index: number, field: keyof OperationItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };

        if (field === 'product') {
            const product = products.find(p => p._id === value);
            if (product) {
                newItems[index].name = product.name;
            }
        }
        setItems(newItems);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async (targetStatus = 'DRAFT') => {
        setLoading(true);
        try {
            await api.post('/operations', {
                type,
                items: items.map(item => ({ product: item.product, quantity: Number(item.quantity) })),
                status: targetStatus,
                contact,
                scheduleDate,
                responsible
            });
            router.push(type === 'RECEIPT' ? '/operations/receipts' : '/operations/deliveries');
        } catch (error) {
            console.error("Failed to create operation", error);
            alert("Failed to create operation");
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        switch (type) {
            case 'RECEIPT': return 'New Receipt';
            case 'DELIVERY': return 'New Delivery';
            case 'TRANSFER': return 'New Transfer';
            case 'ADJUSTMENT': return 'New Adjustment';
            default: return 'New Operation';
        }
    };

    const getRefPlaceholder = () => {
        switch (type) {
            case 'RECEIPT': return 'WH/IN/000X';
            case 'DELIVERY': return 'WH/OUT/000X';
            default: return 'WH/OPS/000X';
        }
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Top Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm sticky top-20 z-40">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleSubmit('READY')}
                        disabled={loading}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-bold transition-colors shadow-sm disabled:opacity-50"
                    >
                        Validate
                    </button>
                    <button
                        className="bg-card hover:bg-muted text-foreground border border-border px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Printer size={18} /> Print
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="bg-card hover:bg-muted text-foreground border border-border px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <X size={18} /> Cancel
                    </button>
                </div>

                <StatusBar status={status} />
            </div>

            {/* Main Form */}
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-primary mb-8">{getRefPlaceholder()}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                {type === 'RECEIPT' ? 'Receive From' : 'Delivery Address'}
                            </label>
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder={type === 'RECEIPT' ? 'Vendor Name' : 'Customer Name'}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">Responsible</label>
                            <input
                                type="text"
                                value={responsible}
                                readOnly
                                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-muted-foreground cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">Schedule Date</label>
                            <input
                                type="date"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">Operation Type</label>
                            <div className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-muted-foreground">
                                {getTitle()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Products</h3>
                    </div>

                    <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-muted text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="p-4 w-1/2">Product</th>
                                    <th className="p-4 w-1/4">Quantity</th>
                                    <th className="p-4 w-1/4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {items.map((item, index) => (
                                    <tr key={index} className="group hover:bg-muted/50">
                                        <td className="p-4">
                                            <select
                                                value={item.product}
                                                onChange={(e) => updateItem(index, 'product', e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-0 text-foreground p-0"
                                            >
                                                <option value="">Select Product</option>
                                                {products.map((p) => (
                                                    <option key={p._id} value={p._id}>
                                                        [{p.sku}] {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-0 text-foreground p-0"
                                            />
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3} className="p-4">
                                        <button
                                            onClick={addItem}
                                            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add New Product
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
