"use client";

import React from "react";

interface FooterProps {
  whatsapp?: string;
  instagram?: string;
  tiktok?: string;
  phone?: string;
  email?: string;
}

export const Footer: React.FC<FooterProps> = ({
  whatsapp = "https://wa.me/251986656879",
  instagram = "https://www.instagram.com/_b.e.k____?stkn=c2l0a2w1c2YxeWdk&utm_source=qr",
  tiktok = "https://www.tiktok.com/@_b.e.k___?_r=1&_t=ZS-9ADy0xgSriu",
  phone = "tel:+251 98 665 6879",
  email = "mailto:bereket.enoch@gmail.com",
}) => {
  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden
        bg-[#05020A]
        px-6
        py-8
        text-white
        sm:px-10
        sm:py-10
        md:px-16
        lg:px-20
        xl:px-24
      "
    >
      <div
        className="
          flex
          flex-col
          gap-6
          border-t
          border-white/10
          pt-5
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        {/* Availability */}
        <div className="shrink-0">
          <p
            className="
              mb-2
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/35
              sm:text-[10px]
            "
          >
            Available for work
          </p>

          <a
            href={email}
            className="
              text-sm
              text-white/80
              transition-opacity
              duration-300
              hover:opacity-50
              sm:text-base
            "
          >
            Let&apos;s make something memorable.
          </a>
        </div>

        {/* Social / contact links */}
        <nav
          aria-label="Social and contact links"
          className="
            flex
            flex-wrap
            gap-x-5
            gap-y-3
            text-[9px]
            uppercase
            tracking-[0.2em]
            sm:justify-end
            sm:gap-x-7
            sm:text-[10px]
          "
        >
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            WhatsApp
          </a>

          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Instagram
          </a>

          <a
            href={tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            TikTok
          </a>

          <a
            href={phone}
            className="
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Phone
          </a>

          <a
            href={email}
            className="
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
