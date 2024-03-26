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
    paginationButtonJsx.push(
      <button
        className="catalogue-pagination__page"
        onClick={() => setPageIndex(index)}
        key={index}
      >
        {index}
      </button>
    );
  }
  return <div className="catalogue-pagination">{paginationButtonJsx}</div>;
};

export default CataloguePagination;
