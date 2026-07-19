"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Settings, Truck, Fuel, BarChart3, Briefcase, FileText, ShoppingCart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "LNG Supply & Distribution",
    description: "Comprehensive supply and distribution of liquefied natural gas to industrial and commercial clients across Nigeria, ensuring timely delivery and consistent quality.",
    icon: FlaskConical,
    cta: "Request Quote",
    href: "/quote",
  },
  {
    title: "CNG Supply & Infrastructure Support",
    description: "End-to-end CNG solutions including supply, installation, and maintenance of compression and dispensing infrastructure.",
    icon: Settings,
    cta: "Request Quote",
    href: "/quote",
  },
  {
    title: "Diesel Supply Services",
    description: "Reliable bulk and retail diesel supply with flexible delivery options, optimized for power generation, transportation, and industrial operations.",
    icon: Truck,
    cta: "Request Quote",
    href: "/quote",
  },
  {
    title: "Petrol Supply Services",
    description: "Consistent Premium Motor Spirit (PMS) supply for retail stations, fleet operators, and commercial entities with competitive pricing.",
    icon: Fuel,
    cta: "Request Quote",
    href: "/quote",
  },
  {
    title: "Petroleum Products Marketing",
    description: "Strategic marketing and distribution of petroleum products, leveraging market insights to maximize value for suppliers and customers alike.",
    icon: BarChart3,
    cta: "Learn More",
    href: "#",
  },
  {
    title: "Oil & Gas Consultancy",
    description: "Expert advisory services covering market entry strategies, regulatory compliance, supply chain optimization, and operational efficiency.",
    icon: Briefcase,
    cta: "Learn More",
    href: "#",
  },
  {
    title: "Energy Project Development",
    description: "From feasibility studies to execution, we develop integrated energy projects tailored to scale, scope, and sustainability goals.",
    icon: FileText,
    cta: "Learn More",
    href: "#",
  },
  {
    title: "Procurement & Logistics Support",
    description: "Seamless procurement and logistics coordination ensuring your energy supply chain is efficient, transparent, and cost-effective.",
    icon: ShoppingCart,
    cta: "Request Quote",
    href: "/quote",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-700 opacity-90" />
        <div className="relative container-custom text-center">
          <motion.div initial="hidden" animate="visible" transition={{ duration: 0.6 }} variants={fadeUp}>
            <Badge variant="gold" className="mb-4">What We Do</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Comprehensive Energy Services</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              End-to-end solutions from supply and distribution to consultancy and project development.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                variants={fadeUp}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-gold" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant={service.cta === "Learn More" ? "outline" : "default"} className="w-full">
                      <Link href={service.href}>{service.cta}</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&#39;s Build Something Great Together</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">Whether you need supply, consultation, or full project development, our team is ready to deliver.</p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-dark font-bold">
              <Link href="/quote">Request a Service</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
