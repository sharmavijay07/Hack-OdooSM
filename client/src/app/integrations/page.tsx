"use client";

import { ArrowRight, ShoppingBag, Truck, CreditCard, MessageSquare, Database, Cloud } from 'lucide-react';
import Footer from '@/components/Footer';
import TopNav from '@/components/TopNav';
import { Button } from '@/components/ui/Button';

const integrations = [
    {
        category: "E-commerce",
        items: [
            { name: "Shopify", icon: ShoppingBag, description: "Sync orders and inventory in real-time." },
            { name: "WooCommerce", icon: ShoppingBag, description: "Connect your WordPress store seamlessly." },
            { name: "Amazon", icon: ShoppingBag, description: "Manage FBA and FBM inventory centrally." },
        ]
    },
    {
        category: "Shipping & Fulfillment",
        items: [
            { name: "FedEx", icon: Truck, description: "Automate shipping labels and tracking." },
            { name: "UPS", icon: Truck, description: "Real-time rates and delivery updates." },
            { name: "ShipStation", icon: Truck, description: "Streamline order fulfillment workflow." },
        ]
    },
    {
        category: "Accounting & Finance",
        items: [
            { name: "QuickBooks", icon: CreditCard, description: "Auto-sync invoices and expenses." },
            { name: "Xero", icon: CreditCard, description: "Seamless financial reporting and reconciliation." },
            { name: "Stripe", icon: CreditCard, description: "Manage payments and subscriptions." },
        ]
    },
    {
        category: "Communication",
        items: [
            { name: "Slack", icon: MessageSquare, description: "Get low stock alerts directly in channels." },
            { name: "Microsoft Teams", icon: MessageSquare, description: "Collaborate on orders with your team." },
        ]
    }
];

export default function IntegrationsPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />

            <main className="flex-1 pt-24 pb-16">
                <section className="px-6 mb-16 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Connect with your favorite tools.
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Inventra plays nicely with the software you already use.
                        </p>
                    </div>
                </section>

                <section className="px-6 max-w-7xl mx-auto space-y-16">
                    {integrations.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-2xl font-bold mb-8 border-b border-border/50 pb-4">{section.category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.items.map((item, i) => (
                                    <div key={i} className="glass-panel p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <item.icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <section className="mt-24 px-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Don't see what you need?</h2>
                    <p className="text-muted-foreground mb-8">
                        Our API is open and flexible. Build your own custom integration.
                    </p>
                    <Button variant="outline">View API Documentation</Button>
                </section>
            </main>

            <Footer />
        </div>
    );
}
