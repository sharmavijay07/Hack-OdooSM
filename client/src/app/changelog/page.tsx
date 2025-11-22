"use client";

import Footer from '@/components/Footer';
import TopNav from '@/components/TopNav';

const updates = [
    {
        version: "v2.1.0",
        date: "November 15, 2024",
        title: "Advanced Analytics Dashboard",
        description: "We've completely overhauled the reporting engine. You can now create custom reports, visualize trends with new chart types, and export data in more formats.",
        changes: [
            "New 'Insights' tab in dashboard",
            "Export to PDF and Excel",
            "Custom date range filtering",
            "Performance improvements for large datasets"
        ],
        type: "Major"
    },
    {
        version: "v2.0.5",
        date: "October 28, 2024",
        title: "Mobile App Improvements",
        description: "Bug fixes and UI enhancements for the iOS and Android apps.",
        changes: [
            "Fixed barcode scanning issue on some Android devices",
            "Improved offline mode synchronization",
            "Dark mode support for mobile"
        ],
        type: "Patch"
    },
    {
        version: "v2.0.0",
        date: "September 10, 2024",
        title: "The Big 2.0 Release",
        description: "A brand new design system, faster performance, and multi-warehouse support.",
        changes: [
            "Complete UI redesign",
            "Multi-warehouse inventory tracking",
            "New API endpoints",
            "Enhanced security features"
        ],
        type: "Major"
    }
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />

            <main className="flex-1 pt-24 pb-16">
                <section className="px-6 mb-16 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Changelog
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Stay up to date with the latest improvements and fixes.
                        </p>
                    </div>
                </section>

                <section className="px-6 max-w-3xl mx-auto">
                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                        {updates.map((update, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                {/* Icon */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <div className={`w-3 h-3 rounded-full ${update.type === 'Major' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                                </div>

                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-sm text-primary font-bold">{update.version}</span>
                                        <time className="font-mono text-xs text-muted-foreground">{update.date}</time>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{update.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-4">{update.description}</p>
                                    <ul className="space-y-1">
                                        {update.changes.map((change, i) => (
                                            <li key={i} className="text-xs text-muted-foreground/80 flex items-start gap-2">
                                                <span className="block w-1 h-1 rounded-full bg-foreground/50 mt-1.5" />
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
