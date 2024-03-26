const bundleAnalyzer = require('@next/bundle-analyzer');
const buildCmsConfig = require('./scripts/build-cms-config.js');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

buildCmsConfig();

module.exports = withBundleAnalyzer({ ...nextConfig });
