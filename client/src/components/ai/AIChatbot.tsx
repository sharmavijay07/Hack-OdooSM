"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hi! I\'m your Inventra AI assistant. How can I help you manage your inventory today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            // Format history for Gemini (excluding the last user message we just added locally)
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const res = await api.post('/ai/chat', {
                message: userMessage,
                history: history
            });

            setMessages(prev => [...prev, { role: 'model', text: res.data.text }]);
        } catch (error) {
            console.error('Chat error:', error);
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to my brain right now. 🧠\n\nWhile I reconnect, you can still use the Dashboard to:\n• Check inventory levels\n• Manage orders\n• View reports" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 transition-all duration-300 hover:scale-110",
                    isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-gradient-to-r from-primary to-emerald-600"
                )}
            >
                {isOpen ? <X className="h-6 w-6 text-white" /> : <Sparkles className="h-6 w-6 text-white" />}
            </Button>

            {/* Chat Window */}
            <div className={cn(
                "fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] glass-panel rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right border-primary/20",
                isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10 pointer-events-none"
            )}>
                {/* Header */}
                <div className="p-4 border-b border-border/50 bg-primary/5 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Inventra AI</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                msg.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                    : "bg-muted text-foreground rounded-bl-none"
                            )}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2 flex gap-1">
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce delay-75" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            className="flex-1 bg-background/80"
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
