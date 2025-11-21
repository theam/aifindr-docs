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
        <p className={styles.subtitle}>Del contenido al insight en tres pasos.</p>
        <p className={styles.description}>
          Transformamos tu información dispersa en una experiencia conversacional inteligente que genera valor real.
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {/* Step 1 */}
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>01</div>
          <div className={styles.iconWrapper}>
            <Database02Icon size={32} />
          </div>
          <h3 className={styles.stepTitle}>Conexión e Ingesta</h3>
          <p className={styles.stepDescription}>
            AI Findr centraliza y procesa tu conocimiento desde múltiples fuentes.
          </p>
          <ul className={styles.stepList}>
            <li>
              <Globe02Icon size={16} className={styles.listIcon} />
              Extracción automática web
            </li>
            <li>
              <Settings01Icon size={16} className={styles.listIcon} />
              Integración vía API
            </li>
            <li>
              <File02Icon size={16} className={styles.listIcon} />
              Subida de documentos (PDF, FAQ)
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
          <h3 className={styles.stepTitle}>Experiencia y Control</h3>
          <p className={styles.stepDescription}>
            Define el comportamiento y adapta la IA a tus reglas de negocio.
          </p>
          <ul className={styles.stepList}>
            <li>Limpieza y enriquecimiento de datos</li>
            <li>Personalización de tono y estilo</li>
            <li>Reglas de prioridad en respuestas</li>
            <li>Definición de acciones sugeridas</li>
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
          <h3 className={styles.stepTitle}>Insights en Tiempo Real</h3>
          <p className={styles.stepDescription}>
            Descubre qué buscan tus usuarios y optimiza tu estrategia.
          </p>
          <ul className={styles.stepList}>
            <li>
              <Search01Icon size={16} className={styles.listIcon} />
              Análisis de intención de búsqueda
            </li>
            <li>
              <ChartHistogramIcon size={16} className={styles.listIcon} />
              Métricas de conversión
            </li>
            <li>
              Detección de vacíos de contenido
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
