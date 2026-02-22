import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Briefcase, ChevronRight, MapPin, Clock, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const JoinTeamPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    job_id: "",
    name: "",
    email: "",
    phone: "",
    cover_letter: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sample jobs if none from API
  const sampleJobs = [
    {
      id: "1",
      title: "Academic Coordinator",
      department: "Academics",
      location: "Head Office",
      type: "Full-time",
      description: "We are looking for an experienced Academic Coordinator to manage our curriculum development and student progress tracking.",
      requirements: ["Bachelor's degree in Education or related field", "2+ years of experience in academic administration", "Strong communication skills"]
    },
    {
      id: "2",
      title: "IT Trainer - Networking",
      department: "Training",
      location: "Multiple Locations",
      type: "Full-time",
      description: "Join our training team to deliver high-quality networking and cybersecurity courses to students.",
      requirements: ["CCNA/CompTIA Network+ certification", "2+ years of training experience", "Hands-on networking skills"]
    },
    {
      id: "3",
      title: "Digital Marketing Executive",
      department: "Marketing",
      location: "Head Office",
      type: "Full-time",
      description: "Help us grow our digital presence and reach more students through effective marketing strategies.",
      requirements: ["Google/Meta certifications preferred", "1+ years of digital marketing experience", "Portfolio of successful campaigns"]
    }
  ];

  const displayJobs = jobs.length > 0 ? jobs : sampleJobs;

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, job_id: job.id });
    setShowApplyModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.post(`${API}/applications`, formData);
      toast.success("Application submitted successfully!");
      setShowApplyModal(false);
      setFormData({ job_id: "", name: "", email: "", phone: "", cover_letter: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-[72px]" data-testid="join-team-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Briefcase className="w-4 h-4 mr-1" />
              Careers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Join ETI Team
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Build your career with India's leading Computer Career School
            </p>
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-20 bg-white">
        <div className="container-main">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full mx-auto"></div>
              <p className="text-[#717171] mt-4">Loading positions...</p>
            </div>
          ) : displayJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-[#b0b0b0] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">No Open Positions</h3>
              <p className="text-[#717171]">Check back later for new opportunities</p>
            </div>
          ) : (
            <div className="space-y-6">
              {displayJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card-default" data-testid={`job-${job.id}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge className="bg-[#f1eded] text-[#4a4a4a]">{job.department}</Badge>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                          <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-['Manrope']">
                            {job.title}
                          </h3>
                          <p className="text-[#4a4a4a] mb-4 text-sm">{job.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-[#717171]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                        <Button 
                          className="btn-primary"
                          onClick={() => handleApply(job)}
                          data-testid={`apply-btn-${job.id}`}
                        >
                          Apply Now
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-['Manrope']">
              Apply for {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="apply-form">
            <div>
              <label className="form-label">Full Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="form-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  className="form-input"
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
                />
              </div>
            </div>
            <div>
              <label className="form-label">Cover Letter *</label>
              <Textarea
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                placeholder="Tell us why you're a great fit for this role..."
                rows={5}
                required
                className="form-input resize-none"
              />
            </div>
            <Button 
              type="submit" 
              className="btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinTeamPage;
