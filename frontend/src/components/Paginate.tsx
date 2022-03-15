import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface PaginateProps {
  pages: number;
  page: string;
  isAdmin?: boolean;
  keyword?: string;
}

const Paginate: React.FC<PaginateProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) => {
  return (
    <div>
      <Pagination>
        {Array.from({ length: pages }, (_, i) => (
          <LinkContainer
            key={i + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${i + 1}`
                  : `/page/${i + 1} `
                : `/admin/productlist/${i + 1}`
            }
          >
            <Pagination.Item active={i + 1 === Number(page)}>
              {i + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    </div>
  );
};

export default Paginate;
