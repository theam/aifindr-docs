import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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

const translations = {
  es: {
    subtitle: 'Del contenido al insight en tres pasos.',
    description: 'Transformamos tu información dispersa en una experiencia conversacional inteligente que genera valor real.',
    step1Title: 'Conexión e Ingesta',
    step1Desc: 'AI Findr centraliza y procesa tu conocimiento desde múltiples fuentes.',
    step1Item1: 'Extracción web automática',
    step1Item2: 'Integración por API',
    step1Item3: 'Carga de documentos (PDF, FAQ)',
    step2Title: 'Experiencia y Control',
    step2Desc: 'Define el comportamiento y adapta la IA a tus reglas de negocio.',
    step2Item1: 'Limpieza y enriquecimiento de datos',
    step2Item2: 'Personalización de tono y estilo',
    step2Item3: 'Reglas de prioridad de respuestas',
    step2Item4: 'Definición de acciones sugeridas',
    step3Title: 'Insights en Tiempo Real',
    step3Desc: 'Descubre qué buscan tus usuarios y optimiza tu estrategia.',
    step3Item1: 'Análisis de intención de búsqueda',
    step3Item2: 'Métricas de conversión',
    step3Item3: 'Detección de brechas de contenido',
  },
  en: {
    subtitle: 'From content to insight in three steps.',
    description: 'We transform your scattered information into an intelligent conversational experience that generates real value.',
    step1Title: 'Connection and Ingestion',
    step1Desc: 'AI Findr centralizes and processes your knowledge from multiple sources.',
    step1Item1: 'Automatic web extraction',
    step1Item2: 'API integration',
    step1Item3: 'Document upload (PDF, FAQ)',
    step2Title: 'Experience and Control',
    step2Desc: 'Define behavior and adapt the AI to your business rules.',
    step2Item1: 'Data cleaning and enrichment',
    step2Item2: 'Tone and style customization',
    step2Item3: 'Response priority rules',
    step2Item4: 'Suggested actions definition',
    step3Title: 'Real-Time Insights',
    step3Desc: 'Discover what your users are searching for and optimize your strategy.',
    step3Item1: 'Search intent analysis',
    step3Item2: 'Conversion metrics',
    step3Item3: 'Content gap detection',
  }
};

export function HowItWorksContent() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const t = translations[currentLocale] || translations.es;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subtitle}>{t.subtitle}</p>
        <p className={styles.description}>
          {t.description}
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {/* Step 1 */}
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>01</div>
          <div className={styles.iconWrapper}>
            <Database02Icon size={32} />
          </div>
          <h3 className={styles.stepTitle}>{t.step1Title}</h3>
          <p className={styles.stepDescription}>
            {t.step1Desc}
          </p>
          <ul className={styles.stepList}>
            <li>
              <Globe02Icon size={16} className={styles.listIcon} />
              {t.step1Item1}
            </li>
            <li>
              <Settings01Icon size={16} className={styles.listIcon} />
              {t.step1Item2}
            </li>
            <li>
              <File02Icon size={16} className={styles.listIcon} />
              {t.step1Item3}
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
          <h3 className={styles.stepTitle}>{t.step2Title}</h3>
          <p className={styles.stepDescription}>
            {t.step2Desc}
          </p>
          <ul className={styles.stepList}>
            <li>{t.step2Item1}</li>
            <li>{t.step2Item2}</li>
            <li>{t.step2Item3}</li>
            <li>{t.step2Item4}</li>
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
          <h3 className={styles.stepTitle}>{t.step3Title}</h3>
          <p className={styles.stepDescription}>
            {t.step3Desc}
          </p>
          <ul className={styles.stepList}>
            <li>
              <Search01Icon size={16} className={styles.listIcon} />
              {t.step3Item1}
            </li>
            <li>
              <ChartHistogramIcon size={16} className={styles.listIcon} />
              {t.step3Item2}
            </li>
            <li>
              {t.step3Item3}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
