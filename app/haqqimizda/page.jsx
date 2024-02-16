import Image from "next/image";

export async function generateMetadata() {
    return {
      title: "Haqqımızda ",
    };
  }
const AboutUs = () => {
  return (
    <>
      <div className="static-page pt-20">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">Haqqımızda</h1>
              <div class="editor-text">
                <div>
                  <p></p>
                  <p>
                    “Report” İnformasiya Agentliyi 2014-cü ildən fəaliyyətə
                    başlayıb. “Global Media Group” holdinqin tərkibinə daxildir.
                    <br />
                    <br />
                    &quot;Report&quot; müstəqil informasiya agentliyi sayt və gündəlik
                    bülletenlər vasitəsi ilə Azərbaycan, rus və ingilis
                    dillərində siyasət, iqtisadiyyat, cəmiyyət, idman,
                    mədəniyyət sahələri üzrə ölkədə və dünyada baş verən ən
                    vacib hadisələri öz oxucularına operativ şəkildə çatdırır. O
                    cümlədən, saytın “Analitika” bölməsində Azərbaycanda və
                    dünyada gedən proseslərlə bağlı analitik materiallar təqdim
                    edilir.
                    <br />
                    <br />
                  </p>
                  <h3>Şirkətimizin siyasəti</h3>
                  <strong>
                    KEYFİYYƏT, ƏMƏYİN VƏ ƏTRAF MÜHİTİN MÜHAFİZƏSİ ÜZRƏ SİYASƏT
                  </strong>
                  <br />
                  Azərbaycan Respublikasında fəaliyyət göstərən operativ və
                  dəqiq məlulmatın təmin edilməsi ilə seçilən «Report
                  İnformasiya Agentliyi» MMC bir informasiya agentliyidir.
                  «Report İnformasiya Agentliyi» MMC olaraq fəaliyyət sahəmizdə
                  ətraf mühitin qorunması və əməyin təhlükəsizliyi önəmli yer
                  tutur.
                  <br />
                  «Report İnformasiya Agentliyi» MMCkeyfiyyət, əməyin
                  təhlükəsizliyi və ətraf mühitin mühafizəsi sahəsində aşağıdakı
                  əsas prinsipləri rəhbər tutur:
                  <br />
                  <br />
                  Beynəlxalq standartların tələblərinə uyğunluğun təmin edilməsi
                  <br />
                  Müasir metodikalardan istifadə etməklə, yüksək keyfiyyətli,
                  təhlükəsiz və tələblərə uyğun xidmətin vaxtında təmin edilməsi
                  və müştəri məmnunluğunun qazanılmasını;
                  <br />
                  Xidmət və ya məhsulun idarəolunması, planlaşdırma və
                  monitorinq metodlarının təkmilləşdirilməsini, infrastrukturun
                  yaxşılaşdırılmasını;
                  <br />
                  Bazarın dəyişikliklərinə çevik uyğunlaşmanın təmin olunmasını
                  və rəqabət qabiliyyətliliyinin artırılmasını;
                  <br />
                  Personalın səriştəliliyinin, təhlükəsizliyinin və qərarların
                  qəbulunda iştirakının təminini;
                  <br />
                  Fəaliyyətdə risk və proses yanaşmasının tətbiqi;
                  <br />
                  Təchizatçılarlar uzunmüddətli və səmərəli münasibətlərin
                  formalaşdırılmasını;
                  <br />
                  Fəaliyyət çərçivəsində yerli qanunvericiliyin tələblərinə
                  riayət edilməsini;
                  <br />
                  Əməyin təhlükəsizliyi və ətraf mühitə təsir amillərinin
                  idarəolunmasını;
                  <br />
                  İstehlakçıların məmnunluğunun və təhlükəsizliyinin təmin
                  olunması idarəetmənin təkmilləşdirilməsini;
                  <br />
                  IMS–nin daimi təkmilləşdirilməsini.
                  <br />
                  <br />
                  <p>
                    <Image
                      src="/images/iso_logo.svg"
                      alt="iso_logo"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "400px",
                        height: "auto",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  </p>
                  <p>
                    27.12.2022-ci il tarixində, &quot;Report.az&quot; xəbər saytı
                    İSO-9001, İSO-14001, İSO-45001 beynəlxalq sertifikatlarına
                    layiq görülmüşdür.
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
