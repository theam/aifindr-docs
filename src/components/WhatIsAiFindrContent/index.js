import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { 
  LinkSquare02Icon, 
  BankIcon, 
  ShoppingCart01Icon, 
  Building03Icon, 
  Shield01Icon,
  ChartBreakoutSquareIcon,
  Brain02Icon,
  Target02Icon,
  Plug01Icon,
  Analytics01Icon,
  PaintBoardIcon,
  SecurityLockIcon
} from 'hugeicons-react';
import styles from './styles.module.css';

export function WhatIsAiFindrContent() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subtitle}>
          Un buscador conversacional de nueva generación para tu negocio.
        </p>
        <p className={styles.description}>
          AI Findr es un buscador conversacional capaz de entender a tus clientes en lenguaje natural y de ofrecer
          resultados relevantes, impactantes y con valor de negocio.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Características principales</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <div className={styles.featureIconWrapper}>
              <Brain02Icon size={24} />
            </div>
            <div className={styles.featureContent}>
              <h4>Comprensión Natural</h4>
              <p>Entendimiento avanzado del lenguaje natural de tus clientes.</p>
            </div>
          </div>
          
          <div className={styles.featureItem}>
            <div className={styles.featureIconWrapper}>
              <Target02Icon size={24} />
            </div>
            <div className={styles.featureContent}>
              <h4>Resultados Relevantes</h4>
              <p>Resultados contextualizados según tus objetivos de negocio.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIconWrapper}>
              <Plug01Icon size={24} />
            </div>
            <div className={styles.featureContent}>
              <h4>Integración Sencilla</h4>
              <p>Implementación rápida mediante widget web o API flexible.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIconWrapper}>
              <Analytics01Icon size={24} />
            </div>
            <div className={styles.featureContent}>
              <h4>Analytics Real-time</h4>
              <p>Insights en tiempo real para entender a tus usuarios.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIconWrapper}>
              <PaintBoardIcon size={24} />
            </div>
            <div className={styles.featureContent}>
              <h4>Personalización Total</h4>
              <p>Adaptación completa de la experiencia a tu marca.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIconWrapper}>
              <SecurityLockIcon size={24} />
            </div>
            <div className={styles.featureContent}>
              <h4>Seguridad Empresarial</h4>
              <p>Protección de datos y cumplimiento de estándares corporativos.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Componentes principales</h2>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>AI Findr Experience</h3>
            <p className={styles.cardText}>
              La experiencia que se integra en tu web o producto y responde directamente a tus usuarios.
            </p>
          </div>
          <a href="https://hub.aifindr.ai/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                AI Findr Hub
                <LinkSquare02Icon size={18} className={styles.externalIcon} />
              </h3>
              <p className={styles.cardText}>
                El panel de administración donde gestionas tu base de conocimiento, tus reglas de negocio, tu
                experiencia y un dashboard completo de analíticas.
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Soluciones por Industria</h2>
        <p className={styles.sectionSubtitle}>
          AI Findr adapta su comportamiento y respuestas a las necesidades específicas de cada sector.
        </p>
        
        <div className={styles.industryGrid}>
          <div className={styles.industryCard}>
            <div className={styles.industryIcon}>
              <BankIcon size={24} />
            </div>
            <h3>Banca</h3>
            <p className={styles.industryTagline}>Informa, resuelve y convierte</p>
            <ul className={styles.industryList}>
              <li>Adapta el comportamiento según la página y objetivos.</li>
              <li>Genera respuestas dinámicas con acciones personalizadas.</li>
              <li>Optimiza contenido para mejorar visibilidad SEO.</li>
            </ul>
          </div>

          <div className={styles.industryCard}>
            <div className={styles.industryIcon}>
              <ShoppingCart01Icon size={24} />
            </div>
            <h3>eCommerce</h3>
            <p className={styles.industryTagline}>Tu personal shopper digital</p>
            <ul className={styles.industryList}>
              <li>Entiende la intención de compra más allá de las keywords.</li>
              <li>Comprensión multimodal (texto e imágenes).</li>
              <li>Reglas de negocio para priorizar resultados comerciales.</li>
            </ul>
          </div>

          <div className={styles.industryCard}>
            <div className={styles.industryIcon}>
              <Building03Icon size={24} />
            </div>
            <h3>Centros Comerciales</h3>
            <p className={styles.industryTagline}>Reinventa la experiencia de visita</p>
            <ul className={styles.industryList}>
              <li>Información real y directa de la intención de los visitantes.</li>
              <li>Activación de promociones en el momento oportuno.</li>
              <li>Mejora la planificación de eventos y servicios.</li>
            </ul>
          </div>

          <div className={styles.industryCard}>
            <div className={styles.industryIcon}>
              <Shield01Icon size={24} />
            </div>
            <h3>Seguros</h3>
            <p className={styles.industryTagline}>Potencia y acorta tu funnel</p>
            <ul className={styles.industryList}>
              <li>Reduce el abandono de carrito con información clave.</li>
              <li>Generación de leads natural y fluida.</li>
              <li>Contexto detallado para mejorar la contactabilidad.</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.otherSectors}>
          <h4 className={styles.otherSectorsTitle}>
            <ChartBreakoutSquareIcon size={20} />
            También disponible para
          </h4>
          <div className={styles.chipContainer}>
            <span className={styles.chip}>Turismo</span>
            <span className={styles.chip}>SaaS</span>
            <span className={styles.chip}>Salud</span>
            <span className={styles.chip}>Educación</span>
          </div>
        </div>
      </div>
    </div>
  );
}
