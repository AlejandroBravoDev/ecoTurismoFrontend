import AdminUsuarios from "../../Components/Admin/PanelAdmin/AdminUsuarios";
import Footer from "../../Components/footer/index";
import Header from "../../Components/header/index";
import AuthRedirect from "../../hooks/useAuthRedirect";
import AuthAdminRedirect from "../../hooks/UseAdminRedirect";

function AdminUsuariosPage() {
  AuthRedirect();
  AuthAdminRedirect();
  return (
    <>
      <Header />
      <div className="pt-20">
        <AdminUsuarios />
      </div>
      <Footer />
    </>
  );
}

export default AdminUsuariosPage;