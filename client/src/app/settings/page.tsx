"use client";

import Link from 'next/link';
import { Warehouse, MapPin, Users, Shield } from 'lucide-react';

export default function SettingsPage() {
    const settingsItems = [
        {
            title: 'Warehouses',
            description: 'Manage physical warehouses and their details.',
            icon: <Warehouse size={24} />,
            href: '/settings/warehouses',
            color: 'bg-blue-100 text-blue-600',
        },
        {
            title: 'Locations',
            description: 'Configure storage locations within warehouses.',
            icon: <MapPin size={24} />,
            href: '/settings/locations',
            color: 'bg-green-100 text-green-600',
        },
        {
            title: 'Users',
            description: 'Manage system users and permissions.',
            icon: <Users size={24} />,
            href: '/settings/users',
            color: 'bg-purple-100 text-purple-600',
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settingsItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                    >
                        <div className={`p-3 rounded-lg ${item.color}`}>
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
