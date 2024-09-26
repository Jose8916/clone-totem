import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "../RegisterForm.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { useMutation } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";

const RegisterAdmin = () => {
  const initialValues = {
    email: "",
    password: "",
    dni: "",
    role: "admin",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Dirección de correo inválida")
      .required("Campo requerido"),
    password: Yup.string()
      .required("Campo requerido")
      .matches(
        /^(?=.*[A-Z])(?=.*\d).*$/,
        "La contraseña debe contener al menos una mayúscula y un número"
      ),
    dni: Yup.string().nullable(),
    role: Yup.string().required("Campo requerido"),
  });

  const toastRef = useRef(null);

  const handleSubmit = async (values) => {
    try {
     
      const response = await axios.post(
        "https://e-totem-back-production.up.railway.app/api/auth/register",
        values
      );
  
      showToastMessage("success", "Registro exitoso");
    } catch (error) {
      if (error.response.data.message === "Este email ya existe"){
        return showToastMessage("error", "Este Email ya existe");
      }
    }
  };

  const registerMutation = useMutation(handleSubmit);

  const handleRegister = () => {
    registerMutation.mutate();
  };

  const showToastMessage = (severity, summary, detail) => {
    toastRef.current.show({ severity, summary, detail });
  };

  return (
    <MainContentStructure>
      <h2 className="title__sections">Registrar estación</h2>
      <hr />
      <div className={style.container}>
        <SectionStructure>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={style.form}>
              <div className={style.inputs_1}>
                <div className={style.formControl}>
                  <label className={style.label} htmlFor="email">
                    Email
                  </label>
                  <Field
                    className={style.inputUsuario}
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="off" // Desactivar el autocompletado
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={style.error}
                  />
                </div>

                <div className={style.formControl}>
                  <label className={style.label} htmlFor="password">
                    Contraseña
                  </label>
                  <Field
                    className={style.inputUsuario}
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off" // Desactivar el autocompletado
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={style.error}
                  />
                </div>
              </div>

              <div className={style.inputs_1}>
                <div className={style.formControl}>
                  <label className={style.label} htmlFor="dni">
                    DNI (opcional)
                  </label>
                  <Field
                    className={style.inputUsuario}
                    type="text"
                    id="dni"
                    name="dni"
                    autoComplete="off" // Desactivar el autocompletado
                  />
                  <ErrorMessage
                    name="dni"
                    component="div"
                    className={style.error}
                  />
                </div>

                <div className={style.formControl}>
                  <label className={style.label} htmlFor="role">
                    Rol
                  </label>
                  <Field
                    className={style.inputUsuario}
                    type="text"
                    id="role"
                    name="role"
                    disabled
                    value={initialValues?.role}
                    autoComplete="off" // Desactivar el autocompletado
                  />
                  <ErrorMessage
                    name="role"
                    component="div"
                    className={style.error}
                  />
                </div>
              </div>

              <button
                className={style.button}
                onClick={handleRegister}
                type="submit"
                style={{width: "20%", fontWeight: "bold", fontSize: "1rem"}}
              >
                Registrar
              </button>
            </Form>
          </Formik>
        </SectionStructure>
      </div>
      <Toast ref={toastRef} />
    </MainContentStructure>
  );
};

export default RegisterAdmin;
