// Kept separate from client.ts so public pages that only read Firestore
// don't pull the Firebase Auth SDK into their bundle.
import { getAuth, type Auth } from "firebase/auth"
import { getFirebaseApp } from "./client"

let _auth: Auth | null = null

export function getClientAuth(): Auth {
  if (!_auth) _auth = getAuth(getFirebaseApp())
  return _auth
}
