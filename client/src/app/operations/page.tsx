"use client";

import Link from 'next/link';
import { ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft, History } from 'lucide-react';

export default function OperationsPage() {
    const operations = [
        {
            title: 'Receipts',
            description: 'Manage incoming stock from vendors.',
            href: '/operations/receipts',
            icon: ArrowDownToLine,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
        },
        {
            title: 'Deliveries',
            description: 'Manage outgoing stock to customers.',
            href: '/operations/deliveries',
            icon: ArrowUpFromLine,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
        },
        {
            title: 'Internal Transfers',
            description: 'Move stock between warehouses or locations.',
            href: '/operations/transfers',
            icon: ArrowRightLeft,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
        },
        {
            title: 'Adjustments',
            description: 'Correct stock discrepancies.',
            href: '/operations/adjustments',
            icon: History,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
        },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary">Operations</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {operations.map((op) => {
                    const Icon = op.icon;
                    return (
                        <Link
                            key={op.title}
                            href={op.href}
                            className="block p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-lg ${op.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-6 h-6 ${op.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{op.title}</h3>
                            <p className="text-muted-foreground text-sm">{op.description}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
