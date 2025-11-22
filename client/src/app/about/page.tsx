"use client";

import Footer from '@/components/Footer';
import TopNav from '@/components/TopNav';
import { Users, Heart, Globe, Award } from 'lucide-react';

const team = [
    { name: "Alex Morgan", role: "CEO & Founder", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    { name: "Sarah Chen", role: "CTO", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { name: "James Wilson", role: "Head of Design", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
    { name: "Emily Davis", role: "Product Manager", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
];

const stats = [
    { label: "Active Users", value: "50k+", icon: Users },
    { label: "Countries", value: "120+", icon: Globe },
    { label: "Team Members", value: "45", icon: Heart },
    { label: "Awards Won", value: "12", icon: Award },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />

            <main className="flex-1 pt-24 pb-16">
                {/* Hero */}
                <section className="px-6 mb-20 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            We're building the future of commerce.
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Inventra was founded with a simple mission: to make inventory management accessible, powerful, and beautiful.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="px-6 max-w-7xl mx-auto mb-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="glass-panel p-6 rounded-xl text-center">
                                <div className="h-10 w-10 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <stat.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission */}
                <section className="px-6 mb-24">
                    <div className="max-w-5xl mx-auto glass-panel p-12 rounded-3xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    It started in a small warehouse in 2020. We were frustrated with the clunky, outdated software available for managing stock. Spreadsheets were error-prone, and enterprise ERPs were too expensive.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    So we built Inventra. Designed for the modern merchant, it combines enterprise-grade power with consumer-grade design. Today, we help thousands of businesses around the world streamline their operations.
                                </p>
                            </div>
                            <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 border border-border/50 flex items-center justify-center">
                                <span className="text-primary font-bold text-xl">Office Image Placeholder</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="px-6 max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="group">
                                <div className="relative mb-4 rounded-2xl overflow-hidden aspect-square bg-muted">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="font-bold text-lg">{member.name}</h3>
                                <p className="text-muted-foreground text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
