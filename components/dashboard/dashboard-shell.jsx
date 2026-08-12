"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  BarChart3,
  Boxes,
  FileText,
  HelpCircle,
  History,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  MessageSquareQuote,
  PanelLeftClose,
  Plug,
  ScrollText,
  Search,
  Shield,
  Tag,
  Target,
  Users,
  X,
} from "lucide-react";
import { logoutUser } from "@/app/actions/auth.actions";
import { ADMIN_NAV, findNavItem } from "@/lib/admin-nav";

const ICONS = {
  dashboard: LayoutDashboard,
  tag: Tag,
  quote: MessageSquareQuote,
  help: HelpCircle,
  file: FileText,
  image: ImageIcon,
  megaphone: Megaphone,
  users: Users,
  mail: Mail,
  template: Boxes,
  form: Inbox,
  inbox: Inbox,
  chart: BarChart3,
  target: Target,
  search: Search,
  scroll: ScrollText,
  plug: Plug,
  shield: Shield,
  history: History,
};

function isActive(item, pathname) {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

function NavList({ pathname, onNavigate }) {
  return (
    <nav className='adm-rail ml-1.5'>
      {ADMIN_NAV.map((group, groupIndex) => (
        <div key={group.label ?? `group-${groupIndex}`} className={groupIndex ? "mt-5" : ""}>
          {group.label ? (
            <p className='adm-nav-group mb-2'>{group.label}</p>
          ) : null}

          <div>
            {group.items.map((item) => {
              const Icon = ICONS[item.icon] ?? LayoutDashboard;
              const active = isActive(item, pathname);

              if (item.status) {
                const isDeferred = item.status === "deferred";

                return (
                  <span
                    key={item.href}
                    aria-disabled='true'
                    title={
                      isDeferred
                        ? "Not part of this phase"
                        : "Not built yet — coming in a later slice"
                    }
                    className='adm-nav-link cursor-not-allowed !border-l-transparent !text-white/22 hover:!text-white/22'
                  >
                    <Icon className='h-4 w-4 shrink-0' />
                    <span className='truncate'>{item.label}</span>
                    <span className='ml-auto shrink-0 text-[8.5px] font-bold uppercase tracking-[0.14em] text-white/25'>
                      {isDeferred ? "Later" : "Soon"}
                    </span>
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  data-active={active ? "true" : undefined}
                  aria-current={active ? "page" : undefined}
                  className='adm-nav-link'
                >
                  <Icon className='h-4 w-4 shrink-0' />
                  <span className='truncate'>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default function DashboardShell({ session, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = findNavItem(pathname);

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
      router.push("/login");
      router.refresh();
    });
  };

  const initials = (session.user.name || session.user.email || "U")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const sidebarInner = (
    <>
      <Link
        href='/'
        className='mb-5 inline-flex items-center px-1.5'
        aria-label='CraftWise home'
      >
        <img src='/main-logo.svg' alt='CraftWise' className='h-[30px] w-auto' />
      </Link>

      {/* Identity — no card, no ring. Just the person, sitting in the same
          quiet register as the rest of the rail. */}
      <div className='mb-6 flex items-center gap-2.5 px-1.5'>
        <span className='grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#CC8640] text-[10.5px] font-bold text-white'>
          {initials}
        </span>
        <span className='min-w-0 flex-1 leading-tight'>
          <span className='block truncate text-[12.5px] font-medium text-white/90'>
            {session.user.name || "User"}
          </span>
          <span className='block truncate text-[10px] font-medium uppercase tracking-[0.12em] text-white/35'>
            {session.user.role}
          </span>
        </span>
      </div>

      <div className='adm-scroll -mr-1.5 min-h-0 flex-1 overflow-y-auto pr-1.5 pb-3'>
        <NavList pathname={pathname} onNavigate={() => setMobileOpen(false)} />
      </div>

      <div className='mt-auto pt-3'>
        <button
          type='button'
          onClick={handleLogout}
          disabled={pending}
          className='flex w-full items-center gap-2.5 px-1.5 py-1.5 text-[12.5px] font-medium text-white/45 transition-colors hover:text-white disabled:opacity-60'
        >
          <LogOut className='h-4 w-4' />
          {pending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </>
  );

  return (
    <div className='adm adm-root min-h-screen'>
      <div className='flex min-h-screen'>
        <aside className='adm-sidebar sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col px-3 py-5 text-white lg:flex'>
          {sidebarInner}
        </aside>

        {mobileOpen ? (
          <div className='fixed inset-0 z-50 lg:hidden'>
            <button
              type='button'
              aria-label='Close navigation'
              onClick={() => setMobileOpen(false)}
              className='absolute inset-0 bg-[#0A1B28]/65 backdrop-blur-sm'
            />
            <aside className='adm-sidebar relative flex h-full w-[248px] flex-col px-3 py-5 text-white'>
              <button
                type='button'
                onClick={() => setMobileOpen(false)}
                aria-label='Close navigation'
                className='absolute right-3 top-3 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white'
              >
                <X className='h-5 w-5' />
              </button>
              {sidebarInner}
            </aside>
          </div>
        ) : null}

        <main className='min-w-0 flex-1'>
          <header className='sticky top-0 z-30 border-b border-[var(--adm-line)] bg-white/80 px-5 py-3 backdrop-blur-xl lg:px-8'>
            <div className='mx-auto flex max-w-[1400px] items-center gap-3'>
              <button
                type='button'
                onClick={() => setMobileOpen(true)}
                aria-label='Open navigation'
                className='rounded-[var(--adm-r-md)] border border-[var(--adm-line)] p-2 text-[var(--adm-teal)] lg:hidden'
              >
                <PanelLeftClose className='h-5 w-5' />
              </button>

              {/* Breadcrumb rather than a repeated page title — the page itself
                  already carries its heading. */}
              <nav aria-label='Breadcrumb' className='min-w-0 flex-1'>
                <ol className='flex items-center gap-2 text-[13px]'>
                  <li className='text-[var(--adm-ink-faint)]'>CraftWise</li>
                  {current?.group ? (
                    <>
                      <li aria-hidden className='text-[var(--adm-ink-faint)]'>
                        /
                      </li>
                      <li className='text-[var(--adm-ink-muted)]'>{current.group}</li>
                    </>
                  ) : null}
                  <li aria-hidden className='text-[var(--adm-ink-faint)]'>
                    /
                  </li>
                  <li className='truncate font-semibold text-[var(--adm-ink)]'>
                    {current?.label || "Overview"}
                  </li>
                </ol>
              </nav>

              <span className='hidden items-center gap-2 rounded-full border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] px-3 py-1.5 text-[12px] font-medium text-[var(--adm-ink-muted)] md:inline-flex'>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    session.user.role === "ADMIN"
                      ? "bg-[var(--adm-ok)]"
                      : "bg-[var(--adm-accent)]"
                  }`}
                />
                {session.user.role === "ADMIN"
                  ? "Full publishing access"
                  : "Drafts and review only"}
              </span>
            </div>
          </header>

          <div className='mx-auto max-w-[1400px] px-5 py-7 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  );
}
