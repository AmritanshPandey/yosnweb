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
import type { Event } from "@/types"

const COLLECTION = "events"

function fromDoc(snap: QueryDocumentSnapshot<DocumentData>): Event {
  const data = snap.data()
  return {
    id: snap.id,
    featured: data.featured ?? false,
    category: data.category ?? "concert",
    name: data.name ?? "",
    slug: data.slug ?? "",
    status: data.status ?? "coming-soon",
    heroImage: data.heroImage ?? "",
    imageMeta: data.imageMeta ?? { width: 0, height: 0 },
    duration: data.duration ?? "",
    genres: data.genres ?? [],
    ticketsFrom: data.ticketsFrom ?? "",
    cities: data.cities ?? [],
    artistId: data.artistId ?? "",
    createdAt: data.createdAt,
  }
}

export async function getAllEvents(): Promise<Event[]> {
  const db = getClientDb()
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const db = getClientDb()
  const q = query(
    collection(db, COLLECTION),
    where("featured", "==", true),
    orderBy("createdAt", "desc"),
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getEventsByCategory(category: string): Promise<Event[]> {
  const db = getClientDb()
  const q = query(
    collection(db, COLLECTION),
    where("category", "==", category),
    orderBy("createdAt", "desc"),
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getEventById(id: string): Promise<Event | null> {
  const db = getClientDb()
  const snap = await getDoc(doc(db, COLLECTION, id))
  if (!snap.exists()) return null
  return fromDoc(snap as QueryDocumentSnapshot<DocumentData>)
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const db = getClientDb()
  const q = query(collection(db, COLLECTION), where("slug", "==", slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return fromDoc(snap.docs[0])
}

export type CreateEventInput = Omit<Event, "id" | "createdAt">

export async function createEvent(input: CreateEventInput): Promise<string> {
  const db = getClientDb()
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateEvent(id: string, input: Partial<CreateEventInput>): Promise<void> {
  const db = getClientDb()
  await updateDoc(doc(db, COLLECTION, id), input)
}

export async function deleteEvent(id: string): Promise<void> {
  const db = getClientDb()
  await deleteDoc(doc(db, COLLECTION, id))
}
