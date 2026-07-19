"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";

interface Order {
  id: string;
  reference_number: string;
  status: string;
  total_amount: number;
  currency: string;
  created_at: string;
  tracking_number?: string;
}

interface OrdersClientProps {
  initialOrders: Order[];
}

export function OrdersClient({ initialOrders }: OrdersClientProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <Package className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "confirmed":
        return "default";
      case "processing":
        return "default";
      case "shipped":
        return "default";
      case "delivered":
        return "success";
      case "completed":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <p className="text-gray-600 mt-1">
          View and track all your orders
        </p>
      </div>

      {initialOrders.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">No Orders Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You haven't placed any orders yet. Start by requesting a quote for the products you need.
            </p>
            <a
              href="/quote"
              className="inline-flex items-center px-6 py-3 bg-gold hover:bg-gold-light text-dark font-bold rounded-lg transition-colors"
            >
              Request a Quote
            </a>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {initialOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.reference_number}</CardTitle>
                      <CardDescription>
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-dark">
                        {order.currency} {order.total_amount?.toLocaleString() ?? "0"}
                      </p>
                    </div>
                    {order.tracking_number && (
                      <div>
                        <p className="text-sm text-gray-600">Tracking Number</p>
                        <p className="text-lg font-semibold text-dark font-mono">
                          {order.tracking_number}
                        </p>
                      </div>
                    )}
                    <div className="flex items-end">
                      {order.tracking_number && (
                        <a
                          href={`/tracking?order=${order.reference_number}`}
                          className="inline-flex items-center text-gold hover:text-gold-light font-medium"
                        >
                          Track Order →
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}