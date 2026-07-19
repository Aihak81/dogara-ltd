"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Package, Truck, MapPin, Clock } from "lucide-react";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tracking - in real app, this would call an API
    setOrderStatus({
      referenceNumber: trackingNumber || "DOG-2024-001234",
      status: "in-transit",
      estimatedDelivery: "2024-01-15",
      currentLocation: "Lagos Distribution Center",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Track Order</h2>
        <p className="text-gray-600 mt-1">
          Enter your tracking number to get real-time updates
        </p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Tracking Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tracking" className="text-sm font-medium text-gray-700">
                Tracking Number or Order Reference
              </label>
              <div className="flex gap-2">
                <Input
                  id="tracking"
                  placeholder="e.g., DOG-2024-001234"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-gold hover:bg-gold-light text-dark font-bold">
                  <Search className="mr-2 h-5 w-5" />
                  Track
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {orderStatus && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Order Details</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Reference: {orderStatus.referenceNumber}
                </p>
              </div>
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
                <Truck className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-dark">Status</p>
                  <p className="text-sm text-gray-600 capitalize">{orderStatus.status.replace("-", " ")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!orderStatus && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">
              Enter Your Tracking Number
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Input your order reference number above to see detailed tracking information.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}