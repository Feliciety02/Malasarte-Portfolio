export type WorkspaceTabId = "live" | "design" | "flipbook";

export type WorkspaceTab = {
  id: WorkspaceTabId;
  label: string;
  title: string;
  note?: string;
  src: string;
  externalUrl: string;
  allow: string;
  minWidthClassName: string;
};
