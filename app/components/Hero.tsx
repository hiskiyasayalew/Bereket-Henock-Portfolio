"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const PORTRAIT_CONFIG = {
  mobileWidth:
    "w-[94vw] max-w-[520px] sm:max-w-[600px] md:max-w-[680px] [@media(max-height:500px)_and_(orientation:landscape)]:max-w-[360px]",
  mobileScale:
    "scale-125 xs:scale-140 sm:scale-130 md:scale-120 lg:scale-100 [@media(max-height:500px)_and_(orientation:landscape)]:scale-100",
  mobileTranslateY:
    "-translate-y-28 xs:-translate-y-28 sm:-translate-y-24 md:-translate-y-20 min-[1025px]:-translate-y-75 xl:translate-y-0 [@media(max-height:500px)_and_(orientation:landscape)]:translate-y-0",
  mobileMaxHeight: "88vh",
  desktopWidth: "lg:max-w-[840px]",
  desktopMaxHeight: "82vh",
};

interface HeroProps {
  portraitSrc?: string;
  name?: string;
  tagline?: string;
  portraitMobileScale?: string;
  portraitMobileWidth?: string;
}

interface WorkItem {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
}

type SocialIconName =
  | "whatsapp"
  | "telegram"
  | "phone"
  | "instagram"
  | "tiktok";

interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconName;
  angle: number;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/251986656879",
    icon: "whatsapp",
    angle: 0,
  },
  {
    label: "Telegram",
    href: "https://t.me/bereket_enoch",
    icon: "telegram",
    angle: 72,
  },
  {
    label: "Phone",
    href: "tel:+251986656879",
    icon: "phone",
    angle: 144,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_b.e.k____?stkn=c2l0a2w1c2YxeWdk&utm_source=qr",
    icon: "instagram",
    angle: 216,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@_b.e.k___?_r=1&_t=ZS-9ADy0xgSriu",
    icon: "tiktok",
    angle: 288,
  },
];

const ORBIT_POINTS = [
  { left: "50%", top: "0%" },
  { left: "97.55%", top: "34.55%" },
  { left: "79.39%", top: "90.45%" },
  { left: "20.61%", top: "90.45%" },
  { left: "2.45%", top: "34.55%" },
];

const WORKS_LIST: WorkItem[] = [
  {
    id: "1",
    title: "2 September 2026",
    category: "Commercial/Ad",
    youtubeId: "bYQMCb9t86E",
  },
  {
    id: "2",
    title: "Try or Dump | Yorgo",
    category: "Commercial/Ad",
    youtubeId: "laRCroS4zWc",
  },
  {
    id: "3",
    title: "Food review | Andiamo",
    category: "Commercial/Ad",
    youtubeId: "gDbmKeoSSDI",
  },
  {
    id: "4",
    title: "Smoothie prep | Yorgo",
    category: "Commercial/Ad",
    youtubeId: "JRkhENuh7fc",
  },
  {
    id: "5",
    title: "CTA | Chewata Games",
    category: "Commercial/Ad",
    youtubeId: "3i3Wt3DMouQ",
  },
  {
    id: "6",
    title: "Misunderstanding - Andiamo",
    category: "Commercial/Ad",
    youtubeId: "3qDmFGWfp0I",
  },
  {
    id: "7",
    title: "Alahorno dish prep | Yorgo",
    category: "Commercial/Ad",
    youtubeId: "QSNB14GCTmY",
  },
  {
    id: "8",
    title: "Restaurant Commercial | Andiamo(01)",
    category: "Commercial/Ad",
    youtubeId: "zfMilaY7mYk",
  },
  {
    id: "9",
    title: "Food prep | Yorgo(01)",
    category: "Commercial/Ad",
    youtubeId: "LJEIL-RfVjM",
  },
  {
    id: "10",
    title: "Event Recap | Chewata Games",
    category: "Commercial/Ad",
    youtubeId: "-QE2cNNogVI",
  },
];

const GLITCH_GLYPHS = "!<>-_\\/[]{}—=+*^?#0123456789";

/* ============================================================================
   SOCIAL ICON
============================================================================ */

