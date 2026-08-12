"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { registerUser } from "@/app/actions/auth.actions";

const initialState = { success: false, msg: "" };

export default function RegisterForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [router, state.success]);

  return (
    <form action={action} className='space-y-5'>
      <div className='space-y-2'>
        <label className='text-sm font-semibold text-[#304C61]'>Full name</label>
        <input
          type='text'
          name='name'
          required
          placeholder='CraftWise Admin'
          className='w-full rounded-2xl border border-[#D8E4F0] bg-[#F8FBFF] px-4 py-3.5 text-[#0A1B28] outline-none transition focus:border-[#CC8640]'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-semibold text-[#304C61]'>Email</label>
        <input
          type='email'
          name='email'
          required
          placeholder='admin@craftwise.de'
          className='w-full rounded-2xl border border-[#D8E4F0] bg-[#F8FBFF] px-4 py-3.5 text-[#0A1B28] outline-none transition focus:border-[#CC8640]'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-semibold text-[#304C61]'>Password</label>
        <input
          type='password'
          name='password'
          required
          minLength={6}
          placeholder='Choose a strong password'
          className='w-full rounded-2xl border border-[#D8E4F0] bg-[#F8FBFF] px-4 py-3.5 text-[#0A1B28] outline-none transition focus:border-[#CC8640]'
        />
      </div>

      {state.msg ? (
        <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
          {state.msg}
        </p>
      ) : null}

      <button
        type='submit'
        disabled={pending}
        className='w-full rounded-full bg-[#CC8640] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#b77431] disabled:cursor-not-allowed disabled:opacity-70'
      >
        {pending ? "Creating account..." : "Create Account"}
      </button>

      <p className='text-sm text-[#5C5E5E]'>
        Already have an account?{" "}
        <Link href='/login' className='font-semibold text-[#CC8640]'>
          Log in
        </Link>
      </p>
    </form>
  );
}
