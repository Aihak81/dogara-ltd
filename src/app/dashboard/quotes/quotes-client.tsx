"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";

interface Quote {
  id: string;
  reference_number: string;
  product: string;
  quantity: string;
  status: string;
  created_at: string;
}

interface QuotesClientProps {
  initialQuotes: Quote[];
}

export function QuotesClient({ initialQuotes }: QuotesClientProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "under-review":
        return <FileText className="w-4 h-4" />;
      case "approved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "secondary";
      case "under-review":
        return "default";
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Quotes</h2>
        <p className="text-gray-600 mt-1">
          View and track all your quote requests
        </p>
      </div>

      {initialQuotes.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">No Quotes Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You haven't submitted any quote requests yet. Get started by requesting a quote for your energy needs.
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
          {initialQuotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{quote.product}</CardTitle>
                      <CardDescription>
                        Quote #{quote.reference_number}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(quote.status)} className="flex items-center gap-1">
                      {getStatusIcon(quote.status)}
                      {quote.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="text-lg font-semibold text-dark">{quote.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Submitted On</p>
                      <p className="text-lg font-semibold text-dark">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm text-gray-500">
                        We'll contact you within 24 hours
                      </span>
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