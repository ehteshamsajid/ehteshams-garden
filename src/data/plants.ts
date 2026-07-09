import sunflowerImg from "@/assets/plants/sunflower.jpg";
import magnoliaImg from "@/assets/plants/magnolia.jpg";
import palmCategoryImg from "@/assets/categories/palm-tree.jpg";
import fruitCategoryImg from "@/assets/categories/fruit-tree.jpg";

export type PlantCategory =
  | "indoor"
  | "outdoor"
  | "flowering"
  | "palm"
  | "vine"
  | "fruit"
  | "vegetable"
  | "tree";

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  gallery: string[];
  light: string;
  water: string;
  price: string;
  description: string;
  care: {
    light: string;
    water: string;
    temperature: string;
    humidity: string;
    soil: string;
    fertilizer: string;
  };
  difficulty: "Easy" | "Moderate" | "Expert";
  size: string;
  petFriendly: boolean;
  category: PlantCategory;
}

const makeGallery = (id: string) => [
  `https://images.unsplash.com/photo-${id}?w=800&h=800&fit=crop`,
  `https://images.unsplash.com/photo-${id}?w=900&h=700&fit=crop`,
  `https://images.unsplash.com/photo-${id}?w=700&h=900&fit=crop`,
  `https://images.unsplash.com/photo-${id}?w=800&h=800&fit=crop&crop=top`,
];

const defaultCare = {
  light: "Bright, indirect light works best for most conditions.",
  water: "Water when the top inch of soil feels dry.",
  temperature: "Comfortable room or seasonal outdoor temperatures.",
  humidity: "Average humidity is fine; mist occasionally.",
  soil: "Well-draining potting mix.",
  fertilizer: "Feed monthly during the growing season.",
};

