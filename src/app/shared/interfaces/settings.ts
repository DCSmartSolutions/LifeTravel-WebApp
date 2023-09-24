export type AppTheme = 'light' | 'dark' | 'auto';

export interface AppSettings {
  navPos: 'side' | 'top';
  dir: 'ltr' | 'rtl';
  theme: AppTheme;
  showHeader: boolean;
  headerPos: 'above' | 'static' | 'fixed';
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'dark',
  showHeader: false,
  headerPos: 'above',
  showUserPanel: false,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
};
