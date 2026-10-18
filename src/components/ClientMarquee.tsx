"use client";

import Image from "next/image";

// Intrinsic sizes, so next/image reserves the right box for each logo.
const clients = [
  { name: "Cognizant", src: "/clients/cognizant.png", width: 200, height: 35 },
  { name: "AdAptive", src: "/clients/adaptive.png", width: 200, height: 43 },
  { name: "Quantec", src: "/clients/quantec.png", width: 200, height: 38 },
  { name: "Reductivist", src: "/clients/reductivist.png", width: 200, height: 41 },
  { name: "Unkillable", src: "/clients/unkillable.png", width: 200, height: 46 },
  { name: "HCIT", src: "/clients/hcit_logo.svg", width: 291, height: 86 },
];

export default function ClientMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section aria-label="Our clients" className="py-14 border-y border-outline-variant overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee gap-20 w-max">
          {doubled.map((client, i) => (
            <Image
              key={`${client.name}-${i}`}
              src={client.src}
              alt={`${client.name} logo`}
              width={client.width}
              height={client.height}
              // The default loader does not optimize SVG.
              unoptimized={client.src.endsWith(".svg")}
              className="h-8 w-auto opacity-50 hover:opacity-100 m3-transition transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
