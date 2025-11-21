---
sidebar_position: 4
title: Cómo se integra
description: Elige la mejor estrategia de integración para tu producto, desde un Widget listo para usar hasta una API completamente flexible.
sidebar_custom_props:
  icon: Plug01Icon
---

import Card from '@site/src/components/Card';
import ComparisonTable from '@site/src/components/ComparisonTable';
import { ZapIcon, Settings01Icon } from 'hugeicons-react';

# Guía de Integración

En AI Findr entendemos que cada producto es único. Por eso, ofrecemos dos caminos principales para integrar nuestra inteligencia artificial en tu ecosistema digital.

<div className="row margin-bottom--lg" style={{marginTop: '2rem'}}>
  <div className="col col--6 margin-bottom--lg">
    <Card 
      title="Widget Web" 
      description="La opción rápida. Un chat pre-construido y personalizable que instalas en tu web en 5 minutos."
      to="/docs/widget-config/intro"
      icon={<ZapIcon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card 
      title="API Personalizada" 
      description="Control total. Integra la inteligencia de AI Findr profundamente en tu app, backend o flujos complejos."
      to="/docs/api/product-overview"
      icon={<Settings01Icon size={24} />}
    />
  </div>
</div>

## Comparativa detallada

Usa esta guía para decidir qué estrategia se adapta mejor a tus recursos y objetivos de producto.

<ComparisonTable 
  data={[
    {
      feature: "Objetivo Principal",
      widget: "Añadir IA a tu web rápidamente.",
      api: "Crear experiencias UX únicas y a medida."
    },
    {
      feature: "Implementación",
      widget: "No-Code / Low-Code. Copiar script.",
      api: "Pro-Code. Requiere desarrollo frontend/backend."
    },
    {
      feature: "Personalización",
      widget: "Visual (colores, logo) desde panel.",
      api: "Total. Tú construyes la interfaz desde cero."
    },
    {
      feature: "Mantenimiento",
      widget: "Gestionado por AI Findr.",
      api: "Tú mantienes tu código e integración."
    },
    {
      feature: "Casos de uso",
      widget: "Webs corporativas, SaaS, Ecommerce.",
      api: "Apps móviles, Voz, Integraciones profundas."
    }
  ]}
/>
