import 'vite';

declare module 'vite' {
  interface ServerOptions {
    // Allow allowedHosts to be a boolean as used in our code
    allowedHosts?: true | string[] | boolean;
  }
}
