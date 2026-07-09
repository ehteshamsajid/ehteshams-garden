import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Plant, PlantCategory } from "@/data/plants";

const defaultCare = {
  light: "Bright, indirect light works best for most conditions.",
  water: "Water when the top inch of soil feels dry.",
  temperature: "Comfortable room or seasonal outdoor temperatures.",
  humidity: "Average humidity is fine; mist occasionally.",
  soil: "Well-draining potting mix.",
  fertilizer: "Feed monthly during the growing season.",
};

const mapRow = (r: any): Plant => {
  const image = r.image_url || "";
  const gallery: string[] = Array.isArray(r.gallery) && r.gallery.length > 0
    ? r.gallery
    : [image, image, image, image];
  const care = { ...defaultCare, ...(r.care || {}) };
  return {
    id: r.id,
    name: r.name,
    species: r.species ?? "",
    image,
    gallery,
    light: r.light ?? "",
    water: r.water ?? "",
    price: `$${Number(r.price ?? 0).toFixed(0)}`,
    description: r.description ?? "",
    care,
    difficulty: (r.difficulty ?? "Easy") as Plant["difficulty"],
    size: r.size ?? "",
    petFriendly: !!r.pet_friendly,
    category: r.category as PlantCategory,
  };
};

let cache: Plant[] | null = null;
const listeners = new Set<(p: Plant[]) => void>();

const fetchAll = async () => {
  const { data, error } = await supabase.from("plants").select("*").order("name");
  if (error) {
    console.error("Failed to load plants", error);
    return;
  }
  cache = (data ?? []).map(mapRow);
  listeners.forEach((l) => l(cache!));
};

// realtime updates so admin edits reflect on the site
supabase
  .channel("plants-changes")
  .on("postgres_changes", { event: "*", schema: "public", table: "plants" }, () => {
    fetchAll();
  })
  .subscribe();

export const usePlants = () => {
  const [plants, setPlants] = useState<Plant[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    const cb = (p: Plant[]) => {
      setPlants(p);
      setLoading(false);
    };
    listeners.add(cb);
    if (cache === null) {
      fetchAll();
    } else {
      setPlants(cache);
      setLoading(false);
    }
    return () => {
      listeners.delete(cb);
    };
  }, []);

  return { plants, loading };
};

export const usePlant = (id: string | undefined) => {
  const { plants, loading } = usePlants();
  return { plant: plants.find((p) => p.id === id), loading };
};

export const usePlantsByCategory = (category: PlantCategory) => {
  const { plants, loading } = usePlants();
  return { plants: plants.filter((p) => p.category === category), loading };
};
