import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CEOPage() {
  const leadershipQualities = [
    "Visionary Leadership",
    "Strategic Thinking",
    "Industry Expertise",
    "Commitment to Excellence",
    "Innovation Driven",
  ];

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
              Founder & Chief Executive Officer
            </h1>
            <p className="text-gold text-lg">Dogara Oil and Gas Ltd</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="aspect-square bg-gray-300 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    CEO Photo
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-dark mb-4">
                  Engr. Abubakar Sadiq Mustapha
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Engr. Abubakar Sadiq Mustapha is an emerging entrepreneur and energy sector professional with a strong passion for advancing Nigeria's oil and gas industry. As Founder and CEO of Dogara Oil and Gas Ltd, he is committed to providing reliable energy solutions through LNG, CNG, diesel, petrol, and other petroleum products. With a vision to transform energy access across Nigeria, he leads a team of dedicated professionals delivering excellence in every shipment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-center text-dark mb-8">Leadership Qualities</h3>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
              {leadershipQualities.map((quality, index) => (
                <motion.div
                  key={quality}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm"
                >
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  <span className="text-gray-700">{quality}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="text-6xl text-gold mb-4">"</div>
            <blockquote className="text-xl italic text-gray-600 mb-4">
              Leading with integrity and innovation to power Nigeria's future through sustainable energy solutions.
            </blockquote>
            <footer className="text-gold font-semibold">- Engr. Abubakar Sadiq Mustapha</footer>
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
            <h3 className="text-3xl font-bold mb-4">Connect with Our Leadership</h3>
            <p className="text-gray-300 mb-6">
              Have questions or want to discuss partnership opportunities?
            </p>
            <Link href="/contact">
              <Button variant="default" size="lg">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}