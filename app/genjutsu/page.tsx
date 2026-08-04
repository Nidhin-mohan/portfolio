import type { Metadata } from "next";
import GenjutsuStage from "@/components/genjutsu/GenjutsuStage";

export const metadata: Metadata = {
  title: "Tsukuyomi — Experiment 01 | Nidhin M",
  description:
    "Hold eye contact and the page falls into a genjutsu. One second in here is seventy-two hours — long enough to read the whole CV. One fragment shader, no 3D library.",
  robots: { index: false, follow: false },
};

export default function GenjutsuPage() {
  return <GenjutsuStage />;
}
