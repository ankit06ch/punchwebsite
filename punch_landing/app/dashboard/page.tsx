"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: "overview" },
    { id: "rewards", label: "Rewards Performance", icon: "rewards" },
    { id: "customers", label: "Customer Engagement", icon: "customers" },
    { id: "analytics", label: "Analytics", icon: "analytics" },
    { id: "profile", label: "Profile", icon: "profile" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-gray-500">Total Members</div>
          <div className="mt-2 text-2xl font-semibold">2,847</div>
          <div className="mt-1 text-xs text-emerald-600">+8% vs last month</div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-gray-500">Active This Week</div>
          <div className="mt-2 text-2xl font-semibold">1,234</div>
          <div className="mt-1 text-xs text-emerald-600">+12% vs last week</div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-gray-500">Points Issued</div>
          <div className="mt-2 text-2xl font-semibold">973K</div>
          <div className="mt-1 text-xs text-emerald-600">+15% vs last month</div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-gray-500">Revenue Impact</div>
          <div className="mt-2 text-2xl font-semibold">$12.4K</div>
          <div className="mt-1 text-xs text-emerald-600">+22% vs last month</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Sarah M. redeemed Free Coffee</div>
              <div className="text-xs text-gray-500">2 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">New member: Mike R. joined</div>
              <div className="text-xs text-gray-500">15 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Lisa K. earned 50 points</div>
              <div className="text-xs text-gray-500">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRewardsPerformance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Rewards Program Performance</h2>
      
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="text-xs font-medium text-gray-500">Redemption Rate</div>
          <div className="mt-2 text-2xl font-semibold">67%</div>
          <div className="mt-1 text-xs text-emerald-600">+3% vs last month</div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-gray-500">Breakage Rate</div>
          <div className="mt-2 text-2xl font-semibold">12%</div>
          <div className="mt-1 text-xs text-red-600">-2% vs last month</div>
        </div>
      </div>

      {/* Points Trend Chart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Points Issued vs Redeemed (Trend)</h3>
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-500">
          Chart: Points balance over time
        </div>
      </div>
    </div>
  );

  const renderCustomerEngagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Customer Engagement</h2>
      
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="text-xs font-medium text-gray-900">Member LTV</div>
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
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Reward Items Redeemed</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Free Coffee</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">342 redemptions</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">10% Off Order</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">287 redemptions</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Free Dessert</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">198 redemptions</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Spending Customers</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
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
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Lisa K.</span>
                  <div className="text-xs text-gray-500">Member since Feb 2024</div>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">$856</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
      
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Customer Engagement Trends</h3>
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-500">
            Chart: Engagement metrics over time
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-4">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">78%</div>
              <div className="text-sm text-gray-600">Customer Retention</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.2</div>
              <div className="text-sm text-gray-600">Avg Visits/Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">$247</div>
              <div className="text-sm text-gray-600">Avg LTV</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
      
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
            P
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Punch Rewards</h3>
            <p className="text-gray-600">Restaurant & Cafe</p>
            <p className="text-sm text-gray-500">Member since January 2024</p>
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input type="text" value="Punch Rewards" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <input type="text" value="Restaurant & Cafe" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value="contact@punchrewards.com" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="tel" value="+1 (555) 123-4567" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition-colors">
            Save Changes
          </button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive updates about your rewards program</div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">SMS Notifications</div>
                <div className="text-sm text-gray-600">Get alerts about important updates</div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="sr-only peer" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Change Password</div>
              <div className="text-sm text-gray-600">Update your account password</div>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600">Add an extra layer of security</div>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Data Export</div>
              <div className="text-sm text-gray-600">Download your business data</div>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600">
              <div className="font-medium">Delete Account</div>
              <div className="text-sm">Permanently remove your account and data</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return renderOverview();
      case "rewards":
        return renderRewardsPerformance();
      case "customers":
        return renderCustomerEngagement();
      case "analytics":
        return renderAnalytics();
      case "profile":
        return renderProfile();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className={`fixed left-0 top-0 z-40 h-full bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
                P
              </div>
              {sidebarOpen && <span className="font-semibold text-gray-900">Punch</span>}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? (
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon === "overview" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {item.icon === "rewards" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    )}
                    {item.icon === "customers" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    )}
                    {item.icon === "analytics" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {item.icon === "profile" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {item.icon === "settings" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">A</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">admin@punchrewards.com</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

