import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Shield, 
  Calendar, 
  Briefcase, 
  Plus,
  Trash2,
  Edit,
  Star,
  BookOpen,
  Users
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
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

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Event Modal
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "", description: "", event_date: "", event_time: "", location: "", image_url: ""
  });
  const [eventSubmitting, setEventSubmitting] = useState(false);

  // Job Modal
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "", department: "", location: "", type: "Full-time", description: "", requirements: [""]
  });
  const [jobSubmitting, setJobSubmitting] = useState(false);

  // Review Modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    student_name: "", course: "", review_text: "", photo_url: "", rating: 5
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  // Program Modal
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [programForm, setProgramForm] = useState({
    title: "", slug: "", description: "", category: "career_tracks", duration: "",
    outcomes: [""], suitable_for: "", certifications: [""], modules: [""], image_url: "", icon: "Monitor", order: 0
  });
  const [programSubmitting, setProgramSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, jobsRes, reviewsRes, programsRes, enquiriesRes] = await Promise.all([
        axios.get(`${API}/events?active_only=false`),
        axios.get(`${API}/jobs?active_only=false`),
        axios.get(`${API}/reviews?active_only=false`),
        axios.get(`${API}/programs?active_only=false`),
        axios.get(`${API}/contact`)
      ]);
      setEvents(eventsRes.data);
      setJobs(jobsRes.data);
      setReviews(reviewsRes.data);
      setPrograms(programsRes.data);
      setEnquiries(enquiriesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setEventSubmitting(true);
    try {
      await axios.post(`${API}/events`, eventForm);
      toast.success("Event created successfully!");
      setShowEventModal(false);
      setEventForm({ title: "", description: "", event_date: "", event_time: "", location: "", image_url: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setEventSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`${API}/events/${eventId}`);
      toast.success("Event deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  // Job handlers
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setJobSubmitting(true);
    try {
      const jobData = { ...jobForm, requirements: jobForm.requirements.filter(r => r.trim()) };
      await axios.post(`${API}/jobs`, jobData);
      toast.success("Job created successfully!");
      setShowJobModal(false);
      setJobForm({ title: "", department: "", location: "", type: "Full-time", description: "", requirements: [""] });
      fetchData();
    } catch (error) {
      toast.error("Failed to create job");
    } finally {
      setJobSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await axios.delete(`${API}/jobs/${jobId}`);
      toast.success("Job deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  // Review handlers
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitting(true);
    try {
      await axios.post(`${API}/reviews`, reviewForm);
      toast.success("Review added successfully!");
      setShowReviewModal(false);
      setReviewForm({ student_name: "", course: "", review_text: "", photo_url: "", rating: 5 });
      fetchData();
    } catch (error) {
      toast.error("Failed to add review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`${API}/reviews/${reviewId}`);
      toast.success("Review deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  // Program handlers
  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    setProgramSubmitting(true);
    try {
      const programData = {
        ...programForm,
        outcomes: programForm.outcomes.filter(o => o.trim()),
        certifications: programForm.certifications.filter(c => c.trim()),
        modules: programForm.modules.filter(m => m.trim())
      };
      await axios.post(`${API}/programs`, programData);
      toast.success("Program created successfully!");
      setShowProgramModal(false);
      setProgramForm({
        title: "", slug: "", description: "", category: "career_tracks", duration: "",
        outcomes: [""], suitable_for: "", certifications: [""], modules: [""], image_url: "", icon: "Monitor", order: 0
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to create program");
    } finally {
      setProgramSubmitting(false);
    }
  };

  const handleDeleteProgram = async (programId) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await axios.delete(`${API}/programs/${programId}`);
      toast.success("Program deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete program");
    }
  };

  const addArrayItem = (formSetter, field, currentForm) => {
    formSetter({ ...currentForm, [field]: [...currentForm[field], ""] });
  };

  const updateArrayItem = (formSetter, field, index, value, currentForm) => {
    const newArray = [...currentForm[field]];
    newArray[index] = value;
    formSetter({ ...currentForm, [field]: newArray });
  };

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid="admin-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Admin Panel
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Admin Dashboard
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="mb-8 flex-wrap">
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Events ({events.length})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star className="w-4 h-4" /> Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Programs ({programs.length})
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Jobs ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="enquiries" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Enquiries ({enquiries.length})
              </TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Events</h2>
                <Button className="btn-primary" onClick={() => setShowEventModal(true)} data-testid="add-event-btn">
                  <Plus className="w-4 h-4" /> Add Event
                </Button>
              </div>
              {events.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No events yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{event.title}</h3>
                          <p className="text-sm text-[#717171]">{event.event_date} | {event.location}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Student Reviews</h2>
                <Button className="btn-primary" onClick={() => setShowReviewModal(true)} data-testid="add-review-btn">
                  <Plus className="w-4 h-4" /> Add Review
                </Button>
              </div>
              {reviews.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Star className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No reviews yet</p>
                </CardContent></Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="card-default">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img 
                              src={review.photo_url || `https://ui-avatars.com/api/?name=${review.student_name}&background=1545ea&color=fff`}
                              alt={review.student_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-[#1a1a1a]">{review.student_name}</h3>
                              <p className="text-xs text-[#717171]">{review.course}</p>
                            </div>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-[#4a4a4a] line-clamp-2">"{review.review_text}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Programs Tab */}
            <TabsContent value="programs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Programs</h2>
                <Button className="btn-primary" onClick={() => setShowProgramModal(true)} data-testid="add-program-btn">
                  <Plus className="w-4 h-4" /> Add Program
                </Button>
              </div>
              {programs.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No programs yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {programs.map((program) => (
                    <Card key={program.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">{program.category}</Badge>
                          <h3 className="font-semibold text-[#1a1a1a]">{program.title}</h3>
                          <p className="text-sm text-[#717171]">{program.duration}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProgram(program.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Jobs</h2>
                <Button className="btn-primary" onClick={() => setShowJobModal(true)} data-testid="add-job-btn">
                  <Plus className="w-4 h-4" /> Add Job
                </Button>
              </div>
              {jobs.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Briefcase className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No jobs yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{job.title}</h3>
                          <p className="text-sm text-[#717171]">{job.department} | {job.location}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Enquiries Tab */}
            <TabsContent value="enquiries">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Contact Enquiries</h2>
              {enquiries.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <p className="text-[#717171]">No enquiries yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enquiry) => (
                    <Card key={enquiry.id} className="card-default">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-[#1a1a1a]">{enquiry.name}</h3>
                          <Badge variant="outline">{enquiry.enquiry_type}</Badge>
                        </div>
                        <p className="text-sm text-[#717171] mb-2">{enquiry.email} | {enquiry.phone}</p>
                        <p className="text-sm text-[#4a4a4a]">{enquiry.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Event Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add New Event</DialogTitle></DialogHeader>
          <form onSubmit={handleEventSubmit} className="space-y-4" data-testid="event-form">
            <Input placeholder="Event title" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} required className="form-input" />
            <Textarea placeholder="Description" rows={3} value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} required className="form-input resize-none" />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={eventForm.event_date} onChange={(e) => setEventForm({...eventForm, event_date: e.target.value})} required className="form-input" />
              <Input placeholder="Time (10:00 AM)" value={eventForm.event_time} onChange={(e) => setEventForm({...eventForm, event_time: e.target.value})} required className="form-input" />
            </div>
            <Input placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({...eventForm, location: e.target.value})} required className="form-input" />
            <Input placeholder="Image URL (optional)" value={eventForm.image_url} onChange={(e) => setEventForm({...eventForm, image_url: e.target.value})} className="form-input" />
            <Button type="submit" className="btn-primary w-full" disabled={eventSubmitting}>
              {eventSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Student Review</DialogTitle></DialogHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4" data-testid="review-form">
            <Input placeholder="Student name" value={reviewForm.student_name} onChange={(e) => setReviewForm({...reviewForm, student_name: e.target.value})} required className="form-input" />
            <Input placeholder="Course/Program" value={reviewForm.course} onChange={(e) => setReviewForm({...reviewForm, course: e.target.value})} required className="form-input" />
            <Textarea placeholder="Review text" rows={4} value={reviewForm.review_text} onChange={(e) => setReviewForm({...reviewForm, review_text: e.target.value})} required className="form-input resize-none" />
            <Input placeholder="Photo URL (optional)" value={reviewForm.photo_url} onChange={(e) => setReviewForm({...reviewForm, photo_url: e.target.value})} className="form-input" />
            <Select value={String(reviewForm.rating)} onValueChange={(v) => setReviewForm({...reviewForm, rating: parseInt(v)})}>
              <SelectTrigger className="form-input"><SelectValue placeholder="Rating" /></SelectTrigger>
              <SelectContent>
                {[5,4,3,2,1].map(r => <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>)}
              </SelectContent>
            </Select>
            <Button type="submit" className="btn-primary w-full" disabled={reviewSubmitting}>
              {reviewSubmitting ? "Adding..." : "Add Review"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Program Modal */}
      <Dialog open={showProgramModal} onOpenChange={setShowProgramModal}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add New Program</DialogTitle></DialogHeader>
          <form onSubmit={handleProgramSubmit} className="space-y-4" data-testid="program-form">
            <Input placeholder="Program title" value={programForm.title} onChange={(e) => setProgramForm({...programForm, title: e.target.value})} required className="form-input" />
            <Input placeholder="Slug (e.g., web-development)" value={programForm.slug} onChange={(e) => setProgramForm({...programForm, slug: e.target.value})} required className="form-input" />
            <Textarea placeholder="Description" rows={3} value={programForm.description} onChange={(e) => setProgramForm({...programForm, description: e.target.value})} required className="form-input resize-none" />
            <Select value={programForm.category} onValueChange={(v) => setProgramForm({...programForm, category: v})}>
              <SelectTrigger className="form-input"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="career_tracks">Career Tracks</SelectItem>
                <SelectItem value="short_term">Short Term Programs</SelectItem>
                <SelectItem value="skill_development">Skill Development</SelectItem>
                <SelectItem value="corporate_training">Corporate Training</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Duration (e.g., 3-6 months)" value={programForm.duration} onChange={(e) => setProgramForm({...programForm, duration: e.target.value})} required className="form-input" />
            <Input placeholder="Suitable for" value={programForm.suitable_for} onChange={(e) => setProgramForm({...programForm, suitable_for: e.target.value})} required className="form-input" />
            <Input placeholder="Image URL" value={programForm.image_url} onChange={(e) => setProgramForm({...programForm, image_url: e.target.value})} className="form-input" />
            <Select value={programForm.icon} onValueChange={(v) => setProgramForm({...programForm, icon: v})}>
              <SelectTrigger className="form-input"><SelectValue placeholder="Icon" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Monitor">Monitor</SelectItem>
                <SelectItem value="Palette">Palette</SelectItem>
                <SelectItem value="Network">Network</SelectItem>
                <SelectItem value="Code">Code</SelectItem>
                <SelectItem value="Building2">Building</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <label className="form-label">Career Outcomes</label>
              {programForm.outcomes.map((o, i) => (
                <Input key={i} value={o} onChange={(e) => updateArrayItem(setProgramForm, 'outcomes', i, e.target.value, programForm)} placeholder={`Outcome ${i+1}`} className="form-input mb-2" />
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(setProgramForm, 'outcomes', programForm)}>
                <Plus className="w-4 h-4 mr-1" /> Add Outcome
              </Button>
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={programSubmitting}>
              {programSubmitting ? "Creating..." : "Create Program"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Modal */}
      <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add New Job</DialogTitle></DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-4" data-testid="job-form">
            <Input placeholder="Job title" value={jobForm.title} onChange={(e) => setJobForm({...jobForm, title: e.target.value})} required className="form-input" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Department" value={jobForm.department} onChange={(e) => setJobForm({...jobForm, department: e.target.value})} required className="form-input" />
              <Input placeholder="Location" value={jobForm.location} onChange={(e) => setJobForm({...jobForm, location: e.target.value})} required className="form-input" />
            </div>
            <Input placeholder="Type (Full-time/Part-time)" value={jobForm.type} onChange={(e) => setJobForm({...jobForm, type: e.target.value})} required className="form-input" />
            <Textarea placeholder="Description" rows={3} value={jobForm.description} onChange={(e) => setJobForm({...jobForm, description: e.target.value})} required className="form-input resize-none" />
            <div>
              <label className="form-label">Requirements</label>
              {jobForm.requirements.map((r, i) => (
                <Input key={i} value={r} onChange={(e) => updateArrayItem(setJobForm, 'requirements', i, e.target.value, jobForm)} placeholder={`Requirement ${i+1}`} className="form-input mb-2" />
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(setJobForm, 'requirements', jobForm)}>
                <Plus className="w-4 h-4 mr-1" /> Add Requirement
              </Button>
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={jobSubmitting}>
              {jobSubmitting ? "Creating..." : "Create Job"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
