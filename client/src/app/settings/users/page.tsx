"use client";

import { useState, useEffect } from 'react';
import { Users as UsersIcon, Shield, Mail } from 'lucide-react';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function UsersPage() {
    const [users] = useState<User[]>([
        {
            _id: '1',
            name: 'Admin User',
            email: 'admin@inventra.com',
            role: 'Admin',
            createdAt: new Date().toISOString()
        },
        {
            _id: '2',
            name: 'Warehouse Manager',
            email: 'manager@inventra.com',
            role: 'Manager',
            createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
            _id: '3',
            name: 'Stock Clerk',
            email: 'clerk@inventra.com',
            role: 'Staff',
            createdAt: new Date(Date.now() - 172800000).toISOString()
        }
    ]);

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'Admin':
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'Manager':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Users</h1>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
                    <UsersIcon size={18} />
                    Add User
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-muted text-muted-foreground border-b border-border">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-muted/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-primary font-semibold">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <span className="font-medium text-foreground">{user.name}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail size={16} />
                                        {user.email}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleBadge(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-muted-foreground">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-primary hover:text-primary/80 font-medium text-sm">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Shield className="text-blue-500 mt-0.5" size={20} />
                    <div>
                        <h3 className="font-semibold text-foreground mb-1">User Management</h3>
                        <p className="text-sm text-muted-foreground">
                            Manage user roles and permissions. Admins have full access, Managers can create operations, and Staff can view inventory.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
