import { useState } from "react";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

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

function App() {
  const [name, setName] = useState("");

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">InputField Demo</h1>
      <InputField
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        helperText="Type your full name"
        variant="outlined"
        size="md"
        showClearButton
      />

      <h1 className="text-2xl font-bold my-4">DataTable Demo</h1>
      <DataTable data={data} columns={columns} selectable />
    </div>
  );
}

export default App;
