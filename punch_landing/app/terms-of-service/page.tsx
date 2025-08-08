import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import PageIllustration from "@/components/page-illustration";

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <PageIllustration />
      <main className="flex-1 flex items-center justify-center pt-32 pb-16">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full px-8 py-10 border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-[#FB7A20]">Terms of Service</h1>
          <p className="mb-6 text-lg">By using Punch, you agree to these terms. Please read them carefully.</p>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Acceptance</h2>
            <p>By accessing or using Punch, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Use of Service</h2>
            <p>You may use Punch only for lawful purposes. You are responsible for your account and activity.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Rewards</h2>
            <p>Rewards are subject to availability and may change at any time. We are not responsible for rewards offered by third-party businesses.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Termination</h2>
            <p>We may suspend or terminate your access to Punch at any time for violation of these terms or misuse of the service.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Changes</h2>
            <p>We may update these terms from time to time. Continued use of Punch means you accept the new terms.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p>If you have questions about these terms, email us at <a href="mailto:legal@punchapp.com" className="text-[#FB7A20] underline">legal@punchapp.com</a>.</p>
          </section>
        </div>
      </main>
      <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Punch'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Punch'] after:[text-shadow:0_1px_0_white]"></div>
      <Footer />
    </div>
  );
} 