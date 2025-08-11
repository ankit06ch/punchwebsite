"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CloudArrowUpIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { auth, storage } from "@/app/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

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

// ---------------- Google Maps Component ----------------
function GoogleMap({ lat, lon }: { lat: number; lon: number }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !window.google) return;
    if (mapRef.current) return;

    const position = { lat, lng: lon };
    
    mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center: position,
      zoom: 15,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    new window.google.maps.Marker({
      position,
      map: mapRef.current,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#FB7A20",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [lat, lon]);

  return <div ref={mapContainerRef} className="h-56 w-full overflow-hidden rounded-lg border" />;
}

function MapPreview({ lat, lon }: { lat: number; lon: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-56 w-full overflow-hidden rounded-lg border" />;
  return <GoogleMap lat={lat} lon={lon} />;
}

// ---------------- Price Conversion ----------------
function convertToPriceTier(input: string): string {
  // Remove any non-numeric characters except decimal points
  const cleanInput = input.replace(/[^0-9.]/g, '');
  const amount = parseFloat(cleanInput);
  
  if (isNaN(amount)) return '';
  
  // Convert dollar amount to price tier
  if (amount <= 10) return '$';
  if (amount <= 25) return '$$';
  if (amount <= 50) return '$$$';
  return '$$$$';
}

// ---------------- Steps ----------------
const steps = [
  { key: "name", label: "Business Name", placeholder: "Sushi Town", type: "text" },
  { key: "cuisine", label: "Cuisine and tags", placeholder: "Sushi", type: "cuisines" },
  { key: "price", label: "Price (Average Cost)", placeholder: "50 or 50$", type: "text" },
  { key: "location", label: "Address", placeholder: "123 Main St, San Francisco, CA", type: "address" },
  { key: "hours", label: "Hours", type: "hours" },
  { key: "logoUrl", label: "Upload Logo", type: "logo" },
];

export default function OnboardRestaurant({ onComplete }: { onComplete: (values: any) => void }) {
  const [step, setStep] = useState(-1); // -1 means intro card
  const [values, setValues] = useState<any>({ cuisines: [] as string[], logoFile: null as File | null, logoUrl: "" });
  const [error, setError] = useState("");
  const [loading] = useState(false);

  const current = steps[step];

  // Address autocomplete with Google Places API
  const [query, setQuery] = useState(() => {
    // Initialize with existing location if available
    return values.location || "";
  });
  type GooglePlaceSuggestion = {
    place_id: string;
    description: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
    types: string[];
  };
  const [suggestions, setSuggestions] = useState<Array<GooglePlaceSuggestion>>([]);
  const [isOpenSuggest, setIsOpenSuggest] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<any>(null);
  const autocompleteService = useRef<any>(null);
  const placesService = useRef<any>(null);



  // Load Google Maps script (with global flag to prevent duplicates)
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.google && !(window as any).__googleMapsLoading) {
      (window as any).__googleMapsLoading = true;
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps script loaded successfully');
        // Initialize services after script loads
        if (window.google && window.google.maps && window.google.maps.places) {
          autocompleteService.current = new window.google.maps.places.AutocompleteService();
          placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
          console.log('Google Places services initialized');
        } else {
          console.log('Google Maps not available after script load');
        }
        (window as any).__googleMapsLoading = false;
      };
      script.onerror = () => {
        (window as any).__googleMapsLoading = false;
      };
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (current?.type !== "address") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    
    debounceRef.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        
        if (!window.google || !autocompleteService.current) {
          console.log('Google Maps status:', { 
            google: !!window.google, 
            maps: !!(window.google?.maps), 
            places: !!(window.google?.maps?.places),
            autocompleteService: !!autocompleteService.current 
          });
          
          // Wait for Google Maps to be ready
          if (window.google && window.google.maps && window.google.maps.places) {
            if (!autocompleteService.current) {
              autocompleteService.current = new window.google.maps.places.AutocompleteService();
              placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
              console.log('Services created during search');
            }
          } else {
            console.log('Google Maps not ready, aborting search');
            setSuggestions([]);
            setIsSearching(false);
            return;
          }
        }

        autocompleteService.current.getPlacePredictions({
          input: query,
          componentRestrictions: { country: 'us' },
          types: ['address']
        }, (predictions: any, status: any) => {
          setIsSearching(false);
          console.log('Google Places API response:', { status, predictions: predictions?.length || 0 });
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setIsOpenSuggest(true);
            console.log('Suggestions set:', predictions.length);
          } else {
            console.log('No predictions or error status:', status);
            setSuggestions([]);
            setIsOpenSuggest(false);
          }
        });
      } catch {
        setIsSearching(false);
        setSuggestions([]);
      }
    }, 300);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [query, current?.type]);

  const formatAddress = (s: GooglePlaceSuggestion): string => {
    return s.description;
  };

  const chooseSuggestion = (s: GooglePlaceSuggestion) => {
    // Use Places Service to get detailed place information including coordinates
    if (!placesService.current) return;
    
    placesService.current.getDetails({
      placeId: s.place_id,
      fields: ['geometry', 'formatted_address']
    }, (place: any, status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const formatted = place.formatted_address || s.description;
        
        setValues((prev: any) => ({ 
          ...prev, 
          location: formatted, 
          coordinates: { lat, lon: lng } 
        }));
        setQuery(formatted);
      }
    });
  };

  // Handle input changes for address field
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    
    // Clear suggestions when user starts typing
    if (suggestions.length > 0) {
      setSuggestions([]);
      setIsOpenSuggest(false);
    }
    
    // Clear coordinates when user edits (but don't reset query)
    if (newValue !== values.location) {
      setValues((prev: any) => ({ 
        ...prev, 
        coordinates: null 
      }));
    }
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
      if (!value || typeof value !== "string") {
        setError("Please enter a price amount.");
        return;
      }
      
      // Convert the input to price tier and store it
      const priceTier = convertToPriceTier(value);
      if (!priceTier) {
        setError("Please enter a valid price amount (e.g., 15, 25$, 50).");
        return;
      }
      
      // Update the values with the converted price tier
      setValues((prev: any) => ({ ...prev, price: priceTier }));
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

  const handleLogoSelect = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setValues((prev: any) => ({ ...prev, logoFile: file, logoUrl: previewUrl }));
  };

  const handleCuisinesChange = (cuisines: string[]) => {
    setValues({ ...values, cuisines });
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
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id={current.key}
                    name={current.key}
                    type="text"
                    placeholder={current.placeholder}
                    value={query}
                    onChange={handleAddressChange}
                    className="form-input w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 rounded-xl"
                    autoFocus
                    onFocus={() => {
                      console.log('Input focused, suggestions count:', suggestions.length);
                      if (suggestions.length > 0) {
                        setIsOpenSuggest(true);
                      }
                    }}
                    onBlur={() => {
                      console.log('Input blurred, hiding suggestions in 300ms');
                      // Longer delay to allow click events to complete
                      setTimeout(() => {
                        if (!isOpenSuggest) return; // Don't hide if already hidden
                        setIsOpenSuggest(false);
                      }, 300);
                    }}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-orange-500"></div>
                    </div>
                  )}
                </div>
                {isOpenSuggest && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-2 w-full rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-2xl max-h-80 overflow-hidden"
                  >
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 px-3 py-2 border-b border-gray-100">
                        Address Suggestions
                      </div>
                      {suggestions.length > 0 ? (
                        suggestions.map((s, index) => (
                          <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            type="button"
                            key={s.place_id}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Immediately hide suggestions
                              setIsOpenSuggest(false);
                              setSuggestions([]);
                              chooseSuggestion(s);
                            }}
                            className="block w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:shadow-sm rounded-xl transition-all duration-200 group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <MapPinIcon className="h-4 w-4 text-orange-500 group-hover:text-orange-600 transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 group-hover:text-orange-700 transition-colors">
                                  {s.structured_formatting.main_text}
                                </div>
                                <div className="text-gray-600 text-xs mt-1 leading-relaxed">
                                  {s.structured_formatting.secondary_text}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <MapPinIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <div className="text-sm text-gray-500">No addresses found</div>
                          <div className="text-xs text-gray-400 mt-1">Try a different search term</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
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
                  <button type="button" className="px-3 py-2 rounded border border-gray-300 text-gray-700" onClick={() => setValues({ ...values, logoUrl: "", logoFile: null })}>Remove</button>
                </div>
              ) : (
                <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 p-6 text-center hover:bg-gray-50">
                  <CloudArrowUpIcon className="h-8 w-8 text-gray-500" aria-hidden="true" />
                  <span className="text-sm text-gray-700">Click to upload a logo (PNG/JPG)</span>
                  <span className="text-xs text-gray-500">Recommended: square image, at least 256×256</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoSelect(file);
                    }}
                  />
                </label>
              )}
            </div>
          )}

          {current.type !== "hours" && current.type !== "address" && current.type !== "cuisines" && current.type !== "logo" && (
            <div>
              <input
                id={current.key}
                name={current.key}
                type={current.type}
                min={(current as any)?.min}
                max={(current as any)?.max}
                step={(current as any)?.step}
                placeholder={current.placeholder}
                value={values[current.key] || ""}
                onChange={handleChange}
                className="form-input w-full py-2"
                autoFocus
              />
              {current.key === "price" && (
                <div className="mt-1 text-xs text-gray-500">
                  Enter the average cost of a meal. We'll convert it to a price tier ($, $$, $$$, $$$$).
                </div>
              )}
            </div>
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