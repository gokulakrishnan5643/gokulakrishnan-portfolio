import { motion } from 'framer-motion';
import { SectionTitle, GlassCard } from '../../ui';
import { projectsData } from '../../../data/portfolioData';
import { LucideIcon } from 'lucide-react';
import styles from './Projects.module.scss';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  icon: LucideIcon;
  gradient: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  features,
  icon: Icon,
  gradient,
  index
}) => {
  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.gradientBackground} style={{ background: gradient }} />
        <div className={styles.imageOverlay} />
        <div className={styles.projectIcon}>
          <Icon size={36} />
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>

        <div className={styles.technologies}>
          {technologies.map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.features}>
          {features.map((feature) => (
            <div key={feature} className={styles.feature}>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionTitle
          title="Featured Projects"
          subtitle="Real-world applications I've built"
        />

        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              features={project.features}
              icon={project.icon}
              gradient={project.gradient}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
