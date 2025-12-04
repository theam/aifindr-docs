---
title: WordPress
description: AIFindr widget integration in WordPress sites with plugins and themes
slug: /widget-config/integrations/wordpress
sidebar_position: 3
---

:::info First time?
Read the [installation guide](../installation) first to understand the basics.
:::

# WordPress

Complete integration of the AIFindr widget in WordPress using multiple methods: plugins, functions.php, page builders, and theme customization.

## Method 1: Code Snippets Plugin (Recommended)

The safest and most maintainable way to add the widget.

### 1. Install Plugin

Install one of these plugins from the WordPress repository:
- **Code Snippets** (recommended)
- **Insert Headers and Footers**
- **Header Footer Code Manager**

### 2. Add the script

In **Code Snippets → Add New**, create a snippet:

```php
<?php
// Snippet Name: AIFindr Widget
// Description: Loads the AIFindr widget on all pages

function add_aifindr_widget() {
    ?>
    <script
        src="https://hub.aifindr.ai/widget.js"
        data-client-id="YOUR_CLIENT_ID"
        defer
    ></script>
    <?php
}
add_action('wp_footer', 'add_aifindr_widget');
```

### 3. Add the trigger

Create another snippet for the trigger button:

```php
<?php
// Snippet Name: AIFindr Trigger
// Description: Adds floating help button

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
        Need help?
    </button>
    <?php
}
add_action('wp_footer', 'add_aifindr_trigger_button');
```

## Method 2: Theme functions.php

If you have access to the active theme and don't want to use plugins.

### In functions.php

```php
<?php
// Load AIFindr widget
function enqueue_aifindr_widget() {
    // Only on frontend
    if (!is_admin()) {
        ?>
        <script
            src="https://hub.aifindr.ai/widget.js"
            data-client-id="YOUR_CLIENT_ID"
            defer
        ></script>
        <?php
    }
}
add_action('wp_footer', 'enqueue_aifindr_widget');

// Add WordPress context
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

## Method 3: Convert menu link

Convert an existing menu link into a widget trigger.

### 1. Create custom link

In **Appearance → Menus**, add a custom link with:
- **URL**: `#aifindr`
- **Text**: `Help` or `Support`

### 2. Conversion script

```php
<?php
function convert_menu_link_to_aifindr_trigger() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Find link with href="#aifindr"
        const link = document.querySelector('a[href="#aifindr"]');
        if (link) {
            const button = document.createElement('button');
            button.id = 'ai-findr-trigger';
            button.textContent = link.textContent;
            button.className = link.className; // Keep theme styles
            button.style.background = 'none';
            button.style.border = 'none';
            button.style.color = 'inherit';
            button.style.cursor = 'pointer';

            // Replace link with button
            link.parentNode.replaceChild(button, link);
        }
    });
    </script>
    <?php
}
add_action('wp_footer', 'convert_menu_link_to_aifindr_trigger');
```

## Method 4: Page Builders

### Elementor

1. **Add HTML Widget**
2. **Insert code**:

```html
<button id="ai-findr-trigger" class="elementor-button">
    Need help?
</button>

<script>
// Elementor-specific context
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

### Gutenberg (Block Editor)

1. **Add Custom HTML block**
2. **Insert**:

```html
<div class="wp-block-group">
    <button id="ai-findr-trigger" class="wp-block-button__link">
        How can I help you?
    </button>
</div>
```

### Divi Builder

In a **Code** module:

```html
<button id="ai-findr-trigger" class="et_pb_button">
    Virtual Assistant
</button>
```

## Advanced Usage

### Context by page type

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

### WooCommerce Integration

```php
<?php
// WooCommerce-specific context
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

### Conditional Trigger

```php
<?php
// Show trigger only on specific pages
function conditional_aifindr_trigger() {
    // Only show on product pages, cart or contact
    if (is_product() || is_cart() || is_page('contact')) {
        ?>
        <button id="ai-findr-trigger" class="conditional-help-btn">
            <?php
            if (is_product()) {
                echo 'Questions about the product?';
            } elseif (is_cart()) {
                echo 'Problems with your order?';
            } else {
                echo 'Need help?';
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

## WordPress Troubleshooting

### Common problems

| Problem | Solution |
|----------|----------|
| Widget doesn't appear | Verify the script loads from wp_footer |
| Conflict with other plugins | Use high priority in add_action: `add_action('wp_footer', 'func', 99)` |
| Doesn't work on cached pages | Exclude script from cache or use dynamic fragments |
| Problems with HTTPS | Verify the site uses valid SSL |

### Debug in WordPress

```php
<?php
// Only in debug mode
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

## Next Steps

- [Visual customization](../personalizacion) to adapt theme styles
- [Context and metadata](../contexto-metadatos) for WordPress-specific responses
- [API Reference](../api-reference) for advanced features
