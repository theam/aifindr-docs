---
title: Contexto y Metadatos
description: Personaliza las respuestas del asistente enviando datos relevantes del usuario y la aplicación
slug: /widget-config/contexto-metadatos
sidebar_position: 5
---

# Contexto y Metadatos

El widget de AIFindr permite personalizar las respuestas del asistente mediante dos tipos de datos: **metadatos** (fijos) y **contexto** (dinámico).

## 🏷️ Diferencias clave

| Aspecto | Metadatos | Contexto |
|---------|-----------|----------|
| **¿Cuándo se define?** | En el `<script>` con `data-meta-*` | Con la API JavaScript |
| **¿Se puede cambiar?** | ❌ No (inmutable) | ✅ Sí (dinámico) |
| **¿La IA lo ve?** | ❌ No (solo analíticas) | ✅ Sí (en conversaciones) |
| **Propósito** | Segmentación y métricas | Personalización de respuestas |
| **Persistencia** | Toda la sesión | Se puede actualizar en tiempo real |

## Metadatos

Los metadatos son **inmutables** y se usan para segmentación, métricas y análisis en el dashboard.

### Configuración básica

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-market="es"
  data-meta-campaign="summer-2025"
  data-meta-version="2.1.0"
  defer
></script>
```

### Casos de uso comunes

**E-commerce:**
```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-store="madrid-center"
  data-meta-segment="premium"
  data-meta-ab-test="checkout-v2"
  data-meta-region="eu-west"
  defer
></script>
```

**SaaS:**
```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-tenant="acme-corp"
  data-meta-environment="production"  
  data-meta-feature-flags="ai-suggestions,dark-mode"
  data-meta-pricing-tier="enterprise"
  defer
></script>
```

### Convenciones de naming

| Patrón | Ejemplo | Uso |
|--------|---------|-----|
| `data-meta-{environment}` | `data-meta-env="prod"` | Entorno de deployment |
| `data-meta-{experiment}` | `data-meta-ab-test="header-v2"` | Tests A/B |
| `data-meta-{geography}` | `data-meta-region="latam"` | Segmentación geográfica |
| `data-meta-{business}` | `data-meta-tier="premium"` | Modelo de negocio |

## Contexto

El contexto es **dinámico** y personaliza las respuestas del asistente en tiempo real.

### Métodos de gestión

#### `setContext(object)` - Reemplaza todo el contexto

```js
AIFindrWidget.ready(() => {
  AIFindrWidget.setContext({
    userId: '12345',
    userType: 'premium',
    currentPage: 'checkout',
    cartTotal: 299.99
  });
});
```

#### `mergeContext(object)` - Añade o actualiza claves

```js
// Contexto inicial
AIFindrWidget.setContext({ userId: '12345', page: 'home' });

// Actualizar solo la página
AIFindrWidget.mergeContext({ page: 'products' });

// Resultado: { userId: '12345', page: 'products' }
```

#### `getContext()` - Obtiene el contexto actual

```js
const currentContext = AIFindrWidget.getContext();
console.log('Contexto actual:', currentContext);
```

## Casos de uso por industria

### E-commerce

```js
// Contexto base del usuario
AIFindrWidget.setContext({
  userId: user.id,
  userType: user.subscription,
  currency: 'EUR',
  language: 'es',
  hasOrders: user.orderCount > 0
});

// En página de producto
AIFindrWidget.mergeContext({
  page: 'product',
  productId: product.id,
  productCategory: product.category,
  productPrice: product.price,
  inStock: product.stock > 0
});

// En carrito
AIFindrWidget.mergeContext({
  page: 'cart',
  cartItems: cart.items.length,
  cartTotal: cart.total,
  hasDiscount: cart.discount > 0
});

// En checkout
AIFindrWidget.mergeContext({
  page: 'checkout',
  checkoutStep: 'payment',
  shippingMethod: selectedShipping.type
});
```

### SaaS Dashboard

```js
// Contexto del usuario y organización
AIFindrWidget.setContext({
  userId: user.id,
  organizationId: org.id,
  role: user.role,
  plan: org.subscription.plan,
  features: org.enabledFeatures,
  onboardingCompleted: user.onboarding.completed
});

