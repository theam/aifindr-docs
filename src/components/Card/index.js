import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { ArrowRight01Icon } from 'hugeicons-react';

export default function Card({ title, description, to, icon, className }) {
  const CardContent = (
    <div className={clsx(styles.card, className)}>
      <div className={styles.cardHeader}>
        {icon && (
          <div className={styles.iconWrapper}>
            {icon}
          </div>
        )}
        <h3 className={styles.cardTitle}>{title}</h3>
        {to && (
          <div className={styles.arrowIcon}>
            <ArrowRight01Icon size={20} />
          </div>
        )}
      </div>
      {description && <p className={styles.cardDescription}>{description}</p>}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={styles.cardLink}>
        {CardContent}
      </Link>
    );
  }

  return <div className={styles.cardLink}>{CardContent}</div>;
}
