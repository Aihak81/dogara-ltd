"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type { Quote, Order, Notification } from "@/types/supabase";

export function DashboardShell({
  quotes,
  orders,
  notifications,
}: {
  quotes: Quote[];
  orders: Order[];
  notifications: Notification[];
}) {
  const pendingOrders = orders.filter((o) =>
    ["pending", "confirmed", "processing", "shipped"].includes(o.status)
  ).length;

  const completedDeliveries = orders.filter((o) =>
    ["delivered", "completed"].includes(o.status)
  ).length;

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Welcome to your Dogara Oil and Gas customer dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Quotes",
            value: quotes.length.toString(),
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
            href: "/dashboard/quotes",
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Pending Orders",
            value: pendingOrders.toString(),
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            href: "/dashboard/orders",
            color: "from-yellow-500 to-yellow-600",
          },
          {
            title: "Completed Deliveries",
            value: completedDeliveries.toString(),
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            ),
            href: "/dashboard/orders",
            color: "from-green-500 to-green-600",
          },
          {
            title: "Notifications",
            value: unreadNotifications.toString(),
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            ),
            href: "/dashboard/notifications",
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={cn("p-3 rounded-xl bg-gradient-to-br text-white", stat.color)}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Quotes</CardTitle>
                <CardDescription>Your latest quote requests</CardDescription>
              </div>
              <Link href="/dashboard/quotes">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quotes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No quotes yet.{" "}
                  <Link href="/quote" className="text-gold hover:underline">
                    Request a quote
                  </Link>
                </div>
              ) : (
                quotes.map((quote) => (
                  <motion.div
                    key={quote.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {quote.product}
                      </p>
                      <p className="text-sm text-gray-500">
                        {quote.reference_number} • {quote.quantity} units
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </span>
                      <StatusBadge status={quote.status} />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Request New Quote", href: "/quote", icon: "M12 4v16m8-8H4" },
              { label: "Track Order", href: "/dashboard/orders", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-6m0 0l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
              { label: "View Documents", href: "/dashboard/documents", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
              { label: "Support", href: "/contact", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
            ].map((link) => (
              <Link key={link.label} href={link.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gold/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gold mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={link.icon}
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest order activity</CardDescription>
            </div>
            <Link href="/dashboard/orders">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500 col-span-full">
                No orders yet.
              </div>
            ) : (
              orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gold/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-gray-500">
                      {order.reference_number}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Total: {order.currency} {order.total_amount?.toLocaleString() ?? "0"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {order.tracking_number && (
                    <Link href={`/tracking?order=${order.reference_number}`}>
                      <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-gold">
                        Track Order →
                      </Button>
                    </Link>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    submitted: "secondary",
    "under-review": "warning",
    approved: "success",
    rejected: "destructive",
    pending: "secondary",
    confirmed: "default",
    processing: "default",
    shipped: "default",
    delivered: "success",
    completed: "success",
    cancelled: "destructive",
  };

  const labels: Record<string, string> = {
    submitted: "Quote Submitted",
    "under-review": "Under Review",
    approved: "Approved",
    rejected: "Rejected",
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <Badge variant={variants[status.toLowerCase()] ?? "secondary"}>
      {labels[status.toLowerCase()] ?? status}
    </Badge>
  );
}
