"use client";

import { Zap, Shield, BarChart3, Globe, Smartphone, Layers, Box, Users, RefreshCw } from 'lucide-react';
import Footer from '@/components/Footer';
import TopNav from '@/components/TopNav';

const features = [
    {
        icon: Zap,
        title: "Real-time Tracking",
        description: "Monitor stock levels instantly as orders come in. Never oversell or run out of stock again."
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade encryption and role-based access control to keep your sensitive business data safe."
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Gain actionable insights with our AI-powered reporting engine. Forecast demand with precision."
    },
    {
        icon: Globe,
        title: "Multi-Location Support",
        description: "Manage inventory across multiple warehouses, retail stores, and fulfillment centers from one dashboard."
    },
    {
        icon: Smartphone,
        title: "Mobile App",
        description: "Scan barcodes, check stock, and manage orders on the go with our native iOS and Android apps."
    },
    {
        icon: Layers,
        title: "Batch Tracking",
        description: "Track product expiry dates and batch numbers for complete traceability and compliance."
    },
    {
        icon: Box,
        title: "Order Management",
        description: "Streamline your fulfillment process from order receipt to delivery with automated workflows."
    },
    {
        icon: Users,
        title: "Supplier Portal",
        description: "Collaborate directly with suppliers, automate purchase orders, and track shipments."
    },
    {
        icon: RefreshCw,
        title: "Automated Sync",
        description: "Sync inventory across Shopify, Amazon, WooCommerce, and your physical stores in real-time."
    }
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />

            <main className="flex-1 pt-24 pb-16">
                {/* Hero Section */}
                <section className="px-6 mb-20 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Everything you need to run your inventory.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Powerful features built for modern businesses. From small startups to large enterprises, Inventra scales with you.
                        </p>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 group"
                            >
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mt-24 px-6">
                    <div className="max-w-5xl mx-auto glass-panel p-12 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to upgrade your workflow?</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
                            Join thousands of businesses that trust Inventra to manage their operations.
                        </p>
                        <button className="relative z-10 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
                            Get Started for Free
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
