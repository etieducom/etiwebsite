import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  Phone, 
  CheckCircle, 
  Clock, 
  Users, 
  Award,
  ArrowRight,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const careerTracks = [
  "Computer Career Foundation",
  "Digital Design & Marketing",
  "IT Support & Cybersecurity",
  "Software Development",
  "MS Office Certification",
  "Graphic Design",
  "Web Development",
  "Python Programming",
  "Other / Not Sure"
];

const benefits = [
  { icon: <Target className="w-6 h-6" />, title: "Personalized Guidance", desc: "Get career advice tailored to your goals" },
  { icon: <Clock className="w-6 h-6" />, title: "15-Min Session", desc: "Quick, focused counselling session" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Career Roadmap", desc: "Clear path to your dream career" },
  { icon: <Award className="w-6 h-6" />, title: "Expert Counselors", desc: "Industry experienced professionals" }
];

const FreeCounsellingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    education: "",
    preferred_track: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.education || !formData.preferred_track) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/counselling-leads`, formData);
      setSubmitted(true);
      toast.success("Request submitted! We'll call you shortly.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1545ea] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
            Thank You!
          </h2>
          <p className="text-[#4a4a4a] mb-6">
            Your free counselling request has been received. Our career expert will call you within 24 hours.
          </p>
          <a href="/">
            <Button className="btn-primary">
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea]" data-testid="free-counselling-page">
      {/* Hero Section */}
      <div className="container-main py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-4rem)]">
          
          {/* Left - Content */}
          <div className="text-white order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">100% FREE | No Obligations</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-['Poppins']">
              Get FREE Career
              <span className="block text-yellow-400">Counselling Today</span>
            </h1>
            
            <p className="text-lg text-blue-100 mb-8 max-w-lg">
              Confused about your career path? Our expert counselors will help you discover the right career track based on your interests and goals.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{benefit.title}</h3>
                    <p className="text-xs text-blue-200">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>2000+ Students Guided</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Since 2017</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#1a1a1a] font-['Poppins']">
                  Book Your Free Session
                </h2>
                <p className="text-[#717171] text-sm mt-2">
                  Fill the form & get a call within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" data-testid="counselling-form">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-input h-12"
                    required
                    data-testid="counselling-name"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="form-input h-12"
                    required
                    data-testid="counselling-phone"
                  />
                </div>

                <div>
                  <Select 
                    value={formData.education} 
                    onValueChange={(v) => setFormData({...formData, education: v})}
                  >
                    <SelectTrigger className="form-input h-12" data-testid="counselling-education">
                      <SelectValue placeholder="Your Education *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th Pass">10th Pass</SelectItem>
                      <SelectItem value="12th Pass">12th Pass</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                      <SelectItem value="Working Professional">Working Professional</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select 
                    value={formData.preferred_track} 
                    onValueChange={(v) => setFormData({...formData, preferred_track: v})}
                  >
                    <SelectTrigger className="form-input h-12" data-testid="counselling-track">
                      <SelectValue placeholder="Interested In *" />
                    </SelectTrigger>
                    <SelectContent>
                      {careerTracks.map((track) => (
                        <SelectItem key={track} value={track}>{track}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="btn-primary w-full h-12 text-base"
                  disabled={submitting}
                  data-testid="counselling-submit"
                >
                  {submitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Get Free Counselling
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-[#717171] mt-4">
                  By submitting, you agree to receive a call from our counselor.
                  <br />No spam. 100% Free service.
                </p>
              </form>

              {/* Urgency */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Limited Slots Available Today!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCounsellingPage;
