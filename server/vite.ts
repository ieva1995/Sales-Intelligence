import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { 
      server,
      timeout: 60000,
      port: 24678,
      protocol: 'ws',
      host: '0.0.0.0',
      clientPort: 443,
      path: '/hmr/',
      reconnect: true,
      maxRetries: 20,
      heartbeat: 3000
    },
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 1000,
        useFsEvents: false,
        ignored: ['**/node_modules/**', '**/.git/**']
      },
      fs: {
        strict: false,
        allow: ['.']
      },
      hmr: {
        overlay: true,
        errorOverlay: true
      }
    },
    optimizeDeps: {
      force: true
    },
    allowedHosts: true
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      ...serverOptions,
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0',
        port: 24678,
        clientPort: 443,
        timeout: 120000,
        maxRetries: 10,
        overlay: false
      },
      watch: {
        usePolling: true,
        interval: 1000,
        useFsEvents: false
      }
    },
    appType: "custom",
  });

  app.use((req, res, next) => {
    if (req.url.includes('/@vite/client') || req.url.includes('hmr')) {
      res.set('Cache-Control', 'no-store');
    }
    next();
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../dist");
  const indexPath = path.resolve(distPath, "index.html");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Index file not found');
    }
  });
}