import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';
import {
  Home01Icon,
  AiBrain01Icon,
  WorkflowSquare01Icon,
  ApiIcon,
  Shield02Icon,
} from 'hugeicons-react';

import styles from './styles.module.css';

const IconMap: Record<string, React.ComponentType<any>> = {
  Home01Icon,
  AiBrain01Icon,
  WorkflowSquare01Icon,
  ApiIcon,
  Shield02Icon,
};

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const {href, label, className, autoAddBaseUrl, customProps} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  
  const iconName = customProps?.icon as string;
  const Icon = iconName && IconMap[iconName] ? IconMap[iconName] : null;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        {Icon && (
          <span className={styles.menuIcon}>
             <Icon size={20} strokeWidth={1.5} />
          </span>
        )}
        <span className={styles.menuLabel}>{label}</span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
