import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { ChevronRight } from "lucide-react";

function CrearUniversal() {
  const { tipo } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-evenly py-40 bg-gray-100 px-6">
    </div>
  );
}

export default CrearUniversal;