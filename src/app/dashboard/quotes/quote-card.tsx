"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type { Quote } from "@/types/supabase";

export function QuoteCard({ quote, index }: { quote: Quote; index: number }) {
  const statusVariants: Record<string, string> = {
    submitted: "secondary",
    "under-review": "warning",
    approved: "success",
    rejected: "destructive",
  };

  const statusLabels: Record<string, string> = {
    submitted: "Quote Submitted",
    "under-review": "Under Review",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2">
              {quote.product}
            </CardTitle>
            <Badge
              variant={statusVariants[quote.status.toLowerCase()] ?? "secondary"}
              className="ml-2 flex-shrink-0"
            >
              {statusLabels[quote.status.toLowerCase()] ?? quote.status}
            </Badge>
          </div>
          <p className="text-xs font-mono text-gray-500 mt-1">
            {quote.reference_number}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Quantity:</span>
              <span className="font-medium text-gray-900">
                {quote.quantity.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Location:</span>
              <span className="font-medium text-gray-900 truncate ml-2">
                {quote.location}
              </span>
            </div>
            {quote.quoted_price && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quoted Price:</span>
                <span className="font-medium text-gold">
                  USD {quote.quoted_price.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium text-gray-900">
                {new Date(quote.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          {quote.admin_notes && (
            <div className="mt-3 p-2 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-600 italic">
                {quote.admin_notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
