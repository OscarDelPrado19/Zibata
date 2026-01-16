/**
 * Constants for tab bar configuration
 * Centralized color palette for better maintainability
 */

export const TabBarConfig = {
  colors: {
    light: {
      background: '#FFFFFF',
      border: '#E5E7EB',
    },
    dark: {
      background: '#1F2937',
      border: '#374151',
    },
  },
  dimensions: {
    height: 70,
    paddingTop: 4,
    paddingBottom: 4,
    iconSize: 26,
  },
  shadows: {
    light: {
      shadowColor: '#000000',
      shadowOpacity: 0.1,
    },
    dark: {
      shadowColor: '#000000',
      shadowOpacity: 0.3,
    },
  },
} as const;

export const TextConfig = {
  tabLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    marginTop: 2,
    letterSpacing: 0.3,
  },
} as const;
