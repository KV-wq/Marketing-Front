import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly (name, email, address, phone), information generated through your use of our services (order history, usage data), and technical data (IP address, browser type, cookies) to operate and improve our platform.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information to deliver and improve our services, process payments, communicate with you about your orders and account, send service-related notifications, and — with your consent — share marketing communications.",
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell your personal data. We share data only with service providers necessary to operate our platform (payment processors, email providers, analytics tools) and as required by law. All third parties are bound by data processing agreements.",
  },
  {
    title: "Cookies",
    content:
      "We use essential cookies to operate our platform and analytics cookies to understand usage patterns. You may disable non-essential cookies through your browser settings, though this may affect functionality.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us.",
  },
  {
    title: "Your Rights",
    content:
      "Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. To exercise these rights, contact hello@forma-agency.com. We will respond within 30 days.",
  },
  {
    title: "Security",
    content:
      "We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security audits. No method of transmission over the internet is 100% secure, but we take reasonable precautions.",
  },
  {
    title: "Contact",
    content:
      "For any privacy-related questions or requests, contact our Data Protection Officer at privacy@forma-agency.com or by post at FORMA Agency Ltd., 375 Park Avenue, New York, NY 10152.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-28 px-6 md:px-10 max-w-3xl mx-auto">
        <div className="py-12 border-b border-black/10 mb-12">
          <p className="text-[10px] tracking-widest uppercase text-black/30 mb-3">
            Legal
          </p>
          <h1 className="font-display text-5xl font-light">Privacy Policy</h1>
          <p className="text-sm text-black/40 mt-3">Last updated: January 1, 2025</p>
        </div>

        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="font-medium text-base mb-3">{sec.title}</h2>
              <p className="text-sm text-black/60 leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
