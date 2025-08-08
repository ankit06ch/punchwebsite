"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import mapboxgl from "mapbox-gl";

// ---------------- Hours Editor ----------------
const DAYS: Array<{ key: string; label: string }> = [
  { key: "Mon", label: "Monday" },
  { key: "Tue", label: "Tuesday" },
  { key: "Wed", label: "Wednesday" },
  { key: "Thu", label: "Thursday" },
  { key: "Fri", label: "Friday" },
  { key: "Sat", label: "Saturday" },
  { key: "Sun", label: "Sunday" },
];

function formatTimeRange(open: string, close: string): string {
  if (!open || !close) return "";
  const to12h = (t: string) => {
    const [hStr, m] = t.split(":");
    let h = parseInt(hStr, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${m} ${ampm}`;
    };
  return `${to12h(open)} – ${to12h(close)}`;
}

function HoursEditor({ value, onChange }: { value: Record<string, string> | undefined; onChange: (v: Record<string, string>) => void }) {
  const [local, setLocal] = useState<Record<string, { closed: boolean; open: string; close: string }>>(() => {
    const initial: Record<string, { closed: boolean; open: string; close: string }> = {};
    DAYS.forEach((d) => {
      const existing = value?.[d.key];
      if (!existing || existing === "Closed") {
        initial[d.key] = { closed: !existing ? true : existing === "Closed", open: "11:00", close: "21:00" };
      } else {
        // Parse back best-effort; default to typical hours
        initial[d.key] = { closed: false, open: "11:00", close: "21:00" };
      }
    });
    return initial;
  });

  useEffect(() => {
    // Sync outward as a map of strings per day
    const out: Record<string, string> = {};
    for (const day of DAYS) {
      const d = local[day.key];
      out[day.key] = d.closed ? "Closed" : formatTimeRange(d.open, d.close);
    }
    onChange(out);
  }, [local, onChange]);

  const applyToRange = (fromKey: string, rangeKeys: string[]) => {
    const src = local[fromKey];
    if (!src) return;
    const next = { ...local };
    for (const k of rangeKeys) {
      next[k] = { ...src };
    }
    setLocal(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-1">
        <span className="text-sm text-gray-600">Quick apply:</span>
        <button
          type="button"
          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
          onClick={() => applyToRange("Mon", ["Mon", "Tue", "Wed", "Thu"]) }
        >
          Mon → Mon-Thu
        </button>
        <button
          type="button"
          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
          onClick={() => applyToRange("Fri", ["Fri", "Sat"]) }
        >
          Fri → Fri-Sat
        </button>
        <button
          type="button"
          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
          onClick={() => applyToRange("Mon", ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) }
        >
          Mon → Weekdays+Sat
        </button>
        <button
          type="button"
          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
          onClick={() => applyToRange("Sun", ["Sun"]) }
        >
          Sun only
        </button>
      </div>
      <div className="divide-y rounded-lg border bg-white">
        {DAYS.map((d) => (
          <div key={d.key} className="grid grid-cols-12 items-center gap-3 p-3">
            <div className="col-span-3 sm:col-span-2 font-medium text-sm">{d.label}</div>
            <label className="col-span-3 sm:col-span-2 inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={local[d.key]?.closed || false}
                onChange={(e) => setLocal((prev) => ({ ...prev, [d.key]: { ...(prev[d.key] || { open: "11:00", close: "21:00" }), closed: e.target.checked } }))}
              />
              Closed
            </label>
            <div className="col-span-3 sm:col-span-3">
              <input
                type="time"
                className="form-input w-full py-2"
                disabled={local[d.key]?.closed}
                value={local[d.key]?.open || "11:00"}
                onChange={(e) => setLocal((prev) => ({ ...prev, [d.key]: { ...(prev[d.key] || { closed: false, close: "21:00" }), open: e.target.value } }))}
              />
            </div>
            <div className="col-span-3 sm:col-span-3">
              <input
                type="time"
                className="form-input w-full py-2"
                disabled={local[d.key]?.closed}
                value={local[d.key]?.close || "21:00"}
                onChange={(e) => setLocal((prev) => ({ ...prev, [d.key]: { ...(prev[d.key] || { closed: false, open: "11:00" }), close: e.target.value } }))}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500">Hours will be saved per-day, e.g. <code>{"{\"Mon\":\"11:00 AM – 9:00 PM\"}"}</code>. Closed days are saved as "Closed".</div>
    </div>
  );
}

// ---------------- Map (dark) - Mapbox GL ----------------
function MapboxMap({ lat, lon }: { lat: number; lon: number }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;
    mapboxgl.accessToken = token;
    if (!mapContainerRef.current) return;
    if (!mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [lon, lat],
        zoom: 14,
        attributionControl: false,
      });
      mapRef.current = map;
    } else {
      mapRef.current.setCenter([lon, lat]);
      mapRef.current.setZoom(14);
    }

    if (!markerRef.current) {
      markerRef.current = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(mapRef.current!);
    } else {
      markerRef.current.setLngLat([lon, lat]);
    }

    return () => {
      // cleanup on unmount only below
    };
  }, [lat, lon]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerRef.current = null;
    };
  }, []);

  return <div ref={mapContainerRef} className="h-56 w-full overflow-hidden rounded-lg border" />;
}

function MapPreview({ lat, lon }: { lat: number; lon: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-56 w-full overflow-hidden rounded-lg border" />;
  return <MapboxMap lat={lat} lon={lon} />;
}

// ---------------- Steps ----------------
const steps = [
  { key: "name", label: "Restaurant Name", placeholder: "Sushi Town", type: "text" },
  { key: "cuisine", label: "Cuisine", placeholder: "Sushi", type: "text" },
  { key: "price", label: "Price", placeholder: "$$$", type: "text" },
  { key: "location", label: "Address", placeholder: "123 Main St, San Francisco, CA", type: "address" },
  { key: "hours", label: "Hours", type: "hours" },
  { key: "logoUrl", label: "Logo URL", placeholder: "https://placehold.co/64x64?text=S", type: "url" },
  { key: "rating", label: "Rating", placeholder: "4.7", type: "number", min: 0, max: 5, step: 0.1 },
];

export default function OnboardRestaurant({ onComplete }: { onComplete: (values: any) => void }) {
  const [step, setStep] = useState(-1); // -1 means intro card
  const [values, setValues] = useState<any>({});
  const [error, setError] = useState("");
  const [loading] = useState(false);

  const current = steps[step];

  // Address autocomplete
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  const [isOpenSuggest, setIsOpenSuggest] = useState(false);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    if (current?.type !== "address") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}&limit=5`;
        const res = await fetch(url, { headers: { "Accept": "application/json" } });
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
        setIsOpenSuggest(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [query, current?.type]);

  const chooseSuggestion = (s: { display_name: string; lat: string; lon: string }) => {
    const lat = parseFloat(s.lat);
    const lon = parseFloat(s.lon);
    setValues((prev: any) => ({ ...prev, location: s.display_name, coordinates: { lat, lon } }));
    setQuery(s.display_name);
    setIsOpenSuggest(false);
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const value = values[current.key];

    if (current.type === "hours") {
      if (!value || Object.keys(value).length !== 7) {
        setError("Please configure hours for all days.");
        return;
      }
    } else if (current.type === "address") {
      if (!values.coordinates) {
        setError("Please select a suggested address to validate.");
        return;
      }
    } else if (!value || (current.type === "number" && isNaN(Number(value)))) {
      setError("Please enter a valid value.");
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({ ...values });
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [current.key]: e.target.value });
  };

  const handleHoursChange = (hours: Record<string, string>) => {
    setValues({ ...values, hours });
  };

  if (step === -1) {
    return (
      <div className="max-w-md mx-auto mt-24 p-10 rounded-3xl shadow-2xl flex flex-col items-center bg-white/30 backdrop-blur-md border border-white/40 relative overflow-hidden">
        {/* Orange Glow */}
        <div className="absolute -z-10 left-1/2 top-0 -translate-x-1/2 blur-2xl opacity-40" style={{ width: 320, height: 120, background: 'radial-gradient(circle, #FB7A20 0%, transparent 80%)' }} />
        {/* Fun Icon */}
        <div className="mb-4 text-5xl">🍣</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 text-center drop-shadow">A few questions to get you set up...</h2>
        <p className="text-gray-700 text-center mb-6">This will help us personalize your dashboard and get your restaurant live in minutes.</p>
        <button
          className="btn bg-[#FB7A20] text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-[#e66a1a] transition-all duration-200 mt-2"
          onClick={() => setStep(0)}
        >
          Start
        </button>
      </div>
    );
  }

  // Default map center if not yet selected
  const defaultCenter = { lat: values.coordinates?.lat ?? 37.7749, lon: values.coordinates?.lon ?? -122.4194 };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.form
          key={current.key}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleNext}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="block text-lg font-semibold" htmlFor={current.key}>
              {current.label}
            </label>
            <div className="text-sm text-gray-400">Step {step + 1} of {steps.length}</div>
          </div>

          {current.type === "hours" && (
            <HoursEditor value={values[current.key]} onChange={handleHoursChange} />
          )}

          {current.type === "address" && (
            <div className="space-y-3">
              <div className="relative">
                <input
                  id={current.key}
                  name={current.key}
                  type="text"
                  placeholder={current.placeholder}
                  value={query || values[current.key] || ""}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-input w-full py-2"
                  autoFocus
                  onFocus={() => suggestions.length && setIsOpenSuggest(true)}
                  onBlur={() => setTimeout(() => setIsOpenSuggest(false), 150)}
                />
                {isOpenSuggest && suggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                    {suggestions.map((s) => (
                      <button
                        type="button"
                        key={`${s.lat}-${s.lon}`}
                        onClick={() => chooseSuggestion(s)}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        {s.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <MapPreview lat={defaultCenter.lat} lon={defaultCenter.lon} />
                <div className="mt-1 text-xs text-gray-500">Dark map preview. Select an address to update the pin.</div>
              </div>
            </div>
          )}

          {current.type !== "hours" && current.type !== "address" && (
            <input
              id={current.key}
              name={current.key}
              type={current.type}
              min={current.min}
              max={current.max}
              step={current.step}
              placeholder={current.placeholder}
              value={values[current.key] || ""}
              onChange={handleChange}
              className="form-input w-full py-2"
              autoFocus
            />
          )}

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={step === 0}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]"
            >
              {step < steps.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  );
} 