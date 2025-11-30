"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors ${
          currentPage <= 1 ? "pointer-events-none opacity-50" : ""
        }`}
        aria-disabled={currentPage <= 1}
      >
        <FaChevronLeft className="text-gray-600" />
      </Link>

      <div className="flex items-center space-x-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;
          return (
            <Link
              key={page}
              href={createPageURL(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                isCurrent
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors ${
          currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <FaChevronRight className="text-gray-600" />
      </Link>
    </div>
  );
};

export default Pagination;
