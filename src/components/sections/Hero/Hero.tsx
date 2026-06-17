import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button, TypingText, PremiumAIVfxBackground } from '../../ui';
import { personalInfo } from '../../../data/portfolioData';
import styles from './Hero.module.scss';

const typingTexts = [
  'Data Science',
  'Artificial Intelligence',
  'Machine Learning',
  'Problem Solving',
];

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="home">
      <PremiumAIVfxBackground />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className={styles.greeting}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hello, I'm 
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="gradient-text">{personalInfo.title}</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {personalInfo.subtitle}
        </motion.p>

        <motion.div
          className={styles.typingContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <TypingText texts={typingTexts} />
        </motion.div>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="primary" onClick={scrollToProjects}>
            View Projects
          </Button>
          <Button variant="secondary" href={personalInfo.resume}>
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          className={styles.socialLinks}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button variant="icon" href={personalInfo.github} aria-label="GitHub">
            <Github size={20} />
          </Button>
          <Button variant="icon" href={personalInfo.linkedin} aria-label="LinkedIn">
            <Linkedin size={20} />
          </Button>
          <Button variant="icon" href={`mailto:${personalInfo.email}`} aria-label="Email">
            <Mail size={20} />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={scrollToAbout}
      >
        <div className={styles.mouse}></div>
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};
