import Link from 'next/link';
import { Package, TrendingUp, BarChart3, Shield, Zap, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Footer from '@/components/Footer';
import DashboardPreview from '@/components/landing/DashboardPreview';

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border mb-8 animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">v2.0 is now live</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Inventory Management <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Reimagined</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Stop wrestling with spreadsheets. Experience real-time tracking, automated operations, and powerful analytics in one beautiful platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/login">
                            <Button size="lg" className="text-lg px-8 h-14 rounded-full shadow-xl shadow-primary/20">
                                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg" className="text-lg px-8 h-14 rounded-full border-2">
                                View Demo Dashboard
                            </Button>
                        </Link>
                    </div>

                    {/* Hero Image / Dashboard Preview */}
                    <div className="mt-20 relative mx-auto max-w-6xl">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
                        <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="ml-4 flex-1 flex justify-center">
                                    <div className="h-6 w-64 bg-muted/50 rounded-md flex items-center justify-center text-[10px] text-muted-foreground">
                                        app.inventra.com/dashboard
                                    </div>
                                </div>
                            </div>
                            <div className="bg-muted/10">
                                <DashboardPreview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-muted/30 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Powerful features designed to help you maintain complete control over your inventory.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Package className="text-primary" size={24} />}
                            title="Smart Product Management"
                            description="Centralized catalog with SKU tracking, categories, and automated low-stock alerts."
                        />
                        <FeatureCard
                            icon={<TrendingUp className="text-emerald-500" size={24} />}
                            title="Real-time Tracking"
                            description="Live updates on stock movements across all warehouses with complete audit trails."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="text-blue-500" size={24} />}
                            title="Advanced Analytics"
                            description="Visual insights with KPIs, charts, and trend analysis for data-driven decisions."
                        />
                        <FeatureCard
                            icon={<Shield className="text-purple-500" size={24} />}
                            title="Multi-Warehouse Support"
                            description="Manage multiple locations and warehouses with hierarchical organization."
                        />
                        <FeatureCard
                            icon={<Zap className="text-yellow-500" size={24} />}
                            title="Automated Operations"
                            description="Streamline receipts, deliveries, and transfers with one-click workflows."
                        />
                        <FeatureCard
                            icon={<Users className="text-rose-500" size={24} />}
                            title="Team Collaboration"
                            description="Role-based access control to keep your team aligned and secure."
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 px-4">
                <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to transform your inventory?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
                        Join thousands of businesses that trust Inventra for their inventory management needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link href="/signup">
                            <Button size="lg" className="px-8">Start Free Trial</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="px-8 bg-background">Contact Sales</Button>
                        </Link>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground relative z-10">
                        <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-primary" /> No credit card required</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-primary" /> 14-day free trial</span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}
