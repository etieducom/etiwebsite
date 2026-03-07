import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Users, ChevronRight, Building2, CheckCircle } from "lucide-react";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const HireFromUsPage = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    requirements: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/hire-request`, formData);
      toast.success("Thank you! We'll contact you shortly.");
      setFormData({ company_name: "", contact_person: "", email: "", phone: "", requirements: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    "Pre-screened, industry-ready candidates",
    "Candidates with global certifications",
    "Structured training in latest technologies",
    "Flexible hiring options (fresher/experienced)",
    "No recruitment fees for direct hiring"
  ];

  return (
    <div className="pt-[72px]" data-testid="hire-from-us-page">
      <SEO pageSlug="hire-from-us" />
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Users className="w-4 h-4 mr-1" />
              For Employers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Hire From Us
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Access certified, industry-ready talent from ETI Educom®
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Benefits */}
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                Why Hire Our Talent?
              </h2>
              <p className="text-[#4a4a4a] mb-8">
                Our graduates are trained through structured career tracks and hold 
                globally recognized certifications. They come prepared with practical 
                skills and industry knowledge.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1a1a1a]">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="card-default text-center">
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-[#1545ea]">2000+</p>
                    <p className="text-sm text-[#717171]">Trained Professionals</p>
                  </CardContent>
                </Card>
                <Card className="card-default text-center">
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-[#1545ea]">4</p>
                    <p className="text-sm text-[#717171]">Skill Domains</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Hire Form */}
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="card-default">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                    Submit Hiring Request
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="hire-form">
                    <div>
                      <label className="form-label">Company Name *</label>
                      <Input
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Your company name"
                        required
                        className="form-input"
                        data-testid="company-name-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Contact Person *</label>
                      <Input
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="form-input"
                        data-testid="contact-person-input"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@company.com"
                          required
                          className="form-input"
                          data-testid="hire-email-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone *</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          required
                          className="form-input"
                          data-testid="hire-phone-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Requirements *</label>
                      <Textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="Describe the roles, skills, and number of candidates needed..."
                        rows={4}
                        required
                        className="form-input resize-none"
                        data-testid="requirements-input"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="btn-primary w-full"
                      disabled={loading}
                      data-testid="hire-submit-btn"
                    >
                      {loading ? "Submitting..." : "Submit Request"}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireFromUsPage;
