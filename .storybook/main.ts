import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        {
            name: "@storybook/addon-essentials",
            options: {
                docs: false
            }
        },
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    }
};
export default config;
