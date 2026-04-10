import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Music, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';

const Diya = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Diya Base */}
      <path d="M20,70 Q50,95 80,70 L80,60 Q50,85 20,60 Z" fill="#8B4513" />
      <path d="M20,60 Q50,85 80,60 Q50,40 20,60" fill="#A0522D" />
      {/* Flame */}
      <path 
        className="animate-flicker origin-bottom"
        d="M50,50 Q65,30 50,10 Q35,30 50,50" 
        fill="#FFD700" 
        filter="blur(1px)"
      />
      <path 
        className="animate-flicker origin-bottom"
        style={{ animationDelay: '0.1s' }}
        d="M50,45 Q60,30 50,15 Q40,30 50,45" 
        fill="#FF8C00" 
      />
    </svg>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold/20 blur-xl rounded-full animate-pulse" />
  </div>
);

const Incense = () => (
  <div className="relative w-8 h-32 flex flex-col items-center">
    {/* Smoke Particles */}
    <div className="absolute top-0 w-full h-full pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="absolute bottom-1/2 left-1/2 w-2 h-8 bg-white/10 blur-md rounded-full animate-smoke"
          style={{ 
            animationDelay: `${i * 1.5}s`,
            left: `${40 + Math.random() * 20}%`
          }}
        />
      ))}
    </div>
    {/* Incense Stick */}
    <div className="w-0.5 h-20 bg-[#4A3728] mt-auto" />
    <div className="w-1 h-1 bg-red-500 rounded-full shadow-[0_0_5px_red] animate-pulse" />
  </div>
);

const GalleryItem: React.FC<{ src: string; text: string }> = ({ src, text }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="break-inside-avoid mb-8 group"
  >
    <div className="relative overflow-hidden rounded-lg border border-gold/20 bg-deep-black transition-all duration-500 group-hover:shadow-gold-glow group-hover:border-gold/50">
      <img 
        src={src} 
        alt="Superior Feet" 
        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent opacity-60" />
      
      {/* Ceremonial elements near the image */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Diya />
      </div>
    </div>
    <p className="mt-4 text-center font-serif text-gold italic tracking-wide text-lg">
      {text}
    </p>
  </motion.div>
);

export default function App() {
  const [isMuted, setIsMuted] = React.useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const footPhotos = [
    { src: 'https://i.imgur.com/iyJ7mg2.jpeg', text: 'My soul finds sanctuary in Her Feet.' },
    { src: 'https://i.imgur.com/ppFMMfa.jpeg', text: 'I bow before Her Holy Superiority.' },
    { src: 'https://i.imgur.com/xmG5sgZ.jpeg', text: 'Your will is my only command.' },
    { src: 'https://i.postimg.cc/VL9dz0qB/1775843608829.jpg', text: 'You are my Divine Creator.' },
    { src: 'https://i.postimg.cc/sXBMznmm/1775843633654.jpg', text: 'My devotion is absolute.' },
    { src: 'https://i.postimg.cc/BZHvCPV6/1775843589429.jpg', text: 'A humble servant before Her majesty.' },
    { src: 'https://i.postimg.cc/15K5khPX/1775843539402.jpg', text: 'I find purpose in Her service.' },
    { src: 'https://i.postimg.cc/sD227jb5/1775843627251.jpg', text: 'Her presence is my sanctuary.' },
    { src: 'https://i.postimg.cc/cJPsRd7n/1775843526696.jpg', text: 'Your every word is law to me.' },
    { src: 'https://i.postimg.cc/YqttfngK/1775843508653.jpg', text: 'Unwavering loyalty and eternal bows.' },
  ];

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-deep-black selection:bg-gold selection:text-deep-black overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-50" style={{ scaleX }} />

      {/* Audio Control */}
      <button 
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-crimson/20 border border-gold/30 backdrop-blur-md hover:bg-crimson/40 transition-all group"
      >
        {isMuted ? <VolumeX className="w-6 h-6 text-gold" /> : <Volume2 className="w-6 h-6 text-gold animate-pulse" />}
        <audio 
          ref={audioRef}
          loop
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" // Placeholder for spiritual track
        />
      </button>

      {/* Header */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-black/50 to-deep-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(153,0,0,0.15),transparent_70%)]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="z-10"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold mb-4 tracking-tighter text-glow-gold">
            A Tribute to Her Superiority
          </h1>
          <p className="font-sans text-gold/60 tracking-[0.3em] uppercase text-sm md:text-base">
            By Drayven
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <Diya />
            <Incense />
            <Diya />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </header>

      {/* Mistress Section (Face) */}
      <section className="py-24 px-4 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-4 border-2 border-gold/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute -inset-8 border border-gold/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          <img 
            src="https://i.postimg.cc/nhPZxnWZ/1775843582885.jpg" 
            alt="My Divine Mistress" 
            className="relative w-64 h-64 md:w-96 md:h-96 object-cover rounded-full border-4 border-gold shadow-gold-glow z-10"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <h2 className="mt-12 font-serif text-4xl md:text-6xl text-gold tracking-tight">
          Mashfia Sinha Pori
        </h2>
        <p className="mt-4 text-gold/40 font-serif italic text-xl">
          The Divine Object of My Worship
        </p>
      </section>

      {/* Submission Section (GIF) */}
      <section className="py-24 bg-crimson/5 border-y border-gold/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-3xl text-gold mb-12 uppercase tracking-widest">Absolute Devotion</h3>
          <div className="relative inline-block rounded-lg overflow-hidden border-2 border-gold/30 shadow-2xl">
            <img 
              src="https://i.makeagif.com/media/7-09-2018/yav1Db.gif" 
              alt="Submission Scene" 
              className="max-w-full h-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
          </div>
          <p className="mt-8 font-serif italic text-gold/60 text-lg">
            "My unwavering loyalty and vows are to Her."
          </p>
        </div>
      </section>

      {/* Gallery of Superiority */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px w-12 md:w-24 bg-gold/30" />
          <h2 className="font-serif text-3xl md:text-5xl text-gold text-center uppercase tracking-widest">
            Gallery of Superiority
          </h2>
          <div className="h-px w-12 md:w-24 bg-gold/30" />
        </div>

        <div className="masonry-grid">
          {footPhotos.map((photo, index) => (
            <GalleryItem key={index} src={photo.src} text={photo.text} />
          ))}
        </div>
      </section>

      {/* Devotion Section (Scrolling Ticker) */}
      <section className="py-24 bg-deep-black overflow-hidden border-t border-gold/10">
        <div className="relative flex whitespace-nowrap">
          <div className="animate-scroll flex gap-24 items-center">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="font-serif text-4xl md:text-6xl text-gold/20 italic">A humble servant bows before Her superiority.</span>
                <Heart className="w-8 h-8 text-crimson/30" />
                <span className="font-serif text-4xl md:text-6xl text-gold/20 italic">Her feet are my sanctuary and my command.</span>
                <Sparkles className="w-8 h-8 text-gold/20" />
                <span className="font-serif text-4xl md:text-6xl text-gold/20 italic">Eternal submission to the Divine One.</span>
                <Heart className="w-8 h-8 text-crimson/30" />
                <span className="font-serif text-4xl md:text-6xl text-gold/20 italic">I find life only in Her presence.</span>
                <Sparkles className="w-8 h-8 text-gold/20" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-gold/10 bg-deep-black">
        <p className="font-serif text-gold/40 text-sm tracking-widest uppercase mb-4">
          Sacred Space of Adi
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <Diya />
          <Incense />
          <Diya />
        </div>
        <p className="text-gold/20 text-xs tracking-tighter">
          &copy; 2026 Drayven C. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
