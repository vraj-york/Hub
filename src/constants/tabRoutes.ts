/**
 * Browser paths for main app tabs. Corporations / org directory uses /corporations.
 */
export const TAB_TO_PATH: Record<string, string> = {
  dashboard: '/dashboard',
  create: '/create',
  availability: '/availability',
  mom: '/mom',
  'action-items': '/action-items',
  integrations: '/integrations',
  users: '/corporations',
};

export const PATH_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab])
);

export function pathToTab(pathname: string): string | undefined {
  const path = pathname.replace(/\/$/, '') || '/';
  return PATH_TO_TAB[path];
}

export function tabToPath(tab: string): string {
  return TAB_TO_PATH[tab] ?? '/';
}
