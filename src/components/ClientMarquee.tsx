"use client";

const clients = [
  { name: "Cognizant", src: "/clients/cognizant.png" },
  { name: "AdAptive", src: "/clients/adaptive.png" },
  { name: "Quantec", src: "/clients/quantec.png" },
  { name: "Reductivist", src: "/clients/reductivist.png" },
  { name: "Unkillable", src: "/clients/unkillable.png" },
  { name: "HCIT", src: "/clients/hcit_logo.svg" },
];

export default function ClientMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section aria-label="Our clients" className="py-14 border-y border-outline-variant overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee gap-20 w-max">
          {doubled.map((client, i) => (
            <img
              key={`${client.name}-${i}`}
              src={client.src}
              alt={`${client.name} logo`}
              loading="lazy"
              width={120}
              height={32}
              className="h-8 w-auto opacity-50 hover:opacity-100 m3-transition transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
