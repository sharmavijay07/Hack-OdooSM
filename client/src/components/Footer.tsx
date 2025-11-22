import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary">Inventra</h3>
                        <p className="text-sm text-muted-foreground">
                            The modern inventory management solution for forward-thinking businesses.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:support@inventra.com" className="hover:text-primary transition-colors">support@inventra.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Inventra IMS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
