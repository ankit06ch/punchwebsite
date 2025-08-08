"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Hours dropdown component
function HoursSelector({ value, onChange }: { value: any, onChange: (value: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
  
  const days = [
    { key: "Mon-Thu", label: "Monday - Thursday" },
    { key: "Fri-Sat", label: "Friday - Saturday" },
    { key: "Sun", label: "Sunday" }
  ];

  const timeSlots = [
    "Closed",
    "6:00 AM – 10:00 AM",
    "6:00 AM – 11:00 AM", 
    "7:00 AM – 10:00 AM",
    "7:00 AM – 11:00 AM",
    "8:00 AM – 10:00 AM",
    "8:00 AM – 11:00 AM",
    "9:00 AM – 10:00 AM",
    "9:00 AM – 11:00 AM",
    "10:00 AM – 2:00 PM",
    "10:00 AM – 3:00 PM",
    "10:00 AM – 4:00 PM",
    "10:00 AM – 5:00 PM",
    "10:00 AM – 6:00 PM",
    "10:00 AM – 7:00 PM",
    "10:00 AM – 8:00 PM",
    "10:00 AM – 9:00 PM",
    "10:00 AM – 10:00 PM",
    "10:00 AM – 11:00 PM",
    "11:00 AM – 2:00 PM",
    "11:00 AM – 3:00 PM",
    "11:00 AM – 4:00 PM",
    "11:00 AM – 5:00 PM",
    "11:00 AM – 6:00 PM",
    "11:00 AM – 7:00 PM",
    "11:00 AM – 8:00 PM",
    "11:00 AM – 9:00 PM",
    "11:00 AM – 10:00 PM",
    "11:00 AM – 11:00 PM",
    "12:00 PM – 2:00 PM",
    "12:00 PM – 3:00 PM",
    "12:00 PM – 4:00 PM",
    "12:00 PM – 5:00 PM",
    "12:00 PM – 6:00 PM",
    "12:00 PM – 7:00 PM",
    "12:00 PM – 8:00 PM",
    "12:00 PM – 9:00 PM",
    "12:00 PM – 10:00 PM",
    "12:00 PM – 11:00 PM",
    "1:00 PM – 5:00 PM",
    "1:00 PM – 6:00 PM",
    "1:00 PM – 7:00 PM",
    "1:00 PM – 8:00 PM",
    "1:00 PM – 9:00 PM",
    "1:00 PM – 10:00 PM",
    "1:00 PM – 11:00 PM",
    "2:00 PM – 6:00 PM",
    "2:00 PM – 7:00 PM",
    "2:00 PM – 8:00 PM",
    "2:00 PM – 9:00 PM",
    "2:00 PM – 10:00 PM",
    "2:00 PM – 11:00 PM",
    "3:00 PM – 7:00 PM",
    "3:00 PM – 8:00 PM",
    "3:00 PM – 9:00 PM",
    "3:00 PM – 10:00 PM",
    "3:00 PM – 11:00 PM",
    "4:00 PM – 8:00 PM",
    "4:00 PM – 9:00 PM",
    "4:00 PM – 10:00 PM",
    "4:00 PM – 11:00 PM",
    "5:00 PM – 9:00 PM",
    "5:00 PM – 10:00 PM",
    "5:00 PM – 11:00 PM",
    "6:00 PM – 10:00 PM",
    "6:00 PM – 11:00 PM",
    "7:00 PM – 11:00 PM",
    "8:00 PM – 11:00 PM",
    "9:00 PM – 11:00 PM",
    "10:00 PM – 11:00 PM"
  ];

  const handleDaySelect = (dayKey: string) => {
    setSelectedDay(dayKey);
    setIsOpen(false);
  };

  const handleTimeSelect = (timeSlot: string) => {
    const newHours = { ...value };
    newHours[selectedDay] = timeSlot;
    onChange(newHours);
    setSelectedDay("");
  };

  const getDisplayValue = () => {
    if (!value || Object.keys(value).length === 0) {
      return "Select hours for each day...";
    }
    
    const entries = Object.entries(value);
    if (entries.length === 0) return "Select hours for each day...";
    
    return `${entries.length} day${entries.length > 1 ? 's' : ''} configured`;
  };

  return (
    <div className="space-y-4">
      {/* Display current selections */}
      <div className="border rounded-lg p-3 bg-gray-50">
        <div className="text-sm font-medium text-gray-700 mb-2">Configured Hours:</div>
        {value && Object.keys(value).length > 0 ? (
          <div className="space-y-1">
            {Object.entries(value).map(([day, time]) => (
              <div key={day} className="flex justify-between items-center text-sm">
                <span className="font-medium">{days.find(d => d.key === day)?.label || day}:</span>
                <span className="text-gray-600">{time as string}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newHours = { ...value };
                    delete newHours[day];
                    onChange(newHours);
                  }}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No hours configured yet</div>
        )}
      </div>

      {/* Day selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FB7A20] focus:border-[#FB7A20]"
        >
          {selectedDay ? days.find(d => d.key === selectedDay)?.label : "Select a day..."}
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {days.map((day) => (
              <button
                key={day.key}
                type="button"
                onClick={() => handleDaySelect(day.key)}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100"
              >
                {day.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Time slot selector */}
      {selectedDay && (
        <div className="relative">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Select hours for {days.find(d => d.key === selectedDay)?.label}:
          </div>
          <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md">
            {timeSlots.map((timeSlot) => (
              <button
                key={timeSlot}
                type="button"
                onClick={() => handleTimeSelect(timeSlot)}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 border-b border-gray-200 last:border-b-0"
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const steps = [
  { key: "cuisine", label: "Cuisine", placeholder: "Sushi", type: "text" },
  { key: "location", label: "Location", placeholder: "123 Main St, San Francisco, CA", type: "text" },
  { key: "hours", label: "Hours", type: "hours" },
  { key: "logoUrl", label: "Logo URL", placeholder: "https://placehold.co/64x64?text=S", type: "url" },
  { key: "name", label: "Restaurant Name", placeholder: "Sushi Town", type: "text" },
  { key: "price", label: "Price", placeholder: "$$$", type: "text" },
  { key: "rating", label: "Rating", placeholder: "4.7", type: "number", min: 0, max: 5, step: 0.1 },
];

export default function OnboardRestaurant({ onComplete }: { onComplete: (values: any) => void }) {
  const [step, setStep] = useState(-1); // -1 means intro card
  const [values, setValues] = useState<any>({});
  const [error, setError] = useState("");
  const [loading] = useState(false);

  const current = steps[step];

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const value = values[current.key];
    
    if (current.type === "hours") {
      if (!value || Object.keys(value).length === 0) {
        setError("Please configure hours for at least one day.");
        return;
      }
    } else if (!value || (current.type === "number" && isNaN(Number(value)))) {
      setError("Please enter a valid value.");
      return;
    }
    
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Return collected values to the parent to finish account creation and persistence there
      onComplete({ ...values });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [current.key]: e.target.value });
  };

  const handleHoursChange = (hours: any) => {
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

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.form
          key={current.key}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleNext}
        >
          <label className="block text-lg font-semibold mb-4" htmlFor={current.key}>
            {current.label}
          </label>
          
          {current.type === "hours" ? (
            <HoursSelector 
              value={values[current.key] || {}} 
              onChange={handleHoursChange}
            />
          ) : (
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
              className="form-input w-full py-2 mb-2"
              autoFocus
            />
          )}
          
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="btn w-full bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a]"
            disabled={loading}
          >
            {step < steps.length - 1 ? "Next" : "Finish"}
          </button>
        </motion.form>
      </AnimatePresence>
      <div className="mt-4 text-center text-gray-400 text-sm">
        Step {step + 1} of {steps.length}
      </div>
    </div>
  );
} 