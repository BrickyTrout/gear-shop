const CataloguePagination = (props: {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  setPageIndex: (index: number) => void;
}) => {
  const { pageSize, pageIndex, totalCount, setPageIndex } = props;
  const totalPages = Math.ceil(totalCount / pageSize);
  let paginationButtonJsx = [];

  for (let index = 1; index <= totalPages; index++) {
    const stylingClass = `catalogue-pagination__page ${
      pageIndex === index && "catalogue-pagination__page--selected"
    }`;
    paginationButtonJsx.push(
      <button
        className={stylingClass}
        onClick={() => setPageIndex(index)}
        key={index}
      ></button>
    );
  }
  return <div className="catalogue-pagination">{paginationButtonJsx}</div>;
};

export default CataloguePagination;
