import EditarUsuario from "../../Components/Admin/AdminUsuarios/EditarUsuario";
import Header from "../../Components/header/index.jsx";
import Footer from "../../Components/footer/index.jsx";
import useAdminRedirect from "../../hooks/UseAdminRedirect.jsx";
import AuthRedirect from "../../hooks/UseAuthRedirect.jsx";

const EditarUsuarioPage = () => {
  AuthRedirect();
  useAdminRedirect();
  return (
    <div>
      <Header />
      <div className="pt-20">
        <EditarUsuario />
      </div>
      <Footer />
    </div>
  );
};

export default EditarUsuarioPage;