// Por sección de la app
switch (currentSection) {
  case 'dashboard':
    AIFindrWidget.mergeContext({
      section: 'dashboard',
      widgets: visibleWidgets,
      dateRange: selectedDateRange
    });
    break;
    
  case 'settings':
    AIFindrWidget.mergeContext({
      section: 'settings',
      subsection: currentTab,
      hasChanges: form.isDirty
    });
    break;
    
  case 'billing':
    AIFindrWidget.mergeContext({
      section: 'billing',
      nextBilling: subscription.nextBillingDate,
      usage: currentUsage
    });
    break;
}
```

### Plataforma de aprendizaje

```js
// Contexto del estudiante
AIFindrWidget.setContext({
  studentId: student.id,
  courseId: currentCourse.id,
  courseName: currentCourse.name,
  progress: student.progress.percentage,
  currentModule: currentModule.id,
  completedLessons: student.completedLessons.length,
  strugglingTopics: student.strugglingAreas
});

// Actualizar durante la lección
AIFindrWidget.mergeContext({
  lesson: currentLesson.id,
  lessonType: currentLesson.type, // video, quiz, reading
  timeSpent: sessionTime,
  attempts: quizAttempts
});
```

## Patrones avanzados

### Contexto jerárquico

```js
// Estructura de contexto organizativo
AIFindrWidget.setContext({
  // Nivel global
  app: {
    version: '2.1.0',
    environment: 'production',
    region: 'eu-west-1'
  },
  
  // Nivel de usuario
  user: {
    id: user.id,
    type: user.accountType,
    preferences: user.settings,
    permissions: user.permissions
  },
  
  // Nivel de sesión
  session: {
    duration: sessionLength,
    pagesVisited: visitedPages.length,
    referrer: document.referrer,
    userAgent: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
  },
  
  // Nivel de página actual  
  page: {
    path: window.location.pathname,
    title: document.title,
    loadTime: performance.now()
  }
});
```

### Contexto temporal

```js
// Actualizar contexto basado en tiempo
setInterval(() => {
  AIFindrWidget.mergeContext({
    sessionDuration: Math.floor((Date.now() - sessionStart) / 1000),
    currentTime: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}, 30000); // Cada 30 segundos
```

### Contexto por interacciones

```js
// Rastrear comportamiento del usuario
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-track]')) {
    AIFindrWidget.mergeContext({
      lastAction: e.target.dataset.track,
      actionTimestamp: new Date().toISOString(),
      actionContext: {
        elementType: e.target.tagName.toLowerCase(),
        elementText: e.target.textContent.trim()
      }
    });
  }
});

// Rastrear errores
window.addEventListener('error', () => {
  AIFindrWidget.mergeContext({
    hasErrors: true,
    lastError: new Date().toISOString()
  });
});
```

## Integración por tecnología

### React Hook personalizado

```tsx
// hooks/useAIFindrContext.ts
import { useEffect } from 'react';
import { useUser } from './useUser';
import { useRouter } from 'next/router';

