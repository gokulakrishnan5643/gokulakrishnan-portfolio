import { motion } from 'framer-motion';
import { SectionTitle } from '../../ui';
import { leadershipData } from '../../../data/portfolioData';
import { LucideIcon } from 'lucide-react';
import styles from './Leadership.module.scss';

interface TimelineItemProps {
  title: string;
  organization: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  organization,
  description,
  icon: Icon,
  index
}) => {
  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className={styles.timelineContent}>
        <div className={styles.timelineHeader}>
          <div className={styles.iconWrapper}>
            <Icon size={24} className={styles.icon} />
          </div>
          <div className={styles.titleWrapper}>
            <h3 className={styles.itemTitle}>{title}</h3>
            <p className={styles.itemOrganization}>{organization}</p>
          </div>
        </div>
        <p className={styles.itemDescription}>{description}</p>
      </div>
    </motion.div>
  );
};

export const Leadership: React.FC = () => {
  return (
    <section className="section" id="leadership">
      <div className="container">
        <SectionTitle
          title="Leadership & Activities"
          subtitle="Roles and responsibilities I've undertaken"
        />

        <div className={styles.timeline}>
          {leadershipData.map((item, index) => (
            <TimelineItem
              key={item.title}
              title={item.title}
              organization={item.organization}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
