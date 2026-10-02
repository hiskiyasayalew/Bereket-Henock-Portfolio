"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  /** Callback fired when preloader finishes and reveals hero */
  onLoaded?: () => void;
}

interface Particle {
  el: SVGCircleElement | null;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ropeRef = useRef<SVGPathElement | null>(null);
  const bobGroupRef = useRef<SVGGElement | null>(null);
  const fireCoreRef = useRef<SVGGElement | null>(null);
  const ignitionFlashRef = useRef<SVGCircleElement | null>(null);
  const flameTonguesRef = useRef<SVGPathElement | null>(null);
  const ambientGlowRef = useRef<SVGCircleElement | null>(null);

  const titleTextRef = useRef<HTMLSpanElement | null>(null);

  // Particle layer refs
  const smokeContainerRef = useRef<SVGGElement | null>(null);
  const emberContainerRef = useRef<SVGGElement | null>(null);

  // Responsive SVG Canvas Width
  const [svgDimensions, setSvgDimensions] = useState({
    width: 1000,
    height: 1000,
  });

  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

    // Calculate real aspect ratio so (0,0) is ALWAYS the exact top-left corner
    const winW = typeof window !== "undefined" ? window.innerWidth : 1000;
    const winH = typeof window !== "undefined" ? window.innerHeight : 1000;

    const aspect = winW / winH;
    const svgWidth = Math.max(1000, Math.round(1000 * aspect));
    const svgHeight = 1000;

    setSvgDimensions({
      width: svgWidth,
      height: svgHeight,
    });

    const originX = svgWidth / 2;
    const originY = 0;

    // ============================================================
    // FIXED SHORT ROPE
    // The rope has one fixed length and never extends during swing.
    // ============================================================

    const targetCornerX = 25;
    const targetCornerY = 160;

    const fullRopeLength =
      Math.hypot(
        originX - targetCornerX,
        targetCornerY - originY
      ) * 1.02;

    // Fixed shorter length
    const fixedRopeLength = fullRopeLength * 0.78;

    const targetAngle =
      -Math.atan2(
        originX - targetCornerX,
        targetCornerY - originY
      ) *
      (180 / Math.PI);

    const activeTweens: (gsap.core.Tween | gsap.core.Timeline)[] = [];

    // Simulation & Animation State
    const state = {
      amplitude: 15,
      time: 0,
      angle: 0,
      prevAngle: 0,
      velocity: 0,
      lag1: 0,
      lag2: 0,

      // Fire effects are intentionally disabled.
      fireIntensity: 0,
      flameFlicker: 1,

      hasImpacted: false,
    };

    // Natural kinetic ramp
    const ampTween = gsap.to(state, {
      amplitude: Math.abs(targetAngle) + 3,
      duration: 6.2,
      ease: "power1.in",
    });

    activeTweens.push(ampTween);

    // ============================================================
    // FIRE IGNITION REMOVED
    // No ignition timeline and no fire activation.
    // ============================================================

    // --- Particle Pools ---
    const EMBER_COUNT = isMobile ? 24 : 50;
    const SMOKE_COUNT = isMobile ? 8 : 18;

    const embers: Particle[] = [];
    const smokes: Particle[] = [];

    const emberColors = [
      "#ffffff",
      "#fff275",
      "#ff8800",
      "#ff3700",
      "#ff0044",
    ];

    if (emberContainerRef.current) {
      emberContainerRef.current.innerHTML = "";

      for (let i = 0; i < EMBER_COUNT; i++) {
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

        circle.setAttribute("r", "0");
        circle.setAttribute("opacity", "0");
        circle.style.mixBlendMode = "screen";

        emberContainerRef.current.appendChild(circle);

        embers.push({
          el: circle,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          life: 0,
          maxLife: 30 + Math.random() * 25,
          size: 1.8 + Math.random() * 3.2,
          color: emberColors[i % emberColors.length],
        });
      }
    }

    if (smokeContainerRef.current) {
      smokeContainerRef.current.innerHTML = "";

      for (let i = 0; i < SMOKE_COUNT; i++) {
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

        circle.setAttribute("r", "0");
        circle.setAttribute("opacity", "0");
        circle.setAttribute("fill", "#110b14");
        circle.setAttribute("filter", "url(#smokeBlur)");

        smokeContainerRef.current.appendChild(circle);

        smokes.push({
          el: circle,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          life: 0,
          maxLife: 45 + Math.random() * 25,
          size: 14 + Math.random() * 18,
        });
      }
    }

    // --- Glitch Text Engine ---
    const GLYPHS =
      "!<>-_\\/[]{}—=+*^?#_______0123456789";

    const WORDS = [
      "Bereket Henock",
      "loading",
      "Bereket Henock",
    ];

