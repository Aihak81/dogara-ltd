"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Shield, Lightbulb, Handshake, Award, Rocket } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const values = [
  { title: "Integrity", icon: Shield, description: "We conduct business with unwavering honesty and ethical standards." },
  { title: "Excellence", icon: Award, description: "We strive for the highest quality in every product and service." },
  { title: "Reliability", icon: Target, description: "Dependable delivery and consistent performance you can trust." },
  { title: "Innovation", icon: Lightbulb, description: "Embracing forward-thinking solutions for evolving energy needs." },
  { title: "Partnership", icon: Handshake, description: "Building lasting relationships through collaboration and mutual success." },
  { title: "Safety", icon: Heart, description: "Prioritizing the well-being of our people, partners, and communities." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-700 opacity-90" />
        <div className="relative container-custom text-center">
          <motion.div initial="hidden" animate="visible" transition={{ duration: 0.6 }} variants={fadeUp}>
            <Badge variant="gold" className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Dogara Oil & Gas Ltd</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Powering Industries Through Reliable Energy Solutions
            </p>
          </motion.div>
        </div>
      </section>

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
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Foundation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Built on strong principles that drive everything we do.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} variants={fadeUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">To deliver reliable, high-quality petroleum and energy solutions that power industries and communities across Nigeria and beyond, while maintaining the highest standards of safety and environmental responsibility.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} variants={fadeUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">To be the leading integrated energy solutions provider in Africa, recognized for operational excellence, sustainable practices, and transformative impact on the continent&#39;s energy landscape.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} variants={fadeUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Integrity, Excellence, Reliability, Innovation, Partnership, and Safety form the bedrock of our operations, guiding every decision and interaction.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeUp}>
              <Badge variant="gold" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">A Legacy of Energy Leadership</h2>
              <div className="space-y-4 text-gray-600">
                <p>Dogara Oil and Gas Ltd was founded with a singular vision: to bridge the gap between energy producers and consumers through reliable, efficient, and innovative distribution solutions. Our founder, with decades of experience in the Nigerian oil and gas sector, recognized the critical need for a dependable partner in the energy supply chain.</p>
                <p>From humble beginnings as a local distributor, we have grown into a comprehensive energy solutions provider serving major industrial clients, commercial enterprises, and government institutions across Nigeria. Our operations span the full spectrum of petroleum products, from LNG and CNG to diesel and petrol.</p>
                <p>Our growth strategy is rooted in strategic partnerships, continuous investment in infrastructure, and an unwavering commitment to customer satisfaction. We have expanded our storage capacity, distribution networks, and service offerings to meet the evolving needs of Nigeria&#39;s dynamic energy sector.</p>
                <p>Today, Dogara Oil and Gas Ltd stands as a testament to what vision, determination, and integrity can achieve. We remain deeply committed to Nigeria&#39;s energy security and economic development, powering industries and illuminating communities across the nation.</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} variants={fadeUp}>
              <div className="bg-primary/5 rounded-2xl h-96 flex items-center justify-center">
                <Rocket className="w-24 h-24 text-primary/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            <Badge variant="gold" className="mb-4">What Drives Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that define our culture and guide our every action.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeUp}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="w-7 h-7 text-gold" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Partner With Us?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">Let&#39;s discuss how Dogara Oil and Gas Ltd can power your energy needs with reliability and excellence.</p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-dark font-bold">
              <Link href="/quote">Partner with us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
