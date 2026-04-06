import FaqEcoturismo from "../Components/PreguntasFrecuentes/PreguntasFrecuentes";
import Header from "../Components/header/index";
import Footer from "../Components/footer/index";

function preguntasFrecuentesPage() {
  return (
    <>
      <Header />
      <FaqEcoturismo className="pt-20" />
      <Footer />
    </>
  );
}

export default preguntasFrecuentesPage;
