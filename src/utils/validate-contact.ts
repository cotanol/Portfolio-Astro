import { object, string } from "yup";
import type { Contact } from "../types/contact";

let userSchema = object({
  name: string().required("El nombre es requerido"),
  email: string()
    .email("El formato debe ser válido")
    .required("El correo es requerido"),
  message: string().required("El mensaje es requerido"),
});

const validateContact = async (contact: Contact) => {
  try {
    await userSchema.validate(contact, { abortEarly: false }); // Captura todos los errores
    return { status: "success" };
  } catch (error: any) {
    const validationErrors: Record<string, string> = {}; // Permite solo strings en errores

    if (error.inner) {
      error.inner.forEach((err: { path?: string; message: string }) => {
        if (err.path) validationErrors[err.path] = err.message; // Guarda el error personalizado
      });
    }

    return { status: "error", errors: validationErrors };
  }
};

export default validateContact;
