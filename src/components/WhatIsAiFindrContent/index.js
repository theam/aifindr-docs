import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { LinkSquare02Icon } from 'hugeicons-react';
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
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Características principales</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: 0 }}>
            <li>Comprensión avanzada del lenguaje natural de tus clientes</li>
            <li>Resultados relevantes y contextualizados según tus objetivos de negocio</li>
            <li>Integración sencilla mediante widget web o API</li>
            <li>Analytics en tiempo real para entender las necesidades de tus usuarios</li>
            <li>Personalización completa de la experiencia según tu marca</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
