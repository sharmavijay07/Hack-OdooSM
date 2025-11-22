"use client";

import { Check } from 'lucide-react';
import Footer from '@/components/Footer';
import TopNav from '@/components/TopNav';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const plans = [
    {
        name: "Starter",
        price: "$0",
        description: "Perfect for side projects and small startups.",
        features: [
            "Up to 1,000 orders/mo",
            "Basic Inventory Tracking",
            "1 Warehouse Location",
            "Email Support",
            "Mobile App Access"
        ],
        popular: false
    },
    {
        name: "Pro",
        price: "$49",
        description: "For growing businesses that need more power.",
        features: [
            "Unlimited orders",
            "Advanced Analytics",
            "5 Warehouse Locations",
            "Priority Support",
            "API Access",
            "Custom Reports"
        ],
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Tailored solutions for large-scale operations.",
        features: [
            "Unlimited Everything",
            "Dedicated Account Manager",
            "Custom Integrations",
            "SLA & Uptime Guarantee",
            "On-premise Deployment",
            "24/7 Phone Support"
        ],
        popular: false
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />

            <main className="flex-1 pt-24 pb-16">
                <section className="px-6 mb-16 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Simple, transparent pricing.
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            No hidden fees. No credit card required to start. Cancel anytime.
                        </p>
                    </div>
                </section>

                <section className="px-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "glass-panel p-8 rounded-2xl flex flex-col relative transition-all duration-300 hover:-translate-y-2",
                                    plan.popular ? "border-primary ring-2 ring-primary/20 shadow-xl shadow-primary/10" : "hover:border-primary/30"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <div className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                                <Check size={10} className="text-emerald-500" />
                                            </div>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    variant={plan.popular ? "default" : "outline"}
                                    className="w-full"
                                    size="lg"
                                >
                                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
