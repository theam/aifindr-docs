---
title: Context and Metadata
description: Customize assistant responses by sending relevant user and application data
slug: /widget-config/contexto-metadatos
sidebar_position: 5
---

# Context and Metadata

The AIFindr widget allows you to customize assistant responses through two types of data: **metadata** (fixed) and **context** (dynamic).

## Key Differences

| Aspect | Metadata | Context |
|---------|-----------|----------|
| **When is it defined?** | In the `<script>` with `data-meta-*` or by auto-capture | With the JavaScript API |
| **Can it change?** | No (immutable) | Yes (dynamic) |
| **Does the AI see it?** | No (analytics only) | Yes (in conversations) |
| **Purpose** | Segmentation and metrics | Response personalization |
| **Persistence** | Entire session | Can be updated in real-time |

## Metadata

Metadata is **fixed information** that you define when loading the widget. They are like permanent tags that help segment and analyze assistant usage, but **do not affect the responses** given by the AI.

### Common Use Cases

#### 1. Marketing and campaigns (UTMs)

UTM parameters are codes that identify where your visitors come from. The widget captures them in two ways:

**Option A: Auto-capture from URL** (easier)
```html
<!-- The widget automatically detects UTMs from the URL -->
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  defer
></script>
```

If someone visits: `yoursite.com?utm_source=google&utm_medium=cpc`
The widget automatically captures those values.

**Option B: Define fixed UTMs** (more control)
```html
<!-- Useful when you want specific values independent of the URL -->
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  data-meta-utm-source="google"
  data-meta-utm-medium="cpc"
  data-meta-utm-campaign="summer2025"
  defer
></script>
```

**How does auto-capture work?**
- Automatically detects: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- Groups them in a `utm` object for easy access
- If you define fixed values with `data-meta-utm-*`, these take priority over auto-capture

**Verify what was captured:**
```js
AIFindrWidget.ready(() => {
  console.log('Captured metadata:', AIFindrWidget.getMetadata());
  // { utm: { source: "google", medium: "cpc" }, ... }
});
```

#### 2. User segmentation

Use metadata to **classify users** without affecting chat responses:

**E-commerce:**
```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  data-meta-store="madrid-centro"
  data-meta-segment="premium"
  data-meta-ab-test="checkout-v2"
  defer
></script>
```

**SaaS/Applications:**
```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  data-meta-tenant="company-abc"
  data-meta-plan="enterprise"
  data-meta-environment="production"
  defer
></script>
```

**User identifiers (tracking only):**
```html
<!-- For analytics, NOT for personalization -->
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  data-meta-user-id="12345"
  data-meta-account-type="premium"
  defer
></script>
```

> **Tip:** If you need the AI to personalize responses based on the user, use **context** instead of metadata (see next section).

#### 3. Configuration and environment

Useful for differentiating environments and versions:

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  data-meta-environment="production"
  data-meta-version="2.1.0"
  data-meta-region="eu-west"
  data-meta-feature-flags="dark-mode,new-ui"
  defer
></script>
```

### Recommended Conventions

| Data Type | Convention | Example |
|--------------|------------|---------|
| **Environment** | `data-meta-environment` | `"production"`, `"staging"` |
| **Experiments** | `data-meta-ab-test` | `"header-v2"`, `"checkout-flow-b"` |
| **Geography** | `data-meta-region` | `"latam"`, `"eu-west"` |
| **Business** | `data-meta-segment` | `"premium"`, `"freemium"` |
| **User** | `data-meta-user-id` | `"12345"`, `"abc-def-123"` |
| **UTMs (auto)** | Captured from URL | `utm.source`, `utm.medium` |
| **UTMs (manual)** | `data-meta-utm-source` | `utmSource`, `utmMedium` |

### Important: Metadata vs Context

**Key rule:** If you define a key as metadata, you CANNOT use it in context:

```js
// If you have: data-meta-user-id="123"
AIFindrWidget.setContext({
  userId: '456' // ⚠️ Will be ignored with warning
});
// Console: "userId was declared as metadata. Metadata is immutable"
```

**When to use each?**
- **Metadata**: Tracking, analytics, segmentation (AI doesn't see it)
- **Context**: Response personalization (AI sees it)

## Context

Context is **dynamic** and personalizes assistant responses in real-time.

### Management Methods

#### `setContext(object)` - Replaces entire context

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

#### `mergeContext(object)` - Adds or updates keys

```js
// Initial context
AIFindrWidget.setContext({ userId: '12345', page: 'home' });

// Update only the page
AIFindrWidget.mergeContext({ page: 'products' });

// Result: { userId: '12345', page: 'products' }
```

#### `getContext()` - Gets current context

```js
const currentContext = AIFindrWidget.getContext();
console.log('Current context:', currentContext);
```

## Use Cases by Industry

### E-commerce

```js
// User base context
AIFindrWidget.setContext({
  userId: user.id,
  userType: user.subscription,
  currency: 'EUR',
  language: 'en',
  hasOrders: user.orderCount > 0
});

// On product page
AIFindrWidget.mergeContext({
  page: 'product',
  productId: product.id,
  productCategory: product.category,
  productPrice: product.price,
  inStock: product.stock > 0
});

// In cart
AIFindrWidget.mergeContext({
  page: 'cart',
  cartItems: cart.items.length,
  cartTotal: cart.total,
  hasDiscount: cart.discount > 0
});

