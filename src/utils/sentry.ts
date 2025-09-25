import * as Sentry from '@sentry/browser';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || '';

export const initSentry = () => {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
  });

  console.log('Sentry initialized for error tracking');
};

export const logError = (error: Error, context?: Record<string, any>) => {
  console.error('Logging error to Sentry:', error, context);

  Sentry.withScope((scope: Sentry.Scope) => {
    if (context) {
      Object.keys(context).forEach((key) => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureException(error);
  });
};

export const logMessage = (message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, any>) => {
  console.log(`[${level.toUpperCase()}] ${message}`, context);

  Sentry.withScope((scope: Sentry.Scope) => {
    if (context) {
      Object.keys(context).forEach((key) => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureMessage(message, level);
  });
};

export const setUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value);
};

export const addBreadcrumb = (message: string, category?: string, level?: Sentry.SeverityLevel) => {
  Sentry.addBreadcrumb({
    message,
    category: category || 'custom',
    level: level || 'info',
  });
};