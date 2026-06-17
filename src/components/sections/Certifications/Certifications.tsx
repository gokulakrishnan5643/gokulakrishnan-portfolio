import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { SectionTitle } from '../../ui';
import { certificationsData } from '../../../data/portfolioData';
import { LucideIcon } from 'lucide-react';
import styles from './Certifications.module.scss';

interface CertificateCardProps {
  title: string;
  issuer: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  issuer,
  description,
  icon: Icon,
  index
}) => {
  return (
    <motion.div
      className={styles.certificateCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className={styles.certBackground} />
      <div className={styles.verifyBadge}>
        <CheckCircle size={12} />
        Verified
      </div>

      <div className={styles.certContent}>
        <div className={styles.certIcon}>
          <Icon size={28} className={styles.icon} />
        </div>
        <h3 className={styles.certTitle}>{title}</h3>
        <p className={styles.certIssuer}>{issuer}</p>
        <p className={styles.certDescription}>{description}</p>
      </div>
    </motion.div>
  );
};

export const Certifications: React.FC = () => {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <SectionTitle
          title="Certifications"
          subtitle="Professional credentials I've earned"
        />

        <div className={styles.certificationsGrid}>
          {certificationsData.map((cert, index) => (
            <CertificateCard
              key={cert.title}
              title={cert.title}
              issuer={cert.issuer}
              description={cert.description}
              icon={cert.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
