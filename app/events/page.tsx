"use client"

import { PastEvents } from "@/components/home/PastEvents"

export default function EventsPage() {
  return (
    <main className="page-fun bg-black py-24 text-white sm:py-32">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6">
        <PastEvents />
      </div>
    </main>
  )
}
