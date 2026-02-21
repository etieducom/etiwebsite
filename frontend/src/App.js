import React, { useState, useEffect } from "react";
import "@/App.css";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  BookOpen, 
  Users, 
  Award, 
  Monitor, 
  Briefcase, 
  GraduationCap,
  Shield,
  Code,
  Palette,
  Network,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  CheckCircle,
  Building2,
  FileText,
  Handshake,
  Target,
  Clock,
  Star
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./components/ui/select";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Career Tracks", href: "#career-tracks" },
    { label: "About Us", href: "#about" },
    { label: "Certifications", href: "#certifications" },
    { label: "Placements", href: "#placements" },
    { label: "Franchise", href: "#franchise" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header 
      className={`header-sticky ${scrolled ? "scrolled" : ""}`} 
      data-testid="main-header"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#1E3A8A] font-['Manrope']">ETI Educom</span>
              <span className="text-[#F97316] text-lg">®</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="nav-link text-sm"
                data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href="#contact">
              <Button 
                className="bg-[#1E3A8A] hover:bg-[#172554] text-white font-semibold"
                data-testid="header-cta-btn"
              >
                Book Counselling
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu lg:hidden" data-testid="mobile-menu">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-[#1E3A8A]">ETI Educom®</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="mt-4" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#1E3A8A] hover:bg-[#172554] text-white">
                Book Counselling
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="pt-28 pb-20 md:pt-32 md:pb-28 bg-gradient-to-br from-slate-50 to-slate-100"
      data-testid="hero-section"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...fadeInUp}>
            <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] mb-6 px-4 py-2 text-sm font-medium">
              Certiport Authorized Testing Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight font-['Manrope']">
              The Computer <span className="text-[#1E3A8A]">Career School</span>
            </h1>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed max-w-xl">
              Building structured career pathways in technology through comprehensive, 
              governance-oriented education since 2017.
            </p>
            <p className="text-base text-slate-500 mb-8 max-w-xl">
              We operate through defined Career Tracks — not disconnected courses. 
              A structured academic framework designed for long-term career success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact">
                <Button 
                  className="btn-cta text-base"
                  data-testid="hero-counselling-btn"
                >
                  Book Career Counselling
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#career-tracks">
                <Button 
                  variant="outline"
                  className="btn-secondary text-base"
                  data-testid="hero-explore-btn"
                >
                  Explore Career Tracks
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                alt="Students collaborating in a modern computer lab"
                className="w-full h-auto object-cover"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/20 to-transparent"></div>
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#F97316]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">2000+</p>
                  <p className="text-sm text-slate-500">Learners Trained</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Certification Partners Section