const SocialIcon = memo(function SocialIcon({
  name,
}: {
  name: SocialIconName;
}) {
  if (name === "whatsapp") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6"
      >
        <path
          d="M20.1 3.9A10 10 0 0 0 3.8 16.1L2 22l6-1.8A10 10 0 1 0 20.1 3.9Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.7 7.5c.2-.4.4-.4.7-.4h.6c.2 0 .4.1.5.4l.8 1.9c.1.2.1.4-.1.6l-.7.8c-.1.1-.1.3 0 .5.4.7 1.2 1.6 2 2.1.3.2.5.3.7.1l.8-.7c.2-.2.4-.2.6-.1l1.9.9c.2.1.3.3.3.5v.6c0 .3-.1.5-.4.7-.4.3-1 .5-1.5.5-.8 0-2.2-.5-3.7-1.7-1.4-1.1-2.5-2.4-3.1-3.6-.5-.9-.8-1.8-.7-2.5.1-.6.4-1.1.8-1.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "telegram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6"
      >
        <path
          d="M21.5 3.7 18.2 20c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L5.7 13.9.9 12.4c-1-.3-1-1 .2-1.5L19.9 3.4c.9-.3 1.8.2 1.6.3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6"
      >
        <path
          d="M7.1 3.5 5.4 5.2c-.7.7-.8 1.8-.4 2.7 1.9 4.2 5 7.4 9.2 9.2.9.4 2 .3 2.7-.4l1.7-1.7c.5-.5.5-1.3.1-1.9l-1.8-2.6c-.4-.6-1.2-.8-1.8-.5l-1.7.8c-1.5-.8-2.7-2-3.5-3.5l.8-1.7c.3-.7.1-1.4-.5-1.8L9 3.4c-.6-.4-1.4-.4-1.9.1Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6"
    >
      <path
        d="M14.2 3c.3 2.5 1.7 4 4.3 4.2v3.1c-1.5-.1-2.9-.5-4.3-1.3v6.1c0 3.4-2.2 5.6-5.3 5.6-3 0-5.2-2.2-5.2-5 0-3.2 2.5-5.3 5.8-5.3.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.3 0-2.4.8-2.4 2.1 0 1.2.9 2 2 2 1.4 0 2.1-.9 2.1-2.6V3h3Z"
        fill="currentColor"
      />
    </svg>
  );
});

/* ============================================================================
   GLITCH SCRAMBLE
============================================================================ */

const scrambleElement = (
  element: HTMLElement,
  finalText: string,
  duration = 850
) => {
  let startTime: number | null = null;
  let animationFrame = 0;

  const animate = (time: number) => {
    if (startTime === null) {
      startTime = time;
    }

    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const revealCount = Math.floor(eased * finalText.length);

    let output = "";

    for (let i = 0; i < finalText.length; i++) {
      const character = finalText[i];

      if (character === " ") {
        output += " ";
      } else if (i < revealCount - 1) {
        output += character;
      } else {
        output +=
          GLITCH_GLYPHS[
            Math.floor(Math.random() * GLITCH_GLYPHS.length)
          ];
      }
    }

    element.textContent = progress >= 1 ? finalText : output;

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    }
  };

  animationFrame = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationFrame);
    element.textContent = finalText;
  };
};

/* ============================================================================
   HERO
============================================================================ */

