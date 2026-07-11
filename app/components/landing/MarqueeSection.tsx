import React from "react";

const MarqueeRow = ({ items, reverse = false }: { items: any[], reverse?: boolean }) => {
  return (
    <div className={`landing-marquee-row ${reverse ? "landing-marquee-row--reverse" : ""}`}>
      <div className="landing-marquee-content">
        {items.map((item, i) => (
          <React.Fragment key={i}>{item}</React.Fragment>
        ))}
      </div>
      <div className="landing-marquee-content" aria-hidden="true">
        {items.map((item, i) => (
          <React.Fragment key={i + items.length}>{item}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default function MarqueeSection() {
  const wordsRow1 = ["WE ARE HONEST", "", "WE ARE AGILE", "", "WE KEEP IT SIMPLE"];
  const wordsRow2 = ["WE EMBRACE THE UNKNOWN", "WE KEEP IT SIMPLE", ""];
  const wordsRow3 = ["WE ARE AGILE", "", "WE KEEP IT SIMPLE", ""];

  const renderPill = (text: string, style: "outline" | "filled" | "empty" | "accent", index: number) => {
    if (style === "empty") {
      return <div key={index} className="landing-marquee-pill landing-marquee-pill--empty" />;
    }
    return (
      <div
        key={index}
        className={`landing-marquee-pill ${
          style === "filled" 
            ? "landing-marquee-pill--filled" 
            : style === "accent" 
              ? "landing-marquee-pill--accent" 
              : "landing-marquee-pill--outline"
        }`}
      >
        {text}
      </div>
    );
  };

  const row1Items = [
    renderPill("", "empty", 0),
    renderPill("WE ARE HONEST", "outline", 1),
    renderPill("WE ARE AGILE", "outline", 2),
    renderPill("", "empty", 3),
    renderPill("WE KEEP IT SIMPLE", "outline", 4),
  ];

  const row2Items = [
    renderPill("WE EMBRACE THE UNKNOWN", "outline", 0),
    renderPill("WE KEEP IT SIMPLE", "outline", 1),
    renderPill("", "empty", 2),
    renderPill("JOIN US NOW", "accent", 3),
    renderPill("WE ARE HONEST", "outline", 4),
  ];

  const row3Items = [
    renderPill("", "empty", 0),
    renderPill("WE ARE AGILE", "outline", 1),
    renderPill("WE KEEP IT SIMPLE", "outline", 2),
    renderPill("", "empty", 3),
    renderPill("WE EMBRACE THE UNKNOWN", "outline", 4),
  ];

  return (
    <section className="landing-marquee-container" style={{ marginTop: "5rem", marginBottom: "3rem" }}>
      <MarqueeRow items={row1Items} />
      <MarqueeRow items={row2Items} reverse={true} />
      <MarqueeRow items={row3Items} />
    </section>
  );
}