export const plants: Plant[] = [
  // INDOOR
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    species: "Araceae",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&h=600&fit=crop",
    gallery: makeGallery("1614594975525-e45190c55d0b"),
    light: "Indirect", water: "Weekly", price: "$45",
    description: "The Swiss Cheese Plant, beloved for dramatic, perforated leaves.",
    care: defaultCare, difficulty: "Easy", size: "Up to 8 ft", petFriendly: false, category: "indoor",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    species: "Moraceae",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&h=600&fit=crop",
    gallery: makeGallery("1459411552884-841db9b3cc2a"),
    light: "Bright", water: "Bi-weekly", price: "$65",
    description: "Iconic statement plant with violin-shaped leaves.",
    care: defaultCare, difficulty: "Moderate", size: "Up to 6 ft", petFriendly: false, category: "indoor",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    species: "Asparagaceae",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=500&h=600&fit=crop",
    gallery: makeGallery("1593691509543-c55fb32d8de5"),
    light: "Low", water: "Monthly", price: "$30",
    description: "Hardy upright leaves, excellent air purifier.",
    care: defaultCare, difficulty: "Easy", size: "1–4 ft", petFriendly: false, category: "indoor",
  },
  {
    id: "pothos-golden",
    name: "Pothos Golden",
    species: "Araceae",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=500&h=600&fit=crop",
    gallery: makeGallery("1521334884684-d80222895322"),
    light: "Low", water: "Weekly", price: "$20",
    description: "Vigorous trailing vine with golden-variegated heart-shaped leaves.",
    care: defaultCare, difficulty: "Easy", size: "Trails 10 ft", petFriendly: false, category: "indoor",
  },
  {
    id: "calathea-orbifolia",
    name: "Calathea Orbifolia",
    species: "Marantaceae",
    image: "https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=500&h=600&fit=crop",
    gallery: makeGallery("1637967886160-fd78dc3ce3f5"),
    light: "Indirect", water: "Bi-weekly", price: "$55",
    description: "Showstopper round leaves with silvery-green stripes.",
    care: defaultCare, difficulty: "Expert", size: "Up to 3 ft", petFriendly: true, category: "indoor",
  },

  // OUTDOOR
  {
    id: "bird-of-paradise",
    name: "Bird of Paradise",
    species: "Strelitziaceae",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500&h=600&fit=crop",
    gallery: makeGallery("1509423350716-97f9360b4e09"),
    light: "Full sun", water: "Weekly", price: "$80",
    description: "Tropical grandeur with banana-like leaves.",
    care: defaultCare, difficulty: "Moderate", size: "Up to 7 ft", petFriendly: false, category: "outdoor",
  },
  {
    id: "boxwood",
    name: "Boxwood Shrub",
    species: "Buxaceae",
    image: "https://images.unsplash.com/photo-1558293842-c0fd3db86157?w=500&h=600&fit=crop",
    gallery: makeGallery("1558293842-c0fd3db86157"),
    light: "Sun/Shade", water: "Weekly", price: "$35",
    description: "Classic evergreen shrub, perfect for hedges and topiary.",
    care: defaultCare, difficulty: "Easy", size: "2–8 ft", petFriendly: false, category: "outdoor",
  },
  {
    id: "hosta",
    name: "Hosta",
    species: "Asparagaceae",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=500&h=600&fit=crop",
    gallery: makeGallery("1533038590840-1cde6e668a91"),
    light: "Shade", water: "Weekly", price: "$28",
    description: "Lush shade-loving perennial with sculptural, ribbed foliage.",
    care: defaultCare, difficulty: "Easy", size: "1–3 ft", petFriendly: false, category: "outdoor",
  },
  {
    id: "garden-fern",
    name: "Garden Fern",
    species: "Polypodiaceae",
    image: "https://images.unsplash.com/photo-1502780402662-acc01917cf6f?w=500&h=600&fit=crop",
    gallery: makeGallery("1502780402662-acc01917cf6f"),
    light: "Shade", water: "Frequent", price: "$22",
    description: "Feathery fronds that bring softness to shady garden corners.",
    care: defaultCare, difficulty: "Easy", size: "2–4 ft", petFriendly: true, category: "outdoor",
  },
  {
    id: "juniper-shrub",
    name: "Juniper Shrub",
    species: "Cupressaceae",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&h=600&fit=crop",
    gallery: makeGallery("1585320806297-9794b3e4eeae"),
    light: "Full sun", water: "Low", price: "$42",
    description: "Hardy evergreen conifer, drought-tolerant and low-maintenance.",
    care: defaultCare, difficulty: "Easy", size: "3–10 ft", petFriendly: false, category: "outdoor",
  },

  // FLOWERING
  {
    id: "lavender",
    name: "English Lavender",
    species: "Lamiaceae",
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500&h=600&fit=crop",
    gallery: makeGallery("1499002238440-d264edd596ec"),
    light: "Full sun", water: "Low", price: "$25",
    description: "Fragrant purple blooms that attract pollinators.",
    care: defaultCare, difficulty: "Easy", size: "1–3 ft", petFriendly: true, category: "flowering",
  },
  {
    id: "hydrangea",
    name: "Hydrangea",
    species: "Hydrangeaceae",
    image: "https://images.unsplash.com/photo-1526397751294-331021109fbd?w=500&h=600&fit=crop",
    gallery: makeGallery("1526397751294-331021109fbd"),
    light: "Partial sun", water: "Frequent", price: "$40",
    description: "Massive showy clusters in blue, pink, purple, and white.",
    care: defaultCare, difficulty: "Easy", size: "3–6 ft", petFriendly: false, category: "flowering",
  },
  {
    id: "rose-garden",
    name: "Garden Rose",
    species: "Rosaceae",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=500&h=600&fit=crop",
    gallery: makeGallery("1496062031456-07b8f162a322"),
    light: "Full sun", water: "Weekly", price: "$35",
    description: "Timeless fragrant blooms in every color imaginable.",
    care: defaultCare, difficulty: "Moderate", size: "3–6 ft", petFriendly: true, category: "flowering",
  },
  {
    id: "sunflower",
    name: "Giant Sunflower",
    species: "Asteraceae",
    image: sunflowerImg,
    gallery: [sunflowerImg, sunflowerImg, sunflowerImg, sunflowerImg],
    light: "Full sun", water: "Weekly", price: "$12",
    description: "Towering golden blooms that follow the sun across the sky.",
    care: defaultCare, difficulty: "Easy", size: "6–10 ft", petFriendly: true, category: "flowering",
  },
  {
    id: "tulip",
    name: "Tulip Bulbs",
    species: "Liliaceae",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500&h=600&fit=crop",
    gallery: makeGallery("1520763185298-1b434c919102"),
    light: "Full sun", water: "Weekly", price: "$15",
    description: "Cheerful spring cups in every shade — a garden classic.",
    care: defaultCare, difficulty: "Easy", size: "10–18 in", petFriendly: false, category: "flowering",
  },
  {
    id: "peony",
    name: "Garden Peony",
    species: "Paeoniaceae",
    image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=500&h=600&fit=crop",
    gallery: makeGallery("1591886960571-74d43a9d4166"),
    light: "Full sun", water: "Weekly", price: "$38",
    description: "Voluptuous, ruffled blooms with an intoxicating fragrance.",
    care: defaultCare, difficulty: "Moderate", size: "2–3 ft", petFriendly: false, category: "flowering",
  },

  // PALM
  {
    id: "areca-palm",
    name: "Areca Palm",
    species: "Arecaceae",
    image: "https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=500&h=600&fit=crop",
    gallery: makeGallery("1591958911259-bee2173bdccc"),
    light: "Bright", water: "Weekly", price: "$70",
    description: "Graceful feathery fronds, a tropical staple for any room.",
    care: defaultCare, difficulty: "Easy", size: "Up to 7 ft", petFriendly: true, category: "palm",
  },
  {
    id: "kentia-palm",
    name: "Kentia Palm",
    species: "Arecaceae",
    image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=500&h=600&fit=crop",
    gallery: makeGallery("1604762524889-3e2fcc145683"),
    light: "Indirect", water: "Bi-weekly", price: "$120",
    description: "Elegant arching fronds, the quintessential indoor palm.",
    care: defaultCare, difficulty: "Easy", size: "Up to 10 ft", petFriendly: true, category: "palm",
  },
  {
    id: "date-palm",
    name: "Pygmy Date Palm",
    species: "Arecaceae",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&h=600&fit=crop",
    gallery: makeGallery("1518531933037-91b2f5f229cc"),
    light: "Full sun", water: "Weekly", price: "$85",
    description: "Compact palm with fine-textured fronds, ideal for patios.",
    care: defaultCare, difficulty: "Moderate", size: "6–12 ft", petFriendly: true, category: "palm",
  },
  {
    id: "majesty-palm",
    name: "Majesty Palm",
    species: "Arecaceae",
    image: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=500&h=600&fit=crop",
    gallery: makeGallery("1509937528035-ad76254b0356"),
    light: "Bright", water: "Frequent", price: "$95",
    description: "Regal cascading fronds that add resort vibes to any room.",
    care: defaultCare, difficulty: "Moderate", size: "Up to 10 ft", petFriendly: true, category: "palm",
  },
  {
    id: "sago-palm",
    name: "Sago Palm",
    species: "Cycadaceae",
    image: "https://images.unsplash.com/photo-1616680214084-22670de1bc82?w=500&h=600&fit=crop",
    gallery: makeGallery("1616680214084-22670de1bc82"),
    light: "Bright", water: "Bi-weekly", price: "$110",
    description: "Prehistoric-looking symmetric fronds — a living sculpture.",
    care: defaultCare, difficulty: "Moderate", size: "2–10 ft", petFriendly: false, category: "palm",
  },

  // VINE
  {
    id: "english-ivy",
    name: "English Ivy",
    species: "Araliaceae",
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500&h=600&fit=crop",
    gallery: makeGallery("1572688484438-313a6e50c333"),
    light: "Indirect", water: "Weekly", price: "$18",
    description: "Classic trailing vine with lobed evergreen leaves.",
    care: defaultCare, difficulty: "Easy", size: "Trails 6–8 ft", petFriendly: false, category: "vine",
  },
  {
    id: "philodendron-vine",
    name: "Heartleaf Philodendron",
    species: "Araceae",
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500&h=600&fit=crop",
    gallery: makeGallery("1632207691143-643e2a9a9361"),
    light: "Low", water: "Weekly", price: "$22",
    description: "Glossy heart-shaped leaves on cascading vines.",
    care: defaultCare, difficulty: "Easy", size: "Trails 10 ft", petFriendly: false, category: "vine",
  },
  {
    id: "string-of-pearls",
    name: "String of Pearls",
    species: "Asteraceae",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=500&h=600&fit=crop",
    gallery: makeGallery("1622547748225-3fc4abd2cca0"),
    light: "Bright", water: "Low", price: "$28",
    description: "Whimsical succulent vine of round, pearl-like beads.",
    care: defaultCare, difficulty: "Moderate", size: "Trails 3 ft", petFriendly: false, category: "vine",
  },
  {
    id: "grape-vine",
    name: "Grape Vine",
    species: "Vitaceae",
    image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=500&h=600&fit=crop",
    gallery: makeGallery("1596363505729-4190a9506133"),
    light: "Full sun", water: "Weekly", price: "$45",
    description: "Sprawling woody vine bearing sweet clusters of fruit each summer.",
    care: defaultCare, difficulty: "Moderate", size: "Climbs 20 ft", petFriendly: true, category: "vine",
  },
  {
    id: "clematis",
    name: "Clematis",
    species: "Ranunculaceae",
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=500&h=600&fit=crop",
    gallery: makeGallery("1509223197845-458d87318791"),
    light: "Partial sun", water: "Weekly", price: "$32",
    description: "Show-stopping climber with star-shaped blooms in vivid hues.",
    care: defaultCare, difficulty: "Moderate", size: "Climbs 10 ft", petFriendly: false, category: "vine",
  },

  // FRUIT
  {
    id: "lemon-tree",
    name: "Meyer Lemon Tree",
    species: "Rutaceae",
    image: "https://images.unsplash.com/photo-1591033594798-33227a05780d?w=500&h=600&fit=crop",
    gallery: makeGallery("1591033594798-33227a05780d"),
    light: "Full sun", water: "Weekly", price: "$60",
    description: "Fragrant blossoms followed by sweet, juicy lemons year-round.",
    care: defaultCare, difficulty: "Moderate", size: "4–10 ft", petFriendly: true, category: "fruit",
  },
  {
    id: "strawberry",
    name: "Strawberry Plant",
    species: "Rosaceae",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=500&h=600&fit=crop",
    gallery: makeGallery("1518635017498-87f514b751ba"),
    light: "Full sun", water: "Frequent", price: "$10",
    description: "Sweet red berries from compact, runner-spreading plants.",
    care: defaultCare, difficulty: "Easy", size: "6–12 in", petFriendly: true, category: "fruit",
  },
  {
    id: "blueberry-bush",
    name: "Blueberry Bush",
    species: "Ericaceae",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&h=600&fit=crop",
    gallery: makeGallery("1498557850523-fd3d118b962e"),
    light: "Full sun", water: "Weekly", price: "$32",
    description: "Antioxidant-rich berries on a hardy ornamental shrub.",
    care: defaultCare, difficulty: "Easy", size: "3–6 ft", petFriendly: true, category: "fruit",
  },
  {
    id: "apple-tree",
    name: "Apple Tree",
    species: "Rosaceae",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&h=600&fit=crop",
    gallery: makeGallery("1568702846914-96b305d2aaeb"),
    light: "Full sun", water: "Weekly", price: "$75",
    description: "Classic orchard tree bearing crisp, juicy apples each autumn.",
    care: defaultCare, difficulty: "Moderate", size: "10–25 ft", petFriendly: true, category: "fruit",
  },
  {
    id: "fig-tree",
    name: "Fig Tree",
    species: "Moraceae",
    image: "https://images.unsplash.com/photo-1601379329542-31c59cfe8b3a?w=500&h=600&fit=crop",
    gallery: makeGallery("1601379329542-31c59cfe8b3a"),
    light: "Full sun", water: "Weekly", price: "$68",
    description: "Mediterranean favorite yielding honey-sweet figs on lobed foliage.",
    care: defaultCare, difficulty: "Easy", size: "10–20 ft", petFriendly: true, category: "fruit",
  },

  // VEGETABLE
  {
    id: "tomato-plant",
    name: "Heirloom Tomato",
    species: "Solanaceae",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&h=600&fit=crop",
    gallery: makeGallery("1592841200221-a6898f307baa"),
    light: "Full sun", water: "Frequent", price: "$8",
    description: "Bursting with flavor — the centerpiece of any veggie garden.",
    care: defaultCare, difficulty: "Easy", size: "3–6 ft", petFriendly: true, category: "vegetable",
  },
  {
    id: "bell-pepper",
    name: "Bell Pepper",
    species: "Solanaceae",
    image: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=500&h=600&fit=crop",
    gallery: makeGallery("1525607551316-4a8e16d1f9ba"),
    light: "Full sun", water: "Weekly", price: "$9",
    description: "Crisp, colorful peppers ripening from green to red.",
    care: defaultCare, difficulty: "Easy", size: "2–3 ft", petFriendly: true, category: "vegetable",
  },
  {
    id: "basil",
    name: "Sweet Basil",
    species: "Lamiaceae",
    image: "https://images.unsplash.com/photo-1538596313828-41d729090199?w=500&h=600&fit=crop",
    gallery: makeGallery("1538596313828-41d729090199"),
    light: "Full sun", water: "Frequent", price: "$6",
    description: "Aromatic culinary herb that thrives on sunny windowsills.",
    care: defaultCare, difficulty: "Easy", size: "12–24 in", petFriendly: true, category: "vegetable",
  },
  {
    id: "lettuce",
    name: "Butterhead Lettuce",
    species: "Asteraceae",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=500&h=600&fit=crop",
    gallery: makeGallery("1622205313162-be1d5712a43f"),
    light: "Partial sun", water: "Frequent", price: "$5",
    description: "Tender, buttery leaves ready for the salad bowl in weeks.",
    care: defaultCare, difficulty: "Easy", size: "6–10 in", petFriendly: true, category: "vegetable",
  },
  {
    id: "carrot",
    name: "Rainbow Carrots",
    species: "Apiaceae",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500&h=600&fit=crop",
    gallery: makeGallery("1447175008436-054170c2e979"),
    light: "Full sun", water: "Weekly", price: "$4",
    description: "Sweet, crisp roots in orange, purple, and gold varieties.",
    care: defaultCare, difficulty: "Easy", size: "8–12 in", petFriendly: true, category: "vegetable",
  },


  // TREE
  {
    id: "japanese-maple",
    name: "Japanese Maple",
    species: "Sapindaceae",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500&h=600&fit=crop",
    gallery: makeGallery("1502082553048-f009c37129b9"),
    light: "Partial shade", water: "Weekly", price: "$120",
    description: "Elegant ornamental tree with brilliant autumn foliage.",
    care: defaultCare, difficulty: "Moderate", size: "6–25 ft", petFriendly: true, category: "tree",
  },
  {
    id: "olive-tree",
    name: "Olive Tree",
    species: "Oleaceae",
    image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=500&h=600&fit=crop",
    gallery: makeGallery("1525498128493-380d1990a112"),
    light: "Full sun", water: "Low", price: "$95",
    description: "Mediterranean rustic elegance with silvery-green foliage.",
    care: defaultCare, difficulty: "Moderate", size: "Up to 20 ft", petFriendly: true, category: "tree",
  },
  {
    id: "magnolia",
    name: "Southern Magnolia",
    species: "Magnoliaceae",
    image: magnoliaImg,
    gallery: [magnoliaImg, magnoliaImg, magnoliaImg, magnoliaImg],
    light: "Full sun", water: "Weekly", price: "$140",
    description: "Iconic evergreen with enormous, fragrant white blossoms.",
    care: defaultCare, difficulty: "Moderate", size: "20–60 ft", petFriendly: true, category: "tree",
  },
  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    species: "Rosaceae",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=500&h=600&fit=crop",
    gallery: makeGallery("1522383225653-ed111181a951"),
    light: "Full sun", water: "Weekly", price: "$160",
    description: "Ethereal spring blossoms that carpet gardens in pink petals.",
    care: defaultCare, difficulty: "Moderate", size: "15–30 ft", petFriendly: true, category: "tree",
  },
  {
    id: "pine-tree",
    name: "Scots Pine",
    species: "Pinaceae",
    image: "https://images.unsplash.com/photo-1441829266145-6d4bfb7a3a02?w=500&h=600&fit=crop",
    gallery: makeGallery("1441829266145-6d4bfb7a3a02"),
    light: "Full sun", water: "Weekly", price: "$110",
    description: "Evergreen conifer prized for its rugged form and needled boughs.",
    care: defaultCare, difficulty: "Easy", size: "20–60 ft", petFriendly: true, category: "tree",
  },
];

