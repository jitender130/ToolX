import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  pathname: string;
  rawPathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  rawPathname: '/',
  navigate: () => {},
});

// Helper to determine if running under a GitHub Pages subpath like /TOOL-X
export const getGitHubPagesBase = (): string => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/TOOL-X')) {
    return '/TOOL-X';
  }
  return '';
};

// Strips the GitHub Pages base path to return clean logical route path (e.g., /tools)
export const normalizePath = (fullPath: string): string => {
  const base = getGitHubPagesBase();
  if (base && fullPath.startsWith(base)) {
    const stripped = fullPath.slice(base.length);
    return stripped === '' || stripped === '/' ? '/' : stripped;
  }
  return fullPath || '/';
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rawPathname, setRawPathname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const pathname = normalizePath(rawPathname);

  useEffect(() => {
    const handlePopState = () => {
      setRawPathname(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const base = getGitHubPagesBase();
    const targetUrl = base && to.startsWith('/') && !to.startsWith(base) ? `${base}${to}` : to;

    if (targetUrl === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState(null, '', targetUrl);
    setRawPathname(targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, rawPathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, className, children, onClick, ...props }) => {
  const { navigate } = useRouter();
  const base = getGitHubPagesBase();
  const href = base && to.startsWith('/') && !to.startsWith(base) ? `${base}${to}` : to;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    // Don't intercept ctrl/cmd clicks or external links
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
      return;
    }
    if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export function updatePageSeo(title: string, description: string, canonicalPath?: string) {
  if (typeof document === 'undefined') return;
  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (linkCanonical && canonicalPath) {
    const isGhPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    const baseUrl = isGhPages ? 'https://jitender130.github.io/TOOL-X' : (typeof window !== 'undefined' ? window.location.origin : 'https://jitender130.github.io/TOOL-X');
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    linkCanonical.setAttribute('href', `${baseUrl}${cleanPath === '/' ? '/' : cleanPath}`);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `${baseUrl}${cleanPath === '/' ? '/' : cleanPath}`);
    }
  }
}
