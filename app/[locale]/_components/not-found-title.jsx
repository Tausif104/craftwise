'use client'

import { useEffect } from 'react'

export default function NotFoundTitle({ title }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return null
}
