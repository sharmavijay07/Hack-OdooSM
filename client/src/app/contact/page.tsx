"use client";

import Footer from '@/components/Footer';
import TopNav from '@/components/TopNav';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />

            <main className="flex-1 pt-24 pb-16">
                <section className="px-6 mb-16 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Get in touch.
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            We'd love to hear from you. Our team is always here to chat.
                        </p>
                    </div>
                </section>

                <section className="px-6 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="glass-panel p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-muted-foreground">support@inventra.com</p>
                                            <p className="text-muted-foreground">sales@inventra.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                            <p className="text-xs text-muted-foreground mt-1">Mon-Fri from 8am to 5pm EST</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Office</p>
                                            <p className="text-muted-foreground">123 Innovation Drive</p>
                                            <p className="text-muted-foreground">San Francisco, CA 94103</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="glass-panel p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Message</label>
                                    <textarea
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <Button className="w-full" size="lg">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
