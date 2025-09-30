import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "../components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

const meta: Meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<Meta>;

export const Default: Story = {
  args: { data, columns },
};

export const Selectable: Story = {
  args: { data, columns, selectable: true },
};

export const Loading: Story = {
  args: { data: [], columns, loading: true },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state shows table headers with a loading spinner and message in the table body.",
      },
    },
  },
};

export const Empty: Story = {
  args: { data: [], columns },
  parameters: {
    docs: {
      description: {
        story:
          'Empty state shows table headers with a "No data available" message in the table body.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default with Data</h3>
        <DataTable data={data} columns={columns} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Loading State</h3>
        <DataTable data={[]} columns={columns} loading={true} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Empty State</h3>
        <DataTable data={[]} columns={columns} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selectable with Data</h3>
        <DataTable data={data} columns={columns} selectable={true} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selectable Loading State</h3>
        <DataTable
          data={[]}
          columns={columns}
          loading={true}
          selectable={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selectable Empty State</h3>
        <DataTable data={[]} columns={columns} selectable={true} />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Comprehensive showcase of all DataTable states and variations.",
      },
    },
  },
};
