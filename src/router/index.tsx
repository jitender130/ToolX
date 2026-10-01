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

// Helper to determine if running under a GitHub Pages subpath like /TOOL-X or /<repo-name>
export const getGitHubPagesBase = (): string => {
  if (typeof window !== 'undefined') {
    // 1. If on *.github.io domain, first path segment is the repository name
    if (window.location.hostname.includes('github.io')) {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        return `/${parts[0]}`;
      }
    }
    // 2. Case-insensitive check for /tool-x or /TOOL-X
    if (window.location.pathname.toLowerCase().startsWith('/tool-x')) {
      const match = window.location.pathname.match(/^\/tool-x/i);
      return match ? match[0] : '/TOOL-X';
    }
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

// Helper to resolve public assets (images, icons) relative to the current base path
export const getPublicAssetUrl = (assetPath: string): string => {
  const clean = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const base = getGitHubPagesBase();
  if (base) {
    return `${base}/${clean}`;
  }
  return `/${clean}`;
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rawPathname, setRawPathname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      // Handle GitHub Pages SPA redirection from 404.html (e.g. ?p=/tools)
      const urlParams = new URLSearchParams(window.location.search);
      const redirectPath = urlParams.get('p');
      if (redirectPath) {
        const base = getGitHubPagesBase();
        const cleanPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
        const targetUrl = `${base}${cleanPath}`;
        
        // Remove 'p' from URL parameters while preserving others
        const cleanSearch = new URLSearchParams(window.location.search);
        cleanSearch.delete('p');
        const searchStr = cleanSearch.toString() ? `?${cleanSearch.toString()}` : '';
        const finalUrl = `${targetUrl}${searchStr}${window.location.hash}`;
        
        window.history.replaceState(null, '', finalUrl);
        return targetUrl;
      }

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
