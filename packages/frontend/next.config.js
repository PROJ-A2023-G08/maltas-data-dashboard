/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const { nextI18NextRewrites } = require("next-i18next/rewrites");

module.exports = {
  nextConfig,
  rewrites: async () => nextI18NextRewrites(localePath),
};
