import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import PageIllustration from "@/components/page-illustration";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <PageIllustration />
      <main className="flex-1 flex items-center justify-center pt-32 pb-16">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full px-8 py-10 border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-[#FB7A20]">Privacy Policy</h1>
          <p className="mb-6 text-lg">Your privacy is important to us. This policy explains how Punch collects, uses, and protects your information.</p>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
            <p>We collect information you provide when you sign up, use our app, or interact with local businesses. This may include your name, email, and visit history.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Usage</h2>
            <p>Your data is used to provide rewards, personalize your experience, and improve our services. We do not sell your personal information.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sharing</h2>
            <p>We only share your data with local businesses you visit, as needed to deliver rewards. We do not share your data with third parties for marketing.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <p>You can request to view, update, or delete your data at any time. Contact us for assistance.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p>If you have questions about this policy, email us at <a href="mailto:privacy@punchapp.com" className="text-[#FB7A20] underline">privacy@punchapp.com</a>.</p>
          </section>
        </div>
      </main>
      <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Punch'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Punch'] after:[text-shadow:0_1px_0_white]"></div>
      <Footer />
    </div>
  );
} 