import { Code, Database, Brain, Cpu, BarChart3, MessageCircle, Shield, Zap, Users, Award, Heart, Target } from 'lucide-react';
import resumeSrc from './resume.pdf';

export const personalInfo = {
  name: "Gokulakrishnan",
  title: "Gokulakrishnan M",
  subtitle: "Aspiring Data Scientist | Machine Learning Enthusiast | Problem Solver",
  email: "gokulakrishna5643@gmail.com",
  github: "https://github.com/gokulakrishnan5643",
  linkedin: "https://linkedin.com/in/gokula-krishnan-559a9227a",
  resume: resumeSrc
};

export const aboutData = {
  paragraphs: [
    "I am a passionate Data Scientist and Machine Learning enthusiast dedicated to transforming complex data into actionable insights and intelligent solutions. With a strong foundation in statistical analysis, programming, and machine learning algorithms, I thrive on solving challenging problems that drive business value.",
    "My journey in data science is fueled by an insatiable curiosity and a commitment to continuous learning. I specialize in building end-to-end machine learning pipelines, from data preprocessing and feature engineering to model development and deployment.",
    "I believe in the power of data to revolutionize industries and improve lives. Whether it's developing fraud detection systems, creating intelligent chatbots, or uncovering hidden patterns in data, I approach every project with analytical rigor and creative problem-solving."
  ]
};

export const skillsData = [
  {
    category: "Programming",
    icon: Code,
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 85 }
    ]
  },
  {
    category: "Machine Learning",
    icon: Brain,
    skills: [
      { name: "Machine Learning Algorithms", level: 88 },
      { name: "Data Preprocessing", level: 90 },
      { name: "Feature Engineering", level: 85 },
      { name: "Model Development", level: 87 }
    ]
  },
  {
    category: "Libraries",
    icon: BarChart3,
    skills: [
      { name: "Pandas", level: 92 },
      { name: "NumPy", level: 88 },
      { name: "Matplotlib", level: 85 },
      { name: "Scikit-Learn", level: 90 }
    ]
  },
  {
    category: "Frameworks & Tools",
    icon: Cpu,
    skills: [
      { name: "FastAPI", level: 82 },
      { name: "Uvicorn", level: 80 },
      { name: "Jupyter Notebook", level: 95 },
      { name: "VS Code", level: 92 }
    ]
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "MySQL", level: 85 }
    ]
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Fake Job & Internship Detection System",
    description: "Developed a machine learning-powered web application capable of detecting fraudulent job and internship postings through intelligent classification, trust score generation, and fraud probability analysis.",
    technologies: ["Python", "FastAPI", "Uvicorn", "Scikit-Learn", "Pandas"],
    features: ["Fraud Detection", "Trust Score Prediction", "Data Processing Pipeline", "Machine Learning Classification"],
    icon: Shield,
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"
  },
  {
    id: 2,
    title: "Online Chatbot Development",
    description: "Built a responsive web-based chatbot with real-time interaction capabilities, dynamic messaging, and intuitive user experience.",
    technologies: ["ReactJS", "HTML", "CSS"],
    features: ["Real-Time Communication", "Responsive UI", "Dynamic Messaging", "Interactive Experience"],
    icon: MessageCircle,
    gradient: "linear-gradient(135deg, #0A84FF 0%, #00D4FF 100%)"
  }
];

export const leadershipData = [
  {
    title: "Professional Service Director",
    organization: "Rotaract Club",
    description: "Leading community service initiatives and professional development programs, organizing events that bridge the gap between academia and industry.",
    icon: Heart
  },
  {
    title: "Data Analyst Core Team Member",
    organization: "GDG on Campus",
    description: "Contributing to data analysis projects, conducting workshops, and collaborating with fellow members on cutting-edge AI/ML initiatives.",
    icon: Target
  }
];

export const educationData = [
  {
    degree: "Bachelor of Technology",
    field: "Information Technology",
    year: "2022 - 2026",
    // description: "Specialized in software development, data structures, algorithms, and machine learning fundamentals."
  }
];

export const certificationsData = [
  {
    title: "Data Science Certification",
    issuer: "Professional Certification",
    description: "Comprehensive training in data science methodologies, machine learning algorithms, and practical applications.",
    icon: Award
  }
];

export const whyHireMeData = [
  {
    title: "Problem Solving",
    description: "Strong analytical skills with the ability to break down complex problems into manageable components and develop effective solutions.",
    icon: Target
  },
  {
    title: "Machine Learning",
    description: "Hands-on experience building and deploying machine learning models for real-world applications with a focus on performance and accuracy.",
    icon: Brain
  },
  {
    title: "Quick Learner",
    description: "Rapidly adapt to new technologies, frameworks, and methodologies, staying current with the latest advancements in data science.",
    icon: Zap
  },
  {
    title: "Team Collaboration",
    description: "Effective communicator and collaborator, experienced in working with cross-functional teams to deliver successful projects.",
    icon: Users
  }
];
