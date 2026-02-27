import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: FaFacebook, label: "Facebook", color: "text-blue-600", href: "#" },
    { icon: FaTwitter, label: "Twitter", color: "text-sky-500", href: "#" },
    {
      icon: FaInstagram,
      label: "Instagram",
      color: "text-pink-600",
      href: "#",
    },
    { icon: FaLinkedin, label: "LinkedIn", color: "text-blue-700", href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-200 border-t border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Left: Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">✨</span>
              </div>
              <span className="font-bold text-2xl text-white">Aura</span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              Connect. Share. Inspire.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Building a community where creativity meets connection.
            </p>
          </motion.div>

          {/* Center: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ x: 4, color: "#ffffff" }}
                  className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-linear-to-r from-amber-400 to-orange-500 transition-all duration-300" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-all duration-300 ${social.color}`}
                    title={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-px bg-linear-to-r from-transparent via-slate-600 to-transparent mb-6"
        />

        {/* Bottom: Copyright & Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Aura. All rights reserved.
          </p>

          {/* Additional Links */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              Cookies
            </a>
            <span className="text-gray-700">•</span>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span className="text-gray-700">•</span>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>

          {/* Design Credit */}
          <p className="text-xs text-gray-600">
            Made with <span className="text-pink-500">♥</span> by Aura Team
          </p>
        </motion.div>
      </div>

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-orange-500/10" />
      </div>
    </motion.footer>
  );
}

export default Footer;
