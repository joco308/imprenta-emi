import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FigmaAssetResolver {
  constructor(source) {
    this.source = source;
  }
  apply(resolver) {
    resolver
      .getHook('resolve')
      .tapAsync('FigmaAssetResolver', (request, _resolveContext, callback) => {
        if (request.request && request.request.startsWith('figma:asset/')) {
          const filename = request.request.replace('figma:asset/', '');
          request.request = path.resolve(this.source, filename);
        }
        callback();
      });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new FigmaAssetResolver(path.resolve(__dirname, 'src/assets'))
    );
    return config;
  },
};

export default nextConfig;
