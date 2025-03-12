"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="flex items-center cursor-pointer px-3 text-base font-normal hover:font-medium hover:text-sky-500 relative transition-all duration-200 before:absolute before:-bottom-3 before:left-1/2 before:w-0 before:h-[0.16rem] before:bg-sky-400 before:transition-all before:duration-700 before:-translate-x-1/2 hover:before:w-full hover:before:left-0 hover:before:translate-x-0 hover:before:bottom-[-4px]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 pt-4 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-lg overflow-hidden border border-zinc-400 dark:border-zinc-700 shadow-xl"
              >
                <motion.div layout className="p-4 w-max h-full">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-lg border border-zinc-400 dark:border-zinc-700 bg-white/[0.7] backdrop-blur-[2px] dark:bg-black/[0.85] shadow-lg flex items-center justify-center m-auto space-x-4 p-4 w-full"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  priority = false,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  target: string;
  priority?: boolean;
}) => {
  return (
    <>
      <Link
        href={href}
        target="_blank"
        className="flex space-x-4 items-start justify-center m-auto group hover:bg-gradient-to-tl from-sky-400 to-cyan-400 hover:text-white text-black dark:text-white rounded-md p-2 overflow-auto w-full h-full"
      >
        <div className="relative w-44 h-full">
          <Image
            src={src}
            alt={title}
            width={500}
            height={500}
            className="rounded border border-zinc-200 w-full h-full"
            priority={priority}
          />
        </div>
        <div className="text-sm lg:text-base w-1/2">
          <h4 className="text-base font-bold mb-1 w-full">{title}</h4>
          <p className="text-xs lg:text-sm">{description}...</p>
        </div>
      </Link>
    </>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="hover:text-sky-400 text-base font-normal w-full h-full"
    >
      {children}
    </Link>
  );
};
