import "./_notFound.scss";
export async function generateMetadata() {
  return {
    title: "Yanlışlıq baş vermişdir!",
  };
}
const NotFound = () => {
  return (
    <>
      <section className="site-error">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="error-content">
                <div className="text-center">
                  <h1 className="error-code">404</h1>
                  <h3 className="error-description">
                    Axtardığınız səhifə tapılmadı
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
