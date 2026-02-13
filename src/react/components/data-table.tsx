import * as React from "react";
import { Checkbox } from "./checkbox";
import { Table } from "./table";

type DataTableRow = Record<string, unknown>;
type DataTableRowId = string | number;

export type DataTableSortDirection = "asc" | "desc";
export type DataTableAlign = "left" | "center" | "right";

export interface DataTableColumn {
  key: string;
  header: React.ReactNode;
  render?: (row: DataTableRow, value: unknown) => React.ReactNode;
  sortable?: boolean;
  align?: DataTableAlign;
  width?: React.CSSProperties["width"];
  className?: string;
  customHeaderRender?: () => React.ReactNode;
}

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: DataTableRow[];
  columns?: DataTableColumn[];
  selectable?: boolean;
  selectedRows?: DataTableRowId[];
  onSelectionChange?: (selectedRows: DataTableRowId[]) => void;
  sortable?: boolean;
  defaultSortKey?: string | null;
  defaultSortDir?: DataTableSortDirection;
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  emptyMessage?: string;
  onRowClick?: (row: DataTableRow) => void;
  getRowId?: (row: DataTableRow, index: number) => DataTableRowId;
  variant?: "default" | "striped" | "bordered";
}

const SORT_ICON_STYLE: React.CSSProperties = { opacity: 0.3 };

const iconStyles: React.CSSProperties = {
  display: "inline-flex",
  width: 14,
  height: 14,
  flexShrink: 0,
};

const SortNeutralIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ ...iconStyles, ...SORT_ICON_STYLE }}>
    <path d="M4 5L7 2L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 9L7 12L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SortAscIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" style={iconStyles}>
    <path d="M4 8L7 5L10 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SortDescIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" style={iconStyles}>
    <path d="M10 6L7 9L4 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LeftChevronIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ width: 16, height: 16 }}>
    <path d="M9.5 3.5L5 8L9.5 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightChevronIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ width: 16, height: 16 }}>
    <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyStateIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ width: 32, height: 32 }}>
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <path
      d="M24 31.5V31.75M24 16.5C21.7 16.5 20 18 20 20C20 21.5 20.9 22.6 22.1 23.3C23.1 23.9 24 24.6 24 26"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function resolveValue(row: DataTableRow, key: string): unknown {
  return row[key];
}

