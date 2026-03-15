import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { Check, ChevronDown } from 'lucide-react';

/**
 * A Select that uses the shadcn/radix Select on desktop
 * and a Vaul bottom drawer on mobile for native feel.
 *
 * Props:
 *   value, onValueChange, placeholder, options: [{value, label, icon?}]
 *   triggerClassName — extra classes for the trigger button
 */
export default function MobileDrawerSelect({
  value,
  onValueChange,
  placeholder = 'Select…',
  options = [],
  triggerClassName = '',
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  const handleSelect = (val) => {
    onValueChange(val);
    setOpen(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className={`flex items-center justify-between w-full bg-white/5 border border-white/20 text-white rounded-xl h-12 px-4 transition-colors hover:bg-white/10 ${triggerClassName}`}
        >
          <span className={selected ? 'text-white' : 'text-purple-300/40'}>
            {selected ? (
              <span className="flex items-center gap-2">
                {selected.icon && <span>{selected.icon}</span>}
                {selected.label}
              </span>
            ) : placeholder}
          </span>
          <ChevronDown className="w-4 h-4 text-purple-400 shrink-0" />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[60]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[61] bg-slate-900 border-t border-white/10 rounded-t-3xl focus:outline-none">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {placeholder && (
            <p className="text-purple-200/50 text-xs text-center pb-3 px-6">{placeholder}</p>
          )}

          <div className="overflow-y-auto max-h-[60vh] pb-safe px-3 pb-6">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-4 rounded-2xl mb-1 text-left transition-colors ${
                    isSelected
                      ? 'bg-purple-500/20 text-white border border-purple-500/30'
                      : 'text-purple-100/80 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {opt.icon && <span className="text-lg">{opt.icon}</span>}
                    <span>{opt.label}</span>
                    {opt.sub && <span className="text-amber-400 text-sm ml-1">{opt.sub}</span>}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}