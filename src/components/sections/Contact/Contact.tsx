import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { SectionTitle, GlassCard } from '../../ui';
import { personalInfo } from '../../../data/portfolioData';
import styles from './Contact.module.scss';

export const Contact: React.FC = () => {
  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's work together on your next project"
        />

        <GlassCard delay={0.2}>
          <div className={styles.contactWrapper}>
            <motion.p
              className={styles.contactIntro}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              I'm currently looking for new opportunities. Whether you have a question
              or just want to say hi, I'll do my best to get back to you!
            </motion.p>

            <div className={styles.socialLinks}>
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Github size={32} className={styles.socialIcon} />
                <span className={styles.socialLabel}>GitHub</span>
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Linkedin size={32} className={styles.socialIcon} />
                <span className={styles.socialLabel}>LinkedIn</span>
              </motion.a>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                className={styles.socialLink}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Mail size={32} className={styles.socialIcon} />
                <span className={styles.socialLabel}>Email</span>
              </motion.a>
            </div>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              className={styles.emailLink}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Send size={18} />
              Send a Message
            </motion.a>

            <div className={styles.availability}>
              <div className={styles.availabilityBadge}>
                <span className={styles.statusDot} />
                Available for opportunities
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
