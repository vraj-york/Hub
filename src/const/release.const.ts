export const RELEASE_PAGE_CONTENT = {
	title: "Release Roadmap",
	subtitle: "Planned and actual release dates by version.",
	breadcrumbsTitle: "Release Roadmap",
	columnPlanned: "Planned release",
	columnTimeline: "Timeline",
	columnActual: "Actual release",
	plannedLabel: "ReleaseDate",
	actualLabel: "Actual Release Date",
	plannedHeaderEyebrow: "Planned release dates",
	actualHeaderEyebrow: "Actual release date",
	accordionDescription: "Description",
	accordionChangeHistory: "Change history",
	accordionRevisionHistory: "Revision history",
	revisionLatestPrefix: "Latest",
	plannedStatusActive: "Active",
	plannedDescriptionPlaceholder:
		"Release scope, acceptance criteria, and rollout notes will appear here.",
	plannedChangeHistoryPlaceholder:
		"Prior schedule and scope changes will be listed here.",
	plannedRevisionNotesPlaceholder:
		"Revision notes and approvals will appear here.",
} as const;

export type ReleaseTimelineEntry = {
	id: string;
	version: string;
	timelineDate: string;
	/** Shown in the planned card date row; use a range with → when applicable. */
	plannedDateRangeDisplay: string;
	actualDateDisplay: string;
	ownerName: string;
	ownerInitials: string;
	revisionCount: number;
	revisionLatestId: string;
};

/** Sample data — replace with API when available. */
export const RELEASE_TIMELINE_MOCK: ReleaseTimelineEntry[] = [
	{
		id: "1",
		version: "1.21.9",
		timelineDate: "Mar 30, 2026",
		plannedDateRangeDisplay: "March 1, 2026 → March 8, 2026",
		actualDateDisplay: "4th March 2026",
		ownerName: "Vraj Gangani",
		ownerInitials: "VG",
		revisionCount: 1,
		revisionLatestId: "R1",
	},
	{
		id: "2",
		version: "1.21.6",
		timelineDate: "Mar 25, 2026",
		plannedDateRangeDisplay: "February 18, 2026 → February 28, 2026",
		actualDateDisplay: "25th March 2026",
		ownerName: "Vraj Gangani",
		ownerInitials: "VG",
		revisionCount: 2,
		revisionLatestId: "R2",
	},
	{
		id: "3",
		version: "1.21.3",
		timelineDate: "Feb 14, 2026",
		plannedDateRangeDisplay: "February 1, 2026 → February 12, 2026",
		actualDateDisplay: "14th February 2026",
		ownerName: "Vraj Gangani",
		ownerInitials: "VG",
		revisionCount: 1,
		revisionLatestId: "R1",
	},
] as const;
