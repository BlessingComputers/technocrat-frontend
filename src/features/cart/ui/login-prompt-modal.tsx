"use client";

import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoginPromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Shown when a logged-out visitor tries to add to cart. The cart lives on the
 * customer session, so signing in is a real prerequisite rather than an upsell.
 */
export function LoginPromptModal({ open, onOpenChange }: LoginPromptModalProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = () => {
    router.push(`/account?redirect=${encodeURIComponent(pathname)}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 sm:max-w-[420px]">
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Icon
              icon="solar:cart-3-linear"
              aria-hidden
              className="size-6 text-primary"
            />
          </div>
          <DialogTitle className="text-center text-lg">
            Sign in to add items to your cart
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed">
            Your cart is tied to your account, so it follows you across devices.
            Sign in or create one to keep shopping.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Button onClick={handleLogin} size="lg" className="h-11 w-full">
            <Icon icon="solar:login-3-linear" aria-hidden className="size-4" />
            Sign in or create account
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-10 w-full text-muted-foreground"
          >
            Keep browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
