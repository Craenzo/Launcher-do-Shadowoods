import React, { useState, useEffect } from 'react';

// Ficha de personagens do Shadowoods
// Ficha de personagens do Shadowoods (Usando PNGs)
const personagens = [
  { id: 'metal', name: 'Metal Sonic', image: '/personagens/metal.png' },
  { id: 'among', name: 'Among Us', image: '/personagens/among.png' },
  { id: 'ghast', name: 'Happy Ghast', image: '/personagens/ghast.gif' },
  { id: 'mario', name: 'Mario', image: '/personagens/mario.png' },
  { id: 'mimikill', name: 'Mimikill', image: '/personagens/mimikill.png' },
  { id: 'axolote', name: 'Axolote', image: '/personagens/axolote.png' },
  { id: 'r2d2', name: 'R2D2', image: '/personagens/r2d2.png' },
  { id: 'golden', name: 'Golden Freddy', image: '/personagens/golden.png' },
  { id: 'rover', name: 'Overgrown Rover', image: '/personagens/rover.png' },
];

export default function App() {
  const [ehNoite, setEhNoite] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('home');
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particulas, setParticulas] = useState([]);

  useEffect(() => {
    const hora = new Date().getHours();
    setEhNoite(hora >= 18 || hora < 5);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.6) {
        setParticulas((prev) => [...prev.slice(-15), {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          tamanho: Math.random() * 5 + 2,
        }]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-zinc-300 font-mono overflow-x-hidden select-none cursor-none">
      
      {/* 🐜 CURSOR DE INSETO RADIATIVO */}
      <div 
        className="pointer-events-none fixed z-[60] h-3 w-3 rounded-full bg-green-400 shadow-[0_0_20px_#4ade80] mix-blend-screen transition-transform duration-75 ease-out"
        style={{ left: `${mousePos.x - 6}px`, top: `${mousePos.y - 6}px` }}
      />
      {particulas.map((p) => (
        <div key={p.id} className="pointer-events-none fixed z-50 rounded-full bg-green-500/40 animate-ping"
             style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.tamanho}px`, height: `${p.tamanho}px` }} />
      ))}

     {/* 🌑 GRADIENT ATMOSFÉRICO (SUBSTITUTO DA FLORESTA) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #1a0a0a 0%, #050505 50%, #000000 100%)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      <div className="fixed inset-0 z-0 fog-overlay mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-noise mix-blend-overlay fixed" />
      <div className="absolute inset-0 z-10 scanlines fixed opacity-30" />
      {/* 🧭 MENU DE NAVEGAÇÃO SUPERIOR */}
      <nav className="relative z-20 w-full border-b border-zinc-900/80 bg-black/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-red-700 font-black tracking-[0.3em] glitch-hover animate-flicker">
            SHADOWOODS
          </div>
          <div className="flex gap-8">
            <button 
              onClick={() => setAbaAtiva('home')}
              className={`uppercase tracking-widest text-xs font-bold transition-all duration-300 ${abaAtiva === 'home' ? 'text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'text-zinc-600 hover:text-red-400'}`}
            >
              Terminal Central
            </button>
            <button 
              onClick={() => setAbaAtiva('download')}
              className={`uppercase tracking-widest text-xs font-bold transition-all duration-300 ${abaAtiva === 'download' ? 'text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'text-zinc-600 hover:text-red-400'}`}
            >
              Baixar Jogo
            </button>
          </div>
        </div>
      </nav>

      {/* 🖥️ ÁREA DE CONTEÚDO */}
      <main className="relative z-20 max-w-5xl mx-auto px-4 py-12 flex flex-col items-center min-h-[85vh]">
        
        {/* ================= ABA: HOME ================= */}
        {abaAtiva === 'home' && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            
            <header className="text-center my-12 animate-flicker">
              <h1 className="text-6xl md:text-8xl font-black tracking-widest text-red-700 drop-shadow-[0_0_15px_rgba(185,28,28,0.4)] glitch-hover">
                S H A D O W O O D S
              </h1>
              <p className="text-zinc-500 mt-6 text-xs tracking-[0.4em] uppercase">
                {ehNoite ? "O Ultimate Slenderman te observa da Lua..." : "Liberte-os usando o poder dos insetos."}
              </p>
            </header>

            {/* TRAILER EMBEDDED */}
            <section className="w-full max-w-4xl my-10 bg-black/90 border border-zinc-800/80 p-5 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.9)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50" />
              <h2 className="text-sm font-bold text-red-600 tracking-widest mb-4 flex items-center gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> TRANSMISSÃO DE VÍDEO INTERCEPTADA
              </h2>
              
              <div className="aspect-video w-full relative bg-zinc-950 border border-zinc-900 rounded overflow-hidden">
                {/* O Scanline CSS passa por cima do YouTube para dar efeito de TV antiga */}
                <div className="absolute inset-0 pointer-events-none scanlines z-10 opacity-40 mix-blend-overlay" />
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/tomRneFYqcw?autoplay=0&controls=1&showinfo=0&rel=0&modestbranding=1" 
                  title="Shadowoods Trailer" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="relative z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                ></iframe>
              </div>
            </section>

            {/* FICHA DE RESGATE */}
            <section className="w-full my-8 bg-zinc-950/80 border border-zinc-900 p-8 rounded shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-900/30" />
              <h2 className="text-xl font-bold text-red-700 tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> MONITORAMENTO DE PRISIONEIROS
              </h2>
              <p className="text-[10px] text-zinc-500 mb-8 border-b border-zinc-900 pb-4 uppercase tracking-widest">
                Status da comunicação: CORROMPIDO. Aproxime o inseto para varredura.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {personagens.map((p) => (
                  <div key={p.id} className="group relative bg-[#0a0a0a] border border-zinc-900 p-6 flex flex-col items-center justify-center h-36 transition-all duration-300 hover:border-green-800 hover:bg-black overflow-hidden">
                    
                    {/* AQUI ESTÁ A MÁGICA DA SILHUETA */}
                    <div className="w-16 h-16 mb-2 relative transition-all duration-500 transform group-hover:scale-125 group-hover:-translate-y-2 drop-shadow-[0_0_10px_rgba(74,222,128,0)] group-hover:drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">
                     <img 
  src={p.image} 
  alt={p.name}
  /* O filtro inicial é preto total. No hover, ele revela a imagem com um tom esverdeado/corrompido misterioso */
  className="w-full h-full object-contain brightness-0 contrast-100 opacity-70 transition-all duration-1000
             group-hover:brightness-100 group-hover:opacity-100 group-hover:sepia group-hover:hue-rotate-[120deg] group-hover:saturate-200 group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]"
/>
                    </div>

                    <span className="text-[10px] text-zinc-700 group-hover:text-green-500 font-bold mt-2 tracking-[0.2em] uppercase transition-colors">
                      {p.name}
                    </span>
                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-2 right-2 text-[8px] bg-red-950 text-red-500 px-1.5 py-0.5 border border-red-900/50 group-hover:bg-green-950 group-hover:text-green-400 group-hover:border-green-900 transition-colors tracking-wider">
                      TRANCADO
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CRÉDITOS */}
            <section className="w-full border-t border-zinc-900 pt-12 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
              <div>
                <h3 className="text-xs font-bold text-red-800 mb-5 tracking-[0.2em]">DOSSIÊ DE INVESTIGADORES</h3>
                <ul className="space-y-3">
                  <li className="text-xs text-zinc-500"><span className="font-bold text-zinc-300 tracking-wide">Gusta Cassimiro:</span> Dev Principal, Design & Trilha Sonora</li>
                  <li className="text-xs text-zinc-500"><span className="font-bold text-zinc-300 tracking-wide">Enzo Rodrigues:</span> Dev, Design & Efeitos Sonoros</li>
                  <li className="text-xs text-zinc-500"><span className="font-bold text-zinc-300 tracking-wide">Francisco Silva:</span> Criação do Menu</li>
                  <li className="text-xs text-zinc-500"><span className="font-bold text-zinc-300 tracking-wide">Ariel Barbosa:</span> Sonoplasta</li>
                  <li className="text-xs text-zinc-700 line-through decoration-red-900/50 italic"><span className="font-bold">Davi Franco:</span> Fez nada</li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* ================= ABA: DOWNLOAD ================= */}
        {abaAtiva === 'download' && (
          <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in mt-12">
            
            <h2 className="text-4xl font-black text-white tracking-widest mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] animate-flicker">
              DOWNLOAD CENTER
            </h2>
            <p className="text-zinc-500 text-xs tracking-widest mb-16 uppercase">Versão Beta v1.0.0 (Win64)</p>

            <button 
              onClick={() => alert("O arquivo direto do GitHub será linkado aqui na próxima semana!")}
              className="relative group bg-zinc-950 hover:bg-black border border-red-900/50 hover:border-red-600 px-16 py-6 text-xl font-bold tracking-[0.3em] uppercase transition-all duration-300 overflow-hidden w-full max-w-md text-center shadow-[0_0_20px_rgba(185,28,28,0.1)] hover:shadow-[0_0_30px_rgba(185,28,28,0.4)]"
            >
              <div className="absolute inset-0 bg-red-900/20 w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />
              <span className="relative z-10 text-red-500 group-hover:text-red-400 glitch-hover inline-block">
                INICIAR TRANSFERÊNCIA
              </span>
            </button>

            {/* CONTAINER DOS REQUISITOS PERSONALIZADOS */}
            <div className="w-full bg-[#030303] border border-zinc-900/80 p-8 mt-20 relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-20" />
              <h3 className="text-sm font-bold text-zinc-400 mb-8 tracking-[0.2em] border-b border-zinc-900 pb-4 text-center">ESPECIFICAÇÕES DE HARDWARE</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xs text-zinc-400">
                {/* MÍNIMO */}
                <div className="flex flex-col h-full bg-zinc-950/50 p-6 border border-zinc-900/50 rounded">
                  <p className="text-zinc-300 font-bold mb-5 border-l-2 border-zinc-700 pl-3 tracking-widest">CONFIGURAÇÃO MÍNIMA</p>
                  <ul className="space-y-3 flex-grow font-sans tracking-wide">
                    <li><span className="text-zinc-600 font-mono">SO:</span> Windows 10 (64-bit)</li>
                    <li><span className="text-zinc-600 font-mono">CPU:</span> Intel i5 12450H / AMD Ryzen 3 1200G</li>
                    <li><span className="text-zinc-600 font-mono">RAM:</span> 8 GB</li>
                    <li><span className="text-zinc-600 font-mono">GPU:</span> GT 1030 / RX 580 do enzo (8GB)</li>
                  </ul>
                  <p className="mt-6 text-[10px] text-zinc-600 italic tracking-[0.2em] bg-zinc-900/30 px-2 py-1 rounded inline-block w-fit">
                    720p 30fps
                  </p>
                </div>
                
                {/* RECOMENDADO */}
                <div className="flex flex-col h-full bg-zinc-950/50 p-6 border border-red-900/20 rounded">
                  <p className="text-zinc-300 font-bold mb-5 border-l-2 border-red-700 pl-3 tracking-widest drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">CONFIGURAÇÃO RECOMENDADA</p>
                  <ul className="space-y-3 flex-grow font-sans tracking-wide">
                    <li><span className="text-zinc-600 font-mono">SO:</span> Windows 10 / 11 (64-bit)</li>
                    <li><span className="text-zinc-600 font-mono">CPU:</span> Intel Xeon E5 2680v4 / AMD Ryzen 5 5500</li>
                    <li><span className="text-zinc-600 font-mono">RAM:</span> 16 GB</li>
                    <li><span className="text-zinc-600 font-mono">GPU:</span> RTX 2050 (laptop) / RX 550 (4GB+)</li>
                  </ul>
                  <p className="mt-6 text-[10px] text-zinc-600 italic tracking-[0.2em] bg-red-950/20 px-2 py-1 rounded inline-block w-fit">
                    1080p 30fps
                  </p>
                </div>
              </div>

              {/* LEGENDA GERAL DLSS */}
              <div className="mt-10 pt-5 border-t border-zinc-900 text-center">
                <p className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] opacity-70">
                  * Testes considerados com DLSS em ultradesempenho
                </p>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}