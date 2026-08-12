'use client'

import { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web'
import { Maximize2, Minimize2 } from 'lucide-react'

const LottiePlayer = ({
  src,
  className,
  loop = true,
  autoplay = true,
  playOnView = true,
  delay = 1500,
  fullscreen = true,
}) => {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !src) return

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      // Load paused when we gate playback on scroll; lottie autoplay would start immediately.
      autoplay: playOnView ? false : autoplay,
      path: encodeURI(src),
    })

    if (!playOnView) {
      return () => animation.destroy()
    }

    let timeoutId
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started) {
          started = true
          // Wait a beat after the section scrolls into view before animating.
          timeoutId = setTimeout(() => animation.play(), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(containerRef.current)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
      animation.destroy()
    }
  }, [src, loop, autoplay, playOnView, delay])

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === wrapperRef.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      wrapperRef.current?.requestFullscreen?.()
    }
  }

  if (!fullscreen) {
    return <div ref={containerRef} className={className} />
  }

  return (
    <div
      ref={wrapperRef}
      className={`group relative ${isFullscreen ? 'flex items-center justify-center bg-white' : ''}`}
    >
      <div
        ref={containerRef}
        className={isFullscreen ? 'w-auto h-full max-w-full' : className}
      />
      <button
        type='button'
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        className='absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-secondary/70 text-white opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100 focus:opacity-100'
      >
        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </button>
    </div>
  )
}

export default LottiePlayer
