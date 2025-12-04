import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { 
  BookOpen01Icon, 
  PuzzleIcon, 
  FloppyDiskIcon, 
  SecurityLockIcon,
  ArrowRight01Icon 
} from 'hugeicons-react';

export function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Welcome to <span className={styles.highlight}>AI Findr</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Create amazing search experiences. Build intelligent agents trained with your business data and integrate them into your platform.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.heroButton)}
            to="/docs/what-is-aifindr">
            Get Started
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="mailto:contact@aifindr.com">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DocumentationOptions() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Explore the documentation</h2>
        <div className="row">
          <div className={clsx('col col--6 margin-bottom--lg', styles.feature)}>
            <Link to="/docs/what-is-aifindr" className={styles.featureCardLink}>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.featureIcon}>
                    <BookOpen01Icon size={24} />
                  </div>
                  <h3>What is AI Findr</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Discover how AI Findr transforms the search experience with conversational AI.
                </p>
              </div>
            </Link>
          </div>
          <div className={clsx('col col--6 margin-bottom--lg', styles.feature)}>
            <Link to="/docs/how-it-works" className={styles.featureCardLink}>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.featureIcon}>
                    <PuzzleIcon size={24} />
                  </div>
                  <h3>How it works</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Learn about the process from connection to real-time insights.
                </p>
              </div>
            </Link>
          </div>
          <div className={clsx('col col--6 margin-bottom--lg', styles.feature)}>
            <Link to="/docs/integration" className={styles.featureCardLink}>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.featureIcon}>
                    <FloppyDiskIcon size={24} />
                  </div>
                  <h3>Integration</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Learn how to integrate AI Findr into your website or product via widget or API.
                </p>
              </div>
            </Link>
          </div>
          <div className={clsx('col col--6 margin-bottom--lg', styles.feature)}>
            <Link to="/docs/security" className={styles.featureCardLink}>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.featureIcon}>
                    <SecurityLockIcon size={24} />
                  </div>
                  <h3>Security</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Explore AI Findr's multiple layers of enterprise security.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className="container text--center">
        <h2>Need more information?</h2>
        <p className={styles.contactSubtitle}>
          Our team is here to help you with any questions.
        </p>
        <div className={styles.contactEmailBox}>
          <a href="mailto:producteam@aifindr.ai">producteam@aifindr.ai</a>
        </div>
      </div>
    </section>
  );
}
