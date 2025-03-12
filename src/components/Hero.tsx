"use client";
import React from "react";
import Link from "next/link";
import { SparklesCore } from "./ui/sparkles";
import { MdChevronRight } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Highlight } from "./ui/hero-highlight";

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const headline = `VINAYAK GORE`;

  const words = [
    {
      text: "Portfolio",
    },
    {
      text: "Development",
    },
    {
      text: "Projects",
    },
    {
      text: "Create",
    },
    {
      text: "Tutorials",
    },
    {
      text: "Cheat Sheets",
    },
    {
      text: "Posters",
    },
    {
      text: "Blogs",
    },
  ];

  return (
    <>
      <main className="flex flex-col items-center justify-center mx-auto max-w-6xl h-full w-full">
        <section className="flex flex-col items-center justify-center overflow-hidden rounded-md w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <TextGenerateEffect
              headline={headline}
              className="font-sans text-center"
            />
            <p className="block md:hidden text-4xl sm:text-7xl text-center font-extrabold">
              VINAYAK GORE
            </p>
            <Highlight className="flex items-center justify-center mx-auto text-xs sm:text-base md:text-lg px-6 sm:px-10 md:px-16 pb-2">
              <p className="text-center tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-blue-700 to-sky-500 dark:from-white dark:to-zinc-500">
                <span className="text-xl sm:text-2xl mx-2">⌲</span>
                <span className="text-xs sm:text-sm">
                  Design.Implement.Inspire
                </span>
              </p>
            </Highlight>
          </div>

          <div className="max-w-0 md:max-w-[40rem] w-full h-auto md:h-60 relative mx-auto py-10">
            <div className="absolute inset-x-4 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] sm:h-[3px] lg:h-[4px] w-3/4 blur-sm" />
            <div className="absolute inset-x-4 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px sm:h-[1px] w-3/4" />
            <div className="absolute inset-x-4 sm:inset-x-24 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] sm:h-[6px] lg:h-[7px] w-1/4 blur-sm" />
            <div className="absolute inset-x-4 sm:inset-x-24 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px sm:h-[1px] lg:h-[2px] w-1/4" />
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="absolute inset-0 w-full h-full"
              particleColor={isDarkMode ? "#ffffff" : "#0000ff"}
            />
            <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center space-y-5 w-full h-full px-4 md:px-10 lg:px-20">
          <TypewriterEffect words={words} className="text-center mx-2" />

          <div className="flex flex-col sm:flex-row justify-center text-center text-sm text-zinc-500 font-medium space-y-4 sm:space-y-0 sm:space-x-3">
            <Link href="#start" className="w-full sm:w-auto">
              <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#fbfbfd,45%,#efefef,55%,#fbfbfd)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-400 dark:border-zinc-800 hover:border-zinc-600 dark:hover:border-zinc-700 hover:text-black dark:hover:text-zinc-200 no-underline group cursor-pointer relative shadow-lg shadow-zinc-200 dark:shadow-zinc-900 rounded-md px-8 py-3 h-12 inline-block w-full">
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                  <span>Get Started</span>
                  <MdChevronRight />
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-[2px] dark:h-[1px] w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-orange-500 to-orange-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>

            <Link href="#auther" className="w-full sm:w-auto">
              <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#fbfbfd,45%,#efefef,55%,#fbfbfd)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-400 dark:border-zinc-800 hover:border-zinc-600 dark:hover:border-zinc-700 hover:text-black dark:hover:text-zinc-200 no-underline group cursor-pointer relative shadow-lg shadow-zinc-200 dark:shadow-zinc-900 rounded-md px-8 py-3 h-12 inline-block w-full">
                <div className="flex items-center justify-center space-x-2">
                  <span>Auther</span>
                  <PiStudent />
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-[2px] dark:h-[1px] w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-500 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Hero;
