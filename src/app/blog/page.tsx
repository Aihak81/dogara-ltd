import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Natural Gas in Nigeria's Energy Sector",
    excerpt: "Exploring how LNG and CNG are reshaping the energy landscape and driving industrial growth across Nigeria.",
    category: "Industry Insights",
    date: "January 15, 2024",
    readTime: "5 min read",
    image: "/images/blog/natural-gas-future.jpg",
  },
  {
    id: 2,
    title: "5 Key Benefits of Switching to CNG for Your Fleet",
    excerpt: "Discover how compressed natural gas can reduce costs, emissions, and improve operational efficiency.",
    category: "Energy Solutions",
    date: "January 10, 2024",
    readTime: "4 min read",
    image: "/images/blog/cng-fleet.jpg",
  },
  {
    id: 3,
    title: "Understanding Diesel Quality Standards: What You Need to Know",
    excerpt: "A comprehensive guide to diesel fuel quality specifications and why they matter for your equipment.",
    category: "Technical Guide",
    date: "January 5, 2024",
    readTime: "6 min read",
    image: "/images/blog/diesel-quality.jpg",
  },
  {
    id: 4,
    title: "Sustainable Energy Practices for Industrial Operations",
    excerpt: "How businesses can integrate sustainable energy solutions while maintaining operational excellence.",
    category: "Sustainability",
    date: "December 28, 2023",
    readTime: "7 min read",
    image: "/images/blog/sustainable-energy.jpg",
  },
  {
    id: 5,
    title: "The Role of Energy Partners in Nigeria's Economic Growth",
    excerpt: "Examining how strategic partnerships in the energy sector contribute to national development.",
    category: "Partnerships",
    date: "December 20, 2023",
    readTime: "5 min read",
    image: "/images/blog/energy-partnerships.jpg",
  },
  {
    id: 6,
    title: "Best Practices for Petroleum Product Storage and Handling",
    excerpt: "Essential guidelines for safe and efficient storage of LNG, CNG, diesel, and petrol.",
    category: "Safety",
    date: "December 15, 2023",
    readTime: "8 min read",
    image: "/images/blog/storage-handling.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-700 opacity-90" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="gold" className="mb-4">Blog & Insights</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Energy Industry Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Stay informed with the latest trends, guides, and news from the energy sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-gold/10 rounded-t-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="gold">{post.category}</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-gold transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-gold hover:text-gold-light group/btn">
                      Read More <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Energy Insights
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and get the latest industry news, tips, and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gold hover:bg-gold-light text-dark font-bold">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}