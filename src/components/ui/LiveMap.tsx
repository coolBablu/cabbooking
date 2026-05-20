"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Car, Wifi } from "lucide-react";
import "leaflet/dist/leaflet.css";

type LatLng = { lat: number; lng: number };

type Props = {
  pickup: LatLng;
  pickupLabel?: string;
  dropoff: LatLng;
  dropoffLabel?: string;
  /** Driver display info shown in the floating info card. */
  driverName?: string;
  driverVehicle?: string;
  className?: string;
};

/**
 * A real interactive map for the marketing site.
 * Uses Leaflet + CartoDB Dark Matter tiles (matches our dark theme),
 * and OSRM's public routing API for the actual driving polyline.
 * Falls back to a great-circle line if OSRM is unreachable.
 */
export function LiveMap({
  pickup,
  pickupLabel = "Pickup",
  dropoff,
  dropoffLabel = "Drop-off",
  driverName = "Daniel Okafor",
  driverVehicle = "Tesla Model Y · ABC 4421",
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eta, setEta] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let animationId: number;
    let map: import("leaflet").Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current) return;

      // ── Initialise map ────────────────────────────────────
      map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      // CartoDB Dark Matter (no API key needed)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
          attribution: "© OpenStreetMap · © CARTO",
        }
      ).addTo(map);

      // Fit to both pins initially
      const bounds = L.latLngBounds([
        [pickup.lat, pickup.lng],
        [dropoff.lat, dropoff.lng],
      ]);
      map.fitBounds(bounds, { padding: [60, 60] });

      // ── Custom markers (HTML div icons matching brand) ─────
      const makePin = (
        emoji: string,
        bg: string,
        ring: string,
        label: string
      ) =>
        L.divIcon({
          className: "swiftcab-pin",
          html: `
            <div class="relative -translate-x-1/2 -translate-y-full pb-1">
              <div class="flex items-center gap-2 rounded-full ${bg} px-3 py-1.5 text-[10px] font-semibold text-ink-950 shadow-lg ${ring}">
                <span>${emoji}</span>${label}
              </div>
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 ${bg}"></div>
            </div>
          `,
          iconSize: [0, 0],
        });

      L.marker([pickup.lat, pickup.lng], {
        icon: makePin(
          "📍",
          "bg-sunny-400",
          "ring-2 ring-sunny-300/60",
          pickupLabel
        ),
      }).addTo(map);

      L.marker([dropoff.lat, dropoff.lng], {
        icon: makePin(
          "🏁",
          "bg-electric-400",
          "ring-2 ring-electric-300/60",
          dropoffLabel
        ),
      }).addTo(map);

      // ── Real driving route from OSRM ───────────────────────
      let coords: [number, number][] = [];
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("OSRM failed");
        const data = (await res.json()) as {
          routes?: {
            geometry: { coordinates: [number, number][] };
            duration: number;
            distance: number;
          }[];
        };
        const route = data.routes?.[0];
        if (!route) throw new Error("No route");
        coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        if (!cancelled) {
          setEta(Math.round(route.duration / 60));
          setDistanceKm(+(route.distance / 1000).toFixed(1));
        }
      } catch {
        // Fallback: straight line between the two points
        coords = [
          [pickup.lat, pickup.lng],
          [dropoff.lat, dropoff.lng],
        ];
        if (!cancelled) {
          setError(true);
          setEta(22);
          setDistanceKm(18.4);
        }
      }

      if (cancelled || !map) return;

      // Glow under-layer
      L.polyline(coords, {
        color: "#facc15",
        weight: 12,
        opacity: 0.18,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Main route
      const route = L.polyline(coords, {
        color: "#facc15",
        weight: 4,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Re-fit to the actual route polyline (uses real geometry, not just endpoints)
      map.fitBounds(route.getBounds(), { padding: [50, 50] });

      // ── Animated car marker travelling along the polyline ──
      const carIcon = L.divIcon({
        className: "swiftcab-car",
        html: `
          <div class="relative -translate-x-1/2 -translate-y-1/2">
            <div class="absolute inset-0 -m-2 rounded-full bg-sunny-400/40 blur-md"></div>
            <div class="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-950 bg-sunny-400 text-ink-950 shadow-glow-yellow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

      const carMarker = L.marker(coords[0], { icon: carIcon }).addTo(map);

      // Animate the marker along the polyline
      const DURATION_MS = 14_000;
      let start = performance.now();
      const animate = (now: number) => {
        const t = ((now - start) % DURATION_MS) / DURATION_MS;
        const i = t * (coords.length - 1);
        const idx = Math.floor(i);
        const frac = i - idx;
        const [aLat, aLng] = coords[idx];
        const [bLat, bLng] = coords[Math.min(idx + 1, coords.length - 1)];
        const lat = aLat + (bLat - aLat) * frac;
        const lng = aLng + (bLng - aLng) * frac;
        carMarker.setLatLng([lat, lng]);
        if (t > 0.99) start = now;
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    })();

    return () => {
      cancelled = true;
      if (animationId) cancelAnimationFrame(animationId);
      if (map) map.remove();
    };
    // Stable deps — recreate map only if endpoints change
  }, [pickup.lat, pickup.lng, dropoff.lat, dropoff.lng, pickupLabel, dropoffLabel]);

  return (
    <div className={`relative h-[480px] w-full overflow-hidden lg:h-full ${className ?? ""}`}>
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Top-left live badge */}
      <div className="pointer-events-none absolute left-4 top-4 z-[400] flex items-center gap-2 rounded-full bg-ink-950/70 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 backdrop-blur-xl ring-1 ring-emerald-400/30">
        <Wifi size={11} />
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live · OpenStreetMap
        </span>
      </div>

      {error && (
        <div className="pointer-events-none absolute right-4 top-4 z-[400] rounded-full bg-rose-400/15 px-2.5 py-1 text-[10px] text-rose-200 backdrop-blur-xl ring-1 ring-rose-400/30">
          OSRM offline — showing straight line
        </div>
      )}

      {/* Floating info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-5 left-5 right-5 z-[400] flex items-center justify-between rounded-2xl border border-white/10 bg-ink-950/80 p-4 backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunny-400/20 text-sunny-400">
            <Car size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">{driverName} is en route</p>
            <p className="text-xs text-white/55">{driverVehicle}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-lg">
            {eta != null ? `${String(eta).padStart(2, "0")}:00` : "--:--"}
          </p>
          <p className="text-[11px] text-white/55">
            {distanceKm != null ? `${distanceKm} km away` : "min away"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
