---
id: product-overview
title: Visión General
sidebar_label: Visión General
description: Entiende qué puedes construir con la API de AI Findr antes de ver el código.
---

import Card from '@site/src/components/Card';
import { SmartPhone01Icon, PuzzleIcon, CameraMicrophone01Icon, AiSearchIcon } from 'hugeicons-react';

# API de AI Findr: Construye experiencias a tu medida

La API de AI Findr está diseñada para equipos que quieren ir más allá del widget estándar. Permite conectar la inteligencia de nuestra plataforma directamente con tu software, bases de datos o interfaces de usuario personalizadas.

## ¿Por qué usar la API?

A diferencia del Widget, que es una "caja negra" visual, la API te entrega los datos en bruto (JSON). Esto significa que **tú tienes el control total de la experiencia de usuario (UX)**.

### Lo que puedes construir

<div className="row margin-bottom--lg">
  <div className="col col--6 margin-bottom--lg">
    <Card 
      title="Apps Móviles Nativas" 
      description="Integra un asistente de ayuda dentro de tu app iOS o Android con tu propia UI, sin usar webviews."
      icon={<SmartPhone01Icon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card 
      title="Integraciones Invisibles" 
      description="Genera borradores de respuesta en tu CRM o autocompleta formularios complejos automáticamente."
      icon={<PuzzleIcon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card 
      title="Interfaces de Voz" 
      description="Conecta la API con sistemas Text-to-Speech para crear asistentes telefónicos inteligentes."
      icon={<CameraMicrophone01Icon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card 
      title="Buscadores Semánticos" 
      description="Reemplaza tu barra de búsqueda tradicional con una que entiende preguntas y da respuestas directas."
      icon={<AiSearchIcon size={24} />}
    />
  </div>
</div>

## Capacidades principales

Nuestra API se divide en módulos lógicos que te permiten gestionar todo el ciclo de vida de la IA:

*   **Chat y Conversaciones:** Envía mensajes y recibe respuestas con contexto, referencias y sugerencias.
*   **Analítica:** Extrae datos sobre qué preguntan tus usuarios para alimentar tus propios dashboards de BI (Business Intelligence).
*   **Gestión del Widget:** Si usas el widget pero quieres controlarlo programáticamente (abrirlo/cerrarlo según acciones del usuario), también puedes hacerlo.

## ¿Es para mi equipo?

| Deberías usar la API si... | Mejor usa el Widget si... |
| :--- | :--- |
| Tienes un equipo de desarrollo disponible. | Quieres lanzar hoy mismo. |
| Necesitas una UI/UX completamente personalizada. | Te sirve una interfaz de chat estándar y moderna. |
| Vas a integrar la IA en un entorno no-web (Móvil, Desktop, IoT). | Tu entorno es una página web o aplicación web. |

---

**¿Listo para los detalles técnicos?**
Explora la [Referencia Técnica de la API](/docs/api/ai-findr-api) para ver endpoints, autenticación y ejemplos de código.
