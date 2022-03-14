module.exports = {
  "stories": [
    "../common/storybook/stories/**/*.stories.mdx",
    "../common/storybook/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  "typescript": {
    "reactDocgen": false
  }
}