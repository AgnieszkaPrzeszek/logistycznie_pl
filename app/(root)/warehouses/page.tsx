'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FaLocationDot, FaRegCalendar } from 'react-icons/fa6';
import { FaDotCircle } from 'react-icons/fa';

interface Warehouse {
  id: number;
  title: string;
  location: string;
  available_from: string;
  images: string[];
  currentImageIndex?: number;
  description: string;
  accepted: number;
  promoted?: boolean;
  parking_truck?: boolean;
  parking_cars?: boolean;
  media?: boolean;
  flooring?: boolean;
  heating?: boolean;
  social_facilities?: boolean;
}

// Mocked API call for demonstration
async function fetchAllWarehouses(): Promise<Warehouse[]> {
  // Replace this with your real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Promoted Logistics Hall',
          location: 'Warsaw',
          available_from: '2024-07-01',
          images: ['/loginimgs/no_image.jpg'],
          accepted: 1,
          promoted: true,
          description: 'Large hall with heating and great truck access.',
          parking_truck: true,
          heating: true,
        },
        {
          id: 2,
          title: 'Standard Warehouse',
          location: 'Krakow',
          available_from: '2024-06-15',
          images: ['/loginimgs/no_image.jpg'],
          accepted: 1,
          promoted: false,
          description: 'Smaller warehouse suitable for smaller logistics needs.',
          parking_cars: true,
          media: true,
          social_facilities: true,
        },
      ]);
    }, 500);
  });
}

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [filtered, setFiltered] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');

  // Fetch warehouses on load
  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const data = await fetchAllWarehouses();
        const accepted = data.filter((d) => d.accepted === 1);
        // Bump promoted warehouses to top
        const sorted = accepted
          .sort((a, b) => (b.promoted ? 1 : 0) - (a.promoted ? 1 : 0))
          .reverse();
        setWarehouses(sorted);
        setFiltered(sorted);
      } finally {
        setLoading(false);
      }
    };
    getWarehouses();
  }, []);

  // Filter logic
  const handleSearch = () => {
    const term = keyword.toLowerCase();
    const results = warehouses.filter(
      (w) =>
        (!term ||
          w.title.toLowerCase().includes(term) ||
          w.description.toLowerCase().includes(term)) &&
        (!location || w.location.toLowerCase().includes(location.toLowerCase())) &&
        (!distance || distance === 'Wszystkie')
    );
    setFiltered(results);
  };

  const handlePrevImage = (warehouseId: number) => {
    setFiltered((prev) =>
      prev.map((w) =>
        w.id === warehouseId
          ? {
              ...w,
              currentImageIndex:
                (w.currentImageIndex || 0) === 0
                  ? w.images.length - 1
                  : (w.currentImageIndex || 0) - 1,
            }
          : w
      )
    );
  };

  const handleNextImage = (warehouseId: number) => {
    setFiltered((prev) =>
      prev.map((w) =>
        w.id === warehouseId
          ? {
              ...w,
              currentImageIndex:
                (w.currentImageIndex || 0) === w.images.length - 1
                  ? 0
                  : (w.currentImageIndex || 0) + 1,
            }
          : w
      )
    );
  };

  if (loading) return <div className="text-center py-10">Ładowanie magazynów...</div>;

  return (
    <div className="container mx-auto mt-10 space-y-8">
      {/* Filter Section */}
      <Card className="p-6 bg-linear-to-br from-gray-50 to-white shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Filtruj magazyny</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="keyword">Firma / Słowo kluczowe</Label>
              <Input
                id="keyword"
                placeholder="np. firma, słowo kluczowe"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Lokalizacja</Label>
              <Input
                id="location"
                placeholder="np. Warszawa"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <Label>Odległość</Label>
              <Select value={distance} onValueChange={setDistance}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz odległość" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Odległość</SelectLabel>
                    <SelectItem value="Wszystkie">Wszystkie</SelectItem>
                    <SelectItem value="10km">do 10km</SelectItem>
                    <SelectItem value="50km">do 50km</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full" onClick={handleSearch}>
                Szukaj
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehouses List */}
      {filtered.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((warehouse) => (
            <Card
              key={warehouse.id}
              className={`relative overflow-hidden flex flex-col border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                warehouse.promoted
                  ? 'border-amber-400 bg-linear-to-b from-yellow-50 to-white shadow-[0_0_20px_rgba(255,220,120,0.3)]'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Promoted Ribbon */}
              {warehouse.promoted && (
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 to-yellow-500" />
              )}

              {/* Image Section */}
              <div className="relative w-full h-52 md:h-48">
                {warehouse.images && warehouse.images.length > 0 ? (
                  <>
                    <img
                      src={warehouse.images[warehouse.currentImageIndex || 0]}
                      alt={warehouse.title}
                      className="w-full h-full object-cover rounded-t-md"
                    />
                    {warehouse.images.length > 1 && (
                      <>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 bg-white/60 backdrop-blur-sm"
                          onClick={() => handlePrevImage(warehouse.id)}
                        >
                          ‹
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 bg-white/60 backdrop-blur-sm"
                          onClick={() => handleNextImage(warehouse.id)}
                        >
                          ›
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <img
                    src="/loginimgs/no_image.jpg"
                    alt="No image"
                    className="w-full h-full object-cover rounded-t-md"
                  />
                )}
              </div>

              {/* Info Section */}
              <CardContent className="flex flex-col justify-between p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <CardTitle
                    className={`text-lg font-semibold ${
                      warehouse.promoted ? 'text-amber-700' : 'text-gray-800'
                    }`}
                  >
                    {warehouse.title}
                  </CardTitle>
                  {warehouse.promoted && (
                    <span className="px-2 py-1 bg-linear-to-r from-amber-400 to-yellow-500 text-white text-xs font-semibold rounded-md shadow-sm">
                      ★ PROMOWANE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <FaLocationDot className="text-amber-700" />
                    <span>{warehouse.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegCalendar className="text-amber-700" />
                    <span>{new Date(warehouse.available_from).toISOString().split('T')[0]}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm mt-2">
                  {warehouse.parking_truck && (
                    <div className="flex items-center gap-1">
                      <FaDotCircle className="text-blue-700" />
                      Parking ciężarowe
                    </div>
                  )}
                  {warehouse.heating && (
                    <div className="flex items-center gap-1">
                      <FaDotCircle className="text-rose-700" />
                      Ogrzewanie
                    </div>
                  )}
                  {warehouse.media && (
                    <div className="flex items-center gap-1">
                      <FaDotCircle className="text-emerald-700" />
                      Media
                    </div>
                  )}
                  {warehouse.parking_cars && (
                    <div className="flex items-center gap-1">
                      <FaDotCircle className="text-blue-700" />
                      Parking osobowe
                    </div>
                  )}
                  {warehouse.social_facilities && (
                    <div className="flex items-center gap-1">
                      <FaDotCircle className="text-purple-700" />
                      Zaplecze
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm line-clamp-4 mt-2">{warehouse.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Brak ogłoszeń spełniających kryteria.</p>
      )}
    </div>
  );
}
