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
            A comprehensive overview of your rewards program performance and customer engagement. We'll connect this to your
            account after login/signup.
          </p>
        </div>

        {/* 1. Rewards Program Performance */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Rewards Program Performance</h2>
          
          {/* KPI Cards Row 1 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Active Members</div>
              <div className="mt-2 text-2xl font-semibold">2,847</div>
              <div className="mt-1 text-xs text-emerald-600">+8% vs last month</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">New Sign-Ups (This Week)</div>
              <div className="mt-2 text-2xl font-semibold">156</div>
              <div className="mt-1 text-xs text-emerald-600">+23% vs last week</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Active vs Inactive</div>
              <div className="mt-2 text-2xl font-semibold">78%</div>
              <div className="mt-1 text-xs text-emerald-600">+5% vs last month</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Avg Points Per Member</div>
              <div className="mt-2 text-2xl font-semibold">342</div>
              <div className="mt-1 text-xs text-emerald-600">+12% vs last month</div>
            </div>
          </div>

          {/* KPI Cards Row 2 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Redemption Rate</div>
              <div className="mt-2 text-2xl font-semibold">67%</div>
              <div className="mt-1 text-xs text-emerald-600">+3% vs last month</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Points Issued (This Month)</div>
              <div className="mt-2 text-2xl font-semibold">973,456</div>
              <div className="mt-1 text-xs text-emerald-600">+15% vs last month</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Breakage Rate</div>
              <div className="mt-2 text-2xl font-semibold">12%</div>
              <div className="mt-1 text-xs text-red-600">-2% vs last month</div>
            </div>
          </div>

          {/* Points Trend Chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Points Issued vs Redeemed (Trend)</h3>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  Issued
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  Redeemed
                </span>
              </div>
            </div>
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-500">
              Chart: Points balance over time
            </div>
          </div>
        </div>

        {/* 2. Customer Engagement */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">2. Customer Engagement</h2>
          
          {/* KPI Cards Row 1 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Visit Frequency (Avg/Month)</div>
              <div className="mt-2 text-2xl font-semibold">4.2</div>
              <div className="mt-1 text-xs text-emerald-600">+0.3 vs last month</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Avg Time Since Last Visit</div>
              <div className="mt-2 text-2xl font-semibold">8.5 days</div>
              <div className="mt-1 text-xs text-orange-600">+1.2 days vs last month</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Member LTV</div>
              <div className="mt-2 text-2xl font-semibold">$247</div>
              <div className="mt-1 text-xs text-emerald-600">+$18 vs last month</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">Churn Risk (30+ days)</div>
              <div className="mt-2 text-2xl font-semibold">156</div>
              <div className="mt-1 text-xs text-red-600">+23 vs last month</div>
            </div>
          </div>

          {/* Top Rewards and Top Customers */}
          <div className="grid gap-4 lg:grid-cols-12 mb-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Reward Items Redeemed</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-orange-600">☕</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Free Coffee</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">342 redemptions</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">💰</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">10% Off Order</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">287 redemptions</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-600">🍰</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Free Dessert</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">198 redemptions</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">🎁</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Buy 1 Get 1</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">156 redemptions</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Spending Customers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">🥇</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">Sarah M.</span>
                      <div className="text-xs text-gray-500">Member since Jan 2024</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$1,247</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">🥈</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">Mike R.</span>
                      <div className="text-xs text-gray-500">Member since Mar 2024</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$987</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">🥉</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">Lisa K.</span>
                      <div className="text-xs text-gray-500">Member since Feb 2024</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$856</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">4</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">David L.</span>
                      <div className="text-xs text-gray-500">Member since Dec 2023</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$743</span>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Trend Chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Customer Engagement Trends</h3>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  Visit Frequency
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  Points Earned
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  Redemptions
                </span>
              </div>
            </div>
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-500">
              Chart: Engagement metrics over time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

