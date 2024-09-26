import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styled from './Terminos.module.css'

function Terminos() {
  return (
    <>
      <Header />
        <SectionStructure>
            <div className={styled.container__terminos}>
            <h1 className={styled.principal__title}> Términos y Condiciones de e-totem </h1>

              <h2 className={styled.second__title}> Introducción </h2>

              <p className={styled.text}> Al descargar y usar la aplicación e-totem ("la Aplicación"), usted acepta estos Términos y Condiciones ("T&C"). Si no está de acuerdo con estos T&C, por favor, no use la Aplicación.</p>

              <h2 className={styled.second__title}> Licencia para usar la Aplicación </h2>

              <p className={styled.text}>
                Se le concede una licencia no exclusiva, revocable, para descargar y usar la Aplicación en su dispositivo personal. No puede copiar o modificar la Aplicación, ni permitir que terceros lo hagan.
              </p> 

              <h2 className={styled.second__title}> Uso Aceptable </h2>

              <p className={styled.text}>
                No puede usar la Aplicación de ninguna manera que sea ilegal o dañina, o en conexión con cualquier actividad ilegal o dañina.
              </p>


              <h2 className={styled.second__title}> Ubicación y Privacidad  </h2>
    
              <p className={styled.text}>
                Al aceptar estos T&C, usted permite que la Aplicación acceda y utilice su ubicación para proporcionar funcionalidades relevantes. Para más información, consulte nuestra Política de Privacidad.
              </p>

              <h2 className={styled.second__title}> Precisión de la Información  </h2>
              
              <p className={styled.text}>
                Hacemos nuestro mejor esfuerzo para asegurarnos de que la información de la Aplicación sea precisa y actual. Sin embargo, no podemos garantizar la precisión, confiabilidad o actualidad de la información de los precios de combustible y las ofertas.
              </p>

              <h2 className={styled.second__title}> Exclusión de Garantías y Limitación de Responsabilidad   </h2>
              
              <p className={styled.text}>
                La Aplicación se proporciona "tal cual" y "según disponibilidad", sin ninguna garantía de ningún tipo, ya sea explícita o implícita. No nos hacemos responsables de cualquier daño o pérdida que pueda resultar del uso de la Aplicación.
              </p>


              <h2 className={styled.second__title}> Cambios en los T&C </h2>

              <p className={styled.text}>
                Nos reservamos el derecho de modificar estos T&C en cualquier momento. Cualquier cambio será efectivo inmediatamente después de la publicación de los T&C revisados en la Aplicación.

              </p>

              <h2 className={styled.second__title}> Legislación Aplicable </h2>

              <p className={styled.text}>
                Estos T&C se rigen por las leyes del país en el que opera su empresa.
              </p>

              <h2 className={styled.second__title}> Contacto  </h2>

              <p className={styled.text}>
                Si tiene alguna pregunta sobre estos T&C, por favor contáctenos a través del " correo de contacto".
              </p>


              Fecha de entrada en vigor

              Estos T&C entrarán en vigor desde la fecha de la primera descarga de la Aplicación por el usuario.

              Fecha de última actualización: 10 de julio de 2023.
            </div>
        </SectionStructure>
      <Footer />
    </>
  );
}

export default Terminos;