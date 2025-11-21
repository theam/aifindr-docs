
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  openApiSidebar: require("./developer_docs/api/sidebar.ts").default
};

export default sidebars;
