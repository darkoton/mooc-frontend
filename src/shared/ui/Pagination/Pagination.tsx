import ReactPaginate, { type ReactPaginateProps } from "react-paginate";
import clsx from "clsx";

import useWindowDimensions from "@shared/hooks/useWindowDimensions";

import s from "./Pagination.module.scss";

function Pagination({ containerClassName, ...otherProps }: ReactPaginateProps) {
  const { sm } = useWindowDimensions();

  return (
    <ReactPaginate
      containerClassName={clsx(s.container, containerClassName)}
      pageLinkClassName={s.pageLink}
      previousLinkClassName={s.previousLink}
      nextLinkClassName={s.nextLink}
      activeLinkClassName={s.activeLink}
      // disabledLinkClassName={s.disabledLink}
      // previousLabel="«"
      // nextLabel="»"
      pageRangeDisplayed={sm ? 1 : 2}
      marginPagesDisplayed={1}
      {...otherProps}
    />
  );
}

export default Pagination;
