import { useGTM } from "@/hooks/useGTM";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const { trackButtonClick, trackVideoInteraction, trackSectionView } =
    useGTM();
  const heroRef = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("hero");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [trackSectionView]);

  const handlePlayVideo = () => {
    setShowVideo(true);
    trackVideoInteraction("play");
  };

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-radial-dark via-[#1a0f2a] to-[#2a1f3a] py-6 md:py-12 lg:py-10 xl:py-12 overflow-hidden min-h-screen flex items-center"
    >
      {/* Glows de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-10 xl:gap-12 items-center">
          {/* Coluna de texto */}
          <div className="text-center lg:text-left w-full flex flex-col lg:pr-4 xl:pr-8">
            <h1 className="text-white text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold mb-4 lg:mb-6 leading-[1.15]">
              Reduza sua conta de luz em até{" "}
              <span className="text-radial-orange">90%</span> com energia solar
            </h1>

            <h2 className="text-white/90 text-lg md:text-xl lg:text-xl xl:text-2xl font-semibold mb-5 lg:mb-6 leading-snug">
              Economize todos os meses e se proteja dos aumentos na conta de luz
            </h2>

            <p className="text-white/80 text-base md:text-lg mb-8 lg:mb-10 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
              Todo mês a conta de luz sobe e pesa no bolso. Com energia solar,
              você reduz esse custo e passa a economizar de verdade, com mais
              tranquilidade para sua casa.
            </p>

            <Link
              to="/inscricao"
              onClick={() => trackButtonClick("main_cta", "hero_section")}
              className="group inline-flex items-center justify-center gap-2 w-full md:w-auto bg-radial-orange hover:bg-orange-600 text-white font-bold py-4 px-8 lg:py-5 lg:px-12 rounded-full text-base md:text-lg lg:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-radial-orange/50 relative overflow-hidden self-center lg:self-start"
            >
              <span className="relative z-10">Simular minha economia agora</span>
              <svg
                className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>
            </Link>

          </div>

          {/* Coluna do vídeo */}
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full group">
              {/* Glow laranja atrás do vídeo */}
              <div className="absolute -inset-4 bg-radial-orange/20 rounded-3xl blur-2xl group-hover:bg-radial-orange/30 transition-all"></div>

              {/* Player */}
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl border-4 border-white/10">
                {!showVideo ? (
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={handlePlayVideo}
                  >
                    <img
                      src="/thumbnail-video-hero.webp"
                      alt="Como funciona energia solar?"
                      className="w-full h-full object-cover"
                      width={1280}
                      height={800}
                      fetchPriority="high"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white hover:bg-white/95 rounded-full p-5 md:p-6 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <svg
                          className="w-8 h-8 md:w-10 md:h-10 text-radial-orange ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/rg1ZPyEXSrY?autoplay=1&vq=hd720p&hd=1"
                    title="Como funciona energia solar?"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>

            <p className="text-white font-bold text-sm md:text-base mt-5 animate-video-cta">
              Assista o vídeo para entender melhor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
