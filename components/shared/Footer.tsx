export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-16">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">

        <div>
          <h3 className="font-semibold mb-4">YOSN Innovations</h3>
          <p className="text-sm text-white/60">
            Creating experiences that elevate brands.
          </p>
        </div>

        <div className="space-y-2 text-sm text-white/60">
          <p>About</p>
          <p>Events</p>
          <p>Artists</p>
          <p>Contact</p>
        </div>

        <div className="text-sm text-white/60">
          © 2024 YOSN Innovations
        </div>

      </div>
    </footer>
  )
}