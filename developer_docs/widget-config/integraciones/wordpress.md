---
title: WordPress
description: Integración del widget de AIFindr en sitios WordPress con plugins y temas
slug: /widget-config/integraciones/wordpress
sidebar_position: 3
---

:::info ¿Primera vez?
Lee la [guía de instalación](../instalacion) primero para entender los conceptos básicos.
:::

# WordPress

Integración completa del widget de AIFindr en WordPress usando múltiples métodos: plugins, functions.php, page builders y personalización de temas.

## Método 1: Plugin de Code Snippets (Recomendado)

La forma más segura y mantenible de añadir el widget.

### 1. Instalar Plugin

Instala uno de estos plugins desde el repositorio de WordPress:
- **Code Snippets** (recomendado)
- **Insert Headers and Footers**
- **Header Footer Code Manager**

### 2. Añadir el script

En **Code Snippets → Add New**, crea un snippet:

```php
<?php
// Snippet Name: AIFindr Widget
// Description: Carga el widget de AIFindr en todas las páginas

function add_aifindr_widget() {
    ?>
    <script
        src="https://hub.aifindr.ai/widget.js"
        data-client-id="TU_CLIENT_ID"
        defer
    ></script>
    <?php
}
add_action('wp_footer', 'add_aifindr_widget');
```

### 3. Añadir el trigger

Crea otro snippet para el botón trigger:

```php
<?php
// Snippet Name: AIFindr Trigger
// Description: Añade botón de ayuda flotante

function add_aifindr_trigger_button() {
    ?>
    <style>
    .aifindr-help-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0073aa;
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 20px;
        cursor: pointer;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .aifindr-help-button:hover {
        background: #005a87;
        transform: translateY(-2px);
    }
    </style>
    <button id="ai-findr-trigger" class="aifindr-help-button">
        ¿Necesitas ayuda?
    </button>
    <?php
}
add_action('wp_footer', 'add_aifindr_trigger_button');
```

## Método 2: functions.php del tema

Si tienes acceso al tema activo y no quieres usar plugins.

### En functions.php

```php
<?php
// Cargar widget de AIFindr
function enqueue_aifindr_widget() {
    // Solo en frontend
    if (!is_admin()) {
        ?>
        <script
            src="https://hub.aifindr.ai/widget.js"
            data-client-id="TU_CLIENT_ID"
            defer
        ></script>
        <?php
    }
}
add_action('wp_footer', 'enqueue_aifindr_widget');

// Añadir contexto WordPress
function aifindr_wp_context() {
    if (!is_admin()) {
        global $post;
        $context = array(
            'platform' => 'wordpress',
            'wp_version' => get_bloginfo('version'),
            'theme' => get_stylesheet(),
            'post_type' => get_post_type(),
            'is_home' => is_home(),
            'is_single' => is_single(),
            'is_page' => is_page(),
        );
        
        if ($post) {
            $context['post_id'] = $post->ID;
            $context['post_title'] = get_the_title();
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
}
add_action('wp_footer', 'aifindr_wp_context');
```

## Método 3: Convertir enlace de menú

Convierte un enlace existente del menú en trigger del widget.

### 1. Crear enlace personalizado

En **Apariencia → Menús**, añade un enlace personalizado con:
- **URL**: `#aifindr`
- **Texto**: `Ayuda` o `Soporte`

### 2. Script de conversión

```php
<?php
function convert_menu_link_to_aifindr_trigger() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Buscar enlace con href="#aifindr"
        const link = document.querySelector('a[href="#aifindr"]');
        if (link) {
            const button = document.createElement('button');
            button.id = 'ai-findr-trigger';
            button.textContent = link.textContent;
            button.className = link.className; // Mantener estilos del tema
            button.style.background = 'none';
            button.style.border = 'none';
            button.style.color = 'inherit';
            button.style.cursor = 'pointer';
            
            // Reemplazar enlace por botón
            link.parentNode.replaceChild(button, link);
        }
    });
    </script>
    <?php
}
add_action('wp_footer', 'convert_menu_link_to_aifindr_trigger');
```

## Método 4: Page Builders

### Elementor

1. **Añadir HTML Widget**
2. **Insertar código**:

```html
<button id="ai-findr-trigger" class="elementor-button">
    ¿Necesitas ayuda?
</button>

<script>
// Contexto específico de Elementor
if (window.AIFindrWidget) {
    AIFindrWidget.ready(() => {
        AIFindrWidget.mergeContext({
            page_builder: 'elementor',
            page_id: '<?php echo get_the_ID(); ?>',
            page_title: '<?php echo get_the_title(); ?>'
        });
    });
}
</script>
```

### Gutenberg (Editor de bloques)

1. **Añadir bloque HTML personalizado**
2. **Insertar**:

```html
<div class="wp-block-group">
    <button id="ai-findr-trigger" class="wp-block-button__link">
        ¿En qué te puedo ayudar?
    </button>
</div>
```

### Divi Builder

En un módulo de **Código**:

```html
<button id="ai-findr-trigger" class="et_pb_button">
    Asistente Virtual
</button>
```

## Uso avanzado

### Contexto por tipo de página

```php
<?php
function aifindr_advanced_context() {
    if (is_admin()) return;
    
    $context = array('platform' => 'wordpress');
    
    if (is_woocommerce()) {
        $context['section'] = 'shop';
        if (is_product()) {
            $context['product_id'] = get_the_ID();
            $context['product_price'] = get_post_meta(get_the_ID(), '_price', true);
        }
        if (is_cart()) {
            $context['cart_items'] = WC()->cart->get_cart_contents_count();
        }
    }
    
    if (is_single()) {
        $context['post_categories'] = wp_get_post_categories(get_the_ID(), array('fields' => 'names'));
    }
    
    if (is_user_logged_in()) {
        $user = wp_get_current_user();
        $context['user_role'] = $user->roles[0];
        $context['user_registered'] = $user->user_registered;
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
add_action('wp_footer', 'aifindr_advanced_context');
```

### Integración con WooCommerce

```php
<?php
// Contexto específico de WooCommerce
function aifindr_woocommerce_context() {
    if (!class_exists('WooCommerce') || is_admin()) return;
    
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.AIFindrWidget) {
            AIFindrWidget.ready(() => {
                <?php if (is_product()): ?>
                AIFindrWidget.mergeContext({
                    wc_context: 'product_page',
                    product_id: <?php echo get_the_ID(); ?>,
                    product_name: '<?php echo esc_js(get_the_title()); ?>',
                    product_price: '<?php echo esc_js(get_post_meta(get_the_ID(), '_price', true)); ?>'
                });
                <?php elseif (is_cart()): ?>
                AIFindrWidget.mergeContext({
                    wc_context: 'cart',
                    cart_total: '<?php echo esc_js(WC()->cart->get_cart_total()); ?>',
                    items_count: <?php echo WC()->cart->get_cart_contents_count(); ?>
                });
                <?php elseif (is_checkout()): ?>
                AIFindrWidget.mergeContext({
                    wc_context: 'checkout',
                    checkout_step: 'payment'
                });
                <?php endif; ?>
            });
        }
    });
    </script>
    <?php
}
add_action('wp_footer', 'aifindr_woocommerce_context');
```

### Trigger condicional

```php
<?php
// Mostrar trigger solo en páginas específicas
function conditional_aifindr_trigger() {
    // Solo mostrar en páginas de producto, carrito o contacto
    if (is_product() || is_cart() || is_page('contacto')) {
        ?>
        <button id="ai-findr-trigger" class="conditional-help-btn">
            <?php
            if (is_product()) {
                echo '¿Preguntas sobre el producto?';
            } elseif (is_cart()) {
                echo '¿Problemas con tu pedido?';
            } else {
                echo '¿Necesitas ayuda?';
            }
            ?>
        </button>
        <style>
        .conditional-help-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 25px;
            cursor: pointer;
            z-index: 999;
            font-size: 14px;
        }
        </style>
        <?php
    }
}
add_action('wp_footer', 'conditional_aifindr_trigger');
```

## Troubleshooting WordPress

### Problemas comunes

| Problema | Solución |
|----------|----------|
| Widget no aparece | Verificar que el script se carga desde wp_footer |
| Conflicto con otros plugins | Usar alta prioridad en add_action: `add_action('wp_footer', 'func', 99)` |
| No funciona en páginas cacheadas | Excluir script del cache o usar fragmentos dinámicos |
| Problemas con HTTPS | Verificar que el sitio use SSL válido |

### Debug en WordPress

```php
<?php
// Solo en modo debug
if (WP_DEBUG) {
    function aifindr_debug_info() {
        ?>
        <script>
        console.log('WordPress Info:', {
            wp_version: '<?php echo get_bloginfo("version"); ?>',
            theme: '<?php echo get_stylesheet(); ?>',
            is_admin: <?php echo is_admin() ? 'true' : 'false'; ?>,
            post_type: '<?php echo get_post_type(); ?>',
            aifindr_loaded: typeof window.AIFindrWidget !== 'undefined'
        });
        </script>
        <?php
    }
    add_action('wp_footer', 'aifindr_debug_info');
}
```

## Próximos pasos

- [Personalización visual](../personalizacion) para adaptar estilos del tema
- [Contexto y metadatos](../contexto-metadatos) para respuestas específicas de WordPress
- [API Reference](../api-reference) para funcionalidades avanzadas
