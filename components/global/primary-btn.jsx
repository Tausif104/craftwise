'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { normalizeLocalizedHref } from '@/lib/normalize-localized-href'

const PrimaryBtn = ({ text, link, className }) => {
  // Touch devices keep :hover/:focus stuck after a tap and :active is
  // unreliable there, so the pressed look is driven explicitly: it turns on
  // at pointerdown and is always cleared again when the press ends.
  const [pressed, setPressed] = useState(false)
  const timerRef = useRef(null)

  const release = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setPressed(false), 160)
  }, [])

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), [])

  return (
    <Link
      href={normalizeLocalizedHref(link)}
      onPointerDown={() => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setPressed(true)
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      onBlur={() => setPressed(false)}
      onClick={(e) => {
        release()
        // drop focus so no focus-driven style can linger after the tap
        e.currentTarget.blur?.()
      }}
      className={`
        primary-btn
        ${pressed ? 'is-pressed' : ''}
        flex items-center justify-center
        text-[16px] font-semibold px-10 py-3 text-white
        bg-primary rounded-full
        transition-all duration-300 transform w-full md:w-fit
        hover:scale-105 hover:shadow-[0px_10px_30px_0px_#012E3366]
        active:translate-y-[1px]
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        {text} <ArrowRight className="inline-block w-5" />
      </div>
    </Link>
  )
}

export default PrimaryBtn
