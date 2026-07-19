"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderStatus, setOrderStatus] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock order status
    setOrderStatus({
      referenceNumber: trackingNumber || "DOG-2024-001234",
      status: "in-transit",
      estimatedDelivery: "2024-01-15",
      currentLocation: "Lagos Distribution Center",
      timeline: [
        { status: "Order Confirmed", date: "2024-01-10", completed: true },
        { status: "Processing", date: "2024-01-11", completed: true },
        { status: "Shipped", date: "2024-01-12", completed: true },
        { status: "In Transit", date: "2024-01-13", completed: true, current: true },
        { status: "Out for Delivery", date: "Expected: 2024-01-15", completed: false },
        { status: "Delivered", date: "Expected: 2024-01-15", completed: false },
      ],
    });
    
    setIsSearching(false);
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
      case "in-transit":
        return "default";
      case "delivered":
        return "success";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-700 opacity-90" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Track Your Order
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Enter your tracking number to get real-time updates on your order status and delivery progress.
          </p>
        </div>
      </section>

      {/* Track Order Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Form */}
            <Card className="border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Enter Tracking Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tracking">Tracking Number or Order Reference</Label>
                    <div className="flex gap-2">
                      <Input
                        id="tracking"
                        placeholder="e.g., DOG-2024-001234"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        className="bg-gold hover:bg-gold-light text-dark font-bold"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          "Searching..."
                        ) : (
                          <>
                            <Search className="mr-2 h-5 w-5" />
                            Track
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    You can find your tracking number in your order confirmation email or in your dashboard.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Order Status Results */}
            {orderStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-lg mb-8">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">Order Details</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Reference: {orderStatus.referenceNumber}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(orderStatus.status)}>
                        {orderStatus.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-dark">Current Location</p>
                          <p className="text-sm text-gray-600">{orderStatus.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-dark">Estimated Delivery</p>
                          <p className="text-sm text-gray-600">{orderStatus.estimatedDelivery}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-dark">Order Status</p>
                          <p className="text-sm text-gray-600 capitalize">
                            {orderStatus.status.replace("-", " ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-dark mb-4">Delivery Timeline</h3>
                      {orderStatus.timeline.map((step: any, index: number) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? "bg-gold text-dark"
                                  : step.current
                                  ? "bg-primary text-white ring-4 ring-primary/20"
                                  : "bg-gray-200 text-gray-400"
                              }`}
                            >
                              {step.completed ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : step.current ? (
                                <Truck className="w-5 h-5" />
                              ) : (
                                <div className="w-3 h-3 rounded-full bg-current" />
                              )}
                            </div>
                            {index < orderStatus.timeline.length - 1 && (
                              <div
                                className={`w-0.5 h-12 ${
                                  step.completed ? "bg-gold" : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <p
                              className={`font-medium ${
                                step.completed || step.current ? "text-dark" : "text-gray-400"
                              }`}
                            >
                              {step.status}
                            </p>
                            <p className="text-sm text-gray-600">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Help Card */}
                <Card className="border-0 shadow-lg bg-primary text-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-gold" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Need Help with Your Order?</h3>
                        <p className="text-gray-300 mb-4">
                          If you have questions about your order or need assistance, our customer support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-primary">
                            <Link href="/contact">Contact Support</Link>
                          </Button>
                          <Button asChild size="sm" className="bg-gold hover:bg-gold-light text-dark">
                            <Link href="/dashboard/orders">View All Orders</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* No Results State */}
            {!orderStatus && !isSearching && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-dark mb-2">
                    Enter Your Tracking Number
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Input your order reference number above to see detailed tracking information and delivery updates.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}