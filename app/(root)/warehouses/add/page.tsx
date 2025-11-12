"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useServerAction } from "zsa-react";
import { createWarehouse } from "@/action/warehouses";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { autocomplete } from "@/lib/google";

const warehouseSchema = z.object({
  title: z.string().min(1, { message: "Tytuł jest wymagany" }), // Required
  location: z.string().min(1, { message: "Lokalizacja jest wymagana" }), // Required
  description: z.string().min(1, { message: "Opis jest wymagany" }), // Required
  available_from: z.string(),
  social_facilities: z.boolean().nullable(),
  parking_truck: z.boolean().nullable(),
  parking_cars: z.boolean().nullable(),
  media: z.boolean().nullable(),
  heating: z.boolean().nullable(),
  flooring: z.boolean().nullable(),
});

export default function Add() {
  const { toast } = useToast();

  const { execute, isPending, error } = useServerAction(createWarehouse, {
    onError({ err }: { err: any }) {
      toast({
        title: "Coś poszło nie tak",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const [predictions, setPredictions] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setError] = useState<string | null>(null);

  const handleSuggestionClick = (suggestion: string) => {
    console.log(suggestion);
    setLocation(suggestion); // Set location input
    setShowSuggestions(false); // Hide suggestions
    form.setValue("location", suggestion);
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!location) return setPredictions([]); // Clear when input is empty

      try {
        const results: any = await autocomplete(location);
        setPredictions(results.map((p: any) => p.description)); // Extract descriptions
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    const debounce = setTimeout(fetchPredictions, 300); // Add a debounce
    return () => clearTimeout(debounce); // Cleanup previous timeout
  }, [location]);

  const form = useForm<z.infer<typeof warehouseSchema>>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      available_from: "",
      social_facilities: false,
      parking_truck: false,
      parking_cars: false,
      media: false,
      heating: false,
      flooring: false,
    },
  });

  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Reset error state
    setError(null);

    // Validate file count
    if (files.length > 5) {
      setError("Możesz dodać maksymalnie 5 zdjęć.");
      return;
    }

    // Validate file types and sizes
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setError("Dozwolone formaty to JPG, PNG i JPEG.");
        return;
      }

      // Check file size (1MB = 1 * 1024 * 1024 bytes)
      if (file.size > 1 * 1024 * 1024) {
        setError("Każde zdjęcie musi być mniejsze niż 1MB.");
        return;
      }

      validFiles.push(file);
    }

    // Update state with valid files
    setImages(validFiles);
  };

  function onSubmit(values: z.infer<typeof warehouseSchema>) {
    execute({ ...values, images });
  }

  return (
    <div className="px-4 py-24 mx-auto max-w-[800px] space-y-6">
      <h1 className="text-xl font-bold">Dodaj ogłoszenie magazynu</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 relative"
        >
          <div className="flex gap-2 flex-col">
            <h4> Tytuł</h4>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Dodaj tytuł"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="relative">
                {" "}
                {/* Ensure relative for absolute dropdown */}
                <FormLabel>Miejscowość</FormLabel>
                <FormControl>
                  <Command>
                    <CommandInput
                      placeholder="Wyszukaj miejscowość"
                      value={location}
                      onValueChange={(newLocation) => {
                        setLocation(newLocation);
                        field.onChange(newLocation);
                        setShowSuggestions(true);
                      }}
                    />
                    {showSuggestions && location && predictions.length > 0 && (
                      <CommandList className="absolute z-10 top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2">
                        <CommandGroup heading="Lokalizacja">
                          {predictions.map((prediction: any, index: number) => (
                            <CommandItem
                              key={index}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSuggestionClick(prediction);
                              }}
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              {prediction}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                      </CommandList>
                    )}
                  </Command>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full"
                    placeholder="Dodaj tytuł"
                    rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
            <FormField
              control={form.control}
              name="social_facilities"
              render={({ field }: { field: any }) => (
                <FormItem className="flex items-center justify-between lg:justify-start gap-2">
                  <FormLabel className="flex mt-2 w-20">Zaplecze</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media"
              render={({ field }: { field: any }) => (
                <FormItem className="flex items-center justify-between lg:justify-start gap-2">
                  <FormLabel className="flex mt-2 w-20">Media</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parking_truck"
              render={({ field }: { field: any }) => (
                <FormItem className="flex items-center justify-between lg:justify-start gap-2">
                  <FormLabel className="flex mt-2 w-44">
                    Parking - auta ciężarowe
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="flooring"
              render={({ field }: { field: any }) => (
                <FormItem className="flex items-center justify-between lg:justify-start gap-2">
                  <FormLabel className="flex mt-2 w-20">Posadzka</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heating"
              render={({ field }: { field: any }) => (
                <FormItem className="flex items-center justify-between lg:justify-start gap-2">
                  <FormLabel className="flex mt-2 w-20">Ogrzewanie</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parking_cars"
              render={({ field }: { field: any }) => (
                <FormItem className="flex items-center justify-between lg:justify-start gap-2">
                  <FormLabel className="flex mt-2 w-44">
                    Parking - auta osobowe
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Dodaj zdjęcia (max 5 zdjęć, JPG/PNG/JPEG, max 1MB na zdjęcie)
            </label>

            {/* Stylish file upload container */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleFileChange}
                multiple={true}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  Kliknij, aby wybrać zdjęcia
                </span>
                <span className="text-xs text-gray-500">
                  lub przeciągnij je tutaj
                </span>
              </label>
            </div>

            {/* Error message */}
            {errors && <p className="text-sm text-red-500 mt-2">{errors}</p>}

            {/* Uploaded files list */}
            {images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-700">Dodane zdjęcia:</p>
                <ul className="mt-2 space-y-2">
                  {images.map((image, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        {image.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {(image.size / 1024).toFixed(2)} KB
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Add similar FormField components for other fields */}

          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Uh-oh, something went wrong</AlertTitle>
              {/*@ts-ignore*/}
              <AlertDescription>{error?.message}</AlertDescription>
            </Alert>
          )}

          <LoaderButton isLoading={isPending} className="w-full" type="submit">
            Dodaj
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
