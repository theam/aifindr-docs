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
              id: "api/get-widget-details",
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
            id: "api/chat",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/ask-question",
              label: "Ask question",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/create-conversation",
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
            id: "api/analytics",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/track-analytics-event",
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
          type: "doc",
          id: "api/ai-findr-api",
        },
        {
          type: "category",
          label: "Organizations",
          link: {
            type: "doc",
            id: "api/organizations",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/get-organization",
              label: "Get organization",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/update-organization",
              label: "Update organization",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "api/list-organizations",
              label: "List organizations",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/create-organization",
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
            id: "api/projects",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/list-projects",
              label: "List projects",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/create-project",
              label: "Create project",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/delete-project",
              label: "Delete project",
              className: "api-method delete",
            },
            {
              type: "doc",
              id: "api/get-project",
              label: "Get project",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/update-project",
              label: "Update project",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "api/create-project-api-key",
              label: "Create project API key",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/get-project-metrics",
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
            id: "api/answer-components",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/delete-answer-component",
              label: "Delete answer component",
              className: "api-method delete",
            },
            {
              type: "doc",
              id: "api/update-answer-component",
              label: "Update answer component",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "api/create-answer-components",
              label: "Create answer components",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/get-answer-component",
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
            id: "api/conversations",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/get-conversation",
              label: "Get conversation",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/update-conversation",
              label: "Update conversation",
              className: "api-method patch",
            },
            {
              type: "doc",
              id: "api/create-conversation-summary",
              label: "Create conversation summary",
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/list-conversations",
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
            id: "api/feedback",
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/list-feedback",
              label: "List feedback",
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/get-feedback",
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
