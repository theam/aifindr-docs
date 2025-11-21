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
          Bienvenido a <span className={styles.highlight}>AI Findr</span> 
        </h1>
        <p className={styles.heroSubtitle}>
          Crea experiencias de búsqueda increíbles. Construye agentes inteligentes entrenados con tus datos de negocio e intégralos en tu plataforma.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.heroButton)}
            to="/docs/what-is-aifindr">
            Comenzar
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="mailto:contact@aifindr.com">
            Contactar
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
        <h2 className="text--center margin-bottom--lg">Explora la documentación</h2>
        <div className="row">
          <div className={clsx('col col--6 margin-bottom--lg', styles.feature)}>
            <Link to="/docs/what-is-aifindr" className={styles.featureCardLink}>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.featureIcon}>
                    <BookOpen01Icon size={24} />
                  </div>
                  <h3>Qué es AI Findr</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Descubre cómo AI Findr transforma la experiencia de búsqueda con IA conversacional.
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
                  <h3>Cómo funciona</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Conoce el proceso desde la conexión hasta los insights en tiempo real.
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
                  <h3>Integración</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Aprende a integrar AI Findr en tu web o producto mediante widget o API.
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
                  <h3>Seguridad</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight01Icon size={20} />
                  </div>
                </div>
                <p>
                  Explora las múltiples capas de seguridad corporativa de AI Findr.
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
        <h2>¿Necesitas más información?</h2>
        <p className={styles.contactSubtitle}>
          Nuestro equipo está aquí para ayudarte con cualquier duda.
        </p>
        <div className={styles.contactEmailBox}>
          <a href="mailto:producteam@aifindr.ai">producteam@aifindr.ai</a>
        </div>
      </div>
    </section>
  );
}
