import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground}>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
      </div>
      <div className="container">
        <h1 className={styles.heroTitle}>AI Findr Documentation</h1>
        <p className={styles.heroSubtitle}>
          Integra inteligencia artificial conversacional en tu aplicación
        </p>
      </div>
    </header>
  );
}

function DocumentationOptions() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--6', styles.feature)}>
            <div className={styles.featureCard}>
              <div className="text--center">
                <div className={styles.featureIcon}>📡</div>
                <h3>API Documentation</h3>
                <p>
                  <strong>Para integraciones programáticas</strong>
                </p>
                <p>
                  Acceso completo a la plataforma AI Findr a través de nuestra REST API. 
                  Ideal para desarrolladores que necesitan integrar AI Findr directamente 
                  en sus aplicaciones personalizadas.
                </p>
                <ul className={styles.featureList}>
                  <li>Autenticación con API Key</li>
                  <li>Endpoints para chat conversacional</li>
                  <li>Gestión de contenido y analytics</li>
                  <li>Soporte para Server-Sent Events</li>
                </ul>
              </div>
              <div className="text--center">
                <Link
                  className="button button--primary button--lg"
                  to="/developer/api/ai-findr-api">
                  Ver Documentación API
                </Link>
              </div>
            </div>
          </div>
          <div className={clsx('col col--6', styles.feature)}>
            <div className={styles.featureCard}>
              <div className="text--center">
                <div className={styles.featureIcon}>🎛️</div>
                <h3>Widget Configuration</h3>
                <p>
                  <strong>Para añadir el widget en tu web</strong>
                </p>
                <p>
                  Guía completa para integrar el widget de AI Findr en tu sitio web. 
                  Instalación ultrarrápida con una sola línea de código y opciones 
                  avanzadas de personalización.
                </p>
                <ul className={styles.featureList}>
                  <li>Instalación en 2 minutos</li>
                  <li>Totalmente responsive</li>
                  <li>Personalización completa</li>
                  <li>Integraciones para múltiples plataformas</li>
                </ul>
              </div>
              <div className="text--center">
                <Link
                  className="button button--secondary button--lg"
                  to="/developer/widget-config/intro">
                  Ver Configuración Widget
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentación oficial de AI Findr - API y Widget Configuration">
      <HomepageHeader />
      <main>
        <DocumentationOptions />
      </main>
    </Layout>
  );
}
