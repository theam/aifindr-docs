import React from 'react';
import { 
  Database02Icon, 
  Globe02Icon, 
  File02Icon, 
  Settings01Icon, 
  MagicWand02Icon,
  Analytics02Icon,
  ChartHistogramIcon,
  Search01Icon,
  ArrowRight01Icon
} from 'hugeicons-react';
import styles from './styles.module.css';

export function HowItWorksContent() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subtitle}>From content to insight in three steps.</p>
        <p className={styles.description}>
          We transform your scattered information into an intelligent conversational experience that generates real value.
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {/* Step 1 */}
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>01</div>
          <div className={styles.iconWrapper}>
            <Database02Icon size={32} />
          </div>
          <h3 className={styles.stepTitle}>Connection and Ingestion</h3>
          <p className={styles.stepDescription}>
            AI Findr centralizes and processes your knowledge from multiple sources.
          </p>
          <ul className={styles.stepList}>
            <li>
              <Globe02Icon size={16} className={styles.listIcon} />
              Automatic web extraction
            </li>
            <li>
              <Settings01Icon size={16} className={styles.listIcon} />
              API integration
            </li>
            <li>
              <File02Icon size={16} className={styles.listIcon} />
              Document upload (PDF, FAQ)
            </li>
          </ul>
        </div>

        <div className={styles.connector}>
          <ArrowRight01Icon size={24} />
        </div>

        {/* Step 2 */}
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>02</div>
          <div className={styles.iconWrapper}>
            <MagicWand02Icon size={32} />
          </div>
          <h3 className={styles.stepTitle}>Experience and Control</h3>
          <p className={styles.stepDescription}>
            Define behavior and adapt the AI to your business rules.
          </p>
          <ul className={styles.stepList}>
            <li>Data cleaning and enrichment</li>
            <li>Tone and style customization</li>
            <li>Response priority rules</li>
            <li>Suggested actions definition</li>
          </ul>
        </div>

        <div className={styles.connector}>
          <ArrowRight01Icon size={24} />
        </div>

        {/* Step 3 */}
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>03</div>
          <div className={styles.iconWrapper}>
            <Analytics02Icon size={32} />
          </div>
          <h3 className={styles.stepTitle}>Real-Time Insights</h3>
          <p className={styles.stepDescription}>
            Discover what your users are searching for and optimize your strategy.
          </p>
          <ul className={styles.stepList}>
            <li>
              <Search01Icon size={16} className={styles.listIcon} />
              Search intent analysis
            </li>
            <li>
              <ChartHistogramIcon size={16} className={styles.listIcon} />
              Conversion metrics
            </li>
            <li>
              Content gap detection
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
