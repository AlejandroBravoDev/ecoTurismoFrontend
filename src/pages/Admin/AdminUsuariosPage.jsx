import AdminUsuarios from "../../Components/Admin/AdminUsuarios/AdminUsuarios";
import Footer from "../../Components/footer/index";
import Header from "../../Components/header/index";
import AuthRedirect from "../../hooks/UseAuthRedirect";
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
