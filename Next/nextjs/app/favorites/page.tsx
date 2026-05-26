
export default function FavoritePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-6">
            <section className="max-w-3xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 text-center">
                
                <div className="mb-6">
                <span className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium border border-cyan-400/30">
                    ✨ Bienvenido a mi espacio
                </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Acerca de mí
                </h1>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                Soy un apasionado por el desarrollo web y la tecnología.  
                Me encanta crear experiencias modernas, rápidas e intuitivas
                utilizando herramientas como <span className="text-cyan-400 font-semibold">Next.js</span>,
                React y Tailwind CSS.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300">
                    <h2 className="text-xl font-bold text-cyan-400 mb-2">💻 Frontend</h2>
                    <p className="text-slate-400 text-sm">
                    Interfaces modernas y responsivas.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300">
                    <h2 className="text-xl font-bold text-blue-400 mb-2">⚡ Backend</h2>
                    <p className="text-slate-400 text-sm">
                    APIs eficientes y seguras.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300">
                    <h2 className="text-xl font-bold text-purple-400 mb-2">🚀 Innovación</h2>
                    <p className="text-slate-400 text-sm">
                    Aprendizaje constante y nuevas ideas.
                    </p>
                </div>
                </div>

                <button className="mt-10 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition duration-300 font-semibold shadow-lg">
                Conóceme más
                </button>
            </section>
        </main>
    );
}
