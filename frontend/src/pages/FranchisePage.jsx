import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  ChevronRight, 
  CheckCircle, 
  Shield, 
  Users,
  Award,
  Target,
  Globe
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

const FranchisePage = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Brand Authorization",
      description: "Licensed use of ETI Educom® brand with full marketing support"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification Access",
      description: "Certiport CATC authorization for global certification delivery"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Training Support",
      description: "Comprehensive faculty training and development programs"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Academic Governance",
      description: "Centralized curriculum and quality assurance framework"
    }
  ];

  const terms = [
    { label: "Agreement Duration", value: "5 Years" },
    { label: "Royalty", value: "15%" },
    { label: "Exclusivity Radius", value: "15 KM" },
    { label: "Renewal", value: "Auto (Compliance Based)" }
  ];

  const features = [
    "Fresh agreement at renewal without new brand license fee",
    "Centralized marketing execution and brand support",
    "ERP-enabled academic monitoring system",
    "Structured career track curriculum",
    "Ongoing operational support",
    "Quality assurance audits"
  ];

  return (
    <div className="pt-[72px]" data-testid="franchise-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Building2 className="w-4 h-4 mr-1" />
              Partnership Opportunity
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Franchise with ETI Educom®
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Join India's growing network of structured computer career education centers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                Build a Sustainable Education Business
              </h2>
              <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                ETI Educom® franchise model is designed for entrepreneurs who share our 
                vision of structured, quality computer education. Join a network backed 
                by institutional-grade support and governance.
              </p>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                With centralized academic governance, marketing support, and global 
                certification partnerships, our franchisees benefit from a proven 
                education model focused on student success.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {terms.map((term) => (
                  <Card key={term.label} className="card-default">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-[#1545ea]">{term.value}</p>
                      <p className="text-xs text-[#717171]">{term.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                  alt="Business partnership"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 section-grey">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-['Manrope']">
              Franchise Benefits
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-default h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#1545ea]/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#1545ea]">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#4a4a4a]">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 font-['Manrope']">
                What's Included
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1a1a1a]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="bg-[#1545ea] text-white">
                <CardContent className="p-8">
                  <Globe className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 font-['Manrope']">
                    Ready to Partner?
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Take the first step towards building a sustainable education 
                    business with ETI Educom®
                  </p>
                  <Link to="/contact">
                    <Button className="bg-white text-[#1545ea] hover:bg-[#f1eded] w-full">
                      Enquire About Franchise
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FranchisePage;
