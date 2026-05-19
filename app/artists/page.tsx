"use client"

import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Reveal } from "@/components/shared/Reveal"

type Artist = {
    name: string
    img?: string
}

const artistData = {
    musician: [
        { name: "Rishabh Rikiram Sharma", img: "/assets/artists/11.png" },
        { name: "Lucky Ali", img: "/assets/artists/13.png" },
        { name: "Anuv Jain", img: "/assets/artists/12.png" },
        { name: "Javed Ali", img: "/assets/artists/2.png" },
        { name: "Zaeden", img: "/assets/artists/4.png" },
        { name: "Mohit Chauhan", img: "/assets/artists/10.png" },
        { name: "Jasleen Royal", img: "/assets/artists/8.png" },
        { name: "Arjun Kanungo", img: "/assets/artists/7.png" },
        { name: "DJ Chetas", img: "/assets/artists/9.png" },
        { name: "Ritviz", img: "/assets/artists/30.jpg" },
        { name: "The Yellow Diary", img: "/assets/artists/6.png" },
        { name: "OAFF x Savera", img: "/assets/artists/3.png" },
        { name: "Hasan Raheem", img: "/assets/artists/5.png" },
        { name: "Ronobir Lahri", img: "/assets/artists/29.jpg" },
    ] as Artist[],

    comedian: [
        { name: "Max Amini", img: "/assets/artists/16.png" },
        { name: "Vir Das", img: "/assets/artists/17.png" },
        { name: "Rahul Dua", img: "/assets/artists/15.png" },
        { name: "Atul Khatri", img: "/assets/artists/21.png" },
        { name: "Kunal Kamra", img: "/assets/artists/22.png" },
        { name: "Munawar Faruqui", img: "/assets/artists/28.png" },
        { name: "Sapan Verma", img: "/assets/artists/19.png" },
        { name: "Sonali Thakkar", img: "/assets/artists/18.png" },
        { name: "Sahil Shah", img: "/assets/artists/27.png" },
        { name: "Sorabh Pant", img: "/assets/artists/31.webp" },
        { name: "Neville Barucha", img: "/assets/artists/20.png" },
    ] as Artist[],

    storyteller: [
        { name: "Amandeep Khayal", img: "/assets/artists/23.png" },
        { name: "Ashish Bagrecha", img: "/assets/artists/24.png" },
    ],
}

export default function Page() {
    return (
        <section className="py-24 bg-black text-white sm:py-32 page-fun">

            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Page Heading */}
                <Reveal>
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="eyebrow-fun mb-4">
                            Our Roster
                        </p>
                        <h1 className="heading-fun text-5xl sm:text-6xl md:text-8xl">
                            Artists
                        </h1>

                        <p className="body-fun mt-3 max-w-2xl mx-auto">
                            The incredible talent that brings unforgettable moments
                            to every YOSN experience.
                        </p>
                    </div>
                </Reveal>

                {/* Tabs */}
                <Tabs defaultValue="musician">

                    <TabsList className="flex justify-center border border-white/10 bg-[#080808] p-1 mb-12 max-w-xl mx-auto sm:mb-16">

                        <TabsTrigger
                            value="musician"
                            className="px-4 py-2 text-xs font-medium uppercase tracking-widest
              text-white/50 hover:text-cyan-200 hover:bg-white/5
              data-[state=active]:!text-black
              data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-300 data-[state=active]:to-fuchsia-300
              data-[state=active]:shadow-[0_8px_22px_rgba(49,212,255,0.32)]
              transition-all duration-300 sm:px-6 sm:text-sm"
                        >
                            Musician
                        </TabsTrigger>

                        <TabsTrigger
                            value="comedian"
                            className="px-4 py-2 text-xs font-medium uppercase tracking-widest
              text-white/50 hover:text-cyan-200 hover:bg-white/5
              data-[state=active]:!text-black
              data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-300 data-[state=active]:to-fuchsia-300
              data-[state=active]:shadow-[0_8px_22px_rgba(49,212,255,0.32)]
              transition-all duration-300 sm:px-6 sm:text-sm"
                        >
                            Comedian
                        </TabsTrigger>

                        <TabsTrigger
                            value="storyteller"
                            className="px-4 py-2 text-xs font-medium uppercase tracking-widest
              text-white/50 hover:text-cyan-200 hover:bg-white/5
              data-[state=active]:!text-black
              data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-300 data-[state=active]:to-fuchsia-300
              data-[state=active]:shadow-[0_8px_22px_rgba(49,212,255,0.32)]
              transition-all duration-300 sm:px-6 sm:text-sm"
                        >
                            Storyteller
                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="musician">
                        <ArtistGrid artists={artistData.musician} />
                    </TabsContent>

                    <TabsContent value="comedian">
                        <ArtistGrid artists={artistData.comedian} />
                    </TabsContent>

                    <TabsContent value="storyteller">
                        <ArtistGrid artists={artistData.storyteller} />
                    </TabsContent>

                </Tabs>

            </div>

        </section>
    )
}

function ArtistGrid({ artists }: { artists: Artist[] }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">

            {artists.map((artist, i) => (

                <Reveal key={artist.name} delay={Math.min(i * 0.05, 0.25)}>

                    <motion.div
                        whileHover={{ y: -6 }}
                        className="fun-card relative aspect-square overflow-hidden rounded-xl group"
                    >

                        {artist.img ? (
                            <Image
                                src={artist.img}
                                alt={artist.name}
                                fill
                                className="object-cover transition-all duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%),linear-gradient(135deg,_#111,_#050505)]" />
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {!artist.img && (
                            <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-white/40">
                                Artist
                            </div>
                        )}

                        {/* Name */}
                        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
                            <p className="heading-fun text-base tracking-wide sm:text-lg">
                                {artist.name}
                            </p>
                        </div>

                    </motion.div>

                </Reveal>

            ))}

        </div>
    )
}