const Hero: React.FC<HeroProps> = ({
  portraitSrc = "/portrait.png",
  name = "Bereket Henock",
  tagline = "Creative Developer & Visual Designer",
  portraitMobileScale,
  portraitMobileWidth,
}) => {
  const [activeFullscreenVideo, setActiveFullscreenVideo] =
    useState<string | null>(null);

  const [orbitPaused, setOrbitPaused] = useState(false);

  const [sliderPosition, setSliderPosition] = useState(50);

  const isDraggingRef = useRef(false);

  const comparisonContainerRef =
    useRef<HTMLDivElement | null>(null);

  const beforeVideoRef =
    useRef<HTMLVideoElement | null>(null);

  const afterVideoRef =
    useRef<HTMLVideoElement | null>(null);

  const heroRef = useRef<HTMLDivElement | null>(null);

  const heroContentRef =
    useRef<HTMLDivElement | null>(null);

  const aboutRef = useRef<HTMLElement | null>(null);

  const aboutGlitchHasRun =
    useRef(false);

  /* ==========================================================================
     VIDEO SYNCHRONIZATION
  ========================================================================== */

  useEffect(() => {
    const beforeVideo = beforeVideoRef.current;
    const afterVideo = afterVideoRef.current;

    if (!beforeVideo || !afterVideo) {
      return;
    }

    let animationFrame = 0;

    const syncVideos = () => {
      animationFrame = 0;

      if (
        beforeVideo.readyState < 2 ||
        afterVideo.readyState < 2
      ) {
        return;
      }

      const difference = Math.abs(
        beforeVideo.currentTime -
          afterVideo.currentTime
      );

      if (difference > 0.08) {
        try {
          afterVideo.currentTime =
            beforeVideo.currentTime;
        } catch {
          // Ignore seek errors while media is initializing.
        }
      }
    };

    const handleTimeUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame =
        requestAnimationFrame(syncVideos);
    };

    beforeVideo.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    return () => {
      beforeVideo.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  /* ==========================================================================
     HERO FADE
  ========================================================================== */

  useEffect(() => {
    let animationFrame = 0;

    const updateFade = () => {
      animationFrame = 0;

      const hero = heroRef.current;
      const content = heroContentRef.current;

      if (!hero || !content) {
        return;
      }

      const rect = hero.getBoundingClientRect();

      const fadeDistance =
        window.innerHeight * 0.75;

      const scrolled = Math.max(
        0,
        -rect.top
      );

      const progress = Math.min(
        scrolled / fadeDistance,
        1
      );

      const opacity = 1 - progress;

      content.style.opacity =
        opacity.toString();

      content.style.pointerEvents =
        opacity > 0.05
          ? "auto"
          : "none";
    };

    const requestUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame =
        requestAnimationFrame(updateFade);
    };

    requestUpdate();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate,
      { passive: true }
    );

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );
    };
  }, []);

  /* ==========================================================================
     HERO IMAGE READY
  ========================================================================== */

  const handlePortraitLoad = useCallback(() => {
    if (heroRef.current) {
      heroRef.current.dataset.heroReady = "true";
    }

    window.dispatchEvent(
      new Event("hero-ready")
    );
  }, []);

  /* ==========================================================================
     ABOUT GLITCH
  ========================================================================== */

  useEffect(() => {
    const about = aboutRef.current;

    if (!about) {
      return;
    }

    const timeoutIds: number[] = [];
    const cleanupAnimations: Array<() => void> = [];

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (
            !entry.isIntersecting ||
            aboutGlitchHasRun.current
          ) {
            return;
          }

          aboutGlitchHasRun.current = true;

          const elements =
            Array.from(
              about.querySelectorAll<HTMLElement>(
                "[data-glitch-text]"
              )
            );

          elements.forEach(
            (element, index) => {
              const finalText =
                element.dataset.glitchText ||
                element.textContent ||
                "";

              const timeoutId =
                window.setTimeout(() => {
                  const cleanup =
                    scrambleElement(
                      element,
                      finalText,
                      750
                    );

                  cleanupAnimations.push(
                    cleanup
                  );
                }, index * 90);

              timeoutIds.push(timeoutId);
            }
          );
        },
        {
          threshold: 0.18,
        }
      );

    observer.observe(about);

    return () => {
      observer.disconnect();

      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });

      cleanupAnimations.forEach(
        (cleanup) => cleanup()
      );
    };
  }, []);

  /* ==========================================================================
     BEFORE / AFTER SLIDER
  ========================================================================== */

  const handleMove = useCallback(
    (clientX: number) => {
      const container =
        comparisonContainerRef.current;

      if (!container) {
        return;
      }

      const rect =
        container.getBoundingClientRect();

      if (rect.width <= 0) {
        return;
      }

      const offsetX =
        clientX - rect.left;

      const percentage = Math.min(
        Math.max(
          (offsetX / rect.width) * 100,
          0
        ),
        100
      );

      setSliderPosition((previous) => {
        if (
          Math.abs(
            previous - percentage
          ) < 0.1
        ) {
          return previous;
        }

        return percentage;
      });
    },
    []
  );

  const handleMouseDown =
    useCallback(() => {
      isDraggingRef.current = true;
    }, []);

  const handleMouseUp =
    useCallback(() => {
      isDraggingRef.current = false;
    }, []);

  const handleMouseLeave =
    useCallback(() => {
      isDraggingRef.current = false;
    }, []);

  const handleMouseMove =
    useCallback(
      (event: React.MouseEvent) => {
        if (!isDraggingRef.current) {
          return;
        }

        handleMove(event.clientX);
      },
      [handleMove]
    );

  const handleTouchMove =
    useCallback(
      (event: React.TouchEvent) => {
        const touch = event.touches[0];

        if (!touch) {
          return;
        }

        handleMove(touch.clientX);
      },
      [handleMove]
    );

  const handleSliderChange =
    useCallback(
      (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setSliderPosition(
          Number(event.target.value)
        );
      },
      []
    );

  const openFullscreenVideo =
    useCallback((youtubeId: string) => {
      setActiveFullscreenVideo(youtubeId);
    }, []);

  const closeFullscreenVideo =
    useCallback(() => {
      setActiveFullscreenVideo(null);
    }, []);

  return (
    <div
      className="relative w-full min-h-screen bg-[#050007] text-white selection:bg-[#b500ff] selection:text-white"
      style={
        {
          "--orbit-duration": "65s",
        } as React.CSSProperties
      }
    >
      {/* PURPLE BACKDROP */}

      <div
        className="
          fixed
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[300px]
          h-[300px]
          sm:w-[440px]
          sm:h-[440px]
          md:w-[580px]
          md:h-[580px]
          lg:w-[680px]
          lg:h-[680px]
          [@media(max-height:500px)_and_(orientation:landscape)]:w-[300px]
          [@media(max-height:500px)_and_(orientation:landscape)]:h-[300px]
          rounded-full
          pointer-events-none
          z-0
        "
        style={{
          background:
            "linear-gradient(to top, #050006 0%, #130719 17%, #250d30 32%, #381149 48%, #5e147d 62%, #7813a2 75%, #980ed1 89%, #b500ff 100%)",
          boxShadow:
            "0 0 140px rgba(181, 0, 255, 0.28), inset 0 0 90px rgba(181, 0, 255, 0.20)",
        }}
      />

      {/* NAVIGATION */}

      <header className="fixed top-0 inset-x-0 z-50 px-6 py-5 md:px-12 md:py-6 flex items-center justify-between bg-transparent">
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            className="flex items-center gap-2 group"
          >
            <span className="font-mono text-sm tracking-widest uppercase font-semibold text-white/90">
              {name}
            </span>
          </a>

          <div className="hidden lg:block w-36 xl:w-40 h-[.5px] bg-white/20" />
        </div>

        <nav className="hidden md:flex items-center gap-48 text-sm uppercase tracking-[0.1em] font-medium text-neutral-400">
          <a
            href="#about"
            className="hover:text-white transition-colors"
          >
            About
          </a>

          <a
            href="#works"
            className="hover:text-white transition-colors"
          >
            Works
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block w-24 xl:w-40 h-[.5px] bg-white/20" />

          <a
            href="tel:+251986656879"
            className="px-5 py-2.5 md:px-7 md:py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 border border-white/20 text-xs md:text-sm font-semibold tracking-wider uppercase"
          >
            Let&apos;s Talk
          </a>
        </div>
      </header>

      {/* HERO */}

      <div
        id="hero"
        ref={heroRef}
        className="relative w-full h-[160vh]"
      >
        <section className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-20 pb-4">
          <div
            ref={heroContentRef}
            className="relative w-full h-full flex flex-col justify-between"
            style={{
              opacity: 1,
              willChange: "opacity",
            }}
          >
            {/* SOCIAL ORBIT */}

            <div
              className="
                fixed
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[360px]
                h-[360px]
                sm:w-[510px]
                sm:h-[510px]
                md:w-[660px]
                md:h-[660px]
                lg:w-[770px]
                lg:h-[770px]
                z-30
                pointer-events-none
              "
              onMouseEnter={() =>
                setOrbitPaused(true)
              }
              onMouseLeave={() =>
                setOrbitPaused(false)
              }
            >
              <div
                className="absolute inset-0"
                style={{
                  animation:
                    "heroSocialOrbit var(--orbit-duration) linear infinite",
                  animationPlayState:
                    orbitPaused
                      ? "paused"
                      : "running",
                  willChange: "transform",
                }}
              >
                {SOCIAL_LINKS.map(
                  (link, index) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith(
                          "tel:"
                        )
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        link.href.startsWith(
                          "tel:"
                        )
                          ? undefined
                          : "noopener noreferrer"
                      }
                      aria-label={link.label}
                      style={{
                        left:
                          ORBIT_POINTS[index]
                            .left,
                        top:
                          ORBIT_POINTS[index]
                            .top,
                      }}
                      className="
                        absolute
                        -translate-x-1/2
                        -translate-y-1/2
                        pointer-events-auto
                        cursor-pointer
                        touch-manipulation
                        w-10
                        h-10
                        sm:w-12
                        sm:h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-[#d8a7ff]
                        bg-[#16051f]/90
                        border
                        border-[#b500ff]/40
                        backdrop-blur-md
                        shadow-[0_0_25px_rgba(181,0,255,0.25)]
                        hover:text-white
                        hover:border-[#b500ff]
                        hover:bg-[#b500ff]/20
                        hover:shadow-[0_0_35px_rgba(181,0,255,0.6)]
                        transition-all
                        duration-300
                      "
                    >
                      <span
                        className="flex items-center justify-center pointer-events-none"
                        style={{
                          animation:
                            "heroSocialCounter var(--orbit-duration) linear infinite",
                          animationPlayState:
                            orbitPaused
                              ? "paused"
                              : "running",
                          willChange:
                            "transform",
                        }}
                      >
                        <SocialIcon
                          name={link.icon}
                        />
                      </span>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* MOBILE TITLE */}

            <div className="md:hidden z-20 px-6 pt-2 text-center flex flex-col items-center">
              <div className="w-full max-w-[300px] py-3 px-4 rounded-2xl">
                <h1 className="text-xl font-bold tracking-tight text-white uppercase">
                  {name}
                </h1>

                <p className="text-xs text-neutral-400 mt-1 font-mono tracking-wide">
                  {tagline}
                </p>
              </div>
            </div>

            {/* PORTRAIT */}

            <div className="relative w-full flex-1 flex items-end justify-center pointer-events-none">
              <div
                className={`relative z-10 w-full flex justify-center items-end origin-bottom ${
                  portraitMobileWidth ||
                  PORTRAIT_CONFIG.mobileWidth
                } ${
                  PORTRAIT_CONFIG.desktopWidth
                } ${
                  portraitMobileScale ||
                  PORTRAIT_CONFIG.mobileScale
                } ${
                  PORTRAIT_CONFIG.mobileTranslateY
                }`}
              >
                <img
                  src={portraitSrc}
                  alt={name}
                  className="w-full h-auto object-cover object-bottom select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onLoad={handlePortraitLoad}
                  draggable={false}
                  style={{
                    maxHeight:
                      PORTRAIT_CONFIG.mobileMaxHeight,
                    filter:
                      "contrast(1.04) brightness(0.96)",
                  }}
                />

                <div
                  className="absolute inset-x-0 -bottom-28 pointer-events-none"
                  style={{
                    height: "75%",
                    background:
                      "linear-gradient(to top, #050007 0%, #050007 25%, rgba(5, 0, 7, 0.92) 50%, rgba(5, 0, 7, 0.55) 75%, transparent 100%)",
                  }}
                />
              </div>

              {/* DESKTOP LEFT */}

              <div className="hidden md:block absolute left-8 lg:left-14 top-1/2 -translate-y-1/2 z-20 max-w-xs lg:max-w-sm pointer-events-auto">
                <div className="p-5 rounded-2xl hover:border-[#b500ff]/30 transition-all duration-300">
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d8a7ff] block mb-1">
                    Introduction
                  </span>

                  <p className="text-base lg:text-lg font-semibold tracking-wide text-neutral-100">
                    Creative Developer
                    <br />
                    Visual Designer
                  </p>
                </div>
              </div>

              {/* DESKTOP RIGHT */}

              <div className="hidden md:block absolute right-8 lg:right-14 bottom-10 z-20 max-w-xs lg:max-w-md pointer-events-auto">
                <div className="p-6 rounded-2xl shadow-2xl">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-white/90 mb-2">
                    Based in Addis Ababa
                  </h3>

                  <p className="text-xs lg:text-sm text-neutral-400 leading-relaxed">
                    Specialized in crafting cinematic
                    visual stories, dynamic edits, and
                    distinctive digital experiences,
                    with a focus on creative storytelling,
                    precise pacing, and modern visual
                    identity
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE SCROLL */}

            <div className="md:hidden z-20 w-full px-6 pb-4 pt-1 flex justify-end">
              <div className="px-4 py-2 rounded-xl text-right">
                <p className="text-xs font-mono font-medium tracking-wider uppercase text-neutral-300">
                  Scroll to explore ↓
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ABOUT */}

      <section
        id="about"
        ref={aboutRef}
        className="relative z-10 w-full min-h-screen py-24 px-6 md:px-14 lg:px-24 flex items-center justify-center"
      >
        <div className="w-full max-w-5xl rounded-3xl p-8 sm:p-12 md:p-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-[#b500ff]" />

            <span
              data-glitch-text="About The Me"
              className="text-xs font-mono uppercase tracking-[0.3em] text-[#d8a7ff]"
            >
              About The Me
            </span>
          </div>

          <h2
            data-glitch-text="HI I'AM BEREKET"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.15]"
          >
            HI I&apos;AM BEREKET
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            <p>
              I am a digital artisan focused on the art of
              cinematic video editing and visual
              storytelling. With a relentless focus on
              aesthetic rhythm, color dynamics, sound, and
              visual pacing, I transform raw footage and
              ideas into immersive, emotionally driven
              visual experiences.
            </p>

            <p>
              Every cut, transition, and frame is crafted
              for maximum visual impact. Whether shaping
              the atmosphere through cinematic color
              grading, designing immersive soundscapes,
              or refining visual pacing, the mission
              remains unwavering: transforming raw footage
              into compelling stories that push creative
              vision beyond conventional boundaries.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10">
            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-mono text-white">
                150+
              </span>

              <span className="text-xs tracking-wider uppercase text-neutral-400">
                Projects Shipped
              </span>
            </div>

            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-mono text-white">
                4K+
              </span>

              <span className="text-xs tracking-wider uppercase text-neutral-400">
                Graded Frames
              </span>
            </div>

            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-mono text-white">
                100%
              </span>

              <span className="text-xs tracking-wider uppercase text-neutral-400">
                Creative Ownership
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}

      <section
        id="works"
        className="relative z-10 w-full min-h-screen py-24 px-6 md:px-14 lg:px-24 flex flex-col justify-center"
      >
        <div className="max-w-5xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-[#b500ff]" />

              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d8a7ff]">
                Selected Works
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Visual Archives
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Click any window to view in full resolution
          </p>
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKS_LIST.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                openFullscreenVideo(
                  item.youtubeId
                )
              }
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#b500ff]/50 transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-video w-full pointer-events-none overflow-hidden">
                <iframe
                  className="w-full h-full scale-105 group-hover:scale-110 transition-transform duration-700"
                  src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtubeId}&playsinline=1`}
                  title={item.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />

                <div className="absolute inset-0 bg-transparent" />
              </div>

              <div className="p-5 flex items-center justify-between bg-black/40">
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#d8a7ff] transition-colors">
                    {item.title}
                  </h4>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {item.category}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs group-hover:bg-white group-hover:text-black transition-all">
                  ↗
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN VIDEO */}

      {activeFullscreenVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10">
          <button
            onClick={closeFullscreenVideo}
            className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white text-xs font-mono uppercase tracking-widest border border-white/20 transition-all"
          >
            Close [ESC]
          </button>

          <div className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeFullscreenVideo}?autoplay=1&controls=1&rel=0`}
              title="Fullscreen Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* BEFORE / AFTER */}

      <section
        id="comparison"
        className="relative z-10 w-full min-h-screen py-24 px-6 md:px-14 lg:px-24 flex flex-col items-center justify-center"
      >
        <div className="max-w-4xl w-full text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-[#b500ff]" />

            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d8a7ff]">
              Interactive Comparison
            </span>

            <span className="h-[1px] w-6 bg-[#b500ff]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Before &amp; After Edit
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Drag the central slider node left or right
            to inspect the raw camera capture versus the
            finalized cinematic color-graded master.
          </p>
        </div>

        <div
          ref={comparisonContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl select-none cursor-ew-resize bg-black"
        >
          {/* AFTER */}

          <div className="absolute inset-0 w-full h-full">
            <video
              ref={afterVideoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              style={{
                filter:
                  "saturate(1.3) contrast(1.15) brightness(1.05)",
              }}
            />

            <span className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-[#d8a7ff]">
              After (Graded)
            </span>
          </div>

          {/* BEFORE */}

          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{
              width: `${sliderPosition}%`,
            }}
          >
            <div className="relative h-full w-[100vw] max-w-5xl">
              <video
                ref={beforeVideoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{
                  filter:
                    "saturate(0.55) contrast(0.85) brightness(0.9)",
                }}
              />

              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Before (Raw Log)
              </span>
            </div>
          </div>

          {/* SLIDER */}

          <div
            className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center"
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-[2px] h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

            <div className="absolute w-10 h-10 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-neutral-300">
              <span className="select-none tracking-tighter">
                ◀▶
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs mt-6 md:hidden">
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full accent-[#b500ff] cursor-pointer"
          />
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroSocialOrbit {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }

            @keyframes heroSocialCounter {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(-360deg);
              }
            }
          `,
        }}
      />
    </div>
  );
};

export default Hero;