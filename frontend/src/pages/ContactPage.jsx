import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Clock,
  Send,
  Building2,
  Handshake
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry_type: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Thank you! We'll contact you shortly.");
      setFormData({ name: "", email: "", phone: "", enquiry_type: "", message: "" });
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

  // Pathankot Branch Info
  const branchInfo = {
    name: "Pathankot (Head Office)",
    address: "ETI Educom, Jodhamal Colony, Dhangu Road, Pathankot",
    phone: "+91 9646727676",
    email: "Pathankot@etieducom.com",
    timings: "Monday - Saturday, 9:00 AM - 6:00 PM"
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 9646727676",
      subtext: "Mon-Sat, 9AM-6PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "helpdesk@etieducom.com",
      subtext: "We reply within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Head Office",
      value: "ETI Educom",
      subtext: "Jodhamal Colony, Dhangu Road, Pathankot"
    }
  ];

  return (
    <div className="pt-[72px]" data-testid="contact-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Send className="w-4 h-4 mr-1" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Contact Us
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Ready to start your career journey? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div {...fadeInUp} className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-default">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] mb-1">{info.title}</h3>
                        <p className="text-[#1a1a1a]">{info.value}</p>
                        <p className="text-sm text-[#717171]">{info.subtext}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-[#1545ea] text-white">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 mb-4" />
                  <h3 className="font-bold mb-2">Office Hours</h3>
                  <p className="text-blue-100 text-sm">
                    Monday - Saturday<br />
                    9:00 AM - 6:00 PM IST
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="card-default">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="form-input"
                          data-testid="contact-name-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="form-input"
                          data-testid="contact-email-input"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Phone Number</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="form-input"
                          data-testid="contact-phone-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Enquiry Type *</label>
                        <Select 
                          value={formData.enquiry_type} 
                          onValueChange={(value) => setFormData({ ...formData, enquiry_type: value })}
                          required
                        >
                          <SelectTrigger className="form-input" data-testid="contact-enquiry-select">
                            <SelectValue placeholder="Select enquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="career_counselling">Career Counselling</SelectItem>
                            <SelectItem value="course_enquiry">Course Enquiry</SelectItem>
                            <SelectItem value="franchise">Franchise Enquiry</SelectItem>
                            <SelectItem value="corporate">Corporate Enquiry</SelectItem>
                            <SelectItem value="general">General Enquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        required
                        className="form-input resize-none"
                        data-testid="contact-message-input"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="btn-primary"
                      disabled={loading}
                      data-testid="contact-submit-btn"
                    >
                      {loading ? "Sending..." : "Send Message"}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pathankot Branch Section */}
      <section className="py-16 section-grey">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Building2 className="w-4 h-4 mr-1" />
              Our Branch
            </Badge>
            <h2 className="text-3xl font-bold text-[#1a1a1a] font-['Poppins']">
              Pathankot Branch
            </h2>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="card-default max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-xl text-[#1a1a1a] mb-4">{branchInfo.name}</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                        <p className="text-[#4a4a4a]">{branchInfo.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#1545ea] flex-shrink-0" />
                        <a href={`tel:${branchInfo.phone}`} className="text-[#1545ea] hover:underline">
                          {branchInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#1545ea] flex-shrink-0" />
                        <a href={`mailto:${branchInfo.email}`} className="text-[#1545ea] hover:underline">
                          {branchInfo.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                        <p className="text-[#4a4a4a]">{branchInfo.timings}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <a 
                      href="/branches/pathankot"
                      className="inline-flex items-center gap-2 text-[#1545ea] font-semibold hover:underline"
                    >
                      View Branch Details
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Handshake className="w-4 h-4 mr-1" />
              Partnerships
            </Badge>
            <h2 className="text-3xl font-bold text-[#1a1a1a] font-['Poppins']">
              School & College Partnerships
            </h2>
            <p className="text-[#4a4a4a] mt-4 max-w-2xl mx-auto">
              Partner with ETI Educom to bring industry-relevant computer education to your students. 
              We offer customized training programs for schools and colleges.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="card-default max-w-2xl mx-auto bg-gradient-to-br from-[#1545ea]/5 to-white">
              <CardContent className="p-8 text-center">
                <Handshake className="w-16 h-16 text-[#1545ea] mx-auto mb-4" />
                <h3 className="font-bold text-xl text-[#1a1a1a] mb-2">Interested in Partnering?</h3>
                <p className="text-[#4a4a4a] mb-6">
                  Reach out to us at our dedicated partnerships email for collaboration opportunities.
                </p>
                <a 
                  href="mailto:partnerships@etieducom.com"
                  className="inline-flex items-center gap-2 bg-[#1545ea] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d36c4] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  partnerships@etieducom.com
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
