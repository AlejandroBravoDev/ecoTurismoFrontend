//importación de componentes
import Header from "../../Components/header/index";
import Footer from "../../Components/footer/index";
import EditarUniversal from "../../Components/Admin/AdminEditar/EditarUniversal";

//importación de hooks que nos van a ayudar a las validaciones de logeo
import useAuthRedirect from "../../hooks/UseAuthRedirect";
import useAdminRedirect from "../../hooks/UseAdminRedirect";

function AdminEditarPage() {
  //si no es admin, lo envia a la pagina principal
  useAdminRedirect();

  //si no está loggeado, lo envia al loggin
  useAuthRedirect();

  return (
    <>
      <Header />
      <div className="pt-20">
        <EditarUniversal />
      </div>
      <Footer />
    </>
  );
}

export default AdminEditarPage;
