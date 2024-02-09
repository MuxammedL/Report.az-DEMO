const SubCategoryPage = async ({ params }) => {
  const { subCat } = params;
  console.log(subCat)
  return (
    <>
      <div className="container">
        <h2>{subCat}</h2>
      </div>
    </>
  );
};

export default SubCategoryPage;
