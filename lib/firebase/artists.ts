import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { getClientDb } from "./client"
import type { Artist } from "@/types"

const COLLECTION = "artists"

function fromDoc(snap: QueryDocumentSnapshot<DocumentData>): Artist {
  const data = snap.data()
  return {
    id: snap.id,
    name: data.name ?? "",
    slug: data.slug ?? "",
    handle: data.handle ?? "",
    profileImage: data.profileImage ?? "",
    bio: data.bio,
    instagram: data.instagram,
    youtube: data.youtube,
    spotify: data.spotify,
    verified: data.verified ?? false,
    createdAt: data.createdAt,
  }
}

export async function getAllArtists(): Promise<Artist[]> {
  const db = getClientDb()
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getArtistById(id: string): Promise<Artist | null> {
  const db = getClientDb()
  const snap = await getDoc(doc(db, COLLECTION, id))
  if (!snap.exists()) return null
  return fromDoc(snap as QueryDocumentSnapshot<DocumentData>)
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  const db = getClientDb()
  const q = query(collection(db, COLLECTION), where("slug", "==", slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return fromDoc(snap.docs[0])
}

export type CreateArtistInput = Omit<Artist, "id" | "createdAt">

export async function createArtist(input: CreateArtistInput): Promise<string> {
  const db = getClientDb()
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateArtist(id: string, input: Partial<CreateArtistInput>): Promise<void> {
  const db = getClientDb()
  await updateDoc(doc(db, COLLECTION, id), input)
}

export async function deleteArtist(id: string): Promise<void> {
  const db = getClientDb()
  await deleteDoc(doc(db, COLLECTION, id))
}
