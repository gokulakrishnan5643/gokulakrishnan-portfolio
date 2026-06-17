import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { SectionTitle } from '../../ui';
import { educationData } from '../../../data/portfolioData';
import styles from './Education.module.scss';

export const Education: React.FC = () => {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionTitle
          title="Education"
          subtitle="My academic background"
        />

        <div className={styles.educationTimeline}>
          {educationData.map((item, index) => (
            <motion.div
              key={item.degree}
              className={styles.educationItem}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={styles.educationCard}>
                <h3 className={styles.degree}>{item.degree}</h3>
                <p className={styles.field}>{item.field}</p>
                <p className={styles.year}>
                  <Calendar size={16} />
                  {item.year}
                </p>
                <p className={styles.description}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
