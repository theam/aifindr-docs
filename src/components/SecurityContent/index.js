import React from 'react';
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

export function SecurityContent() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subtitle}>Seguridad por diseño.</p>
        <p className={styles.description}>
          AI Findr protege tus datos y a tus usuarios con un enfoque de seguridad corporativa en capas, 
          cumpliendo con los estándares más exigentes de la industria.
        </p>
      </div>

      <div className={styles.featuredSection}>
        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <CloudServerIcon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>Aislamiento Total</h3>
            <p>Infraestructura separada para cada cliente. Sin cruce de datos ni riesgo de fuga de información entre entornos.</p>
          </div>
        </div>
        
        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <LockKeyIcon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>Encriptación Completa</h3>
            <p>Datos seguros en reposo (AES-256) y en tránsito (TLS 1.2+). Gestión de llaves criptográficas independientes.</p>
          </div>
        </div>

        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <UserCheck01Icon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>Control de Acceso</h3>
            <p>Autenticación robusta vía Auth0, RBAC (Roles-Based Access Control) y principio de mínimo privilegio.</p>
          </div>
        </div>
      </div>

      <h2 className={styles.gridTitle}>Defensa en Profundidad</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <Shield02Icon size={24} />
          </div>
          <h3>Widget Seguro</h3>
          <p>Sandbox en iframe, protección CSP, prevención de XSS y validación estricta.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <ViewOffSlashIcon size={24} />
          </div>
          <h3>Protección de PII</h3>
          <p>Detección y enmascarado automático de información sensible.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <GlobalSearchIcon size={24} />
          </div>
          <h3>WAF & Monitoreo</h3>
          <p>Cloudflare WAF, mitigación DDoS, Geo-IP filtering y monitoreo 24/7.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <CheckListIcon size={24} />
          </div>
          <h3>Validación Continua</h3>
          <p>Análisis estático (SAST), pentesting regular y pruebas automatizadas.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <EyeIcon size={24} />
          </div>
          <h3>Transparencia IA</h3>
          <p>Trazabilidad completa de fuentes y explicación de respuestas.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <Alert02Icon size={24} />
          </div>
          <h3>Moderación de Contenido</h3>
          <p>Filtros de toxicidad, bloqueo de temas sensibles y seguridad en la generación.</p>
        </div>
      </div>

      <div className={styles.auditSection}>
        <div className={styles.auditHeader}>
          <div className={styles.auditIcon}>
            <FileSearchIcon size={32} />
          </div>
          <h2>Auditoría y Trazabilidad Completas</h2>
        </div>
        <div className={styles.auditGrid}>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Database01Icon size={24} />
            </div>
            <h4>Registro Inmutable</h4>
            <p>Log completo de consultas, respuestas y cambios de configuración.</p>
          </div>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Activity01Icon size={24} />
            </div>
            <h4>Seguimiento de Actividad</h4>
            <p>Monitorización detallada de quién accede y qué acciones realiza.</p>
          </div>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Certificate01Icon size={24} />
            </div>
            <h4>Compliance Ready</h4>
            <p>Diseñado para facilitar el cumplimiento de estándares corporativos.</p>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaIcon}>
          <HelpCircleIcon size={48} />
        </div>
        <h3>¿Tu equipo necesita más información o tiene dudas?</h3>
        <p>Nuestro equipo de producto está disponible para responder cualquier pregunta sobre seguridad.</p>
        <a href="mailto:producteam@aifindr.ai" className="button button--primary button--lg">
          producteam@aifindr.ai
        </a>
      </div>
    </div>
  );
}
