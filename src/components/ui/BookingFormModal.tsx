"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation2,
  Calendar,
  Users,
  Car,
  Crown,
  Bike,
  Plane,
  ArrowRight,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Modal } from "./Modal";
import { ROUTES } from "@/lib/routes";

type RideKey = "lite" | "plus" | "luxe" | "bike" | "airport";

const RIDE_TYPES: {
  key: RideKey;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  eta: string;
  price: number;
  capacity: number;
}[] = [
  { key: "lite", name: "Lite", icon: Car, eta: "2 min", price: 12.4, capacity: 4 },
  { key: "plus", name: "Plus", icon: Sparkles, eta: "3 min", price: 18.6, capacity: 4 },
  { key: "luxe", name: "Luxe", icon: Crown, eta: "5 min", price: 28.4, capacity: 4 },
  { key: "bike", name: "Bike", icon: Bike, eta: "1 min", price: 4.8, capacity: 1 },
  { key: "airport", name: "Airport", icon: Plane, eta: "8 min", price: 42, capacity: 4 },
];

const POPULAR_PICKUPS = [
  "Brooklyn Bridge, NYC",
  "Times Square, NYC",
  "123 Madison Ave, NYC",
];
const POPULAR_DROPS = [
  "JFK International Airport",
  "LaGuardia Airport",
  "MoMA, Manhattan",
];

export function BookingFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [pickup, setPickup] = useState("Brooklyn Bridge, NYC");
  const [dropoff, setDropoff] = useState("JFK International Airport");
  const [when, setWhen] = useState<"now" | "later">("now");
  const [seats, setSeats] = useState(1);
  const [ride, setRide] = useState<RideKey>("plus");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<{ pickup?: string; dropoff?: string }>({});

  const selected = RIDE_TYPES.find((r) => r.key === ride)!;

  function reset() {
    setDone(false);
    setSubmitting(false);
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e: typeof errors = {};
    if (pickup.trim().length < 3) e.pickup = "Enter your pickup location";
    if (dropoff.trim().length < 3) e.dropoff = "Where are we going?";
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700)); // simulate quote
    setSubmitting(false);
    setDone(true);
  }

  function goToFullBooking() {
    onClose();
    setTimeout(reset, 200);
    router.push(ROUTES.booking);
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setTimeout(reset, 200);
      }}
      size="lg"
      title={
        done ? (
          <span className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-400" /> Quote ready
          </span>
        ) : (
          "Book a ride"
        )
      }
      subtitle={
        done
          ? "Lock it in or jump to the full flow to pick payment."
          : "30-second mini booking — pick it up where you left off."
      }
    >
      <div className="px-6 py-5">
        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-sunny-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sunny-300">
                  AI route · {selected.name}
                </span>
                <span className="font-display text-3xl">
                  ${selected.price.toFixed(2)}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <Row icon={<MapPin size={14} className="text-sunny-400" />} value={pickup} />
                <Row icon={<Navigation2 size={14} className="text-electric-400" />} value={dropoff} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Tile k="ETA" v={selected.eta} />
                <Tile k="Seats" v={`${seats}`} />
                <Tile k="When" v={when === "now" ? "Now" : "Later"} />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={reset}
                className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold hover:bg-white/[0.08]"
              >
                Edit details
              </button>
              <button
                onClick={goToFullBooking}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3 text-sm font-semibold text-ink-950 shadow-glow-yellow"
              >
                Continue to checkout <ArrowRight size={14} />
              </button>
            </div>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/55">
              <ShieldCheck size={11} className="text-emerald-400" />
              Insured · verified driver · cancel free up to 5 min
            </p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Locations */}
            <div className="space-y-3">
              <Field
                icon={<MapPin size={15} className="text-sunny-400" />}
                label="Pickup"
                value={pickup}
                onChange={setPickup}
                placeholder="Where from?"
                error={errors.pickup}
                suggestions={POPULAR_PICKUPS}
              />
              <Field
                icon={<Navigation2 size={15} className="text-electric-400" />}
                label="Drop-off"
                value={dropoff}
                onChange={setDropoff}
                placeholder="Where to?"
                error={errors.dropoff}
                suggestions={POPULAR_DROPS}
              />
            </div>

            {/* When + seats */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>When</Label>
                <div className="mt-2 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
                  <PillBtn active={when === "now"} onClick={() => setWhen("now")}>
                    Now
                  </PillBtn>
                  <PillBtn
                    active={when === "later"}
                    onClick={() => setWhen("later")}
                    icon={<Calendar size={12} />}
                  >
                    Schedule
                  </PillBtn>
                </div>
              </div>
              <div>
                <Label>Seats</Label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.max(1, s - 1))}
                    className="h-9 w-9 rounded-xl bg-white/[0.05] text-white/85 hover:bg-white/[0.1]"
                  >
                    −
                  </button>
                  <div className="flex flex-1 items-center justify-center gap-2 text-sm">
                    <Users size={13} className="text-white/55" />
                    <span className="font-semibold">{seats}</span>
                    <span className="text-white/55">{seats === 1 ? "person" : "people"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.min(selected.capacity, s + 1))}
                    className="h-9 w-9 rounded-xl bg-white/[0.05] text-white/85 hover:bg-white/[0.1]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Ride type */}
            <div>
              <Label>Ride type</Label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {RIDE_TYPES.map((r) => {
                  const Icon = r.icon;
                  const active = ride === r.key;
                  return (
                    <button
                      type="button"
                      key={r.key}
                      onClick={() => {
                        setRide(r.key);
                        if (seats > r.capacity) setSeats(r.capacity);
                      }}
                      className={`relative overflow-hidden rounded-2xl border p-3 text-left transition ${
                        active
                          ? "border-sunny-400/60 bg-sunny-400/10"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={active ? "text-sunny-400" : "text-white/80"}
                      />
                      <p className="mt-2 text-sm font-semibold">{r.name}</p>
                      <p className="text-[11px] text-white/55">{r.eta}</p>
                      <p className="text-[11px] font-semibold text-white/85">
                        ${r.price.toFixed(2)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: submitting ? 1 : 1.01 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Pricing your ride…
                </>
              ) : (
                <>
                  Get fare estimate <ArrowRight size={14} />
                </>
              )}
            </motion.button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/55">
              <ShieldCheck size={11} className="text-emerald-400" />
              All drivers verified · 24/7 support · no hidden fees
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
}

function Field({
  icon,
  label,
  value,
  onChange,
  placeholder,
  error,
  suggestions,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  suggestions?: string[];
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div
        className={`mt-2 flex items-center gap-3 rounded-2xl border bg-ink-950/40 px-4 py-3 focus-within:border-sunny-400/40 ${
          error ? "border-rose-400/60" : "border-white/10"
        }`}
      >
        {icon}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-300">{error}</p>}
      {suggestions && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => onChange(s)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/65 hover:bg-white/[0.08] hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
      {children}
    </label>
  );
}

function PillBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium transition ${
        active
          ? "bg-sunny-400 text-ink-950 shadow-glow-yellow"
          : "text-white/70 hover:bg-white/[0.04]"
      }`}
    >
      {icon} {children}
    </button>
  );
}

function Row({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {icon}
      {value}
    </div>
  );
}

function Tile({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-white/55">{k}</p>
      <p className="mt-0.5 text-sm font-semibold">{v}</p>
    </div>
  );
}
