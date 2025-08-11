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
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your rewards program.</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Members</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2,847</div>
            <div className="text-sm text-emerald-600 font-medium">+8% vs last month</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Active This Week</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1,234</div>
            <div className="text-sm text-emerald-600 font-medium">+12% vs last week</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Points Issued</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">973K</div>
            <div className="text-sm text-emerald-600 font-medium">+15% vs last month</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Revenue Impact</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$12.4K</div>
            <div className="text-sm text-emerald-600 font-medium">+22% vs last month</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-orange-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Sarah M. redeemed Free Coffee</div>
              <div className="text-xs text-orange-600 font-medium">2 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">New member: Mike R. joined</div>
              <div className="text-xs text-blue-600 font-medium">15 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-orange-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Lisa K. earned 50 points</div>
              <div className="text-xs text-orange-600 font-medium">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRewardsPerformance = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">Rewards Program Performance</h2>
        <p className="text-gray-600">Track your loyalty program's success metrics and growth</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Active Members</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2,847</div>
            <div className="text-sm text-emerald-600 font-medium">+8% vs last month</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">New Sign-Ups (This Week)</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-sm text-emerald-600 font-medium">+23% vs last week</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Redemption Rate</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">67%</div>
            <div className="text-sm text-emerald-600 font-medium">+3% vs last month</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Breakage Rate</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12%</div>
            <div className="text-sm text-red-600 font-medium">-2% vs last month</div>
          </div>
        </div>
      </div>

      {/* Points Trend Chart */}
      <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          Points Issued vs Redeemed (Trend)
        </h3>
        <div className="h-48 bg-gradient-to-br from-orange-50/30 to-gray-50 rounded-2xl flex items-center justify-center border border-orange-100/50">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-gray-600 font-medium">Chart: Points balance over time</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerEngagement = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">Customer Engagement</h2>
        <p className="text-gray-600">Monitor customer behavior and loyalty patterns</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Visit Frequency (Avg/Month)</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.2</div>
            <div className="text-sm text-emerald-600 font-medium">+0.3 vs last month</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Avg Time Since Last Visit</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">8.5 days</div>
            <div className="text-sm text-orange-600 font-medium">+1.2 days vs last month</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Member LTV</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$247</div>
            <div className="text-sm text-emerald-600 font-medium">+$18 vs last month</div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="text-sm font-medium text-gray-600 mb-2">Churn Risk (30+ days)</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-sm text-red-600 font-medium">+23 vs last month</div>
          </div>
        </div>
      </div>

      {/* Top Rewards and Top Customers */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 lg:col-span-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            Top Reward Items Redeemed
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Free Coffee</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">342 redemptions</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-green-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">10% Off Order</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">287 redemptions</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Free Dessert</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">198 redemptions</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-orange-100/50 lg:col-span-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Top Spending Customers
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-yellow-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Sarah M.</span>
                  <div className="text-xs text-orange-600 font-medium">Member since Jan 2024</div>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">$1,247</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Mike R.</span>
                  <div className="text-xs text-blue-600 font-medium">Member since Mar 2024</div>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">$987</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-50/50 to-transparent p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center shadow-md">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Lisa K.</span>
                  <div className="text-xs text-amber-600 font-medium">Member since Feb 2024</div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50">
      {/* Background glow effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl"></div>
      </div>

      {/* Fixed Sidebar */}
      <div className={`fixed left-0 top-0 z-40 h-full bg-white/95 backdrop-blur-sm shadow-2xl border-r border-orange-100/50 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-4 border-b border-orange-100/50 bg-gradient-to-r from-orange-50/50 to-transparent">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                P
              </div>
              {sidebarOpen && <span className="font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Punch</span>}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:shadow-md'
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

          {/* Expand/Collapse Button */}
          <div className="border-t border-orange-100/50 p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 text-gray-600"
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          {/* User Info */}
          <div className="border-t border-orange-100/50 p-4 bg-gradient-to-t from-orange-50/30 to-transparent">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-medium shadow-md">
                A
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-orange-600">admin@punchrewards.com</div>
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

