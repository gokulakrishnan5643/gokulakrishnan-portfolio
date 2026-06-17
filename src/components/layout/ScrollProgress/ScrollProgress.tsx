import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.scss';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={styles.progressBar}>
      <motion.div className={styles.progressFill} style={{ scaleX }} />
    </div>
  );
};