export function useAIFindrContext() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!window.AIFindrWidget || !user) return;

    // Contexto base del usuario
    AIFindrWidget.setContext({
      userId: user.id,
      userType: user.type,
      language: user.preferences.language,
      timezone: user.timezone
    });
  }, [user]);

  useEffect(() => {
    if (!window.AIFindrWidget) return;

    // Actualizar en cambios de ruta
    AIFindrWidget.mergeContext({
      route: router.pathname,
      query: router.query,
      navigationTime: new Date().toISOString()
    });
  }, [router.pathname, router.query]);

  const updateContext = (newContext: Record<string, any>) => {
    if (window.AIFindrWidget) {
      AIFindrWidget.mergeContext(newContext);
    }
  };

  return { updateContext };
}
```

### Angular Service

```typescript
// aifindr-context.service.ts
@Injectable({ providedIn: 'root' })
export class AIFindrContextService {
  private readonly contextSubject = new BehaviorSubject<Record<string, any>>({});
  public context$ = this.contextSubject.asObservable();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.initializeContext();
  }

  private initializeContext(): void {
    combineLatest([
      this.userService.user$,
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null)
      )
    ]).subscribe(([user, navigationEvent]) => {
      this.updateBaseContext(user, navigationEvent);
    });
  }

  private updateBaseContext(user: any, navigation: any): void {
    const context = {
      userId: user?.id,
      userRole: user?.role,
      route: this.router.url,
      timestamp: new Date().toISOString()
    };

    if (window.AIFindrWidget) {
      AIFindrWidget.setContext(context);
      this.contextSubject.next(context);
    }
  }

  updateContext(partialContext: Record<string, any>): void {
    if (window.AIFindrWidget) {
      AIFindrWidget.mergeContext(partialContext);
      
      const currentContext = this.contextSubject.value;
      this.contextSubject.next({ ...currentContext, ...partialContext });
    }
  }
}
```

### WordPress con contexto dinámico

```php
<?php
// Contexto dinámico en WordPress
function aifindr_dynamic_context() {
    if (is_admin()) return;
    
    global $post, $current_user;
    
    $context = [
        'platform' => 'wordpress',
        'wp_version' => get_bloginfo('version'),
        'theme' => get_stylesheet(),
        'post_type' => get_post_type(),
        'is_logged_in' => is_user_logged_in()
    ];
    
    // Contexto de página
    if (is_home()) {
        $context['page_type'] = 'home';
    } elseif (is_single()) {
        $context['page_type'] = 'post';
        $context['post_id'] = get_the_ID();
        $context['categories'] = wp_get_post_categories($post->ID, ['fields' => 'names']);
    } elseif (is_page()) {
        $context['page_type'] = 'page';
        $context['page_template'] = get_page_template_slug();
    }
    
    // Contexto de usuario
    if (is_user_logged_in()) {
        $context['user_id'] = $current_user->ID;
        $context['user_roles'] = $current_user->roles;
        $context['user_registered'] = $current_user->user_registered;
    }
    
    // Contexto de WooCommerce
    if (class_exists('WooCommerce')) {
        if (is_shop()) {
            $context['wc_page'] = 'shop';
        } elseif (is_product()) {
            $context['wc_page'] = 'product';
            $context['product_id'] = get_the_ID();
            $context['product_type'] = wc_get_product()->get_type();
        } elseif (is_cart()) {
            $context['wc_page'] = 'cart';
            $context['cart_items'] = WC()->cart->get_cart_contents_count();
            $context['cart_total'] = WC()->cart->get_cart_total();
        }
    }
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.AIFindrWidget) {
            AIFindrWidget.ready(() => {
                AIFindrWidget.setContext(<?php echo json_encode($context); ?>);
            });
        }
    });
    </script>
    <?php
}
add_action('wp_footer', 'aifindr_dynamic_context');
```

## Protección de metadatos

El widget **protege automáticamente** los metadatos de ser sobrescritos por el contexto:

```js
// Si tienes metadatos: data-meta-environment="production"
AIFindrWidget.setContext({
  userId: '123',
  environment: 'development' // ⚠️ Ignorado con warning
});

// Console: "AIFindr Widget: environment was declared as metadata. 
// Metadata is immutable; updateContext ignored this key."
```

## Troubleshooting

### Contexto no se actualiza

```js
// ❌ Mal: llamar antes de que esté listo
AIFindrWidget.setContext({ userId: '123' });

// ✅ Bien: esperar a que esté listo
AIFindrWidget.ready(() => {
  AIFindrWidget.setContext({ userId: '123' });
});
```

### Verificar contexto actual

```js
// Debug del contexto
console.log('Contexto actual:', AIFindrWidget.getContext());
console.log('Metadatos:', AIFindrWidget.getMetadata());

// Debug completo
console.log('Estado widget:', AIFindrWidget._debug.getState());
```

### Contexto demasiado grande

```js
// ❌ Evitar objetos muy grandes
AIFindrWidget.setContext({
  userId: '123',
  fullUserData: { /* 1000+ properties */ } // Muy pesado
});

// ✅ Mejor: solo datos relevantes
AIFindrWidget.setContext({
  userId: '123',
  userType: user.type,
  preferences: {
    language: user.lang,
    currency: user.currency
  }
});
```

## Mejores prácticas

1. **Metadatos**: Para datos fijos de segmentación y analytics
2. **Contexto**: Para personalización dinámica de respuestas  
3. **Inicializar temprano**: Usar `AIFindrWidget.ready()` siempre
4. **Actualizar frecuentemente**: `mergeContext()` en navegación y eventos
5. **Datos mínimos**: Solo enviar información relevante para la IA
6. **Nombres descriptivos**: Usar claves claras y consistentes
