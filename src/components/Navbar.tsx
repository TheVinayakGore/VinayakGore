"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Feedback from "./Feedback";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import { PiArrowUpRightBold } from "react-icons/pi";
import { toast } from "react-toastify";
import { BsMoonStars } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi2";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import SideBar from "./SideBar";
import { UserButton, useUser } from "@clerk/nextjs"; // Import Clerk components
import { IoMdLogIn } from "react-icons/io";

const LoadingSpinner = lazy(() => import("@/components/LoadingSpinner"));

interface MainProjects {
  _id: string;
  title: string;
  description: string;
  image?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
  projectUrl?: string;
}

const Navbar = ({
  className,
  toggleTheme,
  isSunIcon,
}: {
  className?: string;
  toggleTheme: () => void;
  isSunIcon: boolean;
}) => {
  const [active, setActive] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mainprojects, setmainprojects] = useState<MainProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isSignedIn, user } = useUser(); // Use Clerk's useUser hook

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const email = "vvgore2675@gmail.com";
  const subject = "Inquiry from Portfolio";
  const body = "Hello Vinu,\n\nI would like to discuss...";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Fetch mainprojects from Sanity
  useEffect(() => {
    const fetchMainProjects = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "mainprojects"]{_id, title, description, image, projectUrl}`
        );
        setmainprojects(data);
      } catch (error) {
        console.error("Error fetching mainprojects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMainProjects();
  }, []);

  const handleFeedbackClick = () => {
    if (isSignedIn) {
      openModal();
    } else {
      toast.warning("Please log in to give feedback", {
        position: "top-center",
        style: {
          marginTop: "5rem",
        },
      });
    }
  };

  // Function to open sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  // Function to close sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar when clicking outside
  const handleBackdropClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isSidebarOpen) {
      closeSidebar();
    }
  };

  const navLinkClass =
    "flex items-start justify-center space-x-1 pl-3 pr-2 font-normal hover:font-medium hover:text-sky-500 relative transition-all duration-200 before:absolute before:-bottom-3 before:left-1/2 before:w-0 before:h-[0.16rem] before:bg-sky-400 before:transition-all before:duration-700 before:-translate-x-1/2 hover:before:w-full hover:before:left-0 hover:before:translate-x-0 hover:before:bottom-[-4px]";

  return (
    <>
      <nav
        className={cn(
          `fixed top-5 inset-x-0 max-w-[15rem] sm:max-w-[38rem] lg:max-w-[50rem] text-sm sm:text-base mx-auto z-50`,
          className
        )}
      >
        <Menu setActive={setActive}>
          <div className="flex items-center justify-between z-50 w-full">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <p className="text-base block sm:hidden">Vinu Gore</p>
            </Link>

            <div className="responsive-nav flex items-center space-x-6 font-light">
              <MenuItem setActive={setActive} active={active} item="Auther">
                <div className="flex flex-col space-y-4 text-base">
                  <HoveredLink href="/#auther">Who am I ?</HoveredLink>
                  <HoveredLink href="/#techStacks">Tech Stacks</HoveredLink>
                  <HoveredLink href="/#freelance">Freelance</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Projects">
                <div className="text-sm grid grid-cols-1/2 lg:grid-cols-2 gap-2 w-[20rem] lg:w-[40rem] overflow-auto m-auto h-full">
                  <Suspense fallback={<LoadingSpinner />}>
                    {loading ? (
                      <div className="flex justify-center items-center w-full h-full">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      mainprojects
                        .slice(0, 5)
                        .map((project) => (
                          <ProductItem
                            key={project._id}
                            title={project.title}
                            href={project.projectUrl || "/"}
                            src={
                              project.image?.asset
                                ? urlFor(project.image.asset._ref).url()
                                : "/card.png"
                            }
                            description={
                              project.description.slice(0, 50) ||
                              "Project - short description"
                            }
                            target="_blank"
                            priority
                          />
                        ))
                    )}
                  </Suspense>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Contact">
                <div className="flex flex-col space-y-4 text-base">
                  <HoveredLink href={mailtoLink}>Email</HoveredLink>
                  <HoveredLink href="/#socialMedia">Social Media</HoveredLink>
                  <HoveredLink href="/">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleFeedbackClick();
                      }}
                    >
                      Give Feedback
                    </button>
                  </HoveredLink>
                </div>
              </MenuItem>
              <Link
                href="/create"
                target="_blank"
                prefetch={true}
                className={navLinkClass}
              >
                Create
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
              <Link
                href="/blogs"
                target="_blank"
                prefetch={true}
                className={navLinkClass}
              >
                Blogs
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-xs font-medium dark:text-zinc-100">
              {isSignedIn ? (
                <div className="flex items-center border-2 rounded-full">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10", // Adjusts the avatar size
                      },
                    }}
                  />
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="flex cursor-pointer hover:text-white border border-zinc-400 dark:border-zinc-700 hover:border-sky-500 hover:shadow-lg hover:bg-gradient-to-br from-sky-500 to-blue-700 rounded-full"
                >
                  <span className="responsive-themBtn text-sm px-8 py-2">
                    Login
                  </span>
                  <IoMdLogIn className="block sm:hidden hover:text-white p-2 w-10 h-10" />
                </Link>
              )}
              <button
                className="responsive-themBtn text-2xl p-3 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full"
                onClick={toggleTheme}
              >
                {isSunIcon ? <HiOutlineSun /> : <BsMoonStars />}
              </button>
              <button
                className="block sm:hidden text-2xl p-3 text-zinc-400 hover:text-black dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full"
                onClick={openSidebar}
              >
                <MdOutlineDashboardCustomize />
              </button>
            </div>
          </div>
        </Menu>
        <Feedback isOpen={isModalOpen} onClose={closeModal} />
      </nav>

      {/* Sidebar */}
      <SideBar
        mainprojects={mainprojects}
        isSidebarOpen={isSidebarOpen}
        handleBackdropClick={handleBackdropClick}
        closeSidebar={closeSidebar}
        toggleTheme={toggleTheme}
        isSunIcon={isSunIcon}
        mailtoLink={mailtoLink}
        handleFeedbackClick={handleFeedbackClick}
      />
    </>
  );
};

export default Navbar;
