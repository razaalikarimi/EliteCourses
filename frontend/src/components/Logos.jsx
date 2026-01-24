import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiAcademicCap, 
  HiShieldCheck, 
  HiCurrencyDollar, 
  HiSupport, 
  HiUserGroup
} from "react-icons/hi";

function Logos() {
  const features = [
    {
      icon: HiAcademicCap,
      title: "Experts Instructors",
      desc: "Learn from industry professional mentors.",
      bg: "bg-blue-50",
      color: "text-blue-600"
    },
    {
      icon: HiShieldCheck,
      title: "Lifetime Access",
      desc: "Instant access to all future course updates.",
      bg: "bg-emerald-50",
      color: "text-emerald-600"
    },
    {
      icon: HiSupport,
      title: "24/7 Support",
      desc: "Our dedicated support team is here to help.",
      bg: "bg-rose-50",
      color: "text-rose-600"
    },
    {
      icon: HiUserGroup,
      title: "Student Community",
      desc: "Network with thousands of global learners.",
      bg: "bg-indigo-50",
      color: "text-indigo-600"
    },
    {
      icon: HiCurrencyDollar,
      title: "Value for Money",
      desc: "High quality education at an affordable price.",
      bg: "bg-amber-50",
      color: "text-amber-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center`}>
              <f.icon className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-gray-900">{f.title}</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Logos;
