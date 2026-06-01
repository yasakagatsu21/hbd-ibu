"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import PhotoGallery from "@/components/PhotoGallery";
import { GalleryPhoto } from "@/types/gallery";

export default function BirthdayPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);

  // Ganti dengan foto-foto Anda
  const photos: GalleryPhoto[] = [
    {
      id: "1",
      src: "/photos/1.jpg",
      alt: "Mountain",
      title: "Mountain Escape",
      description: "Morning atmosphere",
    },
    {
      id: "2",
      src: "/photos/2.jpg",
      alt: "Beach",
      title: "Ocean Breeze",
      description: "Summer mood",
    },
    {
      id: "3",
      src: "/photos/3.jpg",
      alt: "Forest",
      title: "Green Forest",
    },
  ];

  useEffect(() => {
    if (isStarted && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isStarted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isStarted, photos.length]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <audio ref={audioRef} loop>
        <source src="/music/back_sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse-slow delay-500"></div>
      </div>

      {/* Floating balloons */}
      <FloatingBalloons />

      {/* Music control button */}
      <div className="fixed top-4 right-4 z-20">
        <div className="group flex items-center">
          <button
            onClick={toggleMusic}
            className="bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-300"
          >
            {isPlaying ? "🔊" : "🔇"}
          </button>

          <div
            className="
        overflow-hidden
        max-w-0
        opacity-0
        group-hover:max-w-40
        group-hover:opacity-100
        transition-all
        duration-300
        ease-in-out
      "
          >
            <div className="ml-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-2 shadow-lg flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-rose-500"
              />

              <span className="text-xs text-gray-600 min-w-[35px]">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 pb-20">
        {/* Hero Section */}
        <div className="text-center pt-12 pb-8 animate-fadeInUp">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="text-gold">Selamat Ulang Tahun</span>
            <br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Bu Guru
            </span>
          </h1>
          <div className="flex justify-center gap-2 text-2xl">
            {["🎉", "🎈", "🎂", "🎁", "✨"].map((emoji, i) => (
              <span
                key={i}
                className="animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Wishes Section */}
        <div
          className="max-w-4xl mx-auto px-4 mb-12 animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="glass-card-solid p-8 md:p-10 shadow-xl">
            <div className="text-center mb-6">
              <span className="text-4xl">💝</span>
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-800 mt-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Untukmu di Hari Spesial
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center">
                Selamat ulang tahun,{" "}
                <span className="font-bold text-rose-500">Ibu Sayang</span>! 🎂
              </p>

              <p className="text-gray-600 italic text-base md:text-lg text-center border-l-4 border-rose-300 pl-4">
                "Setiap tahun yang bertambah adalah hadiah terindah. Semoga
                umur, waktu, cinta, sehat, sakit dan bahagia ibu penuh dengan
                keberkahan."
              </p>
            </div>
          </div>
        </div>

        {/* Photo Slider */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-4 gap-[3px]">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="
        group
        relative
        aspect-square
        overflow-hidden
        bg-zinc-200
      "
              >
                <Image
                  fill
                  src={photo.src}
                  alt={photo.alt}
                  sizes="24"
                  className="
          object-cover
          transition-all
          duration-200
          group-hover:brightness-90
          shadow-lg
          rounded-md
        "
                />

                <div
                  className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          group-hover:opacity-100
          bg-black/10
        "
                />
              </div>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div
          className="text-center animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="inline-block border-t-2 border-rose-200 pt-4 px-8">
            <p className="text-gray-500">
              With love,{" "}
              <span className="font-semibold text-rose-500">dede & bapak</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              ✨ Bahagia selalu ibu✨
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Landing Page Component
function LandingPage({ onStart }: { onStart: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl"></div>

        {/* Decorative confetti */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {["🎉", "🎈", "🎂", "🎁", "✨"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="relative z-10 max-w-md mx-4">
        <div className="glass-card p-8 md:p-12 text-center transform transition-all duration-500 hover:scale-105">
          <div className="mb-1">
            <span className="text-7xl animate-bounce inline-block">
              <Image
                src={`/photos/ibu.png`}
                width={112}
                height={112}
                className="rounded-4xl border-2 border-amber-400 shadow-xl"
                alt="ibu"
              ></Image>
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="text-gold">Happy</span>
            <br />
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Birthday Ibu !
            </span>
            <br />
            <div className="bg-gradient-to-r text-2xl from-green-500 to-purple-500 bg-clip-text text-transparent">
              03 - 06 - 2026
            </div>
          </h1>

          <p className="text-gray-600 mb-8">
            Sebuah kejutan spesial dari dede dan bapak
          </p>

          <button
            onClick={onStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <div className="relative bg-white rounded-full px-8 py-3 flex items-center gap-2 shadow-lg">
              <span className="text-gray-800 font-semibold">Buka</span>
              <span
                className={`text-xl transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
              >
                🎁
              </span>
            </div>
          </button>

          <p className="text-xs text-gray-400 mt-6">
            ✨ Klik tombol untuk buka kejutan ✨
          </p>
        </div>
      </div>
    </div>
  );
}

// Wish Card Component
function WishCard({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

// Floating Balloons Component
function FloatingBalloons() {
  const [balloons, setBalloons] = useState<
    Array<{
      id: number;
      left: string;
      delay: string;
      size: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    const colors = [
      "#FF6B6B",
      "#FFB347",
      "#FF6B9D",
      "#4ECDC4",
      "#A8E6CF",
      "#FFE66D",
      "#C7B9FF",
    ];
    const newBalloons = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      size: 40 + Math.random() * 50,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setBalloons(newBalloons);
  }, []);

  return (
    <>
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="fixed bottom-[-100px] animate-float pointer-events-none"
          style={{
            left: balloon.left,
            animationDelay: balloon.delay,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        >
          <div
            className="relative rounded-full"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, ${balloon.color}, ${balloon.color}dd)`,
            }}
          >
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gray-400"></div>
          </div>
        </div>
      ))}
    </>
  );
}
