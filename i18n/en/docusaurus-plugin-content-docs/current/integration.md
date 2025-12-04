---
sidebar_position: 4
title: How to integrate
description: Choose the best integration strategy for your product, from a ready-to-use Widget to a fully flexible API.
sidebar_custom_props:
  icon: Plug01Icon
---

import Card from '@site/src/components/Card';
import ComparisonTable from '@site/src/components/ComparisonTable';
import { ZapIcon, Settings01Icon } from 'hugeicons-react';

# Integration Guide

At AI Findr, we understand that every product is unique. That's why we offer two main paths to integrate our artificial intelligence into your digital ecosystem.

<div className="row margin-bottom--lg" style={{marginTop: '2rem'}}>
  <div className="col col--6 margin-bottom--lg">
    <Card
      title="Web Widget"
      description="The quick option. A pre-built, customizable chat that you can install on your website in 5 minutes."
      to="/docs/widget-config/intro"
      icon={<ZapIcon size={24} />}
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <Card
      title="Custom API"
      description="Total control. Integrate AI Findr's intelligence deeply into your app, backend, or complex workflows."
      to="/docs/api/product-overview"
      icon={<Settings01Icon size={24} />}
    />
  </div>
</div>

## Detailed comparison

Use this guide to decide which strategy best fits your resources and product goals.

<ComparisonTable
  data={[
    {
      feature: "Main Objective",
      widget: "Add AI to your website quickly.",
      api: "Create unique and custom UX experiences."
    },
    {
      feature: "Implementation",
      widget: "No-Code / Low-Code. Copy script.",
      api: "Pro-Code. Requires frontend/backend development."
    },
    {
      feature: "Customization",
      widget: "Visual (colors, logo) from panel.",
      api: "Total. You build the interface from scratch."
    },
    {
      feature: "Maintenance",
      widget: "Managed by AI Findr.",
      api: "You maintain your code and integration."
    },
    {
      feature: "Use cases",
      widget: "Corporate websites, SaaS, Ecommerce.",
      api: "Mobile apps, Voice, Deep integrations."
    }
  ]}
/>