export const CATEGORY_META: Record<PlantCategory, { title: string; subtitle: string; image: string; icon: string }> = {
  indoor: {
    title: "Indoor Plants",
    subtitle: "Lush greenery to transform your home into a peaceful sanctuary.",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=900&h=700&fit=crop",
    icon: "Home",
  },
  outdoor: {
    title: "Outdoor Plants",
    subtitle: "Hardy, vibrant plants for gardens, patios, and porches.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&h=700&fit=crop",
    icon: "Trees",
  },
  flowering: {
    title: "Flowering Plants",
    subtitle: "Vibrant blooms that fill your space with color and fragrance.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&h=700&fit=crop",
    icon: "Flower2",
  },
  palm: {
    title: "Palm Trees",
    subtitle: "Tropical fronds for that resort-at-home atmosphere.",
    image: palmCategoryImg,
    icon: "Palmtree",
  },
  vine: {
    title: "Vines & Trailing",
    subtitle: "Cascading greenery for shelves, hangers, and climbing walls.",
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=900&h=700&fit=crop",
    icon: "Sprout",
  },
  fruit: {
    title: "Fruit Plants",
    subtitle: "Homegrown harvest, from citrus trees to berry bushes.",
    image: fruitCategoryImg,
    icon: "Apple",
  },
  vegetable: {
    title: "Vegetable Plants",
    subtitle: "Edible favorites and aromatic herbs for your garden table.",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&h=700&fit=crop",
    icon: "Carrot",
  },
  tree: {
    title: "Trees",
    subtitle: "Majestic specimens that anchor a landscape for generations.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&h=700&fit=crop",
    icon: "TreePine",
  },
};

export const PLANT_CATEGORIES = Object.keys(CATEGORY_META) as PlantCategory[];

export const getPlantById = (id: string): Plant | undefined => plants.find((p) => p.id === id);

export const getPlantsByCategory = (category: PlantCategory): Plant[] =>
  plants.filter((p) => p.category === category);
