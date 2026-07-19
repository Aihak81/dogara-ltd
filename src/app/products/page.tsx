"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const products = [
  {
    title: "LNG",
    subtitle: "Liquefied Natural Gas",
    description: "Clean, efficient, and environmentally friendly natural gas cooled to liquid form for easy transportation and storage.",
    benefits: ["High energy density", "Lower carbon emissions", "Efficient long-distance transport", "Cost-effective for industrial use"],
    slug: "LNG",
  },
  {
    title: "CNG",
    subtitle: "Compressed Natural Gas",
    description: "An eco-friendly alternative fuel that offers a cleaner, more sustainable option for vehicles and industrial applications.",
    benefits: ["Reduces greenhouse gas emissions", "Lower operating costs", "Domestically abundant", "Compatible with existing infrastructure"],
    slug: "CNG",
  },
  {
    title: "Diesel",
    subtitle: "Automotive Gas Oil (AGO)",
    description: "Premium quality diesel fuel engineered for maximum performance and efficiency in heavy-duty engines and equipment.",
    benefits: ["Superior lubricity", "Enhanced engine protection", "Cold flow properties", "Meets international standards"],
    slug: "Diesel",
  },
  {
    title: "Petrol",
    subtitle: "Premium Motor Spirit (PMS)",
    description: "High-grade petrol formulated for optimal engine performance, fuel efficiency, and emissions control.",
    benefits: ["High octane rating", "Clean combustion", "Engine deposit control", "Reliable cold-start performance"],
    slug: "Petrol",
  },
];

export default function ProductsPage() {
  return (
    <div>
      <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-700 opacity-90" />
        <div className="relative container-custom text-center">
          <motion.div initial="hidden" animate="visible" transition={{ duration: 0.6 }} variants={fadeUp}>
            <Badge variant="gold" className="mb-4">Our Products</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Premium Petroleum Products</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              High-quality LNG, CNG, Diesel, and Petrol tailored to power your operations efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeUp}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/5 rounded-xl h-40 flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-primary/20">{product.title}</span>
                    </div>
                    <div>
                      <Badge variant="gold" className="mb-2">{product.subtitle}</Badge>
                      <CardTitle>{product.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/quote?product=${encodeURIComponent(product.slug)}`}>Request Quote</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a Custom Energy Solution?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">Our team is ready to help you find the perfect product mix for your specific requirements.</p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-dark font-bold">
              <Link href="/quote">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
