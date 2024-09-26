import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation } from "react-query";
import user0Icon from "../assets/User0.svg";
import hideIcon from "../assets/Hide.svg";
import loginIcon from "../assets/Login.svg";
import style from "./ContenedorLogin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setLogin } from "@/store/slices/auth/authSlice";
import insertIcon from "../assets/Intersect.svg";
import { url } from "@/connections/mainApi";

const ContenedorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [started, setStarted] = useState(false);
  const [startEyes, setEyes] = useState(true);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const stationServiceIds = useSelector((state) => state.dataServices) || [];

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Dirección de correo inválida.")
      .required("El correo es un campo requerido."),
    password: Yup.string()
      .required("La contraseña es un campo requerido.")
  });

  const handleSubmit = (values) => {
    dispatch(setLoading(true))
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        dispatch(setLogin(data));
        try {
          const route =
            data.user.role === "root"
              ? "/admin/gestion-grifos"
              : stationServiceIds.length === 0
              ? "/admin/configuracion-servicios"
              : "/admin/";
  
          return navigate(route);
        } catch (error) {
          console.error("Error during navigation:", error);
        }
      },
      onError: () => {
        dispatch(setLoading(false))
      },
    });
  };
  const loginMutation = useMutation((formData) =>
    axios.post(`${url}/auth/login-backoffice`, formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setInvalidCredentials(true);
          throw new Error(error.response.data.message);
        } else {
          throw new Error('An error occurred during login.');
        }
      })
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={style.ContenedorFormulario}>
          <p className={style.p_isesion}>Iniciar sesión</p>

          <div className={style.label}>
            <Field
              id="loginUser"
              className={style.inputUsuario}
              type="text"
              name="email"
              onFocus={() => setStarted(true)}
              onBlur={() => setStarted(false)}
              placeholder=""
              autoComplete="off"
            />
            <span className={style.spanName}>Correo</span>
            <img
              className={style.iconUser}
              src={user0Icon}
              alt="Icono de usuario"
            />
          </div>

          <div className={style.label}>
            <Field
              id="loginPassword"
              className={style.inputContraseña}
              type={startEyes ? "password" : "text"}
              name="password"
              placeholder="Contraseña"
            />
            <img
              className={style.iconHide}
              src={startEyes ? hideIcon : insertIcon}
              alt="Icono de ocultar"
              onClick={() => {
                setEyes(!startEyes);
              }}
            />
          </div>

          {(errors.password || errors.email || invalidCredentials) && (touched.password || touched.email || invalidCredentials) && (
              <div className={style.error_container}>
                {errors.email && touched.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={style.error}
                  />
                )}

                {errors.password && touched.password && (
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={style.error}
                  />
                )}

                {invalidCredentials && (
                  <div className={style.error}>Credenciales inválidas</div>
                )}
              </div>
          )}

          <button className={style.button} type="submit">
            Entrar{" "}
            <img
              className={style.iconLogin}
              src={loginIcon}
              alt="Icono de login"
            />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContenedorLogin;
