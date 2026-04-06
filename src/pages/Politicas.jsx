import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  FileText,
  Eye,
  Database,
  RefreshCcw,
} from "lucide-react";
import Header from "../Components/header/index";
import Footer from "../Components/footer/index";

function Politicas() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-20 px-6 flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto">
          <br></br>
          <h1 className="text-4xl font-bold text-center mb-16">
            Política de Privacidad
          </h1>
          <br></br>
          <br></br>
          <div className="grid md:grid-cols-2 gap-10 mx-auto w-6xl"></div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Politicas;