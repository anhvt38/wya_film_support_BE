/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        HOST_API: process.env.HOST_API, 
        HOST_API_RANKV21: process.env.HOST_API_RANKV21, 
        HOST_API_API8: process.env.HOST_API_API8, 
        HOST_API_MUPLOAD: process.env.HOST_API_MUPLOAD, 
        HOST_API_PPT: process.env.HOST_API_PPT, 
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET, 
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        HOST_LINK_STATIC: process.env.HOST_LINK_STATIC,
        HOST_API_PREVIEW_VIDEO: process.env.HOST_API_PREVIEW_VIDEO,
        HOST_API_ACCOUNT_ANYGATE: process.env.HOST_API_ACCOUNT_ANYGATE,
        HOST_API_ADC: process.env.HOST_API_ADC,
    },
    images: {
        remotePatterns: [
        {
            protocol: 'http',
            hostname: '192.168.1.3',
            port: '1337',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'static.wyav.tv',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'img.doppiocdn.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'static-cdn.strpst.com',
            port: '',
            pathname: '/**',
        },
        ],
     },
    swcMinify: false,
    webpack: (config) => {
        config.resolve.fallback = {
    
          // if you miss it, all the other options in fallback, specified
          // by next.js will be dropped.
          ...config.resolve.fallback,  
    
          fs: false, // the solution
        };
        
        return config;
      },
}

export default nextConfig
