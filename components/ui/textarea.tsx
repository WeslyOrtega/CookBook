import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoExpand?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onInput, autoExpand, ...props }, ref) => {
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoExpand) {
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
      }
      if (onInput) onInput(e);
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          autoExpand ? "overflow-y-hidden resize-none" : "",
          className
        )}
        ref={ref}
        onInput={handleInput}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