// In checkout
AIFindrWidget.mergeContext({
  page: 'checkout',
  checkoutStep: 'payment',
  shippingMethod: selectedShipping.type
});
```

### SaaS Dashboard

```js
// User and organization context
AIFindrWidget.setContext({
  userId: user.id,
  organizationId: org.id,
  role: user.role,
  plan: org.subscription.plan,
  features: org.enabledFeatures,
  onboardingCompleted: user.onboarding.completed
});

// By app section
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

### Learning Platform

```js
// Student context
AIFindrWidget.setContext({
  studentId: student.id,
  courseId: currentCourse.id,
  courseName: currentCourse.name,
  progress: student.progress.percentage,
  currentModule: currentModule.id,
  completedLessons: student.completedLessons.length,
  strugglingTopics: student.strugglingAreas
});

// Update during lesson
AIFindrWidget.mergeContext({
  lesson: currentLesson.id,
  lessonType: currentLesson.type, // video, quiz, reading
  timeSpent: sessionTime,
  attempts: quizAttempts
});
```

## Advanced Patterns

### Hierarchical Context

```js
// Organizational context structure
AIFindrWidget.setContext({
  // Global level
  app: {
    version: '2.1.0',
    environment: 'production',
    region: 'eu-west-1'
  },

  // User level
  user: {
    id: user.id,
    type: user.accountType,
    preferences: user.settings,
    permissions: user.permissions
  },

  // Session level
  session: {
    duration: sessionLength,
    pagesVisited: visitedPages.length,
    referrer: document.referrer,
    userAgent: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
  },

  // Current page level
  page: {
    path: window.location.pathname,
    title: document.title,
    loadTime: performance.now()
  }
});
```

### Temporal Context

```js
// Update context based on time
setInterval(() => {
  AIFindrWidget.mergeContext({
    sessionDuration: Math.floor((Date.now() - sessionStart) / 1000),
    currentTime: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}, 30000); // Every 30 seconds
```

### Context by Interactions

```js
// Track user behavior
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

// Track errors
window.addEventListener('error', () => {
  AIFindrWidget.mergeContext({
    hasErrors: true,
    lastError: new Date().toISOString()
  });
});
```

## Integration by Technology

### Custom React Hook

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

    // User base context
    AIFindrWidget.setContext({
      userId: user.id,
      userType: user.type,
      language: user.preferences.language,
      timezone: user.timezone
    });
  }, [user]);

  useEffect(() => {
    if (!window.AIFindrWidget) return;

    // Update on route changes
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

### WordPress with Dynamic Context

```php
<?php
// Dynamic context in WordPress
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

    // Page context
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

    // User context
    if (is_user_logged_in()) {
        $context['user_id'] = $current_user->ID;
        $context['user_roles'] = $current_user->roles;
        $context['user_registered'] = $current_user->user_registered;
    }

    // WooCommerce context
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

## Metadata Protection

The widget **automatically protects** metadata from being overwritten by context:

```js
// If you have metadata: data-meta-environment="production"
AIFindrWidget.setContext({
  userId: '123',
  environment: 'development' // Ignored with warning
});

// Console: "AIFindr Widget: "environment" was declared as metadata in data-meta-environment.
// Metadata is immutable; updateContext ignored this key."
```

## Troubleshooting

### Context not updating

```js
// Wrong: calling before it's ready
AIFindrWidget.setContext({ userId: '123' });

// Right: wait until it's ready
AIFindrWidget.ready(() => {
  AIFindrWidget.setContext({ userId: '123' });
});
```

### Verify current context

```js
// Context debug
console.log('Current context:', AIFindrWidget.getContext());
console.log('Metadata:', AIFindrWidget.getMetadata());

// Full debug
console.log('Widget state:', AIFindrWidget._debug.getState());
```

### Context too large

```js
// Avoid very large objects
AIFindrWidget.setContext({
  userId: '123',
  fullUserData: { /* 1000+ properties */ } // Too heavy
});

// Better: only relevant data
AIFindrWidget.setContext({
  userId: '123',
  userType: user.type,
  preferences: {
    language: user.lang,
    currency: user.currency
  }
});
```

### Common UTM Issues

**Don't see UTMs in getMetadata():**
- Verify that the URL actually has `utm_*` parameters
- If you define `data-meta-utm-*`, `metadata.utm` won't be created (you'll see namespaced keys like `utmSource`)
- If you define `data-meta-utm` as a string, it blocks creation of `metadata.utm`

**Need to "force" values that come in the URL:**
- Declare fixed values with `data-meta-utm-*` in the script
- These will have priority over URL auto-capture

```js
// Example: Force specific values
// <script data-meta-utm-source="email" data-meta-utm-campaign="newsletter">
// Even if the URL has ?utm_source=google, "email" will prevail
```

## Best Practices

1. **UTMs**: Use auto-capture by URL or `data-meta-utm-*` to fix them
2. **User IDs**:
   - Metadata (`data-meta-user-id`) for analytics and traceability
   - Context (`userId` in setContext) for AI personalization
3. **Metadata**: For fixed segmentation and analytics data
4. **Context**: For dynamic response personalization
5. **Initialize early**: Always use `AIFindrWidget.ready()`
6. **Update frequently**: `mergeContext()` on navigation and events
7. **Minimal data**: Only send information relevant to the AI
8. **Descriptive names**: Use clear and consistent keys
9. **Don't duplicate keys**: Avoid using the same key in metadata and context
