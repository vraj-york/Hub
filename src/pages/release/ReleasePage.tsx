import type { ReactNode } from "react";
import {
	Calendar,
	ChevronDown,
	History,
	Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	RELEASE_PAGE_CONTENT,
	RELEASE_TIMELINE_MOCK,
	type ReleaseTimelineEntry,
	ROUTES,
} from "@/const";
import { AppLayout } from "@/layout";
import { cn } from "@/lib/utils";

const plannedHeaderClass =
	"border-[#E8C96A] bg-gradient-to-r from-[#FFF9E6] to-white";
const plannedIconBoxClass = "bg-[#FAF6ED] text-[#78350F]";
const plannedEyebrowClass = "text-[#B45309]";

const actualVariants = {
	pink: {
		wrap: "border-[#F8D7DA] bg-gradient-to-r from-[#FFF1F1] to-white",
		iconBox: "bg-[#F5C6CB] text-[#9B2C2C]",
		eyebrow: "text-[#C53030]",
	},
	teal: {
		wrap: "border-[#B2F5EA] bg-gradient-to-r from-[#E6FFFA] to-white",
		iconBox: "bg-[#9AE6DE] text-[#234E52]",
		eyebrow: "text-[#2C7A7B]",
	},
} as const;

const headerGridClass =
	"mb-6 hidden pb-3 lg:grid lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)] lg:gap-x-8";

function ReleaseDateGradientHeader({
	eyebrow,
	dateLine,
	variant,
}: {
	eyebrow: string;
	dateLine: string;
	variant: "planned" | "pink" | "teal";
}) {
	const isPlanned = variant === "planned";
	const v = isPlanned ? null : actualVariants[variant];

	return (
		<div
			className={cn(
				"flex gap-3 rounded-xl border p-3.5 shadow-sm",
				isPlanned ? plannedHeaderClass : v?.wrap,
			)}
		>
			<div
				className={cn(
					"flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#E8D4A8]/60",
					isPlanned ? plannedIconBoxClass : v?.iconBox,
				)}
			>
				<Calendar className="size-5" strokeWidth={2} aria-hidden />
			</div>
			<div className="min-w-0 flex flex-col justify-center gap-0.5">
				<p
					className={cn(
						"text-[10px] font-semibold uppercase tracking-wide",
						isPlanned ? plannedEyebrowClass : v?.eyebrow,
					)}
				>
					{eyebrow}
				</p>
				<p className="text-small font-semibold leading-snug text-text-foreground">
					{dateLine}
				</p>
			</div>
		</div>
	);
}

function AccordionBar({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left",
				className,
			)}
		>
			{children}
		</div>
	);
}

function PlannedReleaseCard({ entry }: { entry: ReleaseTimelineEntry }) {
	const revisionLabel =
		entry.revisionCount === 1
			? "1 revision"
			: `${entry.revisionCount} revisions`;

	return (
		<Card className="overflow-hidden border-border shadow-md" size="sm">
			<div className="h-2 w-full shrink-0 bg-success" aria-hidden />
			<CardContent className="space-y-5 p-5">
				<ReleaseDateGradientHeader
					eyebrow={RELEASE_PAGE_CONTENT.plannedHeaderEyebrow}
					dateLine={entry.plannedDateRangeDisplay}
					variant="planned"
				/>

				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex min-w-0 items-center gap-3">
						<Avatar size="sm">
							<AvatarFallback className="bg-muted text-xs font-medium text-text-secondary">
								{entry.ownerInitials}
							</AvatarFallback>
						</Avatar>
						<span className="truncate text-small text-text-secondary">
							{entry.ownerName}
						</span>
					</div>
					<span
						className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success/35 bg-success-bg px-2.5 py-1 text-xs font-medium text-success"
						data-slot="release-status-badge"
					>
						<span
							className="size-1.5 rounded-full bg-success"
							aria-hidden
						/>
						{RELEASE_PAGE_CONTENT.plannedStatusActive}
						<Sparkles
							className="size-3.5 opacity-90"
							strokeWidth={2}
							aria-hidden
						/>
					</span>
				</div>

				<div className="space-y-2">
					<Collapsible>
						<CollapsibleTrigger className="group w-full cursor-pointer">
							<AccordionBar>
								<span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
									{RELEASE_PAGE_CONTENT.accordionDescription}
								</span>
								<ChevronDown
									className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
									aria-hidden
								/>
							</AccordionBar>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<p className="text-muted-foreground border-border mt-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs leading-relaxed">
								{RELEASE_PAGE_CONTENT.plannedDescriptionPlaceholder}
							</p>
						</CollapsibleContent>
					</Collapsible>

					<Collapsible>
						<CollapsibleTrigger className="group w-full cursor-pointer">
							<AccordionBar>
								<span className="flex items-center gap-2 text-small font-medium text-text-foreground">
									<History
										className="size-4 shrink-0 text-muted-foreground"
										aria-hidden
									/>
									{RELEASE_PAGE_CONTENT.accordionChangeHistory}
								</span>
								<ChevronDown
									className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
									aria-hidden
								/>
							</AccordionBar>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<p className="text-muted-foreground border-border mt-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs leading-relaxed">
								{RELEASE_PAGE_CONTENT.plannedChangeHistoryPlaceholder}
							</p>
						</CollapsibleContent>
					</Collapsible>

					<Collapsible>
						<CollapsibleTrigger className="group w-full cursor-pointer">
							<AccordionBar>
								<span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
									<span className="text-small font-semibold text-text-foreground">
										{RELEASE_PAGE_CONTENT.accordionRevisionHistory}
									</span>
									<span className="text-xs text-text-secondary">
										{revisionLabel}
									</span>
									<span className="text-xs text-text-secondary">
										{RELEASE_PAGE_CONTENT.revisionLatestPrefix}{" "}
										<span className="font-semibold text-text-foreground">
											{entry.revisionLatestId}
										</span>
									</span>
								</span>
								<ChevronDown
									className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
									aria-hidden
								/>
							</AccordionBar>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<p className="text-muted-foreground border-border mt-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs leading-relaxed">
								{RELEASE_PAGE_CONTENT.plannedRevisionNotesPlaceholder}
							</p>
						</CollapsibleContent>
					</Collapsible>
				</div>
			</CardContent>
		</Card>
	);
}

