import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center">Contact Me</h2>
      <form className="max-w-md mx-auto mt-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 w-full mb-4"
          required
        />
        <textarea
          placeholder="Your Message"
          className="border p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400 transition duration-300"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
