"use client";

import { whyte } from "@/app/fonts/font";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { ConnectWallet } from "@/components/button/connect";

const StartMeeting = () => {
  return (
    <div className="btn group">
      <ConnectWallet />
      <MoveRight
        strokeWidth={2.5}
        className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform"
      />
    </div>
  );
};

const MotionImage = motion(Image);

export default function Home() {
  const ref = useRef(null);

  return (
    <main className="md:w-full w-fit min-h-screen pt-16 md:px-0 px-4">
      <div className="md:w-1/2 w-full mx-auto space-y-16">
        <div className="isolate z-1 overflow-hidden relative mt-16 rounded-2xl p-12 py-16 bg-gradient-to-br from-[#272A48] to-[#0F0E26] flex md:flex-row flex-col items-center justify-between gap-8 shadow-custom text-2xl">
          <div className="space-y-1">
            <span className="text-md text-gray-300">Global Access</span>
            <p className="text-3xl">
              Through{" "}
              <span className={`${whyte.className} font-semibold`}>
                Pulse⚡️
              </span>
            </p>
          </div>

          <StartMeeting />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 text-[20rem] blur-lg opacity-30 z-[-1] rotate-12 pointer-none">
            ⚡️
          </div>
        </div>
        <div className="ml-1">
          <h1 className="text-3xl text-gray-300 mt-16">
            Global Transfers Made{" "}
            <span className={`font-bold ${whyte.className} text-white`}>
              Simple⚡️
            </span>
          </h1>
          <h3 className="text-gray-500">
            Secure USDC-pegged vouchers for instant medical claim settlements
            with global cash pickup
          </h3>
          <div className="w-full flex md:flex-row flex-col justify-between items-center h-full mt-16 md:gap-0 gap-16 translate-x-8">
            <div className="w-[240px] h-[315px]" ref={ref}>
              <MotionImage
                initial={{ opacity: 0, y: 50, rotate: 0, scale: 0 }}
                animate={{ opacity: 1, y: 0, rotate: -6, scale: 1 }}
                transition={{
                  rotate: {
                    delay: 1,
                  },
                }}
                className="absolute -translate-x-16 origin-bottom"
                src="/nft1.png"
                alt="Sprint"
                width={240}
                height={315}
                quality={100}
              />
              <MotionImage
                initial={{ opacity: 0, y: 50, rotate: 0, scale: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{
                  rotate: {
                    delay: 1,
                    duration: 1,
                  },
                }}
                className="absolute origin-bottom"
                src="/nft2.png"
                alt="Sprint"
                width={240}
                height={315}
                quality={100}
              />
              <MotionImage
                initial={{ opacity: 0, y: 50, rotate: 0, scale: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 6, scale: 1 }}
                transition={{
                  rotate: {
                    delay: 1,
                  },
                }}
                className="absolute translate-x-16 origin-bottom"
                src="/nft3.png"
                alt="Sprint"
                width={240}
                height={315}
                quality={100}
              />
            </div>
            <MotionImage
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              alt="Sprint"
              className="md:mb-0 mb-16"
              src="/meet.png"
              width={336}
              height={232}
              quality={100}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
