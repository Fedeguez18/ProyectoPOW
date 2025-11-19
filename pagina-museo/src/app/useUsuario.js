// en /context/useUsuario.ts
import { useContext } from "react";
import { UsuarioContext } from "./usuarioContext";

export const useUsuario = () => useContext(UsuarioContext);
