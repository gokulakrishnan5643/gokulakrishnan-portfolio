import { motion } from 'framer-motion';
import { GlassCard, SectionTitle } from '../../ui';
import { skillsData } from '../../../data/portfolioData';
import { LucideIcon } from 'lucide-react';
import styles from './Skills.module.scss';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategoryProps {
  category: string;
  icon: LucideIcon;
  skills: Skill[];
  delay: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, icon: Icon, skills, delay }) => {
  return (
    <motion.div
      className={styles.skillCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <Icon size={24} className={styles.icon} />
        </div>
        <h3 className={styles.categoryTitle}>{category}</h3>
      </div>

      <div className={styles.skillsList}>
        {skills.map((skill, index) => (
          <div key={skill.name} className={styles.skillItem}>
            <div className={styles.skillInfo}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={styles.skillLevel}>{skill.level}%</span>
            </div>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: skill.level / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay + index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies I work with"
        />

        <div className={styles.skillsGrid}>
          {skillsData.map((category, index) => (
            <SkillCategory
              key={category.category}
              category={category.category}
              icon={category.icon}
              skills={category.skills}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
