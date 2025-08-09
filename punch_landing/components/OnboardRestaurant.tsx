"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import mapboxgl from "mapbox-gl";
import { auth, storage } from "@/app/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
        initial[d.key] = { closed: !existing ? true : existing === "Closed", open: "09:00", close: "17:30" };
      } else {
        initial[d.key] = { closed: false, open: "09:00", close: "17:30" };
      }
    });
    return initial;
  });

  const Switch = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => (
    <button
      type="button"
      aria-pressed={checked}
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full transition ${checked ? "bg-[#FB7A20]" : "bg-gray-300"}`}
    >
      <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );

  useEffect(() => {
    const out: Record<string, string> = {};
    for (const day of DAYS) {
      const d = local[day.key];
      out[day.key] = d.closed ? "Closed" : formatTimeRange(d.open, d.close);
    }
    onChange(out);
  }, [local, onChange]);

  return (
    <div className="w-full">
      <div className="divide-y rounded-2xl border bg-white p-2 sm:p-4">
        {DAYS.map((d) => {
          const isClosed = local[d.key]?.closed;
          return (
            <div key={d.key} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-4">
              <div className="md:col-span-4 flex items-center gap-4">
                <Switch
                  checked={!local[d.key]?.closed}
                  onToggle={() => setLocal((prev) => ({
                    ...prev,
                    [d.key]: {
                      ...(prev[d.key] || { open: "09:00", close: "17:30" }),
                      closed: !(prev[d.key]?.closed ?? true),
                    },
                  }))}
                />
                <span className={`text-base ${isClosed ? "text-gray-500" : "text-gray-900"}`}>{d.label}</span>
              </div>
              <div className="md:col-span-4">
                <input
                  type="time"
                  className={`form-input w-full rounded-md py-3 ${isClosed ? "opacity-50" : ""}`}
                  disabled={isClosed}
                  value={local[d.key]?.open || "09:00"}
                  onChange={(e) => setLocal((prev) => ({ ...prev, [d.key]: { ...(prev[d.key] || { closed: false, close: "17:30" }), open: e.target.value } }))}
                />
              </div>
              <div className="md:col-span-4">
                <input
                  type="time"
                  className={`form-input w-full rounded-md py-3 ${isClosed ? "opacity-50" : ""}`}
                  disabled={isClosed}
                  value={local[d.key]?.close || "17:30"}
                  onChange={(e) => setLocal((prev) => ({ ...prev, [d.key]: { ...(prev[d.key] || { closed: false, open: "09:00" }), close: e.target.value } }))}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- Cuisine Tags ----------------
const CUISINE_SUGGESTIONS = [
  "American", "Bar", "BBQ", "Bakery", "Breakfast", "Brunch", "Burgers", "Cafe", "Caribbean",
  "Chinese", "Dessert", "Ethiopian", "French", "Greek", "Halal", "Indian", "Italian", "Japanese",
  "Korean", "Mediterranean", "Mexican", "Middle Eastern", "Pizza", "Pub", "Ramen", "Seafood",
  "Spanish", "Steakhouse", "Sushi", "Tacos", "Tapas", "Thai", "Vegan", "Vegetarian", "Vietnamese",
];

function CuisineTags({ value, onChange }: { value: string[] | undefined; onChange: (v: string[]) => void }) {
  const selected = value ?? [];
  const [addingOther, setAddingOther] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [showAll, setShowAll] = useState(false);

  const toggleTag = (tag: string) => {
    const exists = selected.includes(tag);
    const next = exists ? selected.filter((t) => t !== tag) : [...selected, tag];
    onChange(next);
  };

  const addOther = () => {
    const clean = otherText.trim();
    if (!clean) return;
    if (!selected.includes(clean)) onChange([...selected, clean]);
    setOtherText("");
    setAddingOther(false);
  };

  const visibleSuggestions = showAll ? CUISINE_SUGGESTIONS : CUISINE_SUGGESTIONS.slice(0, 12);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {visibleSuggestions.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => toggleTag(c)}
            className={`px-3 py-1 rounded-full text-sm border transition ${selected.includes(c) ? "bg-[#FB7A20] text-white border-[#FB7A20]" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"}`}
          >
            {c}
          </button>
        ))}
        {CUISINE_SUGGESTIONS.length > 12 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="px-3 py-1 rounded-full text-sm border bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
          >
            {showAll ? "Show less" : "See more"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setAddingOther(true)}
          className="px-3 py-1 rounded-full text-sm border bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
        >
          Other
        </button>
      </div>
      {addingOther && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="form-input py-2"
            placeholder="Enter cuisine"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
          />
          <button type="button" onClick={addOther} className="btn bg-[#FB7A20] text-white hover:bg-[#e66a1a]">Add</button>
          <button type="button" onClick={() => { setAddingOther(false); setOtherText(""); }} className="px-3 py-2 rounded border border-gray-300 text-gray-700">Cancel</button>
        </div>
      )}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              {c}
              <button type="button" className="text-gray-500 hover:text-gray-700" onClick={() => toggleTag(c)}>×</button>
            </span>
          ))}
        </div>
      )}
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
  { key: "name", label: "Business Name", placeholder: "Sushi Town", type: "text" },
  { key: "cuisine", label: "Cuisine and tags", placeholder: "Sushi", type: "cuisines" },
  { key: "price", label: "Price", placeholder: "$$$", type: "text" },
  { key: "location", label: "Address", placeholder: "123 Main St, San Francisco, CA", type: "address" },
  { key: "hours", label: "Hours", type: "hours" },
  { key: "logoUrl", label: "Upload Logo", type: "logo" },
  { key: "rating", label: "Rating", placeholder: "4.7", type: "number", min: 0, max: 5, step: 0.1 },
];

