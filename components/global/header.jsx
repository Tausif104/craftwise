"use client";

import Image from "next/image";
import NextLink from "next/link";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import PrimaryBtn from "./primary-btn";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutGrid,
  Wrench,
  DollarSign,
  Briefcase,
  Info,
  Newspaper,
  Users,
  CalendarDays,
  FileText,
  Receipt,
  Clock,
  Settings,
  ArrowRight,
  Star,
  Hammer,
  Zap,
  Flower2,
  Paintbrush,
  Droplet,
  Home,
  ArrowLeft,
  HomeIcon,
} from "lucide-react";
import { FaAngleRight } from "react-icons/fa";

/** True only on devices with a real hover-capable pointer (mouse/trackpad). */
const useHoverCapable = () => {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canHover;
};

/**
 * Nav list with dropdowns driven by state instead of :hover only, so tablets
 * and other touch devices can actually open them (first tap opens, second tap
 * on the same item follows the link).
 */
const NavList = ({
  items,
  className,
  itemClassName = "",
  gapClassName = "ml-4",
  // "Overview" link inside the panel — only needed where the trigger's first
  // tap opens instead of navigating (tablet/touch). Items without an
  // `overview` (e.g. "More", a label with no page) never get one.
  showOverviewLink = true,
}) => {
  const pathname = usePathname();
  const canHover = useHoverCapable();
  const [openLabel, setOpenLabel] = useState(null);
  const listRef = useRef(null);

  // close on navigation
  useEffect(() => {
    setOpenLabel(null);
  }, [pathname]);

  // close on outside tap / Escape
  useEffect(() => {
    if (!openLabel) return;

    const onPointerDown = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setOpenLabel(null);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenLabel(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openLabel]);

  return (
    <ul ref={listRef} className={className}>
      {items.map((item, index) => {
        const hasChildren = !!item.children?.length;
        const isOpen = openLabel === item.label;
        const isLast = index === items.length - 1;
        // toggle-only trigger: never navigates, panel holds the overview link
        const isToggle = hasChildren && showOverviewLink;
        const overview = showOverviewLink ? item.overview : null;
        const Trigger = isToggle ? "button" : Link;

        return (
          <li
            key={item.label}
            className={`relative text-[15px] text-white ${
              index !== 0 ? gapClassName : ""
            } ${itemClassName}`}
            onMouseEnter={
              canHover && hasChildren ? () => setOpenLabel(item.label) : undefined
            }
            onMouseLeave={
              canHover && hasChildren ? () => setOpenLabel(null) : undefined
            }
          >
            <Trigger
              {...(isToggle
                ? { type: "button" }
                : { href: item.href })}
              aria-haspopup={hasChildren ? "true" : undefined}
              aria-expanded={hasChildren ? isOpen : undefined}
              onClick={(e) => {
                if (!hasChildren) return;
                if (isToggle) {
                  // click only toggles the panel — parent page lives in the panel
                  setOpenLabel(isOpen ? null : item.label);
                  return;
                }
                // touch / coarse pointer: first tap opens the panel instead of navigating
                if (!canHover && !isOpen) {
                  e.preventDefault();
                  setOpenLabel(item.label);
                }
              }}
              className="group/link relative inline-flex cursor-pointer touch-manipulation items-center gap-2 py-1 transition-colors duration-300 hover:text-primary"
            >
              {item.label}

              {hasChildren && (
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover/link:w-full"></span>
            </Trigger>

            {hasChildren && (
              // pt-3 (not mt-3) keeps the panel hover-connected to the trigger
              <div
                className={`absolute top-full pt-3 transition-all duration-200 ${
                  isLast
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2"
                } ${
                  isOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-2 opacity-0"
                }`}
              >
                <div className="w-[280px] rounded-[14px] border border-white/5 bg-[#304C61] p-2 shadow-[0px_18px_45px_rgba(10,27,40,0.22)]">
                  <div className="space-y-1">
                    {overview && (
                      <Link
                        href={overview.href}
                        onClick={() => setOpenLabel(null)}
                        className={`block touch-manipulation rounded-xl px-4 py-3.5 text-[16px] font-medium leading-none transition-colors duration-200 ${
                          pathname === overview.href
                            ? "bg-white/8 text-white"
                            : "text-white/90 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {overview.label}
                      </Link>
                    )}

                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;

                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpenLabel(null)}
                          className={`block touch-manipulation rounded-xl px-4 py-3.5 text-[16px] font-medium leading-none transition-colors duration-200 ${
                            isChildActive
                              ? "bg-white/8 text-white"
                              : "text-white/90 hover:bg-white/8 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Header = () => {
  const router = useRouter();
  const t = useTranslations("Nav");

  const [isOpen, setIsOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);

  const navItems = [
    {
      label: t("features"),
      href: "/features",
      icon: LayoutGrid,
      // first item of the tablet dropdown — links to the Features page itself
      overview: { label: t("overview"), href: "/features" },
      children: [
        { label: t("collaboration"),       href: "/features/collaboration",        icon: Users },
        { label: t("planningScheduling"),  href: "/features/planning-scheduling",  icon: CalendarDays },
        { label: t("projectsFiles"),       href: "/features/project-file",         icon: FileText },
        { label: t("quotingInvoicing"),    href: "/features/quoting-invoicing",    icon: Receipt },
        { label: t("timeTracking"),        href: "/features/time-tracking",        icon: Clock },
        { label: t("workflowsAutomation"), href: "/features/workflows-automation", icon: Settings },
      ],
    },
    {
      label: t("industry"),
      href: "/industry",
      icon: Wrench,
      // first item of the tablet dropdown — links to the Industry page itself
      overview: { label: t("overview"), href: "/industry" },
      children: [
        { label: t("carpenters"),  href: "/industry/carpenters",  icon: Hammer },
        { label: t("electricians"),href: "/industry/electricians", icon: Zap },
        { label: t("gardeners"),   href: "/industry/gardeners",   icon: Flower2 },
        { label: t("painters"),    href: "/industry/painters",    icon: Paintbrush },
        { label: t("plumbers"),    href: "/industry/plumbers",    icon: Droplet },
        { label: t("roofers"),     href: "/industry/roofers",     icon: Home },
      ],
    },
    { label: t("pricing"),    href: "/pricing",    icon: DollarSign },
    { label: t("consulting"), href: "/consulting", icon: Briefcase },
    { label: t("aboutUs"),    href: "/about-us",   icon: Info },
    { label: t("news"),       href: "/news",       icon: Newspaper },
  ];

  const tabletNavItemsNarrow = [
    navItems[0],
    navItems[1],
    navItems[2],
    {
      // label only — no page of its own, so no overview entry in its panel
      label: t("more"),
      icon: Info,
      children: [
        { label: t("consulting"), href: "/consulting", icon: Briefcase },
        { label: t("aboutUs"), href: "/about-us", icon: Info },
        { label: t("news"), href: "/news", icon: Newspaper },
      ],
    },
  ];
  const tabletNavItemsWide = [
    navItems[0],
    navItems[1],
    navItems[2],
    navItems[3],
    {
      // label only — no page of its own, so no overview entry in its panel
      label: t("more"),
      icon: Info,
      children: [
        { label: t("aboutUs"), href: "/about-us", icon: Info },
        { label: t("news"), href: "/news", icon: Newspaper },
      ],
    },
  ];

  return (
    <header className="bg-secondary fixed top-0 left-0 right-0 z-50 pt-3 xl:pt-4">
      <nav>
        <div className="container mx-auto flex min-h-[64px] items-center justify-between gap-4 lg:min-h-[72px]">
          <Link href="/" className="block">
            <Image
              src="/main-logo.svg"
              alt="Logo"
              width={220}
              height={60}
              className="h-auto w-full max-w-[150px]  lg:max-w-[220px]"
              priority
            />
          </Link>

          {/* Tablet Nav: 768px-900px */}
          <NavList
            items={tabletNavItemsNarrow}
            className="hidden md:max-[900px]:flex items-center"
          />

          {/* Tablet Nav: 901px-1279px */}
          <NavList
            items={tabletNavItemsWide}
            className="hidden min-[901px]:max-xl:flex items-center"
          />

          {/* Tablet Right */}
          <div className="hidden md:max-xl:flex items-center gap-3">
            <NextLink
              href="/registration"
              className="inline-flex items-center border-b-2 border-primary/90 pb-1 text-[15px] font-medium text-white transition-colors duration-300 hover:text-primary"
            >
              {t("login")}
            </NextLink>
            <PrimaryBtn
              text={t("freeTrial")}
              link="/registration"
              className="!w-auto !px-7 !py-3 !text-[15px]"
            />
          </div>

          {/* Desktop Nav */}
          <NavList
            items={navItems}
            className="hidden xl:flex items-center"
            itemClassName="lg:text-base"
            gapClassName="ml-4 lg:ml-5"
            showOverviewLink={false}
          />

          {/* Desktop Right */}
          <div className="hidden xl:flex items-center">
            <NextLink
              href="/registration"
              className="shine-btn mr-4 text-[18px] text-white px-8.5 py-[9.4px] border border-primary rounded-full transition-all duration-300 hover:text-white! hidden xl:flex"
            >
              <span className="relative z-[99]">{t("login")}</span>
            </NextLink>
            <PrimaryBtn text={t("freeTrial")} link="/registration" />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* FULL SCREEN MOBILE MENU */}
          <div
            className={`fixed inset-0 z-50 bg-secondary transition-all duration-500 md:hidden ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >

            <div className="relative h-full flex flex-col px-6 pt-3 pb-6">
              {/* HEADER — mirrors main header: py-3, logo left, close right */}
              <div className="flex items-center justify-between py-2 mb-3">
                {activeParent ? (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveParent(null)}
                      className="text-white text-lg font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="text-primary" /> Menu
                    </button>
                    <h2 className="text-white font-semibold text-lg">
                      {activeParent.label}
                    </h2>
                  </div>
                ) : (
                  <Image src="/main-logo.svg" alt="Logo" width={220} height={60} className="max-sm:max-w-[150px]" priority />
                )}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    setActiveParent(null);
                  }}
                  className="text-white text-xl"
                >
                  ✕
                </button>
              </div>

              {!activeParent && (
                <h2
                  key={isOpen ? "menu-h-open" : "menu-h-closed"}
                  className="cw-menu-fade text-white text-base font-semibold mb-2"
                  style={{ animationDelay: "60ms" }}
                >
                  Menu
                </h2>
              )}

              {/* BODY */}
              <div className="flex-1 overflow-y-auto">
                {!activeParent && (
                  <div
                    key={isOpen ? "main-open" : "main-closed"}
                    className="space-y-2"
                  >
                    <Link
                      href="/"
                      className="cw-menu-item w-full flex items-center justify-between bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 transition-all hover:translate-x-1"
                      style={{ animationDelay: "100ms" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/10">
                          <HomeIcon size={18} className="text-primary" />
                        </div>
                        <p className="text-white font-medium text-sm">{t("home")}</p>
                      </div>
                    </Link>

                    {navItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            if (item.children) {
                              setActiveParent(item);
                            } else {
                              setIsOpen(false);
                              router.push(item.href);
                            }
                          }}
                          className="cw-menu-item w-full flex items-center justify-between bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 transition-all hover:translate-x-1"
                          style={{ animationDelay: `${160 + idx * 70}ms` }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/10">
                              <Icon size={18} className="text-primary" />
                            </div>
                            <p className="text-white font-medium text-sm">{item.label}</p>
                          </div>
                          {item.children && (
                            <span className="text-white/60"><FaAngleRight /></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {activeParent && (
                  <div
                    key={activeParent.label}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div />
                    </div>

                    <div className="mb-6">
                      <Link
                        href={activeParent.href}
                        className="cw-menu-item w-full flex items-center justify-between bg-gradient-to-r from-primary/40 to-primary/10 backdrop-blur-md rounded-2xl px-5 py-5 shadow-lg"
                        style={{ animationDelay: "60ms" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-white/10">
                            <Star size={18} className="text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="text-white font-medium">{activeParent.label} {t("overview")}</p>
                            <p className="text-white/60 text-sm">{t("seeEverything")}</p>
                          </div>
                        </div>
                        <ArrowRight size={18} className="text-white/60" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {activeParent.children?.map((child, idx) => {
                        const ChildIcon = child.icon;
                        return (
                          <button
                            key={child.label}
                            onClick={() => {
                              setIsOpen(false);
                              setActiveParent(null);
                              router.push(child.href);
                            }}
                            className="cw-menu-item bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-md hover:-translate-y-1"
                            style={{ animationDelay: `${140 + idx * 60}ms` }}
                          >
                            <div className="mb-4 p-4 rounded-xl bg-white/10">
                              <ChildIcon size={22} className="text-primary" />
                            </div>
                            <p className="text-white text-sm font-medium leading-snug">{child.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            
              <div
                key={isOpen ? "cta-open" : "cta-closed"}
                className="cw-menu-fade mt-4 flex gap-3 items-center"
                style={{ animationDelay: "650ms" }}
              >
                <NextLink
                  href="/registration"
                  className="shine-btn flex-1 text-center text-[15px] text-white py-2.5 border border-primary rounded-full transition-all duration-300"
                >
                  <span className="relative z-[99]">{t("login")}</span>
                </NextLink>
                <PrimaryBtn
                  text={t("startFreeTrial")}
                  link="/registration"
                  className="flex-1 !px-4 !py-2.5 !text-[15px]"
                />
              </div>
            </div>
          </div>

          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => {
                setIsOpen(false);
                setActiveParent(null);
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
