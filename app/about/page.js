import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const values = [
  {
    title: "Precision",
    desc: "Every campaign, every creative asset, every data point is scrutinised. We don't guess — we test, measure, and optimise relentlessly.",
  },
  {
    title: "Ambition",
    desc: "We work best with brands that want to be number one in their category. Incremental growth is a starting point, not a destination.",
  },
  {
    title: "Transparency",
    desc: "You see everything. Full access to data, real-time reporting, and honest conversations — even when the news isn't good.",
  },
  {
    title: "Craft",
    desc: "Marketing is an art as much as a science. We hold ourselves to the highest creative and strategic standards on every brief.",
  },
];

const team = [
  { name: "Elena Marchetti", role: "Chief Executive Officer" },
  { name: "David Park", role: "Chief Strategy Officer" },
  { name: "Olivia Thorpe", role: "Head of Performance" },
  { name: "Marcus Veen", role: "Head of Brand" },
  { name: "Priya Nair", role: "Head of Analytics" },
  { name: "James O'Brien", role: "Head of Content" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto py-20 border-b border-black/10">
          <p className="text-[10px] tracking-widest uppercase text-black/30 mb-5">
            About FORMA
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-light leading-[1.02] max-w-3xl">
            The Art &amp; Science of Growth
          </h1>
          <p className="text-black/50 text-base leading-relaxed max-w-xl mt-8">
            Founded in 2012, FORMA is a full-service marketing agency built for
            ambitious brands. Over twelve years we've grown from a boutique
            consultancy to a 60-strong team of specialists, generating over $2.4
            billion in revenue for our clients.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-[#0a0a0a] px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/30 mb-5">
                Our Mission
              </p>
              <p className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
                To transform marketing from a cost centre into your most
                powerful growth engine.
              </p>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              We believe that exceptional marketing — the kind that moves
              markets, builds brands, and drives compounding returns — requires
              a rare combination of strategic rigour, creative boldness, and
              relentless execution. That's the standard we hold ourselves to on
              every engagement, for every client.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto py-24">
          <p className="text-[10px] tracking-widest uppercase text-black/30 mb-14">
            Our Values
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="font-display text-2xl font-light mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-black/50 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        {/* <section className="bg-[#f8f8f8] px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] tracking-widests uppercase text-black/30 mb-14">
              Leadership
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {team.map((member) => (
                <div key={member.name}>
                  <div className="aspect-square bg-black/5 mb-4" />
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-black/40 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA */}
        <section className="px-6 md:px-10 py-24 text-center max-w-2xl mx-auto">
          <p className="font-display text-4xl font-light mb-4">
            Ready to Work Together?
          </p>
          <p className="text-black/50 text-sm leading-relaxed mb-10">
            Browse our services or get in touch to discuss a bespoke engagement.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/services"
              className="bg-black text-white px-10 py-4 text-xs tracking-widests uppercase hover:bg-black/80 transition-colors"
            >
              Our Services
            </Link>
            <Link
              href="/contact"
              className="border border-black text-black px-10 py-4 text-xs tracking-widests uppercase hover:bg-black/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