    let wordIdx = 0;
    let scrambleFrame = 0;
    let scrambleTimer = 0;
    let currentText = WORDS[0];
    let targetText = WORDS[0];
    let isTransitioning = false;
    let textHoldCounter = 0;

    // ============================================================
    // FINISH PRELOADER
    // Triggered after exactly 3 seconds.
    // No impact / slam / explosion.
    // ============================================================

    const finishPreloader = () => {
      if (state.hasImpacted) return;

      state.hasImpacted = true;

      if (bobGroupRef.current) {
        gsap.to(bobGroupRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      if (ropeRef.current) {
        gsap.to(ropeRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      if (titleTextRef.current?.parentElement) {
        const titleFade = gsap.to(
          titleTextRef.current.parentElement,
          {
            opacity: 0,
            duration: 0.15,
          }
        );

        activeTweens.push(titleFade);
      }

      const exitTL = gsap.timeline({
        delay: 0.45,
      });

      exitTL
        .to(containerRef.current, {
          backgroundColor: "#000000",
          duration: 0.25,
          ease: "power2.in",
        })
        .to({}, { duration: 0.4 })
        .to(containerRef.current, {
          opacity: 0,
          duration: 1.3,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.ticker.remove(tick);

            if (onLoadedRef.current) {
              onLoadedRef.current();
            }
          },
        });

      activeTweens.push(exitTL);
    };

    // ============================================================
    // AUTOMATIC 3 SECOND PRELOADER
    // ============================================================

    const finishTimer = window.setTimeout(() => {
      finishPreloader();
    }, 3000);

    // ============================================================
    // MAIN PHYSICS LOOP
    // ============================================================

    const tick = () => {
      if (state.hasImpacted) return;

      state.time += 0.034;

      // ==========================================================
      // FIXED ROPE LENGTH
      // This NEVER changes while the ball is swinging.
      // ==========================================================

      const currentRopeLength = fixedRopeLength;

      // Harmonic swing cadence
      state.prevAngle = state.angle;

      state.angle =
        Math.sin(state.time * 1.85) *
        state.amplitude;

      state.velocity =
        state.angle - state.prevAngle;

      state.lag1 +=
        (state.angle - state.lag1) * 0.13;

      state.lag2 +=
        (state.angle - state.lag2) * 0.065;

      const twirlUpper =
        Math.sin(state.time * 4.5) *
        state.velocity *
        4.2;

      const twirlLower =
        Math.cos(state.time * 5.2) *
        state.velocity *
        7.5;

      const toRad = Math.PI / 180;

      const radBob =
        state.angle * toRad;

      const rad1 =
        (state.lag1 + twirlUpper) *
        toRad;

      const rad2 =
        (state.lag2 + twirlLower) *
        toRad;

      const bobX =
        originX +
        Math.sin(radBob) *
          currentRopeLength;

      const bobY =
        originY +
        Math.cos(radBob) *
          currentRopeLength;

      const cp1X =
        originX +
        Math.sin(rad1) *
          (currentRopeLength * 0.38);

      const cp1Y =
        originY +
        Math.cos(rad1) *
          (currentRopeLength * 0.38);

      const cp2X =
        originX +
        Math.sin(rad2) *
          (currentRopeLength * 0.74);

      const cp2Y =
        originY +
        Math.cos(rad2) *
          (currentRopeLength * 0.74);

      // ==========================================================
      // UPDATE ROPE
      // Same fixed length throughout the entire animation.
      // ==========================================================

      if (ropeRef.current) {
        ropeRef.current.setAttribute(
          "d",
          `M ${originX} ${originY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${bobX} ${bobY}`
        );
      }

      // Update Bob Transform & Tangent Tilt
      const tangentAngle =
        Math.atan2(
          bobY - cp2Y,
          bobX - cp2X
        ) *
          (180 / Math.PI) -
        90;

      if (bobGroupRef.current) {
        bobGroupRef.current.setAttribute(
          "transform",
          `translate(${bobX}, ${bobY}) rotate(${tangentAngle})`
        );
      }

      // ==========================================================
      // FIRE DYNAMICS
      // Kept in place but never activated because
      // fireIntensity remains 0.
      // ==========================================================

      if (state.fireIntensity > 0.05) {
        const fi = state.fireIntensity;
        const flick = state.flameFlicker;

        if (fireCoreRef.current) {
          fireCoreRef.current.setAttribute(
            "opacity",
            `${Math.min(fi, 1)}`
          );

          fireCoreRef.current.setAttribute(
            "transform",
            `scale(${1 + (flick - 1) * 0.45})`
          );
        }

        if (ambientGlowRef.current) {
          ambientGlowRef.current.setAttribute(
            "opacity",
            `${0.4 * fi * flick}`
          );

          ambientGlowRef.current.setAttribute(
            "r",
            `${85 * fi * flick}`
          );
        }

        if (flameTonguesRef.current) {
          const windTrail =
            -state.velocity * 26 * fi;

          const flameHeight =
            (-58 -
              Math.sin(state.time * 9) * 16) *
            flick *
            fi;

          const fLeft =
            -16 +
            Math.cos(state.time * 10) * 5;

          const fRight =
            16 +
            Math.sin(state.time * 8) * 5;

          flameTonguesRef.current.setAttribute(
            "d",
            `M ${fLeft} -6 Q ${
              windTrail * 0.4
            } ${
              flameHeight * 0.4
            } ${
              windTrail * 0.75
            } ${flameHeight} Q ${
              windTrail * 0.2
            } ${
              flameHeight * 0.5
            } ${fRight} -6 Z`
          );

          flameTonguesRef.current.setAttribute(
            "opacity",
            `${0.95 * fi}`
          );
        }

        // Embers Simulation
        for (let i = 0; i < embers.length; i++) {
          const p = embers[i];

          if (
            p.life <= 0 &&
            Math.random() <
              (isMobile ? 0.32 : 0.52) *
                fi
          ) {
            p.life = p.maxLife;

            p.x =
              bobX +
              (Math.random() - 0.5) * 18;

            p.y =
              bobY +
              (Math.random() - 0.5) * 18;

            p.vx =
              -state.velocity * 2.5 +
              (Math.random() - 0.5) * 4.5;

            p.vy =
              -3.8 -
              Math.random() * 4.5;
          } else if (p.life > 0) {
            p.life--;

            p.x += p.vx;
            p.y += p.vy;

            p.vy -= 0.045;
            p.vx *= 0.98;

            const progress =
              p.life / p.maxLife;

            if (p.el) {
              p.el.setAttribute(
                "cx",
                `${p.x}`
              );

              p.el.setAttribute(
                "cy",
                `${p.y}`
              );

              p.el.setAttribute(
                "r",
                `${p.size * progress}`
              );

              p.el.setAttribute(
                "opacity",
                `${progress}`
              );

              p.el.setAttribute(
                "fill",
                p.color || "#ff7b00"
              );
            }
          } else if (
            p.el &&
            p.el.getAttribute("opacity") !==
              "0"
          ) {
            p.el.setAttribute(
              "opacity",
              "0"
            );
          }
        }

        // Smoke Simulation
        for (let i = 0; i < smokes.length; i++) {
          const s = smokes[i];

          if (
            s.life <= 0 &&
            Math.random() <
              (isMobile ? 0.1 : 0.16) *
                fi
          ) {
            s.life = s.maxLife;

            s.x =
              bobX +
              (Math.random() - 0.5) * 10;

            s.y = bobY - 10;

            s.vx =
              -state.velocity * 1.3 +
              (Math.random() - 0.5) * 1.8;

            s.vy =
              -2 -
              Math.random() * 2.2;
          } else if (s.life > 0) {
            s.life--;

            s.x += s.vx;
            s.y += s.vy;

            s.vy -= 0.035;
            s.vx *= 0.97;

            const progress =
              s.life / s.maxLife;

            const expansion =
              (1 - progress) * 24;

            if (s.el) {
              s.el.setAttribute(
                "cx",
                `${s.x}`
              );

              s.el.setAttribute(
                "cy",
                `${s.y}`
              );

              s.el.setAttribute(
                "r",
                `${s.size + expansion}`
              );

              s.el.setAttribute(
                "opacity",
                `${progress * 0.45 * fi}`
              );
            }
          } else if (
            s.el &&
            s.el.getAttribute("opacity") !==
              "0"
          ) {
            s.el.setAttribute(
              "opacity",
              "0"
            );
          }
        }
      }

      // ==========================================================
      // GLITCH SHUFFLE TEXT ENGINE
      // ==========================================================

      textHoldCounter++;

      if (
        !isTransitioning &&
        textHoldCounter > 54
      ) {
        if (wordIdx < WORDS.length - 1) {
          isTransitioning = true;
          scrambleFrame = 0;

          wordIdx =
            (wordIdx + 1) %
            WORDS.length;

          targetText =
            WORDS[wordIdx];
        }
      }

      if (isTransitioning) {
        scrambleTimer++;

        if (scrambleTimer % 2 === 0) {
          scrambleFrame++;

          const maxLen = Math.max(
            currentText.length,
            targetText.length
          );

          let output = "";
          let complete = true;

          for (
            let i = 0;
            i < maxLen;
            i++
          ) {
            if (
              i < targetText.length
            ) {
              if (
                scrambleFrame >=
                8 + i * 2
              ) {
                output +=
                  targetText[i];
              } else {
                output +=
                  GLYPHS[
                    Math.floor(
                      Math.random() *
                        GLYPHS.length
                    )
                  ];

                complete = false;
              }
            } else if (
              scrambleFrame < 8
            ) {
              output +=
                GLYPHS[
                  Math.floor(
                    Math.random() *
                      GLYPHS.length
                  )
                ];

              complete = false;
            }
          }

          if (titleTextRef.current) {
            titleTextRef.current.textContent =
              output;
          }

          if (complete) {
            isTransitioning = false;
            currentText =
              targetText;
            textHoldCounter = 0;
            scrambleFrame = 0;
          }
        }
      }
    };

    gsap.ticker.add(tick);

    return () => {
      window.clearTimeout(finishTimer);

      gsap.ticker.remove(tick);

      activeTweens.forEach((t) =>
        t.kill()
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#030306",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
        contain: "strict",
      }}
    >
      <svg
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "100vh",
          pointerEvents: "none",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <defs>
         <linearGradient
  id="orbGradient"
  x1="20%"
  y1="10%"
  x2="80%"
  y2="90%"
>
  <stop
    offset="0%"
    stopColor="#8c4df1"
  />
  <stop
    offset="35%"
    stopColor="#6836b4"
  />
  <stop
    offset="65%"
    stopColor="#331957"
  />
  <stop
    offset="100%"
    stopColor="#05020A"
  />
</linearGradient>

          <radialGradient
            id="fireBallGradient"
            cx="50%"
            cy="30%"
            r="70%"
          >
            <stop
              offset="0%"
              stopColor="#ffffff"
            />

            <stop
              offset="22%"
              stopColor="#fff685"
            />

            <stop
              offset="48%"
              stopColor="#ff5500"
            />

            <stop
              offset="78%"
              stopColor="#b30000"
            />

            <stop
              offset="100%"
              stopColor="#240003"
            />
          </radialGradient>

          <linearGradient
            id="flameTongueGrad"
            x1="50%"
            y1="100%"
            x2="50%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#ff2200"
              stopOpacity="0.95"
            />

            <stop
              offset="40%"
              stopColor="#ff8800"
              stopOpacity="0.9"
            />

            <stop
              offset="75%"
              stopColor="#fffa99"
              stopOpacity="0.8"
            />

            <stop
              offset="100%"
              stopColor="#ffffff"
              stopOpacity="0"
            />
          </linearGradient>

          <linearGradient
            id="ropeGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="rgba(255, 255, 255, 0.2)"
            />

            <stop
              offset="65%"
              stopColor="rgba(255, 255, 255, 0.55)"
            />

            <stop
              offset="100%"
              stopColor="rgba(255, 120, 60, 0.85)"
            />
          </linearGradient>

          <filter
            id="glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur
              stdDeviation="6"
              result="blur"
            />

            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="over"
            />
          </filter>

          <filter
            id="intenseGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="16"
              result="blur"
            />

            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="over"
            />
          </filter>

          <filter
            id="smokeBlur"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur
              stdDeviation="4.5"
            />
          </filter>
        </defs>

        {/* 1. Smoke Flares */}
        <g ref={smokeContainerRef} />

        {/* 2. Fixed Short Twirling Rope */}
        <path
          ref={ropeRef}
          fill="none"
          stroke="url(#ropeGradient)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* 3. Trailing Embers */}
        <g ref={emberContainerRef} />

        {/* 4. Main Swinging Ball */}
        <g ref={bobGroupRef}>
          

          <path
            ref={flameTonguesRef}
            fill="url(#flameTongueGrad)"
            opacity="0"
            filter="url(#glow)"
          />

          <circle
            cx="0"
            cy="0"
            r="24"
            fill="url(#orbGradient)"
          />

         

          <g
            ref={fireCoreRef}
            opacity="0"
          >
            <circle
              cx="0"
              cy="0"
              r="24"
              fill="url(#fireBallGradient)"
              filter="url(#glow)"
            />

            <ellipse
              cx="0"
              cy="-5"
              rx="12"
              ry="14"
              fill="#ffffff"
              opacity="0.92"
              filter="url(#glow)"
            />
          </g>

          <circle
            ref={ignitionFlashRef}
            cx="0"
            cy="0"
            r="0"
            fill="#ffffff"
            opacity="0"
            filter="url(#intenseGlow)"
          />
        </g>
      </svg>

      {/* Bottom Center Glitch Shuffle Title */}
      <div
        style={{
          position: "absolute",
          bottom: "3.5rem",
          left: "50%",
          transform:
            "translateX(-50%) translateZ(0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
          userSelect: "none",
          width: "100%",
          maxWidth: "90vw",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize:
              "clamp(0.875rem, 3.2vw, 1.15rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#fff3db",
            textShadow:
              "0 0 12px rgba(255, 120, 20, 0.65), 0 0 24px rgba(255, 60, 0, 0.35)",
          }}
        >
          <span ref={titleTextRef}>
            Bereket Henock
          </span>
        </div>

        
      </div>
    </div>
  );
};

export default Preloader;