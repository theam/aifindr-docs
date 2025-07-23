# AI Findr - Documentación

Este repositorio contiene la documentación de la API de AI Findr, construida con [Docusaurus 3](https://docusaurus.io/) y el plugin de OpenAPI docs.

## 🚀 Instalación y configuración inicial

**⚠️ Importante**: Este proyecto requiere **yarn** como gestor de paquetes para evitar problemas de peer dependencies.

```bash
# Clonar el repositorio
git clone <repository-url>
cd my-website

# Instalar dependencias con yarn
yarn install
```

## 🛠️ Desarrollo local

```bash
# Iniciar servidor de desarrollo
yarn start
```

Este comando inicia un servidor local en `http://localhost:3000` y abre automáticamente el navegador. La mayoría de cambios se reflejan en tiempo real sin necesidad de reiniciar el servidor.

## 📝 Actualización de la documentación API

La documentación API se genera automáticamente desde el archivo `swagger.yaml`. Para actualizarla:

### 1. Generar swagger.yaml en el backend

En el repositorio del backend, ejecuta:
```bash
swag init
```

Esto generará el archivo `swagger.yaml` con la documentación más actualizada de la API.

### 2. Actualizar swagger.yaml en este repositorio

1. Copia el archivo `swagger.yaml` generado en el backend
2. Reemplaza el archivo `examples/swagger.yaml` en este repositorio
3. Regenera la documentación (opcional, pero recomendado para ver cambios localmente):

```bash
yarn api-gen
```

**Nota**: El comando `yarn build` ejecuta automáticamente `yarn api-gen` antes del build, por lo que no es estrictamente necesario ejecutarlo manualmente antes de hacer build.

## 📚 Comandos disponibles

```bash
# Desarrollo
yarn start                    # Servidor de desarrollo local

# Documentación API
yarn api-gen                  # Regenerar documentación API desde swagger.yaml
yarn clean-api-docs          # Limpiar documentación API generada

# Build y despliegue
yarn build                    # Construir el sitio estático (incluye api-gen)
yarn serve                    # Servir el build localmente para pruebas

# Utilidades
yarn clear                    # Limpiar cache de Docusaurus
yarn swizzle                  # Personalizar componentes de Docusaurus
```

## 🌐 Despliegue

Este sitio se despliega automáticamente en **Cloudflare Pages**:

- **Trigger**: Cada push a la rama `main`
- **URL de producción**: [aifindr-docs.pages.dev](https://aifindr-docs.pages.dev)
- **Proceso**: Cloudflare ejecuta automáticamente `yarn build` y despliega el contenido generado

### Flujo de actualización típico:

1. Actualizar `swagger.yaml` desde el backend
2. Hacer commit y push a `main`
3. Cloudflare despliega automáticamente los cambios

## 🏗️ Estructura del proyecto

```
my-website/
├── docs/                    # Documentación manual (Markdown)
├── examples/
│   └── swagger.yaml        # Especificación OpenAPI de la API
├── src/                    # Componentes y páginas personalizadas
├── static/                 # Archivos estáticos (imágenes, etc.)
├── docusaurus.config.js    # Configuración de Docusaurus
└── package.json           # Dependencias y scripts
```

## 🔧 Personalización

Para personalizar el sitio:

1. **Configuración general**: Edita `docusaurus.config.js`
2. **Documentación manual**: Añade archivos `.md` en `docs/`
3. **Estilos**: Modifica archivos en `src/css/`
4. **Componentes**: Personaliza componentes en `src/components/`

## 📖 Más información

- [Documentación de Docusaurus](https://docusaurus.io/)
- [Plugin OpenAPI Docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)