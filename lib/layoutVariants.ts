export interface LayoutVariant {
  avatarShape: "circle" | "hexagon" | "square";
  statStyle: "bars" | "dots" | "plain";
  headerAlign: "left" | "center";
}

export const LAYOUT_VARIANTS: LayoutVariant[] = [
  { avatarShape: "circle", statStyle: "bars", headerAlign: "left" },
  { avatarShape: "hexagon", statStyle: "dots", headerAlign: "center" },
  { avatarShape: "square", statStyle: "plain", headerAlign: "left" },
];