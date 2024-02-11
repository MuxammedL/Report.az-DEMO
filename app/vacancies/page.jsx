export async function generateMetadata() {
  return {
    title: "Vakansiyalar",
  };
}
const Vacancies = () => {
  return (
    <>
      <div className="static-page pt-20">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">Vakansiyalar</h1>
              <div className="editor-text">
                <div>
                  <p>Hal-hazırda aktiv vakansiya yoxdur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vacancies;
