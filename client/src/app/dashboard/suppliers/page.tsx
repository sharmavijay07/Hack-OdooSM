"use client";

import { Search, Plus, MoreVertical, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const suppliers = [
    {
        id: 1,
        name: "TechCorp Inc.",
        contact: "John Doe",
        email: "contact@techcorp.com",
        phone: "+1 (555) 123-4567",
        address: "123 Tech Blvd, San Francisco, CA",
        products: 45,
        status: "Active"
    },
    {
        id: 2,
        name: "Global Logistics",
        contact: "Jane Smith",
        email: "info@globallogistics.com",
        phone: "+1 (555) 987-6543",
        address: "456 Shipping Ln, New York, NY",
        products: 120,
        status: "Active"
    },
    {
        id: 3,
        name: "FastComponents Ltd.",
        contact: "Mike Brown",
        email: "sales@fastcomp.com",
        phone: "+44 20 7123 4567",
        address: "789 Industry Rd, London, UK",
        products: 32,
        status: "Inactive"
    },
    {
        id: 4,
        name: "Green Packaging",
        contact: "Sarah Wilson",
        email: "sarah@greenpack.com",
        phone: "+1 (555) 456-7890",
        address: "101 Eco Way, Portland, OR",
        products: 15,
        status: "Active"
    },
    {
        id: 5,
        name: "MegaByte Systems",
        contact: "David Lee",
        email: "support@megabyte.com",
        phone: "+1 (555) 222-3333",
        address: "202 Silicon Dr, Austin, TX",
        products: 67,
        status: "Active"
    },
];

export default function SuppliersPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
                    <p className="text-muted-foreground">Manage your vendor relationships.</p>
                </div>
                <Button className="gap-2">
                    <Plus size={16} /> Add Supplier
                </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search suppliers..." className="pl-10 bg-background/50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map((supplier) => (
                    <div key={supplier.id} className="glass-panel p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{supplier.name}</h3>
                                <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${supplier.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                                {supplier.status}
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail size={14} className="text-primary" />
                                {supplier.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone size={14} className="text-primary" />
                                {supplier.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin size={14} className="text-primary" />
                                <span className="truncate">{supplier.address}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="text-sm">
                                <span className="font-bold text-foreground">{supplier.products}</span>
                                <span className="text-muted-foreground ml-1">Products</span>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                                View Details <ExternalLink size={14} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
