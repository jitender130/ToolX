import React from 'react';
import { Link } from '../../router';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            to="/"
            itemProp="item"
            className="hover:text-emerald-600 transition-colors"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="text-slate-400">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {item.path && !isLast ? (
                  <Link
                    to={item.path}
                    itemProp="item"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    itemProp="name"
                    className="text-slate-900 font-medium"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(position)} />
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
