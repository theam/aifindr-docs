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
        <p className={styles.subtitle}>Security by design.</p>
        <p className={styles.description}>
          AI Findr protects your data and users with a layered enterprise security approach,
          meeting the most demanding industry standards.
        </p>
      </div>

      <div className={styles.featuredSection}>
        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <CloudServerIcon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>Complete Isolation</h3>
            <p>Separate infrastructure for each customer. No data crossing or risk of information leakage between environments.</p>
          </div>
        </div>

        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <LockKeyIcon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>Full Encryption</h3>
            <p>Secure data at rest (AES-256) and in transit (TLS 1.2+). Independent cryptographic key management.</p>
          </div>
        </div>

        <div className={styles.featuredCard}>
          <div className={styles.featuredIcon}>
            <UserCheck01Icon size={40} />
          </div>
          <div className={styles.featuredContent}>
            <h3>Access Control</h3>
            <p>Robust authentication via Auth0, RBAC (Role-Based Access Control), and principle of least privilege.</p>
          </div>
        </div>
      </div>

      <h2 className={styles.gridTitle}>Defense in Depth</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <Shield02Icon size={24} />
          </div>
          <h3>Secure Widget</h3>
          <p>Sandboxed iframe, CSP protection, XSS prevention, and strict validation.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <ViewOffSlashIcon size={24} />
          </div>
          <h3>PII Protection</h3>
          <p>Automatic detection and masking of sensitive information.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <GlobalSearchIcon size={24} />
          </div>
          <h3>WAF & Monitoring</h3>
          <p>Cloudflare WAF, DDoS mitigation, Geo-IP filtering, and 24/7 monitoring.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <CheckListIcon size={24} />
          </div>
          <h3>Continuous Validation</h3>
          <p>Static analysis (SAST), regular pentesting, and automated testing.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <EyeIcon size={24} />
          </div>
          <h3>AI Transparency</h3>
          <p>Complete source traceability and response explanation.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconHeader}>
            <Alert02Icon size={24} />
          </div>
          <h3>Content Moderation</h3>
          <p>Toxicity filters, sensitive topic blocking, and generation safety.</p>
        </div>
      </div>

      <div className={styles.auditSection}>
        <div className={styles.auditHeader}>
          <div className={styles.auditIcon}>
            <FileSearchIcon size={32} />
          </div>
          <h2>Complete Audit and Traceability</h2>
        </div>
        <div className={styles.auditGrid}>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Database01Icon size={24} />
            </div>
            <h4>Immutable Logging</h4>
            <p>Complete log of queries, responses, and configuration changes.</p>
          </div>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Activity01Icon size={24} />
            </div>
            <h4>Activity Tracking</h4>
            <p>Detailed monitoring of who accesses and what actions are performed.</p>
          </div>
          <div className={styles.auditItem}>
            <div className={styles.auditItemIcon}>
              <Certificate01Icon size={24} />
            </div>
            <h4>Compliance Ready</h4>
            <p>Designed to facilitate compliance with corporate standards.</p>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaIcon}>
          <HelpCircleIcon size={48} />
        </div>
        <h3>Does your team need more information or have questions?</h3>
        <p>Our product team is available to answer any security questions.</p>
        <a href="mailto:producteam@aifindr.ai" className="button button--primary button--lg">
          producteam@aifindr.ai
        </a>
      </div>
    </div>
  );
}