export default function OnboardRestaurant({ onComplete }: { onComplete: (values: any) => void }) {
  const [step, setStep] = useState(-1); // -1 means intro card
  const [values, setValues] = useState<any>({ cuisines: [] as string[] });
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
    } else if (current.type === "cuisines") {
      if (!Array.isArray(values.cuisines) || values.cuisines.length === 0) {
        setError("Please select at least one cuisine.");
        return;
      }
    } else if (current.key === "price") {
      if (typeof value !== "string" || !/^\$+$/.test(value)) {
        setError("Price must contain only dollar signs, e.g. $, $$, $$$.");
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

  const handleHoursChange = useCallback((hours: Record<string, string>) => {
    setValues((prev: any) => ({ ...prev, hours }));
  }, []);

  const handleCuisinesChange = (cuisines: string[]) => {
    setValues({ ...values, cuisines });
  };

  const handleLogoUpload = async (file: File) => {
    if (!file) return;
    const user = auth.currentUser;
    const ownerId = user?.uid || "anonymous";
    const fileExt = file.name.split(".").pop() || "png";
    const fileName = `logo_${Date.now()}.${fileExt}`;
    const storagePath = `business-logos/${ownerId}/${fileName}`;
    const fileRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(fileRef, file, { contentType: file.type });
    const url = await getDownloadURL(snapshot.ref);
    setValues((prev: any) => ({ ...prev, logoUrl: url }));
  };

  if (step === -1) {
    return (
      <div className="max-w-lg mx-auto mt-24 p-10 rounded-3xl shadow-2xl flex flex-col items-center bg-white/30 backdrop-blur-md border border-white/40 relative overflow-hidden">
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
  const containerMaxWidth = current?.type === "hours" ? "max-w-6xl" : "max-w-3xl";

  return (
    <div className={`${containerMaxWidth} mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl`}>
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

          {current.type === "cuisines" && (
            <CuisineTags value={values.cuisines} onChange={handleCuisinesChange} />
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
              </div>
            </div>
          )}

          {current.type === "logo" && (
            <div className="space-y-3">
              {values.logoUrl ? (
                <div className="flex items-center gap-3">
                  <img src={values.logoUrl} alt="Logo preview" className="h-16 w-16 rounded object-cover border" />
                  <button type="button" className="px-3 py-2 rounded border border-gray-300 text-gray-700" onClick={() => setValues({ ...values, logoUrl: "" })}>Remove</button>
                </div>
              ) : (
                <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-6 text-center hover:bg-gray-50">
                  <span className="text-sm text-gray-600">Click to upload a logo (PNG/JPG)</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) await handleLogoUpload(file);
                    }}
                  />
                </label>
              )}
            </div>
          )}

          {current.type !== "hours" && current.type !== "address" && current.type !== "cuisines" && (
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