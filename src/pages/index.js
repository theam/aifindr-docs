import React from 'react';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
  const {i18n: {currentLocale, defaultLocale}} = useDocusaurusContext();
  const isDefaultLocale = currentLocale === defaultLocale;
  const path = isDefaultLocale ? '/docs/intro' : `/${currentLocale}/docs/intro`;
  return <Redirect to={path} />;
}
