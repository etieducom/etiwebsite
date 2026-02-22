import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  Building2,
  Users,
  Award,
  CheckCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Branch data
const branchesData = {
  pathankot: {
    name: "Pathankot",
    fullName: "ETI Educom - Pathankot Branch",
    address: "ETI Educom, Jodhamal Colony, Dhangu Road, Pathankot",
    phone: "+91 9646727676",
    email: "Pathankot@etieducom.com",
    timings: "Monday - Saturday, 9:00 AM - 6:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106964.53476779655!2d75.55785671640625!3d32.27411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b91c6d7b0c9cf%3A0xf3a68a3e9e2d4c!2sPathankot%2C%20Punjab!5e0!3m2!1sen!2sin!4v1234567890",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    description: "Our flagship center in Pathankot offers comprehensive computer education programs with state-of-the-art facilities and experienced faculty.",
    features: [
      "Modern Computer Labs",
      "Air-conditioned Classrooms",
      "Experienced Faculty",
      "Placement Assistance",
      "Industry Certifications",
      "Flexible Timings"
    ],
    programs: [
      "Computer Career Foundation",
      "Digital Design & Marketing",
      "IT Support & Cybersecurity",
      "Software Development",
      "Summer Training Programs"
    ]
  }
};

const BranchPage = () => {
  const { branchId } = useParams();
  const branch = branchesData[branchId];

  if (!branch) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center" data-testid="branch-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Branch Not Found</h1>
          <p className="text-[#717171] mb-6">The branch you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="btn-primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid="branch-page">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img 
          src={branch.image}
          alt={branch.fullName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-main">
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/20 text-white mb-4">
                <Building2 className="w-4 h-4 mr-1" />
                Branch
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-['Poppins']">
                {branch.fullName}
              </h1>
              <p className="text-white/80 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {branch.address}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-[#ebebeb]">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div {...fadeInUp}>
              <Card className="card-default h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#1545ea]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Call Us</h3>
                    <a href={`tel:${branch.phone}`} className="text-[#1545ea] font-medium hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <Card className="card-default h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#1545ea]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Email Us</h3>
                    <a href={`mailto:${branch.email}`} className="text-[#1545ea] font-medium hover:underline">
                      {branch.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="card-default h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#1545ea]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Timings</h3>
                    <p className="text-[#4a4a4a] text-sm">{branch.timings}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Branch */}
      <section className="py-16 section-grey">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">About This Branch</Badge>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                {branch.name} Center
              </h2>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                {branch.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {branch.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#1545ea] flex-shrink-0" />
                    <span className="text-sm text-[#1a1a1a]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="card-default">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#1545ea]" />
                    Programs Available
                  </h3>
                  <div className="space-y-3">
                    {branch.programs.map((program, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-lg">
                        <div className="w-8 h-8 bg-[#1545ea]/10 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#1545ea]" />
                        </div>
                        <span className="text-sm font-medium text-[#1a1a1a]">{program}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1545ea]">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-4 font-['Poppins']">
              Visit Our {branch.name} Center
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Schedule a visit or get in touch with us to learn more about our programs and enrollment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-counselling">
                <Button className="bg-white text-[#1545ea] hover:bg-[#ebebeb] font-semibold px-8 py-3">
                  Book Free Counselling
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href={`tel:${branch.phone}`}>
                <Button className="btn-outline-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BranchPage;
