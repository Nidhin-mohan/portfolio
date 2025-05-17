import Image from "next/image";

export default function Home() {
  return (
   
   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <Portfolio />
    </div>
  );
}

const Portfolio = () => {
  return (
    <div className="font-sans pt-40">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 text-center px-4">
        <h1 className="text-4xl md:text-5xl retro-font neon-text mb-4">
          Hi, I'm Your Name
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-green-300">
          MERN Stack Developer with 2 years of experience building full-stack
          web apps.
        </p>
        <a
          href="#projects"
          className="inline-block mt-8 bg-green-600 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded retro-font text-sm"
        >
          View My Work
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="bg-zinc-900 py-20 px-4">
        <h2 className="text-3xl md:text-4xl text-center retro-font text-white mb-12">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="rounded-full border-4 border-green-600 w-40 h-40 object-cover"
          />
          <div className="text-green-300 text-center md:text-left">
            <p>
              I specialize in developing full-stack applications using the MERN
              stack. I love building performant, secure, and user-friendly
              interfaces and APIs. My experience includes working on real-world
              products in both startup and freelance environments.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-black py-16 px-4">
        <h2 className="text-3xl text-center retro-font text-white mb-10">
          Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-green-300 font-mono text-sm">
          {[
            "MongoDB",
            "Express.js",
            "React",
            "Node.js",
            "TypeScript",
            "Tailwind CSS",
            "Next.js",
            "Git",
            "Docker",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 border border-green-500 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-zinc-900 py-20 px-4">
        <h2 className="text-3xl md:text-4xl text-center retro-font text-white mb-12">
          My Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Project Card */}
          <div className="bg-black border border-green-600 p-6 rounded-lg shadow-md hover:shadow-green-500/20 hover:shadow-xl transition-transform hover:-translate-y-1">
            <h3 className="text-xl retro-font neon-text mb-2 text-white">
              TaskBoard Pro
            </h3>
            <img
              src="https://via.placeholder.com/300x150"
              alt="TaskBoard Screenshot"
              className="rounded border border-green-600 mb-3"
            />
            <ul className="text-green-300 text-sm list-disc ml-4 mb-3">
              <li>React + Redux-based Kanban board</li>
              <li>Role-based auth with JWT</li>
              <li>MongoDB for tasks and user management</li>
            </ul>
            <div className="flex justify-between text-sm">
              <a href="#" className="text-green-300 hover:underline">
                Live Demo
              </a>
              <a href="#" className="text-green-300 hover:underline">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-black py-20 px-4">
        <h2 className="text-3xl md:text-4xl text-center retro-font text-white mb-12">
          Get in Touch
        </h2>
        <form className="max-w-lg mx-auto flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-zinc-800 text-white border border-green-500 p-3 rounded placeholder-green-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-zinc-800 text-white border border-green-500 p-3 rounded placeholder-green-400"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="bg-zinc-800 text-white border border-green-500 p-3 rounded placeholder-green-400"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded retro-font text-sm"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
};