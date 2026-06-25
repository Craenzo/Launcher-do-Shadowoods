import React, { useState, useEffect } from 'react';

// Ficha de personagens do Shadowoods
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

const SILHUETA_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='22' r='12' fill='%23000'/%3E%3Cpath d='M10 58c0-14 10-22 22-22s22 8 22 22' fill='%23000'/%3E%3Ctext x='32' y='30' font-family='monospace' font-size='14' fill='%23222' text-anchor='middle'%3E%3F%3C/text%3E%3C/svg%3E";

const CHAVE_PIX_REAL = "SUA_CHAVE_PIX_AQUI"; 
const PAYPAL_ID_REAL = "SEU_ID_DO_PAYPAL";

export default function App() {
  const [ehNoite, setEhNoite] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('home');
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particulas, setParticulas] = useState([]);
  const [copiouPix, setCopiouPix] = useState(false);
  const [cursorAtivo, setCursorAtivo] = useState(false);
  
  // Estados para a API Fake de Pagamento
  const [valorDoacao, setValorDoacao] = useState('');
  const [statusTransacao, setStatusTransacao] = useState('idle'); // idle, loading, success

  const pixConfigurado = CHAVE_PIX_REAL !== "SUA_CHAVE_PIX_AQUI";
  const paypalConfigurado = PAYPAL_ID_REAL !== "SEU_ID_DO_PAYPAL";

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
      const sobreInterativo = e.target.closest('a, button, [role="button"], input');
      setCursorAtivo(!!sobreInterativo);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setStatusTransacao('idle'); // Reseta a API fake ao mudar de aba
  }, [abaAtiva]);

  // Função que simula a requisição da API de PIX Dinâmico
  const handleGerarPix = () => {
    if (!valorDoacao || isNaN(valorDoacao) || Number(valorDoacao) <= 0) {
      alert("ERRO DE SISTEMA: Insira um valor válido para iniciar a transferência térmica.");
      return;
    }
    setStatusTransacao('loading');
    setTimeout(() => {
      setStatusTransacao('success');
    }, 2500); // 2.5s de suspense/carregamento
  };

  const handleCopiarPix = () => {
    if (!pixConfigurado) return;
    navigator.clipboard.writeText(CHAVE_PIX_REAL);
    setCopiouPix(true);
    setTimeout(() => setCopiouPix(false), 2000);
  };

  const handleImagemQuebrada = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = SILHUETA_FALLBACK;
  };

  return (
    <div className={`relative min-h-screen w-full font-mono overflow-x-hidden cursor-none scroll-smooth flex flex-col transition-colors duration-1000 ${ehNoite ? 'bg-[#050505] text-zinc-300' : 'bg-[#1a1c20] text-zinc-400'}`}>
      
      {/* 🐜 CURSOR */}
      <div 
        className={`pointer-events-none fixed z-[60] rounded-full shadow-[0_0_20px_currentColor] mix-blend-screen transition-all duration-150 ease-out ${cursorAtivo ? 'h-5 w-5 bg-red-500 text-red-500' : 'h-3 w-3 bg-green-400 text-green-400'}`}
        style={{ left: `${mousePos.x - (cursorAtivo ? 10 : 6)}px`, top: `${mousePos.y - (cursorAtivo ? 10 : 6)}px` }}
      />
      {particulas.map((p) => (
        <div key={p.id} className="pointer-events-none fixed z-50 rounded-full bg-green-500/40 animate-ping"
             style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.tamanho}px`, height: `${p.tamanho}px` }} />
      ))}

      {/* 🌑 FUNDO ATMOSFÉRICO (Muda com o dia/noite) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: ehNoite 
            ? 'radial-gradient(circle at 50% 50%, #1a0a0a 0%, #050505 50%, #000000 100%)'
            : 'radial-gradient(circle at 50% 50%, #2a2d35 0%, #1a1c20 50%, #0d0f12 100%)',
          transition: 'background 1s ease-out'
        }}
      />
      {ehNoite && <div className="fixed inset-0 z-0 fog-overlay mix-blend-multiply opacity-80" />}
      <div className="absolute inset-0 z-0 bg-noise mix-blend-overlay fixed" />
      <div className={`absolute inset-0 z-10 scanlines fixed ${ehNoite ? 'opacity-30' : 'opacity-10'}`} />

      {/* 🧭 NAV BAR */}
      <nav className={`relative z-20 w-full border-b backdrop-blur-md sticky top-0 select-none transition-colors duration-1000 ${ehNoite ? 'border-zinc-900/80 bg-black/80' : 'border-zinc-800/80 bg-[#15171a]/90'}`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-red-700 font-black tracking-[0.3em] glitch-hover animate-flicker text-lg">
            SHADOWOODS OS
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { id: 'home', label: 'Terminal' },
              { id: 'wiki', label: 'Wiki / Arquivos' },
              { id: 'download', label: 'Baixar Jogo' },
              { id: 'devs', label: 'Equipe' },
              { id: 'donate', label: 'Apoiar' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setAbaAtiva(tab.id)}
                className={`uppercase tracking-widest text-xs font-bold transition-all duration-300 ${abaAtiva === tab.id ? 'text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] border-b border-red-700 pb-1' : 'text-zinc-600 hover:text-red-400'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 🖥️ ÁREA DE CONTEÚDO */}
      <main className="relative z-20 max-w-5xl mx-auto px-4 py-12 flex flex-col items-center flex-grow w-full">
        
        {/* ================= ABA: HOME (TERMINAL) ================= */}
        {abaAtiva === 'home' && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <header className="relative w-full text-center py-20 my-4 border border-red-900/30 rounded-xl overflow-hidden bg-black group shadow-[0_0_40px_rgba(185,28,28,0.1)]">
              {/* IMAGEM ASSUSTADORA DO SLENDERMAN */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-1000 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              
              <div className="relative z-10 animate-flicker pointer-events-none">
                <h1 className="text-6xl md:text-8xl font-black tracking-widest text-red-700 drop-shadow-[0_0_25px_rgba(185,28,28,0.6)] glitch-hover">
                  S H A D O W O O D S
                </h1>
                <p className="text-zinc-400 mt-6 text-xs tracking-[0.4em] uppercase font-bold drop-shadow-lg">
                  Ele está observando a transferência.
                </p>
              </div>
            </header>

            <section className="w-full max-w-4xl my-8 bg-black/90 border border-zinc-800/80 p-5 rounded-lg shadow-2xl relative overflow-hidden group">
              <h2 className="text-sm font-bold text-red-600 tracking-widest mb-4 flex items-center gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> TRANSMISSÃO DE VÍDEO INTERCEPTADA
              </h2>
              <div className="aspect-video w-full relative bg-zinc-950 border border-zinc-900 rounded overflow-hidden">
                <iframe 
                  width="100%" height="100%" 
                  src="https://www.youtube.com/embed/h5BFSpZa3d4" 
                  title="Shadowoods Trailer" frameBorder="0" allowFullScreen
                  className="relative z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                ></iframe>
              </div>
            </section>

            <section className="w-full my-6 bg-zinc-950/80 border border-zinc-900 p-8 rounded shadow-2xl">
              <h2 className="text-lg font-bold text-red-700 tracking-widest mb-2 flex items-center gap-2">
                MONITORAMENTO DE PRISIONEIROS
              </h2>
              <p className="text-[10px] text-zinc-500 mb-8 border-b border-zinc-900 pb-4 uppercase tracking-widest">
                Status: CORROMPIDO. Passe o cursor para descriptografar a silhueta.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {personagens.map((p) => (
                  <div key={p.id} className="group relative bg-[#0a0a0a] border border-zinc-900 p-6 flex flex-col items-center justify-center h-36 transition-all duration-300 hover:border-green-800 hover:bg-black overflow-hidden">
                    <div className="w-16 h-16 mb-2 relative transition-all duration-500 transform group-hover:scale-115">
                      <img 
                        src={p.image} alt={p.name}
                        onError={handleImagemQuebrada}
                        className="w-full h-full object-contain brightness-0 contrast-100 opacity-70 transition-all duration-700 group-hover:brightness-100 group-hover:opacity-100 group-hover:sepia group-hover:hue-rotate-[120deg] group-hover:saturate-200"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-700 group-hover:text-green-500 font-bold mt-2 tracking-[0.2em] uppercase">
                      {p.name}
                    </span>
                    <div className="absolute top-2 right-2 text-[8px] bg-red-950 text-red-500 px-1.5 py-0.5 border border-red-900/50 tracking-wider">
                      TRANCADO
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ================= ABA: WIKI / ARQUIVOS ================= */}
        {abaAtiva === 'wiki' && (
          <div className="w-full max-w-5xl flex flex-col animate-fade-in text-left">
            <h2 className="text-4xl font-black text-white tracking-widest mb-2 border-b border-zinc-800 pb-4 uppercase">
              Database / Wiki Oficial
            </h2>
            <p className="text-zinc-500 text-xs tracking-widest mb-10 uppercase">Registros recuperados do ecossistema corrompido de Shadowoods</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Menu Lateral Fixo */}
              <div className="md:col-span-1 hidden md:block">
                <div className="sticky top-28 space-y-2">
                  <div className="text-[10px] font-bold text-red-800 tracking-wider uppercase pl-2 border-l-2 border-red-900 mb-4">ÍNDICE DE ARQUIVOS</div>
                  <a href="#incidente" className="block text-[11px] text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-all bg-zinc-950/30 p-3 border border-zinc-900/50 rounded uppercase tracking-wider">01. O Incidente</a>
                  <a href="#prisioneiros" className="block text-[11px] text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-all bg-zinc-950/30 p-3 border border-zinc-900/50 rounded uppercase tracking-wider">02. As Dez Almas</a>
                  <a href="#coroas" className="block text-[11px] text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-all bg-zinc-950/30 p-3 border border-zinc-900/50 rounded uppercase tracking-wider">03. O Peso das Coroas</a>
                  <a href="#mutagenicos" className="block text-[11px] text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-all bg-zinc-950/30 p-3 border border-zinc-900/50 rounded uppercase tracking-wider">04. Diário dos Mutagênicos</a>
                  <a href="#ameaca" className="block text-[11px] text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-all bg-zinc-950/30 p-3 border border-zinc-900/50 rounded uppercase tracking-wider">05. O Inimigo Central</a>
                </div>
              </div>

              {/* Corpo da Wiki */}
              <div className="md:col-span-3 space-y-12 bg-black/60 backdrop-blur-sm border border-zinc-800/80 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />
                
                <section id="incidente" className="space-y-4 relative scroll-mt-28">
                  <h3 className="text-lg font-bold text-red-600 tracking-wide uppercase border-b border-zinc-800 pb-2 flex items-center gap-3">
                    <span className="text-zinc-700 text-sm">01</span> A Distorção da Realidade
                  </h3>
                  <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-sans text-justify">
                    <p>Quando Leon abriu os olhos, o mundo lá fora havia sumido. O que o cercava agora era uma névoa espessa que engolia a ilha maldita de Shadowoods, trazendo consigo o lamento de almas esquecidas que não pertencem a este mundo.</p>
                    <p>Leon não sabe como chegou até este lugar... mas o abismo parece saber o seu nome. Shadowoods deixou de ser uma floresta comum no momento em que uma fenda temporal se abriu, agindo como um buraco negro dimensional que suga entidades de outras realidades e as aprisiona.</p>
                  </div>
                </section>

                <section id="prisioneiros" className="space-y-4 relative scroll-mt-28">
                  <h3 className="text-lg font-bold text-red-600 tracking-wide uppercase border-b border-zinc-800 pb-2 flex items-center gap-3">
                    <span className="text-zinc-700 text-sm">02</span> As Dez Pobres Almas (Os Prisioneiros)
                  </h3>
                  <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-sans text-justify">
                    <p>Pela mata escura, aguardam na escuridão dez pobres almas. Entidades proeminentes de realidades alternativas — abrangendo desde heróis de plataformas mecânicas e encanadores até tripulantes espaciais e animatrônicos despedaçados.</p>
                    <blockquote className="border-l-2 border-red-800 bg-red-950/20 p-5 rounded-r text-zinc-300 italic shadow-inner">
                      "Não lute contra os prisioneiros, eles não têm culpa. Olhe para cima."
                      <footer className="text-[10px] text-zinc-600 mt-3 uppercase not-italic font-mono">— Nota de um investigator (Pág. 1)</footer>
                    </blockquote>
                  </div>
                </section>

                <section id="mutagenicos" className="space-y-4 relative scroll-mt-28">
                  <h3 className="text-lg font-bold text-green-600 tracking-wide uppercase border-b border-zinc-800 pb-2 flex items-center gap-3">
                    <span className="text-zinc-700 text-sm">04</span> Diário dos Mutagênicos (Mods Coletáveis)
                  </h3>
                  <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-sans text-justify">
                    <p>Pelo mapa, pequenos feixes de luz biológica vagam. Há espíritos presos nesses insetos. O operador pode coletá-los e absorver suas propriedades mecânicas temporárias.</p>
                    
                    {/* Lista Expandida de Mods */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="bg-zinc-950/80 border border-green-900/30 p-4 rounded-lg hover:border-green-500/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">🤖</span>
                          <h4 className="text-xs font-bold text-green-500 uppercase">Metal Sonic</h4>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-snug">Garante uma explosão cinética. Velocidade de movimento aumentada em 400% por curtos períodos. Perfeito para fugas táticas.</p>
                      </div>

                      <div className="bg-zinc-950/80 border border-green-900/30 p-4 rounded-lg hover:border-green-500/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">🍄</span>
                          <h4 className="text-xs font-bold text-green-500 uppercase">Mario</h4>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-snug">Aumenta drasticamente a força das pernas, permitindo alcançar plataformas inacessíveis e desviar de ataques terrestres verticais.</p>
                      </div>

                      <div className="bg-zinc-950/80 border border-green-900/30 p-4 rounded-lg hover:border-green-500/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">👻</span>
                          <h4 className="text-xs font-bold text-green-500 uppercase">Happy Ghast</h4>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-snug">Torna os passos de Leon momentaneamente inaudíveis. O Slenderman perderá seu rastro acústico se usado corretamente na névoa.</p>
                      </div>

                      <div className="bg-zinc-950/80 border border-green-900/30 p-4 rounded-lg hover:border-green-500/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">🚀</span>
                          <h4 className="text-xs font-bold text-green-500 uppercase">Among Us</h4>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-snug">Visão tática aprimorada. Destaca silhuetas inimigas e itens interativos através de paredes próximas em um raio de 15 metros.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
        )}

        {/* ================= ABA: DOWNLOAD ================= */}
        {abaAtiva === 'download' && (
          <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in mt-6">
            <h2 className="text-4xl font-black text-white tracking-widest mb-2 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Central de Distribuição</h2>
            <p className="text-zinc-500 text-xs tracking-widest mb-12 uppercase">Build Compilada Estável (Win64)</p>

            {/* BOTÃO ATUALIZADO COM LINK DO ITCH.IO */}
            <a 
              href="https://davvifranco.itch.io/shadowoods?secret=UjUKHas8bspzxOHORIG0yTp9CHc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group bg-zinc-950 hover:bg-black border border-red-900/50 hover:border-red-600 px-16 py-6 text-xl font-bold tracking-[0.3em] uppercase transition-all duration-300 overflow-hidden w-full max-w-md text-center shadow-[0_0_20px_rgba(185,28,28,0.1)] hover:shadow-[0_0_30px_rgba(185,28,28,0.4)] block mb-16 rounded"
            >
              <div className="absolute inset-0 bg-red-900/20 w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />
              <span className="relative z-10 text-red-500 group-hover:text-red-400 glitch-hover inline-block">BAIXAR NO ITCH.IO</span>
            </a>

            <div className="w-full bg-black/80 backdrop-blur border border-zinc-800/80 p-8 relative shadow-2xl rounded-xl">
              <h3 className="text-xs font-bold text-zinc-500 mb-8 tracking-[0.2em] border-b border-zinc-800 pb-4 text-center uppercase">Especificações Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xs text-zinc-400">
                <div className="flex flex-col h-full bg-zinc-950/80 p-6 border border-zinc-800/50 rounded-lg">
                  <p className="text-zinc-300 font-bold mb-4 border-l-2 border-zinc-600 pl-3 tracking-widest text-[11px]">MÍNIMO</p>
                  <ul className="space-y-3 flex-grow font-sans text-zinc-500">
                    <li><span className="text-zinc-600 font-mono font-bold">SO:</span> Windows 10 (64-bit)</li>
                    <li><span className="text-zinc-600 font-mono font-bold">CPU:</span> Intel i5 12450H / Ryzen 3 1200G</li>
                    <li><span className="text-zinc-600 font-mono font-bold">RAM:</span> 8 GB</li>
                    <li><span className="text-zinc-600 font-mono font-bold">GPU:</span> GT 1030 / RX 580(DO ENZO) (8GB)</li>
                  </ul>
                </div>
                <div className="flex flex-col h-full bg-zinc-950/80 p-6 border border-red-900/30 rounded-lg">
                  <p className="text-zinc-300 font-bold mb-4 border-l-2 border-red-700 pl-3 tracking-widest text-[11px]">RECOMENDADO</p>
                  <ul className="space-y-3 flex-grow font-sans text-zinc-500">
                    <li><span className="text-zinc-600 font-mono font-bold">SO:</span> Windows 10 / 11 (64-bit)</li>
                    <li><span className="text-zinc-600 font-mono font-bold">CPU:</span> Xeon E5 2680v4 / Ryzen 5 5500</li>
                    <li><span className="text-zinc-600 font-mono font-bold">RAM:</span> 16 GB</li>
                    <li><span className="text-zinc-600 font-mono font-bold">GPU:</span> RTX 2050 / RX 550 (4GB+)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ABA: DEVS ================= */}
        {abaAtiva === 'devs' && (
          <div className="w-full max-w-4xl flex flex-col animate-fade-in text-left">
            <h2 className="text-4xl font-black text-white tracking-widest mb-2 border-b border-zinc-800 pb-4 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Equipe de Contenção</h2>
            <p className="text-zinc-500 text-xs tracking-widest mb-10 uppercase">Fichas de identificação dos desenvolvedores</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Gustavo Cassimiro", role: "Modelador de personagens, Design e Trilha Sonora" },
                { name: "Enzo Rodrigues", role: "Dev, Design dos mapas, e efeitos sonoros" },
                { name: "Davi Viana", role: "Criador do menu, e transições de mapa" },
                { name: "Ariel Barbosa", role: "Sonoplasta" },
                { name: "Davi Franco", role: "Dev do Vilão e criação do combate" }
              ].map((dev, idx) => (
                <div key={idx} className="bg-black/60 backdrop-blur border border-zinc-800/80 p-6 rounded-lg relative group overflow-hidden hover:border-red-900/60 transition-colors shadow-lg">
                  <div className="absolute top-0 left-0 w-[3px] h-0 bg-red-700 group-hover:h-full transition-all duration-300" />
                  <p className="text-sm font-bold text-zinc-300 tracking-wide uppercase group-hover:text-red-500 transition-colors">{dev.name}</p>
                  <p className="text-[11px] text-zinc-500 uppercase mt-2 tracking-widest leading-relaxed font-sans">{dev.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ABA: DONATE (API FAKE INTERATIVA) ================= */}
        {abaAtiva === 'donate' && (
          <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in text-center">
            <h2 className="text-4xl font-black text-white tracking-widest mb-2 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Terminal de Transação</h2>
            <p className="text-zinc-500 text-xs tracking-widest mb-12 uppercase">Estabeleça uma conexão segura para financiar a equipe</p>

            <div className="w-full bg-black/80 backdrop-blur-md border border-zinc-800/80 p-8 rounded-xl space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-900/50 to-transparent" />
              
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed font-sans">
                Manter os servidores dedicados ativos requer suporte logístico. Utilize o terminal abaixo para gerar uma rota criptografada de transferência.
              </p>

              {/* TELA DE TRANSAÇÃO (FAKE API) */}
              <div className="bg-[#050505] border border-zinc-800 p-6 rounded-lg text-left shadow-inner">
                
                {statusTransacao === 'idle' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-[10px] font-bold text-green-500 tracking-widest uppercase mb-2 block">1. INSIRA O VALOR DO REPASSE (BRL)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold">R$</span>
                        <input 
                          type="number" 
                          value={valorDoacao}
                          onChange={(e) => setValorDoacao(e.target.value)}
                          placeholder="0.00"
                          className="w-full bg-zinc-950 border border-zinc-800 text-green-400 font-bold text-lg p-4 pl-12 rounded focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button onClick={() => setValorDoacao('10')} className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-green-900 text-zinc-500 hover:text-green-500 text-xs py-2 rounded transition-colors">10</button>
                      <button onClick={() => setValorDoacao('25')} className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-green-900 text-zinc-500 hover:text-green-500 text-xs py-2 rounded transition-colors">25</button>
                      <button onClick={() => setValorDoacao('50')} className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-green-900 text-zinc-500 hover:text-green-500 text-xs py-2 rounded transition-colors">50</button>
                    </div>

                    <button 
                      onClick={handleGerarPix}
                      className="w-full bg-green-950/30 border border-green-900/50 hover:bg-green-900 hover:text-white text-green-500 text-xs font-bold py-4 uppercase tracking-[0.2em] transition-all rounded shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                    >
                      GERAR CHAVE PIX
                    </button>
                  </div>
                )}

                {statusTransacao === 'loading' && (
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="w-8 h-8 border-4 border-zinc-800 border-t-green-500 rounded-full animate-spin" />
                    <p className="text-[10px] text-green-500 animate-pulse tracking-widest uppercase font-bold">Negociando handshake criptografado...</p>
                  </div>
                )}

                {statusTransacao === 'success' && (
                  <div className="space-y-6 animate-fade-in text-center">
                    <div className="inline-block p-4 border border-green-900/50 bg-green-950/20 rounded">
                      <p className="text-[10px] text-green-500 tracking-widest uppercase mb-3">CONEXÃO ESTABELECIDA PARA: R$ {valorDoacao}</p>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">A API limitou a geração de QR Code dinâmico por questões de segurança de rede. Utilize a nossa Chave PIX oficial abaixo para completar o repasse no seu aplicativo.</p>
                      
                      <button
                        onClick={handleCopiarPix}
                        disabled={!pixConfigurado}
                        className={`w-full border text-[11px] font-bold py-4 uppercase tracking-wider transition-all rounded ${pixConfigurado ? 'bg-zinc-900 border-green-900/60 hover:border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed'}`}
                      >
                        {!pixConfigurado ? "CHAVE OFF-LINE" : copiouPix ? "¡CHAVE COPIADA PARA A ÁREA DE TRANSFERÊNCIA!" : "COPIAR CHAVE PIX OFICIAL"}
                      </button>
                    </div>
                    <button onClick={() => setStatusTransacao('idle')} className="text-[10px] text-zinc-600 hover:text-zinc-400 underline tracking-widest uppercase transition-colors">Voltar</button>
                  </div>
                )}
              </div>

              {/* PAYPAL (Opção Secundária) */}
              <div className="pt-6 border-t border-zinc-800/50">
                <p className="text-[10px] text-zinc-600 tracking-widest uppercase mb-4 text-center">Protocolo Secundário (Internacional)</p>
                {paypalConfigurado ? (
                  <a href={`https://www.paypal.com/donate?hosted_button_id=${PAYPAL_ID_REAL}`} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-transparent border border-yellow-900/40 hover:border-yellow-500 hover:bg-yellow-950/20 text-yellow-600 text-[10px] font-bold py-3 uppercase tracking-wider transition-all block rounded">
                    ABRIR GATEWAY PAYPAL
                  </a>
                ) : (
                  <button disabled className="w-full text-center bg-zinc-950 border border-zinc-900 text-zinc-700 text-[10px] font-bold py-3 uppercase tracking-wider cursor-not-allowed rounded">
                    PAYPAL EM BREVE
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 🦟 RODAPÉ */}
      <footer className="relative z-20 w-full border-t border-zinc-900/80 bg-black/80 backdrop-blur-md select-none mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-zinc-600">
          <span>SHADOWOODS OS <span className="text-zinc-700">// build alpha — em desenvolvimento</span></span>
          <span className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${ehNoite ? 'bg-red-700' : 'bg-green-700'}`} />
            {ehNoite ? 'conexão instável detectada' : 'sistemas operacionais limpos'}
          </span>
        </div>
      </footer>
    </div>
  );
}