"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

/* ================= TYPES ================= */

type Location = {
  lat: number;
  lng: number;
  address?: string;
};

type Props = {
  location?: Location | null;
};

/* ================= DYNAMIC IMPORTS (SSR SAFE) ================= */

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false, loading: () => <MapPlaceholder message="Initializing Engine..." /> }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

/* ================= HELPER COMPONENT ================= */

function MapPlaceholder({ message }: { message: string }) {
  return (
    <div className="mt-6 h-80 rounded-sm bg-gray-50 flex flex-col items-center justify-center border border-gray-200">
      <div className="w-6 h-6 border-2 border-[#4D148C] border-t-[#FF6200] rounded-full animate-spin mb-3"></div>
      <p className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">
        {message}
      </p>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function TrackingMap({ location }: Props) {
  const markerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  /* ---------- SAFETY CHECK ---------- */
  if (!location || location.lat == null || location.lng == null) {
    return <MapPlaceholder message="Awaiting GPS Coordinates" />;
  }

  const center: [number, number] = [location.lat, location.lng];

  /* ---------- LOAD LEAFLET (CLIENT ONLY) ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      // ✅ Properly typed dynamic import (fixes Vercel build)
      const Leaflet = (await import("leaflet")) as typeof import("leaflet");

      // Fix marker icons in production
      delete (Leaflet as any).Icon.Default.prototype._getIconUrl;

      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setReady(true);
    })();
  }, []);

  /* ---------- SMOOTH MARKER UPDATE ---------- */
  useEffect(() => {
    if (!markerRef.current || !ready) return;
    markerRef.current.setLatLng(center);
  }, [location.lat, location.lng, ready]);

  if (!ready) {
    return <MapPlaceholder message="Loading Cartography" />;
  }

  return (
    <div className="mt-6 h-80 rounded-sm overflow-hidden shadow-lg border-t-4 border-[#4D148C] relative group">
      {/* Overlay */}
      <div className="absolute top-3 left-3 z-1000 bg-white/95 px-3 py-1.5 border border-gray-200 shadow-sm">
        <p className="text-[8px] font-black text-[#4D148C] uppercase tracking-widest leading-none">
          Status
        </p>
        <p className="text-[10px] font-bold text-gray-800 uppercase italic">
          Active Satellite Link
        </p>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; FedEx Logistics"
        />

        <Marker position={center} ref={markerRef}>
          <Popup>
            <div className="text-center p-1 font-sans">
              <p className="text-[9px] font-black uppercase text-[#4D148C] mb-1">
                Current Manifest Point
              </p>
              <p className="text-xs font-bold text-gray-700 m-0 leading-tight">
                {location.address || "Point of Interest"}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Global Leaflet styling */}
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 0px !important;
          border-bottom: 3px solid #FF6200;
        }
        .leaflet-popup-tip {
          display: none;
        }
      `}</style>
    </div>
  );
}