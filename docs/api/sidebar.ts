import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/ai-findr-api",
    },
    {
      type: "category",
      label: "Widget",
      link: {
        type: "doc",
        id: "api/widget",
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/obtener-detalles-del-widget",
          label: "Obtener detalles del widget",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Chat",
      link: {
        type: "doc",
        id: "api/chat",
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/hacer-pregunta",
          label: "Hacer pregunta",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/crear-conversacion",
          label: "Crear conversación",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Analytics",
      link: {
        type: "doc",
        id: "api/analytics",
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/registrar-evento-analitico",
          label: "Registrar evento analítico",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/obtener-detalle-de-una-conversacion",
          label: "Obtener detalle de una conversación",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/obtener-analitica-del-proyecto",
          label: "Obtener analítica del proyecto",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/listar-conversaciones-del-proyecto",
          label: "Listar conversaciones del proyecto",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Answer Components",
      link: {
        type: "doc",
        id: "api/answer-components",
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/obtener-componente-de-respuesta",
          label: "Obtener componente de respuesta",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
