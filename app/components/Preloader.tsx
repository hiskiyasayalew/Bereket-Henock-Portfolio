"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  /** Callback fired when preloader finishes and reveals hero */
  onLoaded?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ropeRef = useRef<SVGPathElement | null>(null);
  const bobGroupRef = useRef<SVGGElement | null>(null);
  const titleTextRef = useRef<HTMLSpanElement | null>(null);

  const [svgDimensions, setSvgDimensions] = useState({
    width: 1000,
    height: 1000,
  });

  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Keep the original mobile detection.
    const isMobile =
      winW < 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // ============================================================
    // RESPONSIVE SVG CANVAS
    // ============================================================

    const aspect = winW / winH;

    const svgWidth = Math.max(
      1000,
      Math.round(1000 * aspect)
    );

    const svgHeight = 1000;

    setSvgDimensions({
      width: svgWidth,
      height: svgHeight,
    });

    // ============================================================
    // CACHE DOM REFERENCES
    // ============================================================

    const container = containerRef.current;
    const rope = ropeRef.current;
    const bobGroup = bobGroupRef.current;
    const titleText = titleTextRef.current;

    if (!container || !rope || !bobGroup || !titleText) {
      return;
    }

    // ============================================================
    // ROPE GEOMETRY
    // ============================================================

    const originX = svgWidth / 2;
    const originY = 0;

    const targetCornerX = 25;
    const targetCornerY = 160;

    const fullRopeLength =
      Math.hypot(
        originX - targetCornerX,
        targetCornerY - originY
      ) * 1.02;

    // Fixed shorter rope length.
    const fixedRopeLength = fullRopeLength * 0.78;

    const targetAngle =
      -Math.atan2(
        originX - targetCornerX,
        targetCornerY - originY
      ) *
      (180 / Math.PI);

    // ============================================================
    // ANIMATION STATE
    // ============================================================

    const state = {
      amplitude: 15,
      time: 0,
      angle: 0,
      prevAngle: 0,
      velocity: 0,
      lag1: 0,
      lag2: 0,
      hasImpacted: false,
    };

    // ============================================================
    // AMPLITUDE RAMP
    // ============================================================

    const ampTween = gsap.to(state, {
      amplitude: Math.abs(targetAngle) + 3,
      duration: 6.2,
      ease: "power1.in",
    });

    const activeTweens: (
      | gsap.core.Tween
      | gsap.core.Timeline
    )[] = [ampTween];

    // ============================================================
    // GLITCH TEXT ENGINE
    // ============================================================

    const GLYPHS =
      "!<>-_\\/[]{}—=+*^?#______0123456789";

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
    // ============================================================

    const finishPreloader = () => {
      if (state.hasImpacted) return;

      state.hasImpacted = true;

      // Fade ball.
      gsap.to(bobGroup, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      // Fade rope.
      gsap.to(rope, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      // Fade title.
      const titleParent = titleText.parentElement;

      if (titleParent) {
        const titleFade = gsap.to(titleParent, {
          opacity: 0,
          duration: 0.15,
        });

        activeTweens.push(titleFade);
      }

      // Preserve the original exit sequence.
      const exitTL = gsap.timeline({
        delay: 0.45,
      });

      exitTL
        .to(container, {
          backgroundColor: "#000000",
          duration: 0.25,
          ease: "power2.in",
        })
        .to({}, {
          duration: 0.4,
        })
        .to(container, {
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
    // CACHE CONSTANTS
    // ============================================================

    const TO_RAD = Math.PI / 180;
    const RAD_TO_DEG = 180 / Math.PI;

    const ropeLength = fixedRopeLength;

    // ============================================================
    // MAIN ANIMATION LOOP
    // ============================================================

    const tick = () => {
      if (state.hasImpacted) return;

      // Preserve original simulation speed.
      state.time += 0.034;

      // ==========================================================
      // SWING
      // ==========================================================

      state.prevAngle = state.angle;

      state.angle =
        Math.sin(state.time * 1.85) *
        state.amplitude;

      state.velocity =
        state.angle - state.prevAngle;

      // ==========================================================
      // ROPE LAG
      // ==========================================================

      state.lag1 +=
        (state.angle - state.lag1) * 0.13;

      state.lag2 +=
        (state.angle - state.lag2) * 0.065;

      // ==========================================================
      // TWIRL
      // ==========================================================

      const twirlUpper =
        Math.sin(state.time * 4.5) *
        state.velocity *
        4.2;

      const twirlLower =
        Math.cos(state.time * 5.2) *
        state.velocity *
        7.5;

      const radBob =
        state.angle * TO_RAD;

      const rad1 =
        (state.lag1 + twirlUpper) *
        TO_RAD;

      const rad2 =
        (state.lag2 + twirlLower) *
        TO_RAD;

      // ==========================================================
      // BALL POSITION
      // ==========================================================

      const bobX =
        originX +
        Math.sin(radBob) *
          ropeLength;

      const bobY =
        originY +
        Math.cos(radBob) *
          ropeLength;

      // ==========================================================
      // ROPE CONTROL POINTS
      // ==========================================================

      const rope38 =
        ropeLength * 0.38;

      const rope74 =
        ropeLength * 0.74;

      const cp1X =
        originX +
        Math.sin(rad1) *
          rope38;

      const cp1Y =
        originY +
        Math.cos(rad1) *
          rope38;

      const cp2X =
        originX +
        Math.sin(rad2) *
          rope74;

      const cp2Y =
        originY +
        Math.cos(rad2) *
          rope74;

      // ==========================================================
      // UPDATE ROPE
      // ==========================================================

      rope.setAttribute(
        "d",
        `M ${originX} ${originY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${bobX} ${bobY}`
      );

      // ==========================================================
      // BALL TANGENT ROTATION
      // ==========================================================

      const tangentAngle =
        Math.atan2(
          bobY - cp2Y,
          bobX - cp2X
        ) *
          RAD_TO_DEG -
        90;

      bobGroup.setAttribute(
        "transform",
        `translate(${bobX}, ${bobY}) rotate(${tangentAngle})`
      );

      // ==========================================================
      // GLITCH TEXT
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

        // Only update the text every second frame.
        if (scrambleTimer % 2 === 0) {
          scrambleFrame++;

          const maxLen =
            Math.max(
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

          titleText.textContent =
            output;

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

    // ============================================================
    // START GSAP TICKER
    // ============================================================

    gsap.ticker.add(tick);

    // ============================================================
    // CLEANUP
    // ============================================================

    return () => {
      window.clearTimeout(
        finishTimer
      );

      gsap.ticker.remove(tick);

      activeTweens.forEach(
        (tween) => tween.kill()
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
          {/* ======================================================
              MAIN BALL GRADIENT
              ====================================================== */}

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

          {/* ======================================================
              ROPE GRADIENT
              ====================================================== */}

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
        </defs>

        {/* ========================================================
            FIXED SHORT TWIRLING ROPE
            ======================================================== */}

        <path
          ref={ropeRef}
          fill="none"
          stroke="url(#ropeGradient)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* ========================================================
            MAIN SWINGING BALL
            ======================================================== */}

        <g ref={bobGroupRef}>
          <circle
            cx="0"
            cy="0"
            r="24"
            fill="url(#orbGradient)"
          />
        </g>
      </svg>

      {/* ==========================================================
          BOTTOM CENTER GLITCH SHUFFLE TITLE
          ========================================================== */}

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