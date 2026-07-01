"use client"

import dynamic from "next/dynamic"

const WeAre = dynamic(() => import("@/components/home/WeAre").then((mod) => mod.WeAre), {
  loading: () => <div className="min-h-[40vh]" />,
})
const ManagedLocations = dynamic(
  () => import("@/components/home/ManagedLocations").then((mod) => mod.ManagedLocations),
  { loading: () => <div className="min-h-[35vh]" /> }
)
const ArtistsPreview = dynamic(() => import("@/components/home/Artists").then((mod) => mod.ArtistsPreview), {
  loading: () => <div className="min-h-[35vh]" />,
})
const PastEvents = dynamic(() => import("@/components/home/PastEvents").then((mod) => mod.PastEvents), {
  loading: () => <div className="min-h-[40vh]" />,
})
const Clients = dynamic(() => import("@/components/home/Clients").then((mod) => mod.Clients), {
  loading: () => <div className="min-h-[20vh]" />,
})
const Footer = dynamic(() => import("@/components/shared/Footer").then((mod) => mod.Footer), {
  loading: () => <div className="min-h-[25vh]" />,
})

export function HomeSections() {
  return (
    <>
      <WeAre />
      <ManagedLocations />
      <ArtistsPreview />
      <PastEvents />
      <Clients />
      <Footer />
    </>
  )
}
