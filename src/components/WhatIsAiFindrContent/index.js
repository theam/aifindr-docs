import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { LinkSquare02Icon } from 'hugeicons-react';
import styles from './styles.module.css';

export function WhatIsAiFindrContent() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subtitle}>
          A next-generation conversational search engine for your business.
        </p>
        <p className={styles.description}>
          AI Findr is a conversational search engine capable of understanding your customers in natural language and delivering
          relevant, impactful results with business value.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Main Components</h2>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>AI Findr Experience</h3>
            <p className={styles.cardText}>
              The experience that integrates into your website or product and responds directly to your users.
            </p>
          </div>
          <a href="https://hub.aifindr.ai/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                AI Findr Hub
                <LinkSquare02Icon size={18} className={styles.externalIcon} />
              </h3>
              <p className={styles.cardText}>
                The administration panel where you manage your knowledge base, business rules,
                experience, and a complete analytics dashboard.
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: 0 }}>
            <li>Advanced understanding of your customers' natural language</li>
            <li>Relevant and contextualized results according to your business objectives</li>
            <li>Simple integration via web widget or API</li>
            <li>Real-time analytics to understand your users' needs</li>
            <li>Complete experience customization according to your brand</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
