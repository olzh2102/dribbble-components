/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = function withTwin() {
  return (nextConfig) => {
    return {
      ...nextConfig,

      webpack(config, options) {
        config.module = config.module || {};
        config.module.rules.push({
          use: [
            {
              options: {
                plugins: [
                  [
                    require.resolve("babel-plugin-macros"),
                  ],
                ],
              },
            },
          ],
        });

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        } else {
          return config;
        }
      },
    };
  };
};