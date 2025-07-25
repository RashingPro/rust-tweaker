import { Meta, StoryObj } from "@storybook/react";
import SelectBox from "../react/templates/SelectBox";

const meta = {
    title: "Templates/SelectBox",
    component: SelectBox,
    parameters: {
        layout: "centered"
    },
    args: {
        options: [<>something</>, <>something other</>]
    }
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Up: Story = {
    args: {
        direction: "up"
    }
};

export const NoDefaultSelected: Story = {
    args: {
        defaultSelected: "Please select option..."
    }
};