function TimelineNodeBlock({
	version,
	timelineDate,
}: {
	version: string;
	timelineDate: string;
}) {
	return (
		<div className="flex flex-col items-center pt-1 text-center lg:pt-0">
			<div
				className="relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full bg-success-bg shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset]"
				aria-hidden
			>
				<span className="size-3.5 rounded-full bg-success shadow-sm ring-2 ring-background" />
			</div>
			<span className="relative z-[1] mt-2 text-small font-bold text-text-foreground">
				{version}
			</span>
			<span className="relative z-[1] mt-0.5 text-xs text-text-secondary">
				{timelineDate}
			</span>
		</div>
	);
}

export function ReleasePage() {
	const breadcrumbs = [
		{
			label: RELEASE_PAGE_CONTENT.breadcrumbsTitle,
			path: ROUTES.release.root,
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mb-6">
				<h1 className="text-heading-4 font-semibold text-text-foreground">
					{RELEASE_PAGE_CONTENT.title}
				</h1>
				<p className="text-small text-text-secondary">
					{RELEASE_PAGE_CONTENT.subtitle}
				</p>
			</div>

			<div className="mb-6 border-b border-border pb-3 lg:mb-8">
				<div className="space-y-3 lg:hidden">
					<p className="text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
						{RELEASE_PAGE_CONTENT.columnTimeline}
					</p>
					<div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
						<div>{RELEASE_PAGE_CONTENT.columnPlanned}</div>
						<div className="text-end">
							{RELEASE_PAGE_CONTENT.columnActual}
						</div>
					</div>
				</div>
				<div className={headerGridClass}>
					<div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
						{RELEASE_PAGE_CONTENT.columnPlanned}
					</div>
					<div className="text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
						{RELEASE_PAGE_CONTENT.columnTimeline}
					</div>
					<div className="text-xs font-semibold uppercase tracking-wide text-text-secondary lg:text-end">
						{RELEASE_PAGE_CONTENT.columnActual}
					</div>
				</div>
			</div>

			{/* Desktop: planned | timeline | actual */}
			<div className="hidden lg:flex lg:gap-8 lg:items-start">
				<div className="min-w-0 flex-1 space-y-10">
					{RELEASE_TIMELINE_MOCK.map((entry) => (
						<PlannedReleaseCard key={`planned-${entry.id}`} entry={entry} />
					))}
				</div>

				<div className="relative flex w-[5.5rem] shrink-0 flex-col items-center gap-10 self-stretch">
					<div
						className="absolute top-0 bottom-0 left-1/2 z-0 w-px -translate-x-1/2 rounded-full bg-border"
						aria-hidden
					/>
					{RELEASE_TIMELINE_MOCK.map((entry) => (
						<TimelineNodeBlock
							key={`node-${entry.id}`}
							version={entry.version}
							timelineDate={entry.timelineDate}
						/>
					))}
				</div>

				<div className="min-w-0 flex-1 space-y-10">
					{RELEASE_TIMELINE_MOCK.map((entry, rowIndex) => {
						const actualVariant =
							rowIndex % 2 === 0 ? ("pink" as const) : ("teal" as const);
						return (
							<Card
								key={`actual-${entry.id}`}
								className="overflow-hidden border-border shadow-md"
								size="sm"
							>
								<CardContent className="p-5 lg:pt-7">
									<div className="lg:mt-1">
										<ReleaseDateGradientHeader
											eyebrow={RELEASE_PAGE_CONTENT.actualHeaderEyebrow}
											dateLine={entry.actualDateDisplay}
											variant={actualVariant}
										/>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>

			{/* Mobile: stacked blocks per release (planned → timeline → actual) */}
			<div className="flex flex-col gap-10 lg:hidden">
				{RELEASE_TIMELINE_MOCK.map((entry, rowIndex) => {
					const actualVariant =
						rowIndex % 2 === 0 ? ("pink" as const) : ("teal" as const);
					return (
						<div key={entry.id} className="flex flex-col gap-4">
							<PlannedReleaseCard entry={entry} />
							<TimelineNodeBlock
								version={entry.version}
								timelineDate={entry.timelineDate}
							/>
							<Card
								className="overflow-hidden border-border shadow-md"
								size="sm"
							>
								<CardContent className="p-5">
									<ReleaseDateGradientHeader
										eyebrow={RELEASE_PAGE_CONTENT.actualHeaderEyebrow}
										dateLine={entry.actualDateDisplay}
										variant={actualVariant}
									/>
								</CardContent>
							</Card>
						</div>
					);
				})}
			</div>
		</AppLayout>
	);
}
