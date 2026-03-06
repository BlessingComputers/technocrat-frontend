import { StaticImageData } from "next/image";
import image from "../../../../public/assets/2024-Latest-Dell-XPS-13-9340-4th-Gen-Intel-Ultra7-155H-14th-gen-1TB-SSD-32GB-RAM.jpeg";

interface FeaturedProductProps {
  id: string;
  price: number;
  image: StaticImageData;
  model: string;
  name: string;
  specs: string;
}

export const FEATURED_PRODUCTS: FeaturedProductProps[] = [
  {
    id: "hp-elitebook-x360-1040-g10",
    model: "HP",
    name: "HP Elitebook X360 1040 G10",
    price: 715000,
    specs:
      "Intel Core i7-10710U (1.1 GHz base frequency, up to 4.7 GHz with Intel Turbo Boost Technology, 12 MB L3 cache, 6 cores) Intel 16 GB LPDDR4-2933 MHz RAM, 512 GB PCIe® NVMe™ SSD Audio by Bang & Olufsen Intel UHD Graphics 620, TOUCHSCREEN| Click pad with multi-touch gesture support| HDMI | Lan | Backlit Keyboard| Webcam | Bluetooth| 65W USB Type-C™ Adapter. Fingerprint Sensor Windows 11",
    image: image,
  },
  {
    id: "hp-240-g10-notebook-pc",
    model: "HP",
    name: "HP 240 G10 Notebook PC",
    price: 737000,
    specs:
      "Intel® Core™ i5-1335U (up to 4.6 GHz with Intel® Turbo Boost Technology, 12 MB L3 cache, 10 cores, 12 threads), 512GB PCIe® NVMe™ SSD, 8GB DDR4-3200 MT/s (1 x 8 GB) 2 SODIMM, 14 'diagonal, FHD (1920 x 1080), IPS, micro-edge, anti-glare,250 nits, 45% NTSC, 35.6 cm (14') diagonal, FHD (1920 x 1080), IPS, Micro-Edge, Anti-Glare, 250 nits, 45% NTSC, Backlit keyboard with numeric keypad, FINGERPRINT, HP Smart 45 W External AC power Adapter, Realtek Wi-Fi 6 (2x2) and Bluetooth®️Realtek Wi-Fi 6 (2x2) and Bluetooth, WINDOWS 11",
    image: image,
  },
  {
    id: "lenovo-thinkbook-14-g8ial",
    model: "Lenovo",
    name: "Lenovo Thinkbook 14 G8IAL",
    price: 1100000,
    image: image,
    specs:
      "INTEL CORE ULTRA 5 225U, 12C (2P + 8E + 2LPE) / 14T, MAX TURBO I1X 16GB SO-DIMM DDR5-5600, 512GB SSD M.2 2242 PCIE 4.0X4 NVME INTEGRATED INTEL GRAPHICS FHD, CAMERA 1080p WITH PRIVACY SHUTTER| Battery 45W| STEREO SPEAKERS, 2W X2, DOLBY AUDIO™|WLAN + Bluetooth®[7] NON-TOUCH Keyboard Backlit| 1-YEAR, COURIER OR CARRY-INNTEL FREEDOS",
  },
  {
    id: "hp-cs10-wireless-keyboard-and-mouse-combo",
    name: "HP CS10 Wireless Keyboard and Mouse Combo",
    model: "HP",
    price: 35000,
    image: image,
    specs: "Bluetooth option",
  },
  {
    id: "hp-m10-wired-mouse",
    name: "HP M10 Wired Mouse",
    model: "HP",
    price: 10000,
    image: image,
    specs: "Wired option",
  },
  {
    id: "dell-latitude-5430",
    name: "Dell Latitude 5430",
    model: "Dell",
    price: 1100000,
    image: image,
    specs:
      "14inch, 12th gen, intel i7, 8GB DDR4-3200 MHz, 512GB, PCIe NVMe, Bluetooth, Universal Audio Port, HDMI 2.0 Port, 14-inch FHD (1920 x 1080) Wide View Angle Anti-Glare IPS 250-nits Non-Touch Display, HD Camera with Shutter, Temporal Noise Reduction and Microphone, Smart Card Reader, Thunderbolt 4-4-Cell, 58 WHR Lithium Ion Battery, Windows 11 Pro",
  },
];
