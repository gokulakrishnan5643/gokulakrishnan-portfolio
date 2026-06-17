import { motion } from 'framer-motion';
import { SectionTitle } from '../../ui';
import { whyHireMeData } from '../../../data/portfolioData';
import { LucideIcon } from 'lucide-react';
import styles from './WhyHireMe.module.scss';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      className={styles.featureCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles.iconWrapper}>
        <Icon size={32} className={styles.icon} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </motion.div>
  );
};

export const WhyHireMe: React.FC = () => {
  return (
    <section className="section" id="why-hire-me">
      <div className="container">
        <SectionTitle
          title="Why Hire Me"
          subtitle="What I bring to your team"
        />

        <div className={styles.featuresGrid}>
          {whyHireMeData.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
