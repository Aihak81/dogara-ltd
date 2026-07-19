"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Settings, Truck, Fuel, Award, Users, Shield, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: Flame,
    title: "LNG Supply",
    description: "Clean, efficient liquefied natural gas for industrial and commercial use.",
  },
  {
    icon: Settings,
    title: "CNG Solutions",
    description: "Compressed natural gas supply and infrastructure support.",
  },
  {
    icon: Truck,
    title: "Diesel Supply",
    description: "Premium diesel fuel for power generation and transportation.",
  },
  {
    icon: Fuel,
    title: "Petrol Supply",
    description: "High-quality PMS for retail and commercial operations.",
  },
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Partner Companies" },
  { value: "20+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

const whyChooseUs = [
  {
    icon: Award,
    title: "Quality Assured",
    description: "We supply only premium, certified petroleum products that meet international standards.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Dedicated support team ensuring your energy needs are met with precision and care.",
  },
  {
    icon: Shield,
    title: "Reliable Delivery",
    description: "Consistent supply chain management guaranteeing timely delivery every time.",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Round-the-clock customer service to address your queries and emergencies.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-700 opacity-90" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-10" />
        <div className="relative container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              variants={fadeUp}
            >
              <Badge variant="gold" className="mb-4">
                Trusted Energy Partner
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Powering Industries Through{" "}
                <span className="text-gold">Reliable Energy</span> Solutions
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                Supplying premium LNG, CNG, Diesel, and Petrol to industries across Nigeria.
                Your trusted partner for consistent quality and dependable delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-dark font-bold">
                  <Link href="/quote">
                    Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/products">Explore Products</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-gold/20 to-primary/40 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={feature.title}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                      >
                        <feature.icon className="w-8 h-8 text-gold mb-2" />
                        <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-dark py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <Badge variant="gold" className="mb-4">Our Products</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Premium Petroleum Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              High-quality energy solutions tailored to power your operations efficiently and reliably.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeUp}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <Link
                      href={`/products#${feature.title.toLowerCase().replace(" ", "-")}`}
                      className="text-gold hover:text-gold-light font-medium inline-flex items-center group/link"
                    >
                      Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <Badge variant="gold" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              The Dogara Advantage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We go beyond supply to build lasting partnerships based on trust, quality, and reliability.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeUp}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-gold" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <Badge variant="gold" className="mb-4">What We Do</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Comprehensive Energy Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From supply and distribution to consultancy and project development.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "LNG Supply & Distribution",
              "CNG Infrastructure Support",
              "Diesel Supply Services",
              "Petrol Supply Services",
              "Petroleum Products Marketing",
              "Oil & Gas Consultancy",
            ].map((service, index) => (
              <motion.div
                key={service}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                variants={fadeUp}
              >
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gold/5 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-dark mb-1">{service}</h3>
                    <p className="text-sm text-gray-600">
                      Professional solutions tailored to your energy needs.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Power Your Business?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Get in touch with our team today for a customized energy solution that fits your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-dark font-bold">
                <Link href="/quote">Request a Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}