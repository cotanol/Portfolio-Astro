import { createContact } from "../../services/contact-service";
import { useState } from "react";
import type { Contact } from "../../types/contact";
import { Toaster, toast } from "sonner";
import validateContact from "../../utils/validate-contact";
import { Timestamp } from "firebase/firestore";

const FormContact = () => {
  const [contact, setContact] = useState<Contact>({
    id: "",
    name: "",
    email: "",
    message: "",
    date: null,
  });

  const [errors, setErrors] = useState<Partial<Contact>>({});

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContact({ ...contact, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await validateContact(contact);

    if (response.status === "error") {
      setErrors(response.errors || {});
      return;
    }

    setErrors({});

    toast.promise(createContact({ ...contact, date: Timestamp.now() }), {
      error: "An error occurred",
      loading: "Loading...",
      success: "Message sent successfully",
    });

    setContact({ id: "", name: "", email: "", message: "", date: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={contact.name}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--primary)]"
          onChange={handleChangeInput}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={contact.email}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--primary)]"
          onChange={handleChangeInput}
          placeholder="Example@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          name="message"
          value={contact.message}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--primary)]"
          onChange={handleChangeInput}
          placeholder="Your message"
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-8 py-3 rounded-lg transition-colors hover:cursor-pointer"
      >
        Send Message
      </button>
      <Toaster
        toastOptions={{
          style: {
            background: "#1e293b", // Fondo azul oscuro
            color: "#f8fafc", // Texto blanco suave
            border: "1px solid #334155", // Borde sutil
            borderRadius: "8px",
          },
        }}
      />
    </form>
  );
};

export default FormContact;
