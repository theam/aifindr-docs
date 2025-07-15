import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Client Integration",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Widget",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/get-widget-details",
              label: "Get widget details",
              className: "api-method get",
            },
          ],
        },
        {
          type: "category",
          label: "Chat",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/ask-question",
              label: "Ask question",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "aifindr/create-conversation",
              label: "Create conversation",
              className: "api-method post",
            },
          ],
        },
        {
          type: "category",
          label: "Analytics",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/track-analytics-event",
              label: "Track analytics event",
              className: "api-method post",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Platform Management",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Organizations",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/get-organization",
              label: "Get organization",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "aifindr/update-organization",
              label: "Update organization",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "aifindr/list-organizations",
              label: "List organizations",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "aifindr/create-organization",
              label: "Create organization",
              className: "api-method post",
            },
          ],
        },
        {
          type: "category",
          label: "Projects",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/list-projects",
              label: "List projects",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "aifindr/create-project",
              label: "Create project",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "aifindr/delete-project",
              label: "Delete project",
              className: "api-method delete",
            },
            {
              type: "doc",
              id: "aifindr/get-project",
              label: "Get project",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "aifindr/update-project",
              label: "Update project",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "aifindr/create-project-api-key",
              label: "Create project API key",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "aifindr/get-project-metrics",
              label: "Get project metrics",
              className: "api-method get",
            },
          ],
        },
        {
          type: "category",
          label: "Answer Components",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/delete-answer-component",
              label: "Delete answer component",
              className: "api-method delete",
            },
            {
              type: "doc",
              id: "aifindr/update-answer-component",
              label: "Update answer component",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "aifindr/create-answer-components",
              label: "Create answer components",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "aifindr/get-answer-component",
              label: "Get answer component",
              className: "api-method get",
            },
          ],
        },
        {
          type: "category",
          label: "Conversations",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/get-conversation",
              label: "Get conversation",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "aifindr/update-conversation",
              label: "Update conversation",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "aifindr/create-conversation-summary",
              label: "Create conversation summary",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "aifindr/list-conversations",
              label: "List conversations",
              className: "api-method get",
            },
          ],
        },
        {
          type: "category",
          label: "Feedback",
          link: {
            type: "doc",
            id: "aifindr/ai-findr-api",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "aifindr/list-feedback",
              label: "List feedback",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "aifindr/get-feedback",
              label: "Get feedback",
              className: "api-method get",
            },
          ],
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
