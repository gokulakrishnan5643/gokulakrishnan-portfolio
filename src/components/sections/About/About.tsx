import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { GlassCard, SectionTitle } from '../../ui';
import { aboutData } from '../../../data/portfolioData';
import styles from './About.module.scss';
import profileSrc from './images/profile.jpg.jpeg';

const stats = [
  { number: '5+', label: 'Projects Completed' },
  { number: '3', label: 'ML Models Built' },
  { number: '100%', label: 'Dedication' }
];

export const About: React.FC = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionTitle title="About Me" subtitle="Passionate about Data Science and AI" />

        <GlassCard delay={0.2}>
          <div className={styles.about}>
            <motion.div
              className={styles.imageContainer}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.imageGlow} />
              <div className={styles.imageWrapper}>
                <img
                  src={profileSrc}
                  alt="Profile"
                  width={200}
                  height={200}
                  className={styles.profileImage}
                />
                <User size={80} strokeWidth={1} className="gradient-text" />
              </div>
            </motion.div>

            <div className={styles.content}>
              {aboutData.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className={styles.paragraph}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={styles.stat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
