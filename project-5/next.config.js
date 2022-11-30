/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    // Allow importing of shader files (e.g. `.glsl` -- filenames below)
    // @see: https://github.com/glslify/glslify-loader
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag|ps)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "de", "ru"],
    defaultLocale: "en",
  },
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin", "cyrillic"] },
      },
    ],
  },
};

module.exports = nextConfig;