const CertificationSection = () => {
  const partners = [
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Adobe_Systems_logo_and_wordmark.svg" },
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }
  ];

  return (
    <section 
      id="certifications" 
      className="py-16 bg-white border-y border-slate-100"
      data-testid="certification-section"
    >
      <div className="container-main">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <Badge className="bg-[#0D9488]/10 text-[#0D9488] mb-4">
            <Award className="w-4 h-4 mr-1" />
            Certiport Authorized Testing Center
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-['Manrope']">
            Industry-Recognized Certifications
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            As a Certiport Authorized Testing Center (CATC), we provide vendor-neutral certifications 
            following ethical practices. Exam fees are charged separately as per official pricing.
          </p>
        </motion.div>

        {/* Marquee slider */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 mx-12 flex items-center justify-center h-20"
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} certification partner`}
                  className="partner-logo h-8 md:h-10 w-auto object-contain"
                  data-testid={`partner-logo-${partner.name.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div {...fadeInUp} className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <Shield className="w-10 h-10 text-[#1E3A8A] mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Vendor-Neutral Approach</h3>
            <p className="text-sm text-slate-600">Unbiased certification guidance based on career goals</p>
          </div>
          <div className="p-6">
            <CheckCircle className="w-10 h-10 text-[#0D9488] mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Ethical Practices</h3>
            <p className="text-sm text-slate-600">Transparent pricing with no hidden costs</p>
          </div>
          <div className="p-6">
            <Award className="w-10 h-10 text-[#F97316] mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Global Recognition</h3>
            <p className="text-sm text-slate-600">Certifications accepted worldwide by employers</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Career Tracks Section
const CareerTracksSection = () => {
  const tracks = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Computer Career Foundation",
      description: "Build a solid foundation in computing fundamentals, digital literacy, and essential software skills.",
      outcomes: ["Digital Literacy Expert", "Office Productivity Specialist", "IT Fundamentals Professional"],
      suitable: "Students, Fresh Graduates, Career Starters",
      duration: "3-6 months",
      certifications: "Microsoft Office Specialist, IC3 Digital Literacy",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
      color: "#1E3A8A"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Digital Design & Marketing",
      description: "Master creative design tools and digital marketing strategies for the modern business landscape.",
      outcomes: ["Graphic Designer", "Digital Marketing Specialist", "UI/UX Designer"],
      suitable: "Creative Professionals, Marketing Enthusiasts",
      duration: "6-12 months",
      certifications: "Adobe Certified Professional, Google Digital Marketing",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400",
      color: "#F97316"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "IT Support, Networking & Cybersecurity",
      description: "Develop expertise in IT infrastructure, network administration, and security protocols.",
      outcomes: ["IT Support Technician", "Network Administrator", "Security Analyst"],
      suitable: "Technical Aspirants, IT Professionals",
      duration: "6-12 months",
      certifications: "CompTIA A+, Network+, Security+",
      image: "https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&q=80&w=400",
      color: "#0D9488"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Software Development",
      description: "Learn programming languages, development frameworks, and software engineering principles.",
      outcomes: ["Full Stack Developer", "Software Engineer", "Application Developer"],
      suitable: "Engineering Students, Tech Enthusiasts",
      duration: "9-18 months",
      certifications: "Microsoft Certified Developer, AWS Developer",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=400",
      color: "#7C3AED"
    }
  ];

  return (
    <section 
      id="career-tracks" 
      className="py-20 md:py-28 bg-slate-50"
      data-testid="career-tracks-section"
    >
      <div className="container-main">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] mb-4">
            <BookOpen className="w-4 h-4 mr-1" />
            Structured Learning Paths
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Manrope']">
            Four Career Tracks
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive, industry-aligned programs designed to transform learners 
            into skilled professionals ready for the modern workforce.
          </p>
        </motion.div>

        <motion.div 
          {...staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {tracks.map((track, index) => (
            <motion.div 
              key={track.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="career-card h-full"
                data-testid={`career-track-${index + 1}`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex-shrink-0">
                    <img 
                      src={track.image} 
                      alt={track.title}
                      className="w-full h-40 md:h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${track.color}15`, color: track.color }}
                    >
                      {track.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Manrope']">
                      {track.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      {track.description}
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">
                          <strong>Outcomes:</strong> {track.outcomes.join(", ")}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-[#1E3A8A] mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">
                          <strong>Suitable for:</strong> {track.suitable}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">
                          <strong>Duration:</strong> {track.duration}
                        </span>
                      </div>
                    </div>
                    <a href="#contact" className="inline-block mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// MD's Desk Section
const MDSection = () => {
  return (
    <section 
      id="md-desk" 
      className="py-20 md:py-28 bg-white"
      data-testid="md-section"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeInUp} className="order-2 lg:order-1">
            <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] mb-6">
              From the MD's Desk
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Manrope']">
              Building India's Computer Career Ecosystem
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>
                In an era where technology shapes every aspect of our lives, structured computer 
                education has become not just relevant, but essential. At ETI Educom®, we believe 
                that true career transformation requires discipline, structured learning, and a 
                long-term vision.
              </p>
              <p>
                Since 2017, we have been committed to building an institution — not just a training 
                center. Our focus on governance, academic frameworks, and industry-aligned 
                certifications reflects our student-first philosophy.
              </p>
              <p>
                We are here to build careers, not sell courses. Every decision we make is guided 
                by this principle, ensuring that our learners receive education that truly 
                prepares them for the professional world.
              </p>
              <p className="font-semibold text-slate-800">
                Together, we are building a national ecosystem for computer career education.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="font-bold text-slate-900 font-['Manrope']">Managing Director</p>
              <p className="text-slate-600">ETI Learning Systems Private Limited</p>
            </div>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/7581115/pexels-photo-7581115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Managing Director"
                  className="w-full h-full object-cover"
                  data-testid="md-image"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#1E3A8A] text-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                <p className="text-2xl font-bold mb-1">Since 2017</p>
                <p className="text-blue-100 text-sm">Building structured computer career pathways</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Overview Section with Stats
const OverviewSection = () => {
  const stats = [
    { value: "2000+", label: "Learners Trained", icon: <Users className="w-6 h-6" /> },
    { value: "2017", label: "Established", icon: <Building2 className="w-6 h-6" /> },
    { value: "4", label: "Career Tracks", icon: <BookOpen className="w-6 h-6" /> },
    { value: "100%", label: "Structured Curriculum", icon: <FileText className="w-6 h-6" /> }
  ];

  const features = [
    { title: "Centralized Governance", description: "Unified academic standards across all centers" },
    { title: "ERP-Enabled Monitoring", description: "Real-time progress tracking and reporting" },
    { title: "Certification Workflows", description: "Streamlined exam registration and delivery" },
    { title: "Career-First Approach", description: "Every program designed for employment outcomes" }
  ];

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 bg-slate-50"
      data-testid="overview-section"
    >
      <div className="container-main">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge className="bg-[#0D9488]/10 text-[#0D9488] mb-4">
            About ETI Educom®
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Manrope']">
            Institution-Grade Education
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A structured academic framework designed for consistent, quality computer education 
            with centralized governance and career-focused outcomes.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          {...fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="stat-box"
              data-testid={`stat-${index + 1}`}
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
              <p className="text-blue-100 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          {...staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white border-slate-200">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-[#0D9488] mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "IT Support Specialist",
      company: "Tech Solutions Ltd",
      text: "The structured approach at ETI Educom helped me transition from a non-technical background to a confident IT professional. The certification preparation was thorough and practical.",
      track: "IT Support & Networking"
    },
    {
      name: "Priya Patel",
      role: "Graphic Designer",
      company: "Creative Agency",
      text: "ETI's Digital Design track gave me the skills and portfolio I needed. The faculty's industry experience made all the difference in understanding real-world applications.",
      track: "Digital Design & Marketing"
    },
    {
      name: "Amit Kumar",
      role: "Junior Developer",
      company: "Software Corp",
      text: "The Software Development track provided a solid foundation in programming. The project-based learning approach prepared me well for my first job in the industry.",
      track: "Software Development"
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-28 bg-white"
      data-testid="testimonials-section"
    >
      <div className="container-main">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge className="bg-[#F97316]/10 text-[#F97316] mb-4">
            <Star className="w-4 h-4 mr-1" />
            Student Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Manrope']">
            Learner Progression
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real stories of skill development and career growth from our alumni community.
          </p>
        </motion.div>

        <motion.div 
          {...staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="testimonial-card h-full"
                data-testid={`testimonial-${index + 1}`}
              >
                <CardContent className="p-8 pt-12">
                  <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center">
                      <span className="text-[#1E3A8A] font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {testimonial.track}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Placement Section
const PlacementSection = () => {
  const services = [
    { icon: <FileText className="w-6 h-6" />, title: "Resume Building", description: "Professional resume preparation aligned with industry standards" },
    { icon: <Users className="w-6 h-6" />, title: "Interview Preparation", description: "Mock interviews and communication skill development" },
    { icon: <Award className="w-6 h-6" />, title: "Skill Validation", description: "Industry-recognized certifications and assessments" },
    { icon: <Briefcase className="w-6 h-6" />, title: "Industry Exposure", description: "Interaction with professionals and workplace visits" },
    { icon: <Target className="w-6 h-6" />, title: "Career Guidance", description: "Personalized career counselling and pathway planning" },
    { icon: <Handshake className="w-6 h-6" />, title: "Placement Support", description: "Ongoing support for job search and applications" }
  ];

  return (
    <section 
      id="placements" 
      className="py-20 md:py-28 bg-slate-50"
      data-testid="placement-section"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeInUp}>
            <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] mb-6">
              <Briefcase className="w-4 h-4 mr-1" />
              Career Support
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Manrope']">
              Placement & Career Assistance
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Comprehensive career support services designed to help our learners 
              transition successfully into the professional world.
            </p>
            <p className="text-slate-500 text-sm mb-8 p-4 bg-white rounded-lg border border-slate-200">
              <strong>Note:</strong> We provide career guidance and support services, not job guarantees. 
              Success depends on individual effort, skill development, and market conditions.
            </p>
          </motion.div>
          
          <motion.div 
            {...staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full bg-white border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center mb-3 text-[#1E3A8A]">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-sm">{service.title}</h3>
                    <p className="text-xs text-slate-500">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Franchise Section
const FranchiseSection = () => {
  const benefits = [
    { label: "Agreement Duration", value: "5 Years" },
    { label: "Royalty", value: "15%" },
    { label: "Exclusivity Radius", value: "15 KM" },
    { label: "Auto-Renewal", value: "Subject to Compliance" }
  ];

  return (
    <section 
      id="franchise" 
      className="py-20 md:py-28 bg-[#0F172A] text-white grain-overlay"
      data-testid="franchise-section"
    >
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeInUp}>
            <Badge className="bg-white/10 text-white mb-6">
              <Building2 className="w-4 h-4 mr-1" />
              Partnership Opportunity
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Manrope']">
              Franchise with ETI Educom®
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Join India's growing network of structured computer career education centers. 
              Build a sustainable education business with institutional-grade support.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((item) => (
                <div key={item.label} className="bg-white/5 rounded-lg p-4">
                  <p className="text-2xl font-bold text-[#F97316]">{item.value}</p>
                  <p className="text-sm text-blue-200">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-blue-100 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#0D9488] mt-0.5 flex-shrink-0" />
                <span>Fresh agreement at renewal without new brand license fee</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#0D9488] mt-0.5 flex-shrink-0" />
                <span>Centralized marketing execution and brand support</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#0D9488] mt-0.5 flex-shrink-0" />
                <span>Academic governance and quality assurance</span>
              </div>
            </div>

            <a href="#contact">
              <Button className="btn-cta" data-testid="franchise-enquiry-btn">
                Enquire About Franchise
                <ChevronRight className="w-5 h-5" />
              </Button>
            </a>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                alt="Business partnership meeting"
                className="w-full h-auto object-cover"
                data-testid="franchise-image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Educonnect Section
const EduconnectSection = () => {
  return (
    <section 
      id="educonnect" 
      className="py-20 md:py-28 bg-white"
      data-testid="educonnect-section"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            {...fadeInUp}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                alt="University campus"
                className="w-full h-auto object-cover"
                data-testid="educonnect-image"
              />
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="order-1 lg:order-2">
            <Badge className="bg-[#0D9488]/10 text-[#0D9488] mb-6">
              <GraduationCap className="w-4 h-4 mr-1" />
              Higher Education
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Manrope']">
              ETI Educonnect
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Our university admissions vertical connects aspiring students with quality 
              higher education opportunities through structured academic facilitation.
            </p>
            
            <div className="space-y-4 mb-8">
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Structured Documentation</h3>
                    <p className="text-sm text-slate-600">Complete guidance for admission paperwork and processes</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Academic Facilitation</h3>
                    <p className="text-sm text-slate-600">Support throughout the admission journey</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <a href="#contact">
              <Button 
                variant="outline"
                className="text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                data-testid="educonnect-enquiry-btn"
              >
                Learn More About Educonnect
                <ChevronRight className="w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
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
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data) {
        toast.success("Thank you for your enquiry! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", enquiry_type: "", message: "" });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-28 bg-slate-50"
      data-testid="contact-section"
    >
      <div className="container-main">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge className="bg-[#F97316]/10 text-[#F97316] mb-4">
            <Mail className="w-4 h-4 mr-1" />
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Manrope']">
            Contact Us
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ready to start your computer career journey? We're here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div {...fadeInUp} className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                      <p className="text-slate-600">+91 XXXXX XXXXX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#0D9488]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                      <p className="text-slate-600">info@etieducom.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                      <p className="text-slate-600">ETI Educom® Head Office<br />India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl font-['Manrope']">Send us a Message</CardTitle>
                <CardDescription>
                  Fill in the form below and we'll get back to you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                          <SelectItem value="franchise">Franchise Enquiry</SelectItem>
                          <SelectItem value="corporate">Corporate Enquiry</SelectItem>
                          <SelectItem value="educonnect">Educonnect / University</SelectItem>
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
                      rows={4}
                      required
                      className="form-input resize-none"
                      data-testid="contact-message-input"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="btn-primary w-full md:w-auto"
                    disabled={loading}
                    data-testid="contact-submit-btn"
                  >
                    {loading ? "Sending..." : "Submit Enquiry"}
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const quickLinks = [
    { label: "Career Tracks", href: "#career-tracks" },
    { label: "About Us", href: "#about" },
    { label: "Certifications", href: "#certifications" },
    { label: "Placements", href: "#placements" }
  ];

  const otherLinks = [
    { label: "Franchise", href: "#franchise" },
    { label: "Educonnect", href: "#educonnect" },
    { label: "Contact Us", href: "#contact" }
  ];

  return (
    <footer className="footer" data-testid="footer">
      <div className="container-main">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <span className="text-xl font-bold font-['Manrope']">ETI Educom</span>
                <span className="text-[#F97316] text-lg">®</span>
              </div>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              The Computer Career School — Building structured career pathways in technology 
              through comprehensive, governance-oriented education since 2017.
            </p>
            <p className="text-slate-500 text-sm">
              ETI Learning Systems Private Limited
            </p>
            <Badge className="mt-2 bg-[#0D9488]/20 text-[#0D9488]">
              Certiport Authorized Testing Center
            </Badge>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 font-['Manrope']">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link text-sm hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-['Manrope']">Other Links</h4>
            <ul className="space-y-2">
              {otherLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link text-sm hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ETI Educom®. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            A unit of ETI Learning Systems Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <HeroSection />
        <CertificationSection />
        <CareerTracksSection />
        <MDSection />
        <OverviewSection />
        <TestimonialsSection />
        <PlacementSection />
        <FranchiseSection />
        <EduconnectSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
