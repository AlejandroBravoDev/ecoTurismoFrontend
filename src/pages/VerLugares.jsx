import VerLugares from "./components/verLugares/verLugares";
import useAuthRedirect from "../hooks/UseAuthRedirect";

function verLugares() {
  useAuthRedirect();
  return (
    <>
      <VerLugares />
    </>
  );
}

export default verLugares;
