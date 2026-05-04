"use client";

import dynamic from "next/dynamic";

// ✅ Define type locally (fixes Vercel build issue)
type LatLngTuple = [number, number];

const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false }
);

type Props = {
  points: LatLngTuple[];
};

export default function RouteLine({ points }: Props) {
  if (!points || points.length < 2) return null;

  return (
    <Polyline
      positions={points}
      pathOptions={{
        color: "#FFD100", // DHL yellow
        weight: 5,
        dashArray: "10 10",
      }}
    />
  );
}