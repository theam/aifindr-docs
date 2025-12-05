import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import {
  BookOpen01Icon,
  PuzzleIcon,
  FloppyDiskIcon,
  SecurityLockIcon,
  ArrowRight01Icon
} from 'hugeicons-react';

const translations = {
  es: {
    welcome: 'Bienvenido a',
    heroSubtitle: 'Crea experiencias de búsqueda increíbles. Construye agentes inteligentes entrenados con los datos de tu negocio e intégralos en tu plataforma.',
    getStarted: 'Comenzar',
    contact: 'Contacto',
    exploreDocumentation: 'Explora la documentación',
    whatIsAiFindr: '¿Qué es AI Findr?',
    whatIsAiFindrDesc: 'Descubre cómo AI Findr transforma la experiencia de búsqueda con IA conversacional.',
    howItWorks: 'Cómo funciona',
    howItWorksDesc: 'Conoce el proceso desde la conexión hasta los insights en tiempo real.',
    integration: 'Integración',
    integrationDesc: 'Aprende a integrar AI Findr en tu sitio web o producto mediante widget o API.',
    security: 'Seguridad',
    securityDesc: 'Explora las múltiples capas de seguridad empresarial de AI Findr.',
    needMoreInfo: '¿Necesitas más información?',
    teamHereToHelp: 'Nuestro equipo está aquí para ayudarte con cualquier pregunta.',
  },
  en: {
    welcome: 'Welcome to',
    heroSubtitle: 'Create amazing search experiences. Build intelligent agents trained with your business data and integrate them into your platform.',
    getStarted: 'Get Started',
    contact: 'Contact',
    exploreDocumentation: 'Explore the documentation',
    whatIsAiFindr: 'What is AI Findr',
    whatIsAiFindrDesc: 'Discover how AI Findr transforms the search experience with conversational AI.',
    howItWorks: 'How it works',
    howItWorksDesc: 'Learn about the process from connection to real-time insights.',
    integration: 'Integration',
    integrationDesc: 'Learn how to integrate AI Findr into your website or product via widget or API.',
    security: 'Security',
    securityDesc: 'Explore AI Findr\'s multiple layers of enterprise security.',
    needMoreInfo: 'Need more information?',
    teamHereToHelp: 'Our team is here to help you with any questions.',
  }
};

export function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const t = translations[currentLocale] || translations.es;

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          {t.welcome} <span className={styles.highlight}>AI Findr</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {t.heroSubtitle}
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.heroButton)}
            to="/docs/what-is-aifindr">
            {t.getStarted}
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="mailto:contact@aifindr.com">
            {t.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DocumentationOptions() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const t = translations[currentLocale] || translations.es;

  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">{t.exploreDocumentation}</h2>
        <div className="row">
          <div className={clsx('col col--6 margin-bottom--lg', styles.feature)}>
            <Link to="/docs/what-is-aifindr" className={styles.featureCardLink}>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.featureIcon}>
                    <BookOpen01Icon size={24} />
                  </div>
                  <h3>{t.whatIsAiFindr}</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  {t.whatIsAiFindrDesc}
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
                  <h3>{t.howItWorks}</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  {t.howItWorksDesc}
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
                  <h3>{t.integration}</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  {t.integrationDesc}
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
                  <h3>{t.security}</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  {t.securityDesc}
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
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const t = translations[currentLocale] || translations.es;

  return (
    <section className={styles.contactSection}>
      <div className="container text--center">
        <h2>{t.needMoreInfo}</h2>
        <p className={styles.contactSubtitle}>
          {t.teamHereToHelp}
        </p>
        <div className={styles.contactEmailBox}>
          <a href="mailto:producteam@aifindr.ai">producteam@aifindr.ai</a>
        </div>
      </div>
    </section>
  );
}
