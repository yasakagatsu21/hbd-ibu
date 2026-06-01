"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function BirthdayPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ganti dengan foto-foto Anda
  const photos = [
    { src: "/photos/1.jpg", caption: "Kenangan indah bersama ✨" },
    { src: "/photos/2.jpg", caption: "Tawa dan kebahagiaan 🎈" },
    { src: "/photos/3.jpg", caption: "Momen spesial 💝" },
  ];

  useEffect(() => {
    if (isStarted && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isStarted]);

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
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-20 bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

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
                umur, waktu, cinta, sehat, sakit dan bahagia-mu penuh dengan
                keberkahan."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <WishCard
                  emoji="🌟"
                  title="Kebahagiaan"
                  text="Semoga setiap hari selalu diiringi tawa dan kebahagiaan"
                />
                <WishCard
                  emoji="💫"
                  title="Kesuksesan"
                  text="Mimpimu adalah peta menuju masa depan yang cerah"
                />
                <WishCard
                  emoji="❤️"
                  title="Kesehatan"
                  text="Tubuh yang sehat untuk menikmati setiap momen berharga"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <WishCard
                  emoji="🌈"
                  title="Petualangan"
                  text="Semoga selalu berani mengejar hal-hal baru"
                />
                <WishCard
                  emoji="🕊️"
                  title="Kedamaian"
                  text="Hati yang tenang dalam menghadapi segala hal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Photo Slider */}
        <div
          className="max-w-4xl mx-auto px-4 mb-12 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white/50 backdrop-blur-sm">
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src={photos[currentPhotoIndex].src}
                  sizes="full"
                  alt={`Birthday memory ${currentPhotoIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
                  <p className="text-lg md:text-xl font-medium drop-shadow-lg">
                    {photos[currentPhotoIndex].caption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPhotoIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentPhotoIndex
                    ? "w-8 bg-rose-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
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
            ✨ Klik tombol di atas untuk memulai ✨
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
