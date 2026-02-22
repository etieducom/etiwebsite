import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${API}/blogs/${slug}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      // Fallback sample blog
      setBlog({
        id: "1",
        title: "Top 10 IT Skills in Demand for 2025",
        slug: "top-10-it-skills-2025",
        excerpt: "Discover the most sought-after IT skills that employers are looking for in 2025.",
        content: `<p>The IT industry continues to evolve rapidly, and staying ahead of the curve is essential for anyone looking to build a successful career in technology.</p>
        <h2>1. Cloud Computing</h2>
        <p>With businesses increasingly moving to the cloud, expertise in AWS, Azure, and Google Cloud Platform is highly valuable.</p>
        <h2>2. Cybersecurity</h2>
        <p>As cyber threats become more sophisticated, the demand for security professionals continues to grow.</p>
        <h2>3. Data Science & Analytics</h2>
        <p>Organizations rely on data-driven insights to make strategic decisions.</p>
        <h2>4. Artificial Intelligence & Machine Learning</h2>
        <p>AI and ML are transforming industries from healthcare to finance.</p>
        <h2>5. Web Development</h2>
        <p>Full-stack development skills remain in high demand as businesses prioritize their digital presence.</p>`,
        featured_image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        category: "Career Tips",
        tags: ["IT Skills", "Career", "2025"],
        author: "ETI Educom",
        author_image: null,
        read_time: 5,
        created_at: "2025-02-15"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blogs?limit=3`);
      setRelatedBlogs(response.data.filter(b => b.slug !== slug).slice(0, 3));
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Blog not found</h2>
          <Link to="/blogs">
            <Button className="btn-primary">Back to Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid="blog-detail-page">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={blog.featured_image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-main">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
            <Badge className="bg-white/20 text-white mb-4">{blog.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Poppins'] max-w-4xl">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            {/* Meta Info */}
            <motion.div {...fadeInUp} className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-[#ebebeb]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1545ea] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-[#1a1a1a]">{blog.author}</span>
              </div>
              <span className="flex items-center gap-2 text-[#717171]">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.created_at)}
              </span>
              <span className="flex items-center gap-2 text-[#717171]">
                <Clock className="w-4 h-4" />
                {blog.read_time} min read
              </span>
            </motion.div>

            {/* Article Content */}
            <motion.article 
              {...fadeInUp}
              className="prose prose-lg max-w-none blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <motion.div {...fadeInUp} className="mt-8 pt-8 border-t border-[#ebebeb]">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-[#717171]" />
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-[#4a4a4a]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Share */}
            <motion.div {...fadeInUp} className="mt-8 pt-8 border-t border-[#ebebeb]">
              <div className="flex items-center gap-4">
                <span className="text-[#717171] flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#ebebeb] flex items-center justify-center text-[#4a4a4a] hover:bg-[#1545ea] hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#ebebeb] flex items-center justify-center text-[#4a4a4a] hover:bg-[#1545ea] hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${blog.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#ebebeb] flex items-center justify-center text-[#4a4a4a] hover:bg-[#1545ea] hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 section-grey">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8 font-['Poppins']">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} to={`/blogs/${relatedBlog.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden border border-[#ebebeb] hover:shadow-lg transition-shadow">
                    <img 
                      src={relatedBlog.featured_image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400"}
                      alt={relatedBlog.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-[#1a1a1a] line-clamp-2 hover:text-[#1545ea]">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-[#717171] mt-2">{relatedBlog.read_time} min read</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailPage;
