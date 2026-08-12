"use client";

import Link from "next/link";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className='min-h-screen bg-[#F8FBFF]'>
      <div className='mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row'>
        <div className='flex flex-1 flex-col justify-between bg-[linear-gradient(135deg,#012E33_0%,#304C61_100%)] px-8 py-10 text-white lg:px-14 lg:py-14'>
          <div className='space-y-6'>
            <Link href='/' className='inline-flex items-center gap-3'>
              <img src='/main-logo.svg' alt='CraftWise' className='h-9 w-auto' />
            </Link>
            <div className='max-w-xl space-y-4'>
              <p className='inline-flex rounded-full border border-white/20 px-4 py-1 text-sm text-white/80'>
                CraftWise Admin
              </p>
              <h1 className='text-4xl font-bold leading-tight lg:text-5xl'>
                Manage articles with the same visual language as the public site.
              </h1>
              <p className='text-base text-white/75 lg:text-lg'>
                Publish updates, edit blog content, and keep the news section current
                from one focused dashboard.
              </p>
            </div>
          </div>
          <div className='grid gap-4 sm:grid-cols-3'>
            {[
              ["Fast publishing", "Direct create and edit flow without preview steps."],
              ["Role based access", "Admins can manage blog content, authors can still access the dashboard."],
              ["CraftWise styling", "Dashboard colors, cards, spacing and typography match the site."],
            ].map(([heading, body]) => (
              <div key={heading} className='rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur'>
                <p className='mb-2 text-sm font-semibold text-white'>{heading}</p>
                <p className='text-sm leading-6 text-white/70'>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-1 items-center justify-center px-6 py-10 lg:px-12'>
          <div className='w-full max-w-xl rounded-[32px] border border-[#E6EEF7] bg-white p-8 shadow-[0_30px_80px_rgba(10,27,40,0.08)] lg:p-10'>
            <div className='mb-8 space-y-2'>
              <h2 className='text-3xl font-bold text-[#0A1B28]'>{title}</h2>
              <p className='text-base text-[#5C5E5E]'>{subtitle}</p>
            </div>
            {children}
            {footer ? <div className='mt-8 text-sm text-[#5C5E5E]'>{footer}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
