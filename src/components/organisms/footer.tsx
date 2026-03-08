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
import { Suspense } from "react";
import { CurrentYear } from "../atoms/current-year";

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

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "/blog" },
      { label: "Products", href: "/product" },
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
  return (
    <footer className="bg-secondary text-white border-t border-border mt-auto pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <Logo className="w-36" />
            <p className="text-background/70 text-sm leading-relaxed max-w-xs">
              Your trusted source for computers, solar systems, generators, and
              electronics for corporate and individual buyers.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  href={social.href}
                  className="p-2 border border-background/20 text-background/70 hover:text-primary hover:border-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 & 3: Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-background mb-6 pb-2 border-b border-background/20">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-background/70 hover:text-primary transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-background mb-6 pb-2 border-b border-background/20">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span className="text-sm">
                  No 15, Kodesoh Street, Ikeja, Lagos. Nigeria.
                </span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <Phone className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:08124362413"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    0812 436 2413
                  </a>
                  <a
                    href="tel:09011215084"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    0901 121 5084
                  </a>
                  <a
                    href="tel:09070604655"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    0907 060 4655
                  </a>
                  <a
                    href="tel:09011455223"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    0901 145 5223
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a
                  href="mailto:contact@blessingcomputers.com"
                  className="text-sm hover:text-primary transition-colors"
                >
                  contact@blessingcomputers.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-background/60 text-sm">
            &copy;{" "}
            <Suspense>
              <CurrentYear />
            </Suspense>{" "}
            Blessing Computers. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-background/60 hover:text-primary text-[10px] font-semibold uppercase tracking-wider transition-colors"
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
