"use client"

import { useEffect } from "react"

export const UNSAVED_CHANGES_MESSAGE = "You have unsaved changes. Leave without saving?"

// Warns before losing edits: on tab close/reload, and on in-app link clicks
// (Next's client-side navigation doesn't fire beforeunload).
export function useUnsavedChangesGuard(when: boolean) {
  useEffect(() => {
    if (!when) return

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null
      if (!link || link.target === "_blank" || link.origin !== window.location.origin) return
      if (!window.confirm(UNSAVED_CHANGES_MESSAGE)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    window.addEventListener("beforeunload", onBeforeUnload)
    document.addEventListener("click", onClick, true)
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload)
      document.removeEventListener("click", onClick, true)
    }
  }, [when])
}
