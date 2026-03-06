"use client";

import { Logo } from "@/components/atoms/logo";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1C5aN4JCkN/",
  },
  {
    icon: Twitter,
    href: "https://x.com/BlessingComput1",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/blessingcompsofficial?igsh=Znp3MzdyNms2OW5n",
  },
  {
    icon: Youtube,
    href: "http://www.youtube.com/@blessingonlinestorelimited4422",
  },
];

const links = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Store Locator", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Warranty", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setCurrentYear(currentYear);
  }, []);

  return (
    <footer className="bg-primary/0.03 dark:bg-card border-t border-border mt-auto pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <div className="inline-block transition-transform hover:scale-105 duration-300">
              <Logo className="w-40" />
            </div>
            <p className="text-paragraph text-sm leading-relaxed max-w-xs">
              Your one-stop shop for premium computer parts and systems.
              Building dreams, one component at a time.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  href={social.href}
                  className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-xl text-primary transition-all group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Company
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "Careers",
                "Store Locator",
                "Terms of Use",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Support
            </h3>
            <ul className="space-y-4">
              {links[1].links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Contact Info
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-muted-foreground group">
                <div className="p-2 bg-primary/5 rounded-lg text-primary transition-colors group-hover:bg-primary/10">
                  <MapPin className="w-5 h-5 shrink-0" />
                </div>
                <span className="text-sm font-medium pt-1">
                  No 15, Kodesoh Street, Ikeja, Lagos. Nigeria.
                </span>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground group">
                <div className="p-2 bg-primary/5 rounded-lg text-primary transition-colors group-hover:bg-primary/10">
                  <Phone className="w-5 h-5 shrink-0" />
                </div>
                <a
                  href="https://wa.me/2347064901525"
                  className="text-sm font-medium hover:underline hover:underline-offset-2 hover:text-primary transition-colors"
                  target="_blank"
                >
                  +234 706 490 1525
                </a>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground group">
                <div className="p-2 bg-primary/5 rounded-lg text-primary transition-colors group-hover:bg-primary/10">
                  <Mail className="w-5 h-5 shrink-0" />
                </div>
                <a
                  href="mailto:contact@blessingcomputers.com"
                  className="text-sm font-medium hover:underline hover:underline-offset-2 hover:text-primary transition-colors"
                >
                  contact@blessingcomputers.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm font-medium">
            © {currentYear} Blessing Computers. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
