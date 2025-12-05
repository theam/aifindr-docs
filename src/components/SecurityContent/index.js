import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  Shield02Icon,
  LockKeyIcon,
  CloudServerIcon,
  UserCheck01Icon,
  ViewOffSlashIcon,
  GlobalSearchIcon,
  CheckListIcon,
  EyeIcon,
  FileSearchIcon,
  Alert02Icon,
  Database01Icon,
  Activity01Icon,
  Certificate01Icon,
  HelpCircleIcon
} from 'hugeicons-react';
import styles from './styles.module.css';

const translations = {
  es: {
    subtitle: 'Seguridad por diseño.',
    description: 'AI Findr protege tus datos y usuarios con un enfoque de seguridad empresarial por capas, cumpliendo con los estándares más exigentes de la industria.',
    completeIsolation: 'Aislamiento Completo',
    completeIsolationDesc: 'Infraestructura separada para cada cliente. Sin cruce de datos ni riesgo de fuga de información entre entornos.',
    fullEncryption: 'Encriptación Completa',
    fullEncryptionDesc: 'Datos seguros en reposo (AES-256) y en tránsito (TLS 1.2+). Gestión independiente de claves criptográficas.',
    accessControl: 'Control de Acceso',
    accessControlDesc: 'Autenticación robusta vía Auth0, RBAC (Control de Acceso Basado en Roles) y principio de mínimo privilegio.',
    defenseInDepth: 'Defensa en Profundidad',
    secureWidget: 'Widget Seguro',
    secureWidgetDesc: 'Iframe aislado, protección CSP, prevención XSS y validación estricta.',
    piiProtection: 'Protección PII',
    piiProtectionDesc: 'Detección automática y enmascaramiento de información sensible.',
    wafMonitoring: 'WAF y Monitoreo',
    wafMonitoringDesc: 'WAF de Cloudflare, mitigación DDoS, filtrado Geo-IP y monitoreo 24/7.',
    continuousValidation: 'Validación Continua',
    continuousValidationDesc: 'Análisis estático (SAST), pentesting regular y pruebas automatizadas.',
    aiTransparency: 'Transparencia IA',
    aiTransparencyDesc: 'Trazabilidad completa de fuentes y explicación de respuestas.',
    contentModeration: 'Moderación de Contenido',
    contentModerationDesc: 'Filtros de toxicidad, bloqueo de temas sensibles y seguridad en generación.',
    auditTraceability: 'Auditoría y Trazabilidad Completa',
    immutableLogging: 'Registro Inmutable',
    immutableLoggingDesc: 'Log completo de consultas, respuestas y cambios de configuración.',
    activityTracking: 'Seguimiento de Actividad',
    activityTrackingDesc: 'Monitoreo detallado de quién accede y qué acciones se realizan.',
    complianceReady: 'Listo para Cumplimiento',
    complianceReadyDesc: 'Diseñado para facilitar el cumplimiento de estándares corporativos.',
    needMoreInfo: '¿Tu equipo necesita más información o tiene preguntas?',
    teamAvailable: 'Nuestro equipo de producto está disponible para responder cualquier pregunta de seguridad.',
  },
  en: {
    subtitle: 'Security by design.',
    description: 'AI Findr protects your data and users with a layered enterprise security approach, meeting the most demanding industry standards.',
    completeIsolation: 'Complete Isolation',
    completeIsolationDesc: 'Separate infrastructure for each customer. No data crossing or risk of information leakage between environments.',
    fullEncryption: 'Full Encryption',
    fullEncryptionDesc: 'Secure data at rest (AES-256) and in transit (TLS 1.2+). Independent cryptographic key management.',
    accessControl: 'Access Control',
    accessControlDesc: 'Robust authentication via Auth0, RBAC (Role-Based Access Control), and principle of least privilege.',
    defenseInDepth: 'Defense in Depth',
    secureWidget: 'Secure Widget',
    secureWidgetDesc: 'Sandboxed iframe, CSP protection, XSS prevention, and strict validation.',
    piiProtection: 'PII Protection',
    piiProtectionDesc: 'Automatic detection and masking of sensitive information.',
    wafMonitoring: 'WAF & Monitoring',
    wafMonitoringDesc: 'Cloudflare WAF, DDoS mitigation, Geo-IP filtering, and 24/7 monitoring.',
    continuousValidation: 'Continuous Validation',
    continuousValidationDesc: 'Static analysis (SAST), regular pentesting, and automated testing.',
    aiTransparency: 'AI Transparency',
    aiTransparencyDesc: 'Complete source traceability and response explanation.',
    contentModeration: 'Content Moderation',
    contentModerationDesc: 'Toxicity filters, sensitive topic blocking, and generation safety.',
    auditTraceability: 'Complete Audit and Traceability',
    immutableLogging: 'Immutable Logging',
    immutableLoggingDesc: 'Complete log of queries, responses, and configuration changes.',
    activityTracking: 'Activity Tracking',
    activityTrackingDesc: 'Detailed monitoring of who accesses and what actions are performed.',
    complianceReady: 'Compliance Ready',
    complianceReadyDesc: 'Designed to facilitate compliance with corporate standards.',
    needMoreInfo: 'Does your team need more information or have questions?',
    teamAvailable: 'Our product team is available to answer any security questions.',
  }
};

