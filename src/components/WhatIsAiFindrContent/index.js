import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { LinkSquare02Icon } from 'hugeicons-react';
import styles from './styles.module.css';

const translations = {
  es: {
    subtitle: 'Un motor de búsqueda conversacional de nueva generación para tu negocio.',
    description: 'AI Findr es un motor de búsqueda conversacional capaz de entender a tus clientes en lenguaje natural y entregar resultados relevantes e impactantes con valor de negocio.',
    mainComponents: 'Componentes Principales',
    aiFindrExperience: 'AI Findr Experience',
    aiFindrExperienceDesc: 'La experiencia que se integra en tu sitio web o producto y responde directamente a tus usuarios.',
    aiFindrHub: 'AI Findr Hub',
    aiFindrHubDesc: 'El panel de administración donde gestionas tu base de conocimiento, reglas de negocio, experiencia y un dashboard completo de analíticas.',
    keyFeatures: 'Características Clave',
    feature1: 'Comprensión avanzada del lenguaje natural de tus clientes',
    feature2: 'Resultados relevantes y contextualizados según tus objetivos de negocio',
    feature3: 'Integración simple mediante widget web o API',
    feature4: 'Analíticas en tiempo real para entender las necesidades de tus usuarios',
    feature5: 'Personalización completa de la experiencia según tu marca',
  },
  en: {
    subtitle: 'A next-generation conversational search engine for your business.',
    description: 'AI Findr is a conversational search engine capable of understanding your customers in natural language and delivering relevant, impactful results with business value.',
    mainComponents: 'Main Components',
    aiFindrExperience: 'AI Findr Experience',
    aiFindrExperienceDesc: 'The experience that integrates into your website or product and responds directly to your users.',
    aiFindrHub: 'AI Findr Hub',
    aiFindrHubDesc: 'The administration panel where you manage your knowledge base, business rules, experience, and a complete analytics dashboard.',
    keyFeatures: 'Key Features',
    feature1: 'Advanced understanding of your customers\' natural language',
    feature2: 'Relevant and contextualized results according to your business objectives',
    feature3: 'Simple integration via web widget or API',
    feature4: 'Real-time analytics to understand your users\' needs',
    feature5: 'Complete experience customization according to your brand',
  }
};

export function WhatIsAiFindrContent() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const t = translations[currentLocale] || translations.es;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subtitle}>
          {t.subtitle}
        </p>
        <p className={styles.description}>
          {t.description}
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.mainComponents}</h2>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t.aiFindrExperience}</h3>
            <p className={styles.cardText}>
              {t.aiFindrExperienceDesc}
            </p>
          </div>
          <a href="https://hub.aifindr.ai/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                {t.aiFindrHub}
                <LinkSquare02Icon size={18} className={styles.externalIcon} />
              </h3>
              <p className={styles.cardText}>
                {t.aiFindrHubDesc}
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>{t.keyFeatures}</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: 0 }}>
            <li>{t.feature1}</li>
            <li>{t.feature2}</li>
            <li>{t.feature3}</li>
            <li>{t.feature4}</li>
            <li>{t.feature5}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