function compareValues(aVal: unknown, bVal: unknown): number {
  if (aVal === bVal) return 0;
  if (aVal === null || aVal === undefined) return 1;
  if (bVal === null || bVal === undefined) return -1;

  if (typeof aVal === "number" && typeof bVal === "number") {
    return aVal < bVal ? -1 : 1;
  }

  const aText = String(aVal).toLowerCase();
  const bText = String(bVal).toLowerCase();
  if (aText === bText) return 0;
  return aText < bText ? -1 : 1;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      data = [],
      columns = [],
      selectable = false,
      selectedRows = [],
      onSelectionChange,
      sortable = false,
      defaultSortKey = null,
      defaultSortDir = "asc",
      pagination = false,
      pageSize = 10,
      currentPage: controlledPage,
      onPageChange,
      loading = false,
      isLoading = false,
      emptyState,
      emptyMessage,
      onRowClick,
      getRowId = (row, index) =>
        (row.id as DataTableRowId | undefined) ??
        (row._id as DataTableRowId | undefined) ??
        index,
      variant = "default",
      className = "",
      style = {},
      ...props
    },
    ref
  ) => {
    const isBusy = loading || isLoading;
    const [sortKey, setSortKey] = React.useState<string | null>(defaultSortKey);
    const [sortDir, setSortDir] = React.useState<DataTableSortDirection>(defaultSortDir);
    const [internalPage, setInternalPage] = React.useState(1);

    const sortedData = React.useMemo(() => {
      if (!sortKey || !sortable) return data;
      return [...data].sort((a, b) => {
        const aVal = resolveValue(a, sortKey);
        const bVal = resolveValue(b, sortKey);
        const result = compareValues(aVal, bVal);
        return sortDir === "asc" ? result : -result;
      });
    }, [data, sortKey, sortDir, sortable]);

    const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
    const page = controlledPage !== undefined ? controlledPage : internalPage;

    const paginatedData = React.useMemo(() => {
      if (!pagination) return sortedData;
      const start = (page - 1) * pageSize;
      return sortedData.slice(start, start + pageSize);
    }, [sortedData, pagination, page, pageSize]);

    const setPage = (nextPage: number) => {
      const clamped = Math.max(1, Math.min(nextPage, totalPages));
      if (controlledPage !== undefined) {
        onPageChange?.(clamped);
      } else {
        setInternalPage(clamped);
      }
    };

    const getPageRowId = (row: DataTableRow, index: number): DataTableRowId =>
      getRowId(row, index);

    const pageRowIds = paginatedData.map(getPageRowId);
    const allSelected =
      pageRowIds.length > 0 && pageRowIds.every((rowId) => selectedRows.includes(rowId));
    const someSelected = pageRowIds.some((rowId) => selectedRows.includes(rowId));

    const handleSort = (key: string) => {
      if (!sortable) return;
      if (sortKey === key) {
        setSortDir(sortDir === "asc" ? "desc" : "asc");
        return;
      }
      setSortKey(key);
      setSortDir("asc");
    };

    const handleSelectAll = (checked: boolean) => {
      if (!onSelectionChange) return;
      if (checked) {
        onSelectionChange([...new Set([...selectedRows, ...pageRowIds])]);
        return;
      }
      onSelectionChange(selectedRows.filter((rowId) => !pageRowIds.includes(rowId)));
    };

    const handleSelectRow = (rowId: DataTableRowId, checked: boolean) => {
      if (!onSelectionChange) return;
      if (checked) {
        onSelectionChange([...selectedRows, rowId]);
        return;
      }
      onSelectionChange(selectedRows.filter((id) => id !== rowId));
    };

    const containerStyles: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      background: "var(--color-bg-primary, hsl(var(--cz-color-bg)))",
      borderRadius: "var(--radius-card, var(--cz-radius-lg))",
      border: "1px solid var(--color-border-primary, hsl(var(--cz-color-border)))",
      boxShadow: "var(--shadow-card, var(--cz-shadow-sm))",
      overflow: "hidden",
      ...style,
    };

    const headerCellStyles = (column: DataTableColumn): React.CSSProperties => ({
      padding: "var(--spacing-3, 0.75rem) var(--spacing-4, 1rem)",
      textAlign: column.align || "left",
      fontWeight: "var(--font-weight-medium, var(--cz-font-weight-medium))",
      color: "var(--table-header-text, var(--color-text-muted, hsl(var(--cz-color-mutedFg))))",
      fontSize: "var(--font-size-xs, var(--cz-font-size-xs))",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      cursor: sortable && column.sortable !== false ? "pointer" : "default",
      userSelect: sortable && column.sortable !== false ? "none" : "auto",
      width: column.width,
      borderBottom: "1px solid var(--color-border-primary, var(--cz-table-border-color))",
    });

    const bodyCellStyles = (align: DataTableAlign = "left"): React.CSSProperties => ({
      padding: "var(--spacing-3-5, 0.875rem) var(--spacing-4, 1rem)",
      textAlign: align,
      color: "var(--color-text-body, hsl(var(--cz-color-fg)))",
      verticalAlign: "middle",
      lineHeight: "1.5",
      fontSize: "var(--font-size-sm, var(--cz-font-size-sm))",
      borderBottom: "1px solid var(--color-border-light, var(--cz-table-border-color))",
    });

    const renderSortIcon = (key: string): React.ReactNode => {
      if (sortKey !== key) return <SortNeutralIcon />;
      if (sortDir === "asc") {
        return <span style={{ color: "var(--color-primary, hsl(var(--cz-color-primary)))" }}><SortAscIcon /></span>;
      }
      return <span style={{ color: "var(--color-primary, hsl(var(--cz-color-primary)))" }}><SortDescIcon /></span>;
    };

    const tableClassName = variant === "striped" ? "cz-table-striped" : "";

    const pageButtonStyles = (disabled: boolean): React.CSSProperties => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      borderRadius: "var(--radius-md, var(--cz-radius-md))",
      background: "transparent",
      border: "1px solid transparent",
      color: disabled
        ? "var(--color-text-disabled, hsl(var(--cz-color-mutedFg)))"
        : "var(--color-text-body, hsl(var(--cz-color-fg)))",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "all var(--transition-fast, var(--cz-transition-fast))",
    });

    if (isBusy) {
      return (
        <div ref={ref} className={className} style={containerStyles} {...props}>
          <Table className={tableClassName}>
            <Table.Header>
              <Table.Row>
                {selectable && <Table.Head style={{ width: 48 }} />}
                {columns.map((column) => (
                  <Table.Head key={column.key} style={headerCellStyles(column)}>
                    {column.header}
                  </Table.Head>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <Table.Row key={`loading-${rowIndex}`}>
                  {selectable && (
                    <Table.Cell style={bodyCellStyles()}>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          background:
                            "linear-gradient(90deg, var(--color-bg-tertiary, hsl(var(--cz-color-muted))) 25%, var(--color-bg-hover, hsl(var(--cz-color-muted)/0.5)) 50%, var(--color-bg-tertiary, hsl(var(--cz-color-muted))) 75%)",
                          backgroundSize: "200% 100%",
                          animation: "czDataTableShimmer 1.5s infinite",
                        }}
                      />
                    </Table.Cell>
                  )}
                  {columns.map((column, columnIndex) => (
                    <Table.Cell key={`${column.key}-${columnIndex}`} style={bodyCellStyles(column.align)}>
                      <div
                        style={{
                          width: `${40 + ((rowIndex + columnIndex * 7) % 40)}%`,
                          height: 16,
                          borderRadius: "var(--radius-sm, var(--cz-radius-sm))",
                          background:
                            "linear-gradient(90deg, var(--color-bg-tertiary, hsl(var(--cz-color-muted))) 25%, var(--color-bg-hover, hsl(var(--cz-color-muted)/0.5)) 50%, var(--color-bg-tertiary, hsl(var(--cz-color-muted))) 75%)",
                          backgroundSize: "200% 100%",
                          animation: "czDataTableShimmer 1.5s infinite",
                        }}
                      />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <style>
            {`
              @keyframes czDataTableShimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}
          </style>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div ref={ref} className={className} style={containerStyles} {...props}>
          {emptyState || (
            <div
              style={{
                padding: "var(--spacing-16, 4rem) var(--spacing-6, 1.5rem)",
                textAlign: "center",
                color: "var(--color-text-muted, hsl(var(--cz-color-mutedFg)))",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--spacing-4, 1rem)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--color-bg-secondary, hsl(var(--cz-color-muted)))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-text-placeholder, hsl(var(--cz-color-mutedFg)))",
                }}
              >
                <EmptyStateIcon />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-1, 0.25rem)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-md, var(--cz-font-size-md))",
                    fontWeight: "var(--font-weight-medium, var(--cz-font-weight-medium))",
                    color: "var(--color-text-secondary, hsl(var(--cz-color-fg)))",
                  }}
                >
                  No Data Found
                </span>
                <span style={{ fontSize: "var(--font-size-sm, var(--cz-font-size-sm))", maxWidth: 300 }}>
                  {emptyMessage || "There are no records to display at this time."}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={className} style={containerStyles} {...props}>
        <Table className={tableClassName}>
          <Table.Header>
            <Table.Row>
              {selectable && (
                <Table.Head style={{ width: 48, ...headerCellStyles({ key: "select", header: "" }) }}>
                  <Checkbox
                    checked={someSelected && !allSelected ? "indeterminate" : allSelected}
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                  />
                </Table.Head>
              )}
              {columns.map((column) => (
                <Table.Head
                  key={column.key}
                  className={column.className}
                  style={headerCellStyles(column)}
                  onClick={() => {
                    if (sortable && column.sortable !== false) {
                      handleSort(column.key);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--spacing-2, 0.5rem)",
                      justifyContent:
                        column.align === "right"
                          ? "flex-end"
                          : column.align === "center"
                            ? "center"
                            : "flex-start",
                    }}
                  >
                    {column.customHeaderRender ? column.customHeaderRender() : column.header}
                    {sortable && column.sortable !== false && renderSortIcon(column.key)}
                  </div>
                </Table.Head>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedData.map((row, index) => {
              const rowId = getPageRowId(row, index);
              const isSelected = selectedRows.includes(rowId);
              return (
                <Table.Row
                  key={String(rowId)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  style={{
                    cursor: onRowClick ? "pointer" : "default",
                    background: isSelected
                      ? "var(--color-primary-bg, hsl(var(--cz-color-primary) / 0.12))"
                      : undefined,
                  }}
                >
                  {selectable && (
                    <Table.Cell style={bodyCellStyles()} onClick={(event) => event.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectRow(rowId, checked === true)}
                      />
                    </Table.Cell>
                  )}
                  {columns.map((column) => (
                    <Table.Cell
                      key={`${String(rowId)}-${column.key}`}
                      className={column.className}
                      style={bodyCellStyles(column.align)}
                    >
                      {column.render
                        ? column.render(row, resolveValue(row, column.key))
                        : (resolveValue(row, column.key) as React.ReactNode)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        {pagination && totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--spacing-3, 0.75rem) var(--spacing-4, 1rem)",
              background: "var(--color-bg-primary, hsl(var(--cz-color-bg)))",
              borderTop: "1px solid var(--color-border-light, var(--cz-table-border-color))",
              fontSize: "var(--font-size-sm, var(--cz-font-size-sm))",
              color: "var(--color-text-muted, hsl(var(--cz-color-mutedFg)))",
            }}
          >
            <span style={{ color: "var(--color-text-body, hsl(var(--cz-color-fg)))" }}>
              Showing <strong>{(page - 1) * pageSize + 1}</strong>-
              <strong>{Math.min(page * pageSize, sortedData.length)}</strong> of{" "}
              <strong>{sortedData.length}</strong>
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2, 0.5rem)" }}>
              <button
                type="button"
                style={pageButtonStyles(page <= 1)}
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
              >
                <LeftChevronIcon />
              </button>
              <button
                type="button"
                style={pageButtonStyles(page >= totalPages)}
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                aria-label="Next page"
              >
                <RightChevronIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
