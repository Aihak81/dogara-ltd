"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Quote", href: "/quote" },
  { name: "Partners", href: "/partners" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const services = [
  { name: "LNG", href: "/services/lng" },
  { name: "CNG", href: "/services/cng" },
  { name: "Diesel", href: "/services/diesel" },
  { name: "Petrol", href: "/services/petrol" },
  { name: "Consultancy", href: "/services/consultancy" },
  { name: "Logistics", href: "/services/logistics" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-white relative">
                DOGARA
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              Powering Industries Through Reliable Energy Solutions
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gold" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gold" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold mt-0.5" />
                <span className="text-gray-300">
                  Kaduna, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <span className="text-gray-300">+234 (0) 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <span className="text-gray-300">info@dogara.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-gold" />
                <span className="text-gray-300">WhatsApp: +234 (0) 123 456 7890</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gold" />
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-gold transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DOGARA. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="hover:text-gold transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold transition-colors duration-200">
                Terms of Service
              </Link>
              <span className="text-gold font-medium">Built with excellence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}