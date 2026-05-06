import profile from "../assets/profile.jpg";
export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Imagen */}
          <img
            src={profile}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

          {/* Info */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              David Santiago Enriquez Noguera
            </h1>
            <p className="text-blue-500 font-medium">
              Desarrollador Full Stack
            </p>
            <p className="text-gray-600 mt-2">
              Apasionado por el desarrollo web, con experiencia en React, Node.js y bases de datos.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Tecnologías
          </h2>

          <div className="flex flex-wrap gap-2">
            {[
              "Java",
              "React",
              "Node.js",
              "Spring Boot",
              "PostgreSQL",
              "Docker",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Contactar
          </button>

          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            Descargar CV
          </button>
        </div>
      </div>
    </div>
  );
}