export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-20 dark:bg-black">
      <a href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-foreground px-10 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90">
        Go to dashboard
      </a>
    </div>
  );
}
