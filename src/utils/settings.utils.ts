import { CSS_VAR_PREFIX } from './css.utils.js';

export type Settings = {
  size: string;
  margin: string;
  format: 'portrait' | 'landscape';
};

export const DEFAULT_SETTINGS: Settings = {
  size: '60', // in pt
  margin: '10', // in mm
  format: 'portrait',
};

export function reflectSettingsAsCssVars(settings: Settings) {
  for (const [name, value] of Object.entries(settings)) {
    document.documentElement.style.setProperty(
      `--${CSS_VAR_PREFIX}-${name}`,
      `${value}`,
    );
  }
}
