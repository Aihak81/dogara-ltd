import { motion } from "framer-motion";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const partners = [
  {
    name: "Red Star Energy Ltd",
    description: "Strategic partner in energy distribution and logistics",
  },
  {
    name: "Al-Ihsan Oil and Gas Ltd",
    description: "Strategic partner in energy distribution and logistics",
  },
  {
    name: "Nu Synergy Ltd",
    description: "Strategic partner in energy distribution and logistics",
  },
  {
    name: "Safe Global Oil and Gas Ltd",
    description: "Strategic partner in energy distribution and logistics",
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-dark text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Trusted Partners
            </h1>
            <p className="text-gold text-lg">
              Collaborating for excellence in energy solutions
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Logo</span>
                      </div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{partner.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gold mb-2">20+</div>
                <p className="text-gray-600">Years of Partnership</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold mb-2">50+</div>
                <p className="text-gray-600">Successful Projects</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold mb-2">100%</div>
                <p className="text-gray-600">Reliability Score</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">Join Our Network</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Become a valued partner and collaborate with us to deliver exceptional energy solutions across Nigeria.
            </p>
            <Link href="/contact">
              <Button variant="default" size="lg">
                Become a Partner
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}