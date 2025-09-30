import React, { useState } from "react";
import classNames from "classnames";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRowSelection = (row: T) => {
    let newSelection = [];
    if (selectedRows.includes(row)) {
      newSelection = selectedRows.filter((r) => r !== row);
    } else {
      newSelection = selectable ? [...selectedRows, row] : [row];
    }
    setSelectedRows(newSelection);
    if (onRowSelect) {
      onRowSelect(newSelection);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            {selectable && (
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows([...sortedData]);
                      if (onRowSelect) onRowSelect([...sortedData]);
                    } else {
                      setSelectedRows([]);
                      if (onRowSelect) onRowSelect([]);
                    }
                  }}
                  checked={
                    selectedRows.length === sortedData.length &&
                    sortedData.length > 0
                  }
                  ref={(input) => {
                    if (input) {
                      input.indeterminate =
                        selectedRows.length > 0 &&
                        selectedRows.length < sortedData.length;
                    }
                  }}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={classNames(
                  "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  col.sortable &&
                    "cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                )}
                onClick={() =>
                  col.sortable &&
                  setSortConfig({
                    key: col.dataIndex,
                    direction:
                      sortConfig?.key === col.dataIndex &&
                      sortConfig.direction === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                <div className="flex items-center space-x-1">
                  <span>{col.title}</span>
                  {col.sortable && (
                    <span className="ml-2 text-gray-400">
                      {sortConfig?.key === col.dataIndex ? (
                        sortConfig.direction === "asc" ? (
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-12 text-center text-gray-500"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-sm font-medium">Loading data...</span>
                </div>
              </td>
            </tr>
          ) : !data.length ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-12 text-center"
              >
                <div className="flex flex-col items-center space-y-2">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-500">
                    No data available
                  </span>
                  <span className="text-xs text-gray-400">
                    There are no records to display
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={row.id}
                className={classNames(
                  "hover:bg-gray-50 transition-colors duration-150 ease-in-out",
                  selectedRows.includes(row) && "bg-blue-50 hover:bg-blue-100",
                  index % 2 === 0 ? "bg-white" : "bg-gray-25"
                )}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRowSelection(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {String(row[col.dataIndex])}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
