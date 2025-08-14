import { useMemo } from "react";

function PageNumberElement({
  pageNumber,
  isActive,
  onChangePage,
}: {
  pageNumber: number;
  isActive: boolean;
  onChangePage: (pageNumber: number) => void;
}): React.ReactElement {
  let activeClass = "";
  if (isActive) {
    activeClass += "bg-[#313149]/[1]";
  }

  return (
    <div
      className={`py-1 px-3 bg-[#313149]/[0.2] text-sm cursor-pointer rounded-lg ${activeClass} select-none hover:bg-[#313149]/[0.3]`}
      onClick={() => {
        onChangePage(pageNumber);
      }}
    >
      {pageNumber}
    </div>
  );
}

interface PageNavigationProps {
  children?: React.ReactNode;
  maxPage: number;
  currentPage: number;
  reversed?: boolean;
  onChangePage: (pageNumber: number) => void;
}

export function PageNavigation({
  children,
  maxPage,
  onChangePage,
  currentPage,
  reversed,
}: PageNavigationProps) {
  const pagesTruncated = useMemo(() => {
    const totalPages = maxPage;
    const visiblePages = 5;

    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(visiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = visiblePages;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - visiblePages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, maxPage]);

  let styles: any = { borderTop: "1px solid rgb(50, 50, 79)" };
  if (reversed) styles = { borderBottom: "1px solid rgb(50, 50, 79)" };

  return (
    <div
      className="bg-[#1e1e2f]/[.8] p-4 h-14 rounded-lg relative flex flex-row justify-between items-center"
      style={styles}
    >
      <div className="flex flex-row gap-1">
        {pagesTruncated.map((pageNumber) => (
          <PageNumberElement
            pageNumber={pageNumber}
            key={`page-${pageNumber}`}
            isActive={currentPage === pageNumber}
            onChangePage={onChangePage}
          />
        ))}
        <div className="ml-2">
          {currentPage < maxPage - 5 && (
            <PageNumberElement
              pageNumber={maxPage}
              isActive={false}
              onChangePage={onChangePage}
            />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
