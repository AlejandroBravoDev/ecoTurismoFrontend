import PanelAdmin from "../../Components/Admin/PanelAdmin/PanelAdmin";
import Footer from "../../Components/footer/index";
import Header from "../../Components/header/index";
import AuthRedirect from "../../hooks/useAuthRedirect";


function PanelAdminPage() {
  AuthRedirect();
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
