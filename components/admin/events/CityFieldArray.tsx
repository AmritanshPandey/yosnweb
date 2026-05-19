"use client"

import { useFieldArray, useFormContext, Controller } from "react-hook-form"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { EventFormValues } from "@/lib/validations/event-schema"

export function CityFieldArray() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<EventFormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cities",
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white">Tour Cities</h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => append({ name: "", date: "", ticketLink: "", soldOut: false })}
          className="gap-2 border border-white/15 text-xs text-white/60 hover:text-cyan-200"
        >
          <IconPlus size={14} />
          Add City
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="rounded-lg border border-dashed border-white/15 py-6 text-center text-xs text-white/35">
          No cities added yet. Click "Add City" to start.
        </p>
      )}

      {fields.map((field, index) => {
        const cityErrors = errors.cities?.[index]
        return (
          <div
            key={field.id}
            className="relative rounded-xl border border-white/10 bg-white/3 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                City {index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-300"
                aria-label="Remove city"
              >
                <IconTrash size={14} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>City Name</Label>
                <Input
                  {...register(`cities.${index}.name`)}
                  placeholder="Mumbai"
                />
                {cityErrors?.name && (
                  <p className="text-xs text-red-400">{cityErrors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input
                  {...register(`cities.${index}.date`)}
                  placeholder="Sat, 24 Oct 2026"
                />
                {cityErrors?.date && (
                  <p className="text-xs text-red-400">{cityErrors.date.message}</p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label>Ticket Link</Label>
                <Input
                  {...register(`cities.${index}.ticketLink`)}
                  placeholder="https://in.bookmyshow.com/..."
                  type="url"
                />
                {cityErrors?.ticketLink && (
                  <p className="text-xs text-red-400">{cityErrors.ticketLink.message}</p>
                )}
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <Controller
                  control={control}
                  name={`cities.${index}.soldOut`}
                  render={({ field: f }) => (
                    <Switch checked={!!f.value} onCheckedChange={f.onChange} />
                  )}
                />
                <Label className="cursor-pointer text-white/60">Mark as Sold Out</Label>
              </div>
            </div>
          </div>
        )
      })}

      {errors.cities?.message && (
        <p className="text-xs text-red-400">{errors.cities.message as string}</p>
      )}
    </div>
  )
}
