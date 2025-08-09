export const metadata = {
  title: "You're on the waitlist • Punch",
  description: "Thanks for joining the Punch waitlist",
};

export default function Waitlist() {
  return (
    <div className="mx-auto max-w-2xl py-16">
      <div className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-xl">
        {/* Glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#FB7A20]/20 blur-3xl" />

        <div className="mb-4 text-4xl">🥊</div>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">You're on the waitlist!</h1>
        <p className="mb-6 text-gray-700">
          Thanks for setting up your business. We’re putting the final touches on your Punch profile.
          You’ll get an email when your dashboard is live.
        </p>

        <div className="space-y-2 rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-800">
            In the meantime:
          </p>
          <ul className="list-inside list-disc text-sm text-gray-700">
            <li>We may reach out to verify details like address or hours.</li>
            <li>Get a square logo ready (at least 512×512) for best results.</li>
            <li>Keep an eye on your inbox for next steps from the Punch team.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="btn bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]">Back to Home</a>
          <a href="/signup" className="btn border border-gray-300 text-gray-700 hover:bg-gray-50">Create another</a>
        </div>
      </div>
    </div>
  );
}