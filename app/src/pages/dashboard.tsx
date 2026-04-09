import { GlobalHeader } from "@/components/layout/global-header"

export function DashboardPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <GlobalHeader />
      <div className="group/sidebar-wrapper flex min-h-0 flex-1 overflow-hidden has-data-[variant=inset]:bg-sidebar">
        <aside
          data-variant="inset"
          className="peer hidden w-64 shrink-0 border-r border-border bg-card md:block"
          aria-hidden
        />
        <main className="flex min-h-0 flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:bg-background">
          <header className="z-10 flex h-15 shrink-0 items-center border-b border-border px-4 md:px-6">
            <div className="flex min-w-0 flex-1">
              <nav
                className="min-w-0 flex-1"
                aria-label="Breadcrumb"
              >
                <ol className="flex min-w-0 items-center">
                  <li className="flex min-w-0 shrink-0">
                    <span className="truncate text-sm font-medium capitalize text-text-foreground">
                      Test Dashbaord
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </header>
          <div className="flex min-h-0 flex-1 flex-col overflow-auto">
            <div className="flex min-h-[calc(100vh-8rem)] w-full justify-center px-4 py-6 md:px-6">
              <div className="w-full max-w-4xl">
                <div className="flex flex-col gap-6 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
                  <div className="gap-1 rounded-t-xl px-6 pt-6">
                    <div
                      data-slot="card-title"
                      className="mb-1 text-heading-4 font-semibold text-red-600"
                    >
                      Basic Details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
