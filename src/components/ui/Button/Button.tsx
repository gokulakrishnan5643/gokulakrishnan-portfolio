import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.scss';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'icon';
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  href,
  ...props
}) => {
  const buttonClass = `${styles.button} ${styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`;

  const content = (
    <>
      {variant === 'primary' && <span className={styles.shimmer} />}
      <span className={styles.content}>
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClass}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as HTMLMotionProps<'a'>)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={buttonClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};
