import { GlobalHeader } from "@/components/layout/global-header"
import { MainWrapper } from "@/components/layout/main-wrapper"
import { Sidebar } from "@/components/layout/sidebar"

export function CorporationsPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <GlobalHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainWrapper>
          <div className="border-b border-border bg-card px-6 py-4">
            <h1 className="mb-1 text-xl font-semibold text-foreground">TEST</h1>
          </div>
        </MainWrapper>
      </div>
    </div>
  )
}
