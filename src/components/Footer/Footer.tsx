import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <div className="flex gap-4 ml-[8rem] mt-[4rem]">
        <Image
          src="/icons/facebook.svg"
          alt="Next.js Logo"
          width={24}
          height={24}
        />
        <Image
          src="/icons/instagram.svg"
          alt="Next.js Logo"
          width={24}
          height={24}
        />
        <Image
          src="/icons/twitter.svg"
          alt="Next.js Logo"
          width={24}
          height={24}
        />
        <Image
          src="/icons/youtube.svg"
          alt="Next.js Logo"
          width={24}
          height={24}
        />
      </div>
      <div className="flex gap-6 mt-2">
        <p className="text-[#111827] text-[18px] font-[700] font-sans">
          Conditions of use
        </p>
        <p className="text-[#111827] text-[18px] font-[700] font-sans">
          Privacy & Policy
        </p>
        <p className="text-[#111827] text-[18px] font-[700] font-sans">
          Press Room
        </p>
      </div>

      <p className="text-[#6B7280] font-bold text-[18px] ml-[4rem] mt-4">
        © 2021 MovieBox by Adriana Eka Prayudha{" "}
      </p>
    </div>
  );
};

export default Footer;
