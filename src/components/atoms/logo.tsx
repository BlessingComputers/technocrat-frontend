import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className || ""}`}>
      <Image
        src={logo}
        alt="Blessing Online Stores Logo"
        className="w-full h-auto"
        priority
        sizes="(max-width: 768px) 112px, 144px"
      />
    </Link>
  );
}
