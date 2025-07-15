import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "aifindr/ai-findr-api",
    },
    {
      type: "category",
      label: "AnswerComponent",
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
      label: "Conversation",
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
        {
          type: "doc",
          id: "aifindr/list-lead-conversations",
          label: "List lead conversations",
          className: "api-method get",
        },
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
      label: "Ingestion",
      items: [
        {
          type: "doc",
          id: "aifindr/get-ingestion",
          label: "Get ingestion",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "aifindr/notify-ingestion-completion",
          label: "Notify ingestion completion",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "aifindr/ingest-project-data",
          label: "Ingest project data",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Organization",
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
      label: "Project",
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
          id: "aifindr/regenerate-demo-key",
          label: "Regenerate demo key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "aifindr/get-project-by-demo-key",
          label: "Get project by demo key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "aifindr/get-project-by-slug",
          label: "Get project by slug",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "IngestionSource",
      items: [
        {
          type: "doc",
          id: "aifindr/add-ingestion-source",
          label: "Add ingestion source",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Feedback",
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
    {
      type: "category",
      label: "APIKey",
      items: [
        {
          type: "doc",
          id: "aifindr/create-project-api-key",
          label: "Create project API key",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Analytics",
      items: [
        {
          type: "doc",
          id: "aifindr/get-project-metrics",
          label: "Get project metrics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "aifindr/track-analytics-event",
          label: "Track analytics event",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Tag",
      items: [
        {
          type: "doc",
          id: "aifindr/list-tags",
          label: "List tags",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "aifindr/create-tag",
          label: "Create tag",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "aifindr/delete-tag",
          label: "Delete tag",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "aifindr/update-tag",
          label: "Update tag",
          className: "api-method patch",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
