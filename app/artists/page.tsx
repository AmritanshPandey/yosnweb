"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Reveal } from "@/components/shared/Reveal"

const artistData = {
    musician: [
        { name: "Lucky Ali", img: "/assets/artists/13.png" },
        { name: "Anuv Jain", img: "/assets/artists/12.png" },
        { name: "Rishab Sharma", img: "/assets/artists/11.png" },
        { name: "Mohit Chauhan", img: "/assets/artists/10.png" },
        { name: "Javed Ali", img: "/assets/artists/2.png" },
        { name: "Arhum Fulfagar", img: "/assets/artists/1.png" },
        { name: "Arjun Kanungo", img: "/assets/artists/7.png" },
        { name: "DJ Chetas", img: "/assets/artists/9.png" },
        { name: "Hasan Raheem", img: "/assets/artists/5.png" },
        { name: "Jasleen Royal", img: "/assets/artists/8.png" },
        { name: "OAFF X Savera", img: "/assets/artists/3.png" },
        { name: "The Yellow Diary", img: "/assets/artists/6.png" },
    ],

    comedian: [
        { name: "Max Amini", img: "/assets/artists/16.png" },
        { name: "Vir Das", img: "/assets/artists/17.png" },
        { name: "Rahul Dua", img: "/assets/artists/15.png" },
        { name: "Kunal Kamra", img: "/assets/artists/22.png" },
        { name: "Munawar Faruqui", img: "/assets/artists/28.png" },
        { name: "Atul Khatri", img: "/assets/artists/21.png" },
        { name: "Sahil Shah", img: "/assets/artists/27.png" },
        { name: "Sonali Thakkar", img: "/assets/artists/18.png" },
        { name: "Neville Barucha", img: "/assets/artists/20.png" },
        { name: "Sapan Verma", img: "/assets/artists/19.png" },

    ],

    storyteller: [
        { name: "Amandeep Khayal", img: "/assets/artists/23.png" },
        { name: "Ashish Bagrecha", img: "/assets/artists/24.png" },
    ],
}

export default function Page() {
    return (
        <section className="py-32 bg-black text-white">

            <div className="max-w-7xl mx-auto px-6">

                {/* Page Heading */}
                <Reveal>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-4">
                            Artists
                        </h1>

                        <p className="text-white/60 max-w-2xl mx-auto">
                            The incredible talent that brings unforgettable moments
                            to every YOSN experience.
                        </p>
                    </div>
                </Reveal>

                {/* Tabs */}
                <Tabs defaultValue="musician">

                    <TabsList className="flex justify-center bg-white/5 border border-white/10 rounded-full p-1 mb-16 max-w-xl mx-auto">

                        <TabsTrigger
                            value="musician"
                            className="rounded-full px-6 py-2 text-sm font-medium
              text-white/60 hover:text-white hover:bg-white/10
              data-[state=active]:text-white
              data-[state=active]:bg-[#2AAFFB]
              data-[state=active]:shadow-[0_0_20px_rgba(42,175,251,0.4)]
              transition-all duration-300"
                        >
                            Musician
                        </TabsTrigger>

                        <TabsTrigger
                            value="comedian"
                            className="rounded-full px-6 py-2 text-sm font-medium
              text-white/60 hover:text-white hover:bg-white/10
              data-[state=active]:text-white
              data-[state=active]:bg-[#2AAFFB]
              data-[state=active]:shadow-[0_0_20px_rgba(42,175,251,0.4)]
              transition-all duration-300"
                        >
                            Comedian
                        </TabsTrigger>

                        <TabsTrigger
                            value="storyteller"
                            className="rounded-full px-6 py-2 text-sm font-medium
              text-white/60 hover:text-white hover:bg-white/10
              data-[state=active]:text-white
              data-[state=active]:bg-[#2AAFFB]
              data-[state=active]:shadow-[0_0_20px_rgba(42,175,251,0.4)]
              transition-all duration-300"
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

function ArtistGrid({ artists }: { artists: { name: string; img: string }[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {artists.map((artist, i) => (

                <Reveal key={artist.name} delay={i * 0.05}>

                    <motion.div
                        whileHover={{ y: -6 }}
                        className="relative aspect-square rounded-xl overflow-hidden group border border-white/10"
                    >

                        <img
                            src={artist.img}
                            alt={artist.name}
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Name */}
                        <div className="absolute bottom-5 left-5">
                            <p className="text-lg font-semibold">
                                {artist.name}
                            </p>
                        </div>

                    </motion.div>

                </Reveal>

            ))}

        </div>
    )
}