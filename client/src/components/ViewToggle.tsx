"use client";

import { LayoutList, Kanban } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
    view: 'list' | 'kanban';
    setView: (view: 'list' | 'kanban') => void;
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
    return (
        <div className="flex items-center bg-muted p-1 rounded-lg border border-border">
            <button
                onClick={() => setView('list')}
                className={cn(
                    "p-2 rounded-md transition-all",
                    view === 'list'
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                )}
                title="List View"
            >
                <LayoutList size={18} />
            </button>
            <button
                onClick={() => setView('kanban')}
                className={cn(
                    "p-2 rounded-md transition-all",
                    view === 'kanban'
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                )}
                title="Kanban View"
            >
                <Kanban size={18} />
            </button>
        </div>
    );
}
