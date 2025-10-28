import { useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { PageNavigationProps } from "@/types/types";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PageNumberElementProps {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
}

function PageNumberElement({
  pageNumber,
  isActive,
  onClick,
}: PageNumberElementProps) {
  return (
    <div
      className={`py-1 px-3 text-sm rounded-lg select-none transition-colors
        ${isActive ? "bg-[#313149]" : "bg-[#313149]/20 hover:bg-blue-500/30"}
      `}
      onClick={onClick}
    >
      {pageNumber}
    </div>
  );
}
export function PageNavigation({
  children,
  navigation,
  onChangePage,
}: PageNavigationProps) {
  const isMobile = useIsMobile();
  const visiblePages = isMobile ? 2 : 5;
  const { maxPage, currentPage } = navigation;

  const pages = useMemo(() => {
    if (maxPage <= visiblePages) {
      return Array.from({ length: maxPage }, (_, i) => i + 1);
    }

    const half = Math.floor(visiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = visiblePages;
    } else if (end > maxPage) {
      end = maxPage;
      start = maxPage - visiblePages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, maxPage]);

  const borderStyle = { border: "1px solid rgba(58, 58, 95, 0.29)" };

  const iconClassName =
    "cursor-pointer hover:scale-90 transition-transform p-1 select-none";

  return (
    <div
      className="bg-[#1e1e2f]/[.5] p-4 h-14 rounded-lg flex flex-row justify-between items-center max-sm:justify-center"
      style={borderStyle}
    >
      <div className="flex flex-row gap-1 items-center">
        {/* First Page */}
        <ChevronsLeft
          className={iconClassName}
          size={26}
          onClick={() => onChangePage(1, navigation)}
        />
        {/* Prev page */}
        <ChevronLeft
          className={iconClassName}
          size={26}
          onClick={() => onChangePage(currentPage - 1, navigation)}
        />
        {/* Page Number */}
        {pages.map((pageNumber) => (
          <PageNumberElement
            key={`page-${pageNumber}`}
            pageNumber={pageNumber}
            isActive={currentPage === pageNumber}
            onClick={() => onChangePage(pageNumber, navigation)}
          />
        ))}
        {/*Max page*/}
        {currentPage < maxPage - visiblePages && !isMobile && (
          <div className="ml-5">
            <PageNumberElement
              pageNumber={maxPage}
              isActive={false}
              onClick={() => onChangePage(maxPage, navigation)}
            />
          </div>
        )}

        {/* Next Page */}
        <ChevronRight
          className={iconClassName}
          size={26}
          onClick={() => onChangePage(currentPage + 1, navigation)}
        />
        {/* Last Page */}
        <ChevronsRight
          className={iconClassName}
          size={26}
          onClick={() => onChangePage(maxPage, navigation)}
        />

        {/*<span className="ml-2 text-sm text-gray-500 tracking-wider">*/}
        {/*  ({currentPage}/{maxPage})*/}
        {/*</span>*/}
      </div>

      {children}
    </div>
  );
}
