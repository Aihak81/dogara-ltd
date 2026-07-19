"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { Order } from "@/types/supabase";

export function OrderCard({ order, index }: { order: Order; index: number }) {
  const statusVariants: Record<string, string> = {
    pending: "secondary",
    confirmed: "default",
    processing: "default",
    shipped: "default",
    delivered: "success",
    completed: "success",
    cancelled: "destructive",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const progressSteps = ["pending", "confirmed", "processing", "shipped", "delivered"];
  const currentIndex = progressSteps.indexOf(order.status.toLowerCase());
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / progressSteps.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                Order #{order.reference_number}
              </CardTitle>
              <p className="text-xs font-mono text-gray-500 mt-1">
                ID: {order.id.slice(0, 8)}...
              </p>
            </div>
            <Badge
              variant={statusVariants[order.status.toLowerCase()] ?? "secondary"}
            >
              {statusLabels[order.status.toLowerCase()] ?? order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-gold to-gold-light h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total:</span>
              <span className="font-medium text-gray-900">
                {order.currency} {order.total_amount?.toLocaleString() ?? "0"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium text-gray-900">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
            {order.delivery_address && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery:</span>
                <span className="font-medium text-gray-900 truncate ml-2">
                  {order.delivery_address}
                </span>
              </div>
            )}
            {order.tracking_number && (
              <div className="pt-2 border-t border-gray-100">
                <Link href={`/tracking?order=${order.reference_number}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold text-gold hover:bg-gold hover:text-primary"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-6m0 0l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    Track Order
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