export function SecurityContent() {
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

      <div className={styles.featuredSection}>
        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <CloudServerIcon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>{t.completeIsolation}</h3>
            <p>{t.completeIsolationDesc}</p>
          </div>
        </div>

        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <LockKeyIcon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>{t.fullEncryption}</h3>
            <p>{t.fullEncryptionDesc}</p>
          </div>
        </div>

        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <UserCheck01Icon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>{t.accessControl}</h3>
            <p>{t.accessControlDesc}</p>
          </div>
        </div>
      </div>

      <h2 className={styles.gridTitle}>{t.defenseInDepth}</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <Shield02Icon size={24} />
          </div>
          <h3>{t.secureWidget}</h3>
          <p>{t.secureWidgetDesc}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <ViewOffSlashIcon size={24} />
          </div>
          <h3>{t.piiProtection}</h3>
          <p>{t.piiProtectionDesc}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <GlobalSearchIcon size={24} />
          </div>
          <h3>{t.wafMonitoring}</h3>
          <p>{t.wafMonitoringDesc}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <CheckListIcon size={24} />
          </div>
          <h3>{t.continuousValidation}</h3>
          <p>{t.continuousValidationDesc}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <EyeIcon size={24} />
          </div>
          <h3>{t.aiTransparency}</h3>
          <p>{t.aiTransparencyDesc}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <Alert02Icon size={24} />
          </div>
          <h3>{t.contentModeration}</h3>
          <p>{t.contentModerationDesc}</p>
        </div>
      </div>

      <div className={styles.auditSection}>
        <div className={styles.auditHeader}>
          <div className={styles.auditIcon}>
            <FileSearchIcon size={32} />
          </div>
          <h2>{t.auditTraceability}</h2>
        </div>
        <div className={styles.auditGrid}>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Database01Icon size={24} />
            </div>
            <h4>{t.immutableLogging}</h4>
            <p>{t.immutableLoggingDesc}</p>
          </div>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Activity01Icon size={24} />
            </div>
            <h4>{t.activityTracking}</h4>
            <p>{t.activityTrackingDesc}</p>
          </div>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Certificate01Icon size={24} />
            </div>
            <h4>{t.complianceReady}</h4>
            <p>{t.complianceReadyDesc}</p>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaIcon}>
          <HelpCircleIcon size={48} />
        </div>
        <h3>{t.needMoreInfo}</h3>
        <p>{t.teamAvailable}</p>
        <a href="mailto:producteam@aifindr.ai" className="button button--primary button--lg">
          producteam@aifindr.ai
        </a>
      </div>
    </div>
  );
}
