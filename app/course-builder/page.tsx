'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CourseBuilderDummyPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/courses')
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      Redirecting to dashboard...
    </div>
  )
}
