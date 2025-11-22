"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StatusBarProps {
    status: string;
    steps?: string[];
}

export function StatusBar({ status, steps = ['DRAFT', 'WAITING', 'READY', 'DONE'] }: StatusBarProps) {
    const currentStepIndex = steps.indexOf(status.toUpperCase());

    return (
        <div className="flex items-center w-full max-w-xl ml-auto">
            {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition-colors relative z-10",
                            isCompleted ? "bg-primary text-primary-foreground border-primary" :
                                isCurrent ? "bg-background text-foreground border-primary ring-2 ring-primary/20" :
                                    "bg-muted text-muted-foreground border-transparent"
                        )}>
                            {isCompleted && <Check size={14} />}
                            {step}
                        </div>
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "h-0.5 w-full mx-2",
                                index < currentStepIndex ? "bg-primary" : "bg-border"
                            )} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
