import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "./breadcrumbs";
import api from "@/axios-instance";
import { SidebarTrigger } from "./sidebar";
import { UserNav } from "../user-nav";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface BaseData {
  _id: string;
  [key: string]: any;
}

interface Column<T> {
  header: string;
  accessorKey: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T extends BaseData> {
  title: string;
  description: string;
  columns: Column<T>[];
  apiUrl: string;
  showFilters?: boolean;
}

interface ErrorResponse {
  message: string;
}

// Loading skeleton row component
const TableRowSkeleton = ({ columns }: { columns: Column<any>[] }) => (
  <TableRow>
    {columns.map((column, index) => (
      <TableCell key={column.accessorKey}>
        <Skeleton className={index === 0 ? "h-16 w-32" : "h-4 w-full"} />
      </TableCell>
    ))}
  </TableRow>
);

// Empty or error state component
const EmptyOrErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
    <p className="text-lg font-medium text-muted-foreground mb-2">{message}</p>
    <p className="text-sm text-muted-foreground">
      Please try again later or contact support if the problem persists.
    </p>
  </div>
);

export function DataTable<T extends BaseData>({
  title,
  description,
  columns,
  apiUrl,
  showFilters = true,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const fetchData = async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      order,
      ...(search && { search }),
    });
    const response = await api.get(`${apiUrl}?${params.toString()}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [apiUrl, page, limit, sortBy, order, search],
    queryFn: fetchData,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1); // Reset to first page when changing limit
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("desc");
    }
  };

  const renderTableContent = () => {
    if (isLoading) {
      return Array(5)
        .fill(0)
        .map((_, index) => <TableRowSkeleton key={index} columns={columns} />);
    }

    if (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <EmptyOrErrorState
              message={
                axiosError.response?.data?.message ||
                axiosError.message ||
                "Something went wrong while loading data"
              }
            />
          </TableCell>
        </TableRow>
      );
    }

    if (!data?.docs?.length) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <EmptyOrErrorState message="No data found" />
          </TableCell>
        </TableRow>
      );
    }

    return data.docs.map((row: T) => (
      <TableRow key={row._id}>
        {columns.map((column) => (
          <TableCell key={column.accessorKey}>
            {column.cell ? column.cell(row) : row[column.accessorKey]}
          </TableCell>
        ))}
        <TableCell>
          <div className="flex justify-center space-x-2 gap-2">
            <Link
              className="flex items-center gap-1"
              href={`${title?.toLowerCase().replace(" ", "-")}/details/${
                row._id
              }`}
            >
              <Eye className="h-4 w-4" />
              View
            </Link>
            <Link
              className="flex items-center gap-1"
              href={`${title?.toLowerCase().replace(" ", "-")}/edit/${row._id}`}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Link>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex flex-col gap-2">
          <Breadcrumbs />
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </header>
      <main className="h-[calc(100vh-64px)] overflow-auto">
        <div className="h-full flex flex-col p-4">
          <Card className="flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              {title !== "Enquiries" && (
                <div className="pr-6">
                  <Link
                    href={`${title?.toLowerCase().replace(" ", "-")}/create`}
                  >
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add {title}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={`Search ${title}...`}
                    className="w-full pl-8"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                {showFilters && (
                  <div className="flex gap-2">
                    <Select
                      value={sortBy}
                      onValueChange={(value) => handleSort(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        {columns
                          .filter((col) => col.sortable === true)
                          .map((column) => (
                            <SelectItem
                              key={column.accessorKey}
                              value={column.accessorKey}
                            >
                              {column.header}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSort(sortBy)}
                    >
                      {order === "asc" ? "↑" : "↓"}
                    </Button>
                  </div>
                )}
              </div>

              <div className="rounded-md border flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead
                          key={column.accessorKey}
                          className={
                            column.sortable === true ? "cursor-pointer" : ""
                          }
                          onClick={() =>
                            column.sortable === true &&
                            handleSort(column.accessorKey)
                          }
                        >
                          <div className="flex items-center">
                            {column.header}
                            {sortBy === column.accessorKey && (
                              <span className="ml-1">
                                {order === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{renderTableContent()}</TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              {data && (
                <div className="sticky bottom-0 bg-background border-t mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 py-3">
                      <div className="text-sm text-muted-foreground">
                        Showing {data.pagingCounter} to{" "}
                        {Math.min(
                          data.pagingCounter + data.limit - 1,
                          data.totalDocs
                        )}{" "}
                        of {data.totalDocs} entries
                      </div>
                      <Select
                        value={data.limit.toString()}
                        onValueChange={handleLimitChange}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Per page" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 / page</SelectItem>
                          <SelectItem value="25">25 / page</SelectItem>
                          <SelectItem value="50">50 / page</SelectItem>
                          <SelectItem value="100">100 / page</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(data.page - 1)}
                        disabled={!data.hasPrevPage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, data.totalPages) },
                          (_, i) => {
                            const pageNumber = i + 1;
                            return (
                              <Button
                                key={pageNumber}
                                variant={
                                  pageNumber === data.page
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </Button>
                            );
                          }
                        )}
                        {data.totalPages > 5 && (
                          <>
                            <span className="px-2">...</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(data.totalPages)}
                            >
                              {data.totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(data.page + 1)}
                        disabled={!data.hasNextPage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
