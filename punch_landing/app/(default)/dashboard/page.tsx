export default function DashboardPage() {
  return (
    <section className="relative">
      {/* Top gradient glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#FB7A20]/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page header */}
        <div className="pt-28 sm:pt-36">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-600">
            A quick overview of your business at a glance. We’ll connect this to your
            account after login/signup.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Total Visits</div>
            <div className="mt-2 text-2xl font-semibold">1,248</div>
            <div className="mt-1 text-xs text-emerald-600">+12% vs last week</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Rewards Claimed</div>
            <div className="mt-2 text-2xl font-semibold">86</div>
            <div className="mt-1 text-xs text-emerald-600">+5% vs last week</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">New Customers</div>
            <div className="mt-2 text-2xl font-semibold">132</div>
            <div className="mt-1 text-xs text-emerald-600">+8% vs last week</div>
          </div>
        </div>

        {/* Placeholder panels */}
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-8">
            <div className="mb-2 text-sm font-semibold text-gray-900">Visits Trend</div>
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-500">
              Chart placeholder
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-4">
            <div className="mb-2 text-sm font-semibold text-gray-900">Top Rewards</div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center justify-between">
                <span>Free Coffee</span>
                <span className="font-medium">32</span>
              </li>
              <li className="flex items-center justify-between">
                <span>10% Off</span>
                <span className="font-medium">21</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dessert on Us</span>
                <span className="font-medium">12</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

