import PanelAdmin from "../../Components/Admin/PanelAdmin/PanelAdmin";
import Footer from "../../Components/footer/index";
import Header from "../../Components/header/index";

function PanelAdminPage() {
  return (
    <>
      <Header />
      <div className="pt-20">
        <PanelAdmin />
      </div>
      <Footer />
    </>
  );
}

export default PanelAdminPage;
