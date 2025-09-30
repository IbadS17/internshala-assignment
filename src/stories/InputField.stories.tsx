import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputField from "../components/InputField";
import type { InputFieldProps } from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const InputFieldWithState = (args: InputFieldProps) => {
  const [value, setValue] = useState("");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// Basic States
export const Default: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Name",
    placeholder: "Enter your name",
    helperText: "This is a helper text",
    variant: "outlined",
    size: "md",
  },
};

export const Disabled: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Disabled Field",
    placeholder: "Cannot type here",
    disabled: true,
    helperText: "This field is disabled",
  },
};

export const InvalidState: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Email",
    placeholder: "Enter your email",
    invalid: true,
    errorMessage: "Please enter a valid email address",
    variant: "outlined",
  },
};

export const LoadingState: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Loading Field",
    placeholder: "Validating...",
    loading: true,
    helperText: "Please wait while we validate your input",
  },
};

// Variants
export const FilledVariant: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Filled Input",
    placeholder: "Type something",
    variant: "filled",
    helperText: "This is the filled variant",
  },
};

export const OutlinedVariant: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Outlined Input",
    placeholder: "Type something",
    variant: "outlined",
    helperText: "This is the outlined variant",
  },
};

export const GhostVariant: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Ghost Input",
    placeholder: "Type something",
    variant: "ghost",
    helperText: "This is the ghost variant",
  },
};

// Sizes
export const SmallSize: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Small Input",
    placeholder: "Small size input",
    size: "sm",
    helperText: "This is a small sized input",
  },
};

export const MediumSize: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Medium Input",
    placeholder: "Medium size input",
    size: "md",
    helperText: "This is a medium sized input",
  },
};

export const LargeSize: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Large Input",
    placeholder: "Large size input",
    size: "lg",
    helperText: "This is a large sized input",
  },
};

// Special Features
export const PasswordField: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    helperText: "Click the eye icon to toggle visibility",
  },
};

export const ClearButton: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: "Input with Clear Button",
    placeholder: "Type something to see clear button",
    showClearButton: true,
    helperText: "Clear button appears when you type",
  },
};

// Theme Variants
export const LightTheme: Story = {
  render: (args) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="text-gray-900">
        <InputFieldWithState {...args} />
      </div>
    </div>
  ),
  args: {
    label: "Light Theme Input",
    placeholder: "Input in light theme",
    helperText: "This input is styled for light theme",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkTheme: Story = {
  render: (args) => (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
      <InputFieldWithState {...args} />
    </div>
  ),
  args: {
    label: "Dark Theme Input",
    placeholder: "Input in dark theme",
    helperText: "This input is styled for dark theme",
    theme: "dark",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
