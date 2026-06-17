import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './GlassCard.module.scss';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  animated?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  animated = true,
  delay = 0,
  className = '',
  ...props
}) => {
  const cardClass = `${styles.card} ${animated ? styles.animated : ''} ${className}`;

  return (
    <motion.div
      className={cardClass}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
