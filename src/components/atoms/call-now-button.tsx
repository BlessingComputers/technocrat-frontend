"use client";

const agents = ["08124362413", "09011215084", "09070604655", "09011455223"];

export function CallNowButton() {
  return (
    <button
      onClick={() => {
        const agent = agents[Math.floor(Math.random() * agents.length)];
        window.location.href = `tel:${agent}`;
      }}
      className="border border-border py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors text-center cursor-pointer"
    >
      Call Now
    </button>
  );
}
