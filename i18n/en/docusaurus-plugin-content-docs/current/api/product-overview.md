---
id: product-overview
title: Overview
sidebar_label: Overview
description: Understand what you can build with the AI Findr API before seeing the code.
---

import Card from '@site/src/components/Card';
import { SmartPhone01Icon, PuzzleIcon, CameraMicrophone01Icon, AiSearchIcon } from 'hugeicons-react';

# AI Findr API: Build Custom Experiences

The AI Findr API is designed for teams that want to go beyond the standard widget. It allows you to connect the intelligence of our platform directly with your software, databases, or custom user interfaces.

## Why use the API?

Unlike the Widget, which is a visual "black box," the API delivers raw data (JSON). This means **you have total control of the user experience (UX)**.

### What you can build

<div className="row margin-bottom--lg">
  <div className="col col--6 margin-bottom--lg">
    <Card
      title="Native Mobile Apps"
      description="Integrate a help assistant within your iOS or Android app with your own UI, without using webviews."
      icon={<SmartPhone01Icon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card
      title="Invisible Integrations"
      description="Generate response drafts in your CRM or automatically complete complex forms."
      icon={<PuzzleIcon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card
      title="Voice Interfaces"
      description="Connect the API with Text-to-Speech systems to create intelligent phone assistants."
      icon={<CameraMicrophone01Icon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card
      title="Semantic Search Engines"
      description="Replace your traditional search bar with one that understands questions and gives direct answers."
      icon={<AiSearchIcon size={24} />}
    />
  </div>
</div>

## Core Capabilities

Our API is divided into logical modules that allow you to manage the entire AI lifecycle:

*   **💬 Chat and Conversations:** Send messages and receive responses with context, references, and suggestions.
*   **📊 Analytics:** Extract data about what your users are asking to feed your own BI (Business Intelligence) dashboards.
*   **🧩 Widget Management:** If you use the widget but want to control it programmatically (open/close based on user actions), you can do that too.

## Is it for my team?

| You should use the API if... | Better use the Widget if... |
| :--- | :--- |
| You have a development team available. | You want to launch today. |
| You need a completely customized UI/UX. | A standard, modern chat interface works for you. |
| You're integrating AI in a non-web environment (Mobile, Desktop, IoT). | Your environment is a web page or web application. |

---

**Ready for the technical details?**
Explore the [API Technical Reference](/docs/api/ai-findr-api) to see endpoints, authentication, and code examples.
