// Re-export types from Shopify for backward compatibility
export type { Product, ProductVariant } from "@/lib/shopify/types";
import type { Product } from "@/lib/shopify/types";

// Real products from kitraro.com
export const products: Product[] = [
  // === SNEAKERS / TENIS ===
  {
    id: "1",
    handle: "air-jordan-1-shattered-backboard-tam-41",
    title: "Air Jordan 1 Shattered Backboard",
    description: "Air Jordan 1, Modelo Shattered Backboard, Condicao: 10/10. Tenis iconica em colorway laranja e preto, edicao limitada.",
    brand: "Air Jordan",
    price: 499.90,
    compareAtPrice: 899.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/327D5635-E750-4D54-8017-4D4A2E1A7859.jpg?v=1765828352",
      "https://www.kitraro.com/cdn/shop/files/693C7FD2-971F-4AC2-8B79-344DCFB6EEE3.jpg?v=1765828353",
      "https://www.kitraro.com/cdn/shop/files/C3F101CC-E5EA-4720-BE09-8652EA7AF05D.jpg?v=1765828352",
      "https://www.kitraro.com/cdn/shop/files/2B441CC0-8F26-4E8F-ADD0-29C9188BF259.jpg?v=1765828352",
      "https://www.kitraro.com/cdn/shop/files/F44CA381-26B5-4444-A6F1-A4F40650D297.jpg?v=1765828352"
    ],
    variants: [
      { id: "1-1", title: "41", price: 499.90, available: true, size: "41" }
    ],
    tags: ["sneakers", "jordan", "air-jordan", "orange", "black", "limited"],
    available: true,
    category: "Tenis"
  },
  {
    id: "2",
    handle: "nike-dunk-black-yellow",
    title: "Nike Dunk Black & Yellow",
    description: "Nike Dunk em colorway preto e amarelo. Estilo classico com visual marcante.",
    brand: "Nike",
    price: 780.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/72588632-83A5-4AC1-BE62-55B82D8C5B81.jpg?v=1760712548",
      "https://www.kitraro.com/cdn/shop/files/16541458-FA63-43FE-AFF4-C57609C1AC2F.jpg?v=1760712548"
    ],
    variants: [
      { id: "2-1", title: "41", price: 780.00, available: false, size: "41" }
    ],
    tags: ["sneakers", "nike", "dunk", "black", "yellow"],
    available: false,
    category: "Tenis"
  },
  {
    id: "3",
    handle: "nike-dunk-purple-yellow",
    title: "Nike Dunk Purple & Yellow",
    description: "Nike Dunk em colorway roxo e amarelo. Estilo ousado para quem gosta de se destacar.",
    brand: "Nike",
    price: 780.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/CA1D33C8-2FD6-4907-A00D-075148CC90C9.jpg?v=1760712696"
    ],
    variants: [
      { id: "3-1", title: "41", price: 780.00, available: true, size: "41" }
    ],
    tags: ["sneakers", "nike", "dunk", "purple", "yellow"],
    available: true,
    category: "Tenis"
  },

  // === JACKETS / JAQUETAS ===
  {
    id: "4",
    handle: "cortavento-the-north-face",
    title: "Cortavento The North Face",
    description: "Jaqueta Cortavento The North Face, Tamanho G (Veste M). Perfeita para dias de vento e chuva leve.",
    brand: "The North Face",
    price: 329.90,
    compareAtPrice: 599.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/3AC959B4-0BE5-4B5D-AC77-0A81B53EACA7.jpg?v=1765828967",
      "https://www.kitraro.com/cdn/shop/files/7C7AC4C3-8F35-4A04-8989-9F29DF1F2D0E.jpg?v=1765828968",
      "https://www.kitraro.com/cdn/shop/files/E3C0CF0E-DD2B-4B5A-80D7-D1EA1A883DC8.jpg?v=1765828967"
    ],
    variants: [
      { id: "4-1", title: "G", price: 329.90, available: true, size: "G" }
    ],
    tags: ["jackets", "the-north-face", "windbreaker", "cortavento"],
    available: true,
    category: "Jaquetas"
  },
  {
    id: "5",
    handle: "jaqueta-bape-aape-preta",
    title: "Jaqueta BAPE AAPE Preta",
    description: "Jaqueta bomber BAPE AAPE na cor preta. Streetwear de luxo com estilo japones autentico.",
    brand: "BAPE",
    price: 329.90,
    compareAtPrice: 699.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/9FB083E7-B901-4B93-A3CE-FAC32962047C.jpg?v=1759206150"
    ],
    variants: [
      { id: "5-1", title: "M", price: 329.90, available: true, size: "M" }
    ],
    tags: ["jackets", "bape", "bomber", "black", "streetwear"],
    available: true,
    category: "Jaquetas"
  },
  {
    id: "6",
    handle: "jaqueta-bape-aape-camuflada",
    title: "Jaqueta BAPE AAPE Camuflada",
    description: "Jaqueta BAPE AAPE com estampa camuflada iconica. Design exclusivo da marca japonesa.",
    brand: "BAPE",
    price: 259.90,
    compareAtPrice: 499.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/AD489DD0-D708-42D9-A2B2-CFD737519886.jpg?v=1759206388"
    ],
    variants: [
      { id: "6-1", title: "M", price: 259.90, available: true, size: "M" }
    ],
    tags: ["jackets", "bape", "camo", "camuflada", "streetwear"],
    available: true,
    category: "Jaquetas"
  },
  {
    id: "7",
    handle: "jaqueta-feminina-kappa",
    title: "Jaqueta Feminina Kappa",
    description: "Jaqueta feminina Kappa em estilo esportivo. Conforto e estilo para o dia a dia.",
    brand: "Kappa",
    price: 149.90,
    compareAtPrice: 269.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/8C2D5E01-7424-40A4-A2B4-A021DE82B77F.jpg?v=1765829959"
    ],
    variants: [
      { id: "7-1", title: "M", price: 149.90, available: true, size: "M" }
    ],
    tags: ["jackets", "kappa", "feminina", "women"],
    available: true,
    category: "Jaquetas"
  },

  // === HOODIES / MOLETONS ===
  {
    id: "8",
    handle: "moletom-nike-air-jordan",
    title: "Moletom Nike Air Jordan Grey",
    description: "Moletom Nike Air Jordan Grey. Tamanho P. Conforto e estilo com a marca iconica.",
    brand: "Nike",
    price: 164.90,
    compareAtPrice: 279.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/0CA6885F-2005-44AE-93A2-DB0C8B40AF73.jpg?v=1765829170",
      "https://www.kitraro.com/cdn/shop/files/0C1DBCAF-193B-40BF-9AA2-0C128F87DE25.jpg?v=1765829170",
      "https://www.kitraro.com/cdn/shop/files/BD08106F-F904-4891-86A1-9B78AC9889A8.jpg?v=1765829170",
      "https://www.kitraro.com/cdn/shop/files/CA084B5A-B297-48C6-B740-DEDACEFADE8B.jpg?v=1765829170"
    ],
    variants: [
      { id: "8-1", title: "P", price: 164.90, available: true, size: "P" }
    ],
    tags: ["hoodies", "nike", "jordan", "grey", "cinza"],
    available: true,
    category: "Moletons"
  },
  {
    id: "9",
    handle: "moletom-nike-red",
    title: "Moletom Nike Red",
    description: "Moletom Nike na cor vermelha vibrante. Estilo esportivo com conforto premium.",
    brand: "Nike",
    price: 164.90,
    compareAtPrice: 279.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/3AF001B7-EA03-48EA-AD48-9B98A43E4182.jpg?v=1765829219"
    ],
    variants: [
      { id: "9-1", title: "M", price: 164.90, available: true, size: "M" }
    ],
    tags: ["hoodies", "nike", "red", "vermelho"],
    available: true,
    category: "Moletons"
  },

  // === PANTS / CALCAS ===
  {
    id: "10",
    handle: "calca-air-jordan",
    title: "Calca Air Jordan Limited Edition",
    description: "Calca Air Jordan Limited Edition Tamanho P (Veste M, 40, 42). Edicao limitada com design exclusivo.",
    brand: "Air Jordan",
    price: 280.00,
    compareAtPrice: 420.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/4897AAE7-0969-4DE8-AF8A-83DA62FC0E35.jpg?v=1760711363",
      "https://www.kitraro.com/cdn/shop/files/D31B152B-47D4-44B7-BCDE-AAD7BCB5F231.jpg?v=1760711363",
      "https://www.kitraro.com/cdn/shop/files/F808DFEB-EBB3-4747-8561-126580A89957.jpg?v=1760711362",
      "https://www.kitraro.com/cdn/shop/files/FC6455ED-119D-4825-9A76-4AB7FF89A1B5.jpg?v=1760711362"
    ],
    variants: [
      { id: "10-1", title: "P", price: 280.00, available: true, size: "P" }
    ],
    tags: ["pants", "jordan", "limited-edition", "calca"],
    available: true,
    category: "Calcas"
  },
  {
    id: "11",
    handle: "calca-nike-vintage",
    title: "Calca Nike Vintage",
    description: "Calca Nike Vintage com estilo retro. Perfeita para looks casuais e esportivos.",
    brand: "Nike",
    price: 220.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/854DEFD7-EFE3-4613-9BF5-73C61E499CB5.jpg?v=1760712920"
    ],
    variants: [
      { id: "11-1", title: "M", price: 220.00, available: true, size: "M" }
    ],
    tags: ["pants", "nike", "vintage", "retro", "calca"],
    available: true,
    category: "Calcas"
  },

  // === SHIRTS / CAMISETAS ===
  {
    id: "12",
    handle: "camiseta-vales-lives-forever-speed-bling",
    title: "Camiseta Vales Lives Forever Speed Bling",
    description: "Camiseta Vales Lives Forever Speed Bling Tamanho XG. Peca exclusiva de streetwear premium.",
    brand: "Vale",
    price: 1699.90,
    compareAtPrice: 2499.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/78B1C56A-8F1E-4870-96B8-CCF83C57CF1C.jpg?v=1765829459",
      "https://www.kitraro.com/cdn/shop/files/D89351AA-39B2-4FFD-85CD-78E7EC7E61B7.jpg?v=1765829459",
      "https://www.kitraro.com/cdn/shop/files/044F6A13-48A1-48E4-A4A4-7F9408B25DD6.jpg?v=1765829458",
      "https://www.kitraro.com/cdn/shop/files/5B19519F-CDED-4722-BE0D-14E0302A355D.jpg?v=1765829458",
      "https://www.kitraro.com/cdn/shop/files/03F6171F-CD3E-43A6-BCC5-E251D33E7936.jpg?v=1765829459",
      "https://www.kitraro.com/cdn/shop/files/FF665E43-E747-46AB-97EC-839B8CD7F6EC.jpg?v=1765829459"
    ],
    variants: [
      { id: "12-1", title: "XG", price: 1699.90, available: true, size: "XG" }
    ],
    tags: ["tees", "vales", "luxury", "streetwear", "limited"],
    available: true,
    category: "Camisetas"
  },
  {
    id: "13",
    handle: "polo-bape-aape",
    title: "Polo BAPE AAPE",
    description: "Polo BAPE AAPE em estilo classico. Streetwear de luxo com acabamento premium. Tamanho XS.",
    brand: "BAPE",
    price: 199.90,
    compareAtPrice: 299.90,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/544C895A-68A7-47BB-B45B-B673F15A77CB.jpg?v=1760711989",
      "https://www.kitraro.com/cdn/shop/files/5BA14E6D-8C89-4AE2-AE4C-225822D570C6.jpg?v=1760711990",
      "https://www.kitraro.com/cdn/shop/files/76094E83-681B-48DB-BA27-F7F7ADD057F5.jpg?v=1760711990",
      "https://www.kitraro.com/cdn/shop/files/0B4E0D24-3664-4CEF-BF4A-58070CBF8305.jpg?v=1760711990"
    ],
    variants: [
      { id: "13-1", title: "XS", price: 199.90, available: true, size: "XS" }
    ],
    tags: ["polo", "bape", "streetwear", "luxury"],
    available: true,
    category: "Camisetas"
  },

  // === CAPS / BONES ===
  {
    id: "14",
    handle: "bone-new-era-new-york-yankees-7-3-4",
    title: "Bone New Era New York Yankees",
    description: "Bone New Era modelo especial do time de baseball New York Yankees, tamanho 7 3/4. Design classico com qualidade premium.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-04-12-01-11_1.jpg?v=1763667524",
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-04-12-01-09.jpg?v=1763667524",
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-04-12-01-10_1.jpg?v=1763667524",
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-04-12-01-10.jpg?v=1763667524",
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-04-12-01-11_3.jpg?v=1763667524"
    ],
    variants: [
      { id: "14-1", title: "7 3/4", price: 99.90, available: true, size: "7 3/4" }
    ],
    tags: ["caps", "new-era", "yankees", "mlb", "black"],
    available: true,
    category: "Bones"
  },
  {
    id: "15",
    handle: "bone-new-era-chicago-bulls-7-3-4",
    title: "Bone New Era Chicago Bulls",
    description: "Bone New Era Chicago Bulls tamanho 7 3/4. O time lendario de Michael Jordan em estilo New Era.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/546A66D8-4003-46E2-B1BD-89A7A79BBFC7.jpg?v=1763668184"
    ],
    variants: [
      { id: "15-1", title: "7 3/4", price: 99.90, available: true, size: "7 3/4" }
    ],
    tags: ["caps", "new-era", "bulls", "nba", "red"],
    available: true,
    category: "Bones"
  },
  {
    id: "16",
    handle: "bone-new-era-boston-red-sox-7-1-2",
    title: "Bone New Era Boston Red Sox",
    description: "Bone New Era Boston Red Sox tamanho 7 1/2. Classico do baseball americano.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-11-18-02-18-48.jpg?v=1763662656"
    ],
    variants: [
      { id: "16-1", title: "7 1/2", price: 99.90, available: true, size: "7 1/2" }
    ],
    tags: ["caps", "new-era", "red-sox", "mlb", "navy"],
    available: true,
    category: "Bones"
  },
  {
    id: "17",
    handle: "bone-new-era-atlanta-braves",
    title: "Bone New Era Atlanta Braves",
    description: "Bone New Era Atlanta Braves. Time campeao da MLB em estilo classico.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/87D5CAFA-E1F1-4C53-BB44-CE44389A8934.jpg?v=1763666329"
    ],
    variants: [
      { id: "17-1", title: "7 5/8", price: 99.90, available: true, size: "7 5/8" }
    ],
    tags: ["caps", "new-era", "braves", "mlb", "navy"],
    available: true,
    category: "Bones"
  },
  {
    id: "18",
    handle: "bone-new-era-los-angeles-clippers-7-3-8",
    title: "Bone New Era Los Angeles Clippers",
    description: "Bone New Era NBA Los Angeles Clippers tamanho 7 3/8. Estilo californiano.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/7BA0EB20-6E0E-4337-A1B7-70B865178350.jpg?v=1763653040"
    ],
    variants: [
      { id: "18-1", title: "7 3/8", price: 99.90, available: true, size: "7 3/8" }
    ],
    tags: ["caps", "new-era", "clippers", "nba", "la"],
    available: true,
    category: "Bones"
  },
  {
    id: "19",
    handle: "bone-new-era-houston-rockets-7-1-2",
    title: "Bone New Era Houston Rockets",
    description: "Bone New Era Houston Rockets tamanho 7 1/2. Design classico do time texano.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-05-11-35-38_2.jpg?v=1763664905"
    ],
    variants: [
      { id: "19-1", title: "7 1/2", price: 99.90, available: true, size: "7 1/2" }
    ],
    tags: ["caps", "new-era", "rockets", "nba", "red"],
    available: true,
    category: "Bones"
  },
  {
    id: "20",
    handle: "bone-new-era-utah-jazz-7-1-2",
    title: "Bone New Era Utah Jazz",
    description: "Bone New Era Utah Jazz tamanho 7 1/2. Cores classicas do time de Utah.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-11-18-02-18-36.jpg?v=1763663053"
    ],
    variants: [
      { id: "20-1", title: "7 1/2", price: 99.90, available: true, size: "7 1/2" }
    ],
    tags: ["caps", "new-era", "jazz", "nba", "purple"],
    available: true,
    category: "Bones"
  },
  {
    id: "21",
    handle: "bone-new-era-philadelphia-phillies-7-1-4",
    title: "Bone New Era Philadelphia Phillies",
    description: "Bone New Era Philadelphia Phillies tamanho 7 1/4. Time historico da MLB.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-05-11-35-08.jpg?v=1763651144"
    ],
    variants: [
      { id: "21-1", title: "7 1/4", price: 99.90, available: true, size: "7 1/4" }
    ],
    tags: ["caps", "new-era", "phillies", "mlb", "red"],
    available: true,
    category: "Bones"
  },
  {
    id: "22",
    handle: "bone-new-era-toronto-blue-jays-7-1-4",
    title: "Bone New Era Toronto Blue Jays",
    description: "Bone New Era Toronto Blue Jays tamanho 7 1/4. Time canadense da MLB.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/57244348-8273-4686-A002-2836E0FB4805.jpg?v=1763651368"
    ],
    variants: [
      { id: "22-1", title: "7 1/4", price: 99.90, available: true, size: "7 1/4" }
    ],
    tags: ["caps", "new-era", "blue-jays", "mlb", "blue"],
    available: true,
    category: "Bones"
  },
  {
    id: "23",
    handle: "bone-new-era-chicago-cubs-7-1-4",
    title: "Bone New Era Chicago Cubs",
    description: "Bone New Era Chicago Cubs tamanho 7 1/4. Time lendario de Chicago.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/8BCDF851-C0F4-4066-B9F3-4528EDAECE53.jpg?v=1760707700"
    ],
    variants: [
      { id: "23-1", title: "7 1/4", price: 99.90, available: true, size: "7 1/4" }
    ],
    tags: ["caps", "new-era", "cubs", "mlb", "blue"],
    available: true,
    category: "Bones"
  },
  {
    id: "24",
    handle: "bone-new-era-milwaukee-brewers-7-1-2",
    title: "Bone New Era Milwaukee Brewers",
    description: "Bone New Era Milwaukee Brewers tamanho 7 1/2. Design retro do time de Wisconsin.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-11-18-02-18-46.jpg?v=1763663503"
    ],
    variants: [
      { id: "24-1", title: "7 1/2", price: 99.90, available: true, size: "7 1/2" }
    ],
    tags: ["caps", "new-era", "brewers", "mlb", "navy"],
    available: true,
    category: "Bones"
  },
  {
    id: "25",
    handle: "bone-new-era-pittsburgh-pirates-7-5-8",
    title: "Bone New Era Pittsburgh Pirates",
    description: "Bone New Era Pittsburgh Pirates tamanho 7 5/8. Classico preto e amarelo.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/65B2B55A-5CA8-4A5F-9715-3C8DEBB45C29.jpg?v=1763666565"
    ],
    variants: [
      { id: "25-1", title: "7 5/8", price: 99.90, available: true, size: "7 5/8" }
    ],
    tags: ["caps", "new-era", "pirates", "mlb", "black", "yellow"],
    available: true,
    category: "Bones"
  },
  {
    id: "26",
    handle: "bone-new-era-brooklyn-nets-7-7-8",
    title: "Bone New Era Brooklyn Nets",
    description: "Bone New Era Brooklyn Nets tamanho 7 7/8. Estilo New York da NBA.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/730F4A03-4AC5-43BA-BCE7-03DEF44F74A2.jpg?v=1763668758"
    ],
    variants: [
      { id: "26-1", title: "7 7/8", price: 99.90, available: true, size: "7 7/8" }
    ],
    tags: ["caps", "new-era", "nets", "nba", "black", "white"],
    available: true,
    category: "Bones"
  },
  {
    id: "27",
    handle: "bone-new-era-new-york-mets-7-1-4",
    title: "Bone New Era New York Mets",
    description: "Bone New Era New York Mets tamanho 7 1/4. Time de New York da MLB.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/E7DB2796-A1AB-4C34-BD65-FD0580A260B3.jpg?v=1763652567"
    ],
    variants: [
      { id: "27-1", title: "7 1/4", price: 99.90, available: true, size: "7 1/4" }
    ],
    tags: ["caps", "new-era", "mets", "mlb", "orange", "blue"],
    available: true,
    category: "Bones"
  },
  {
    id: "28",
    handle: "bone-new-era-st-louis-cardinals-7-3-4",
    title: "Bone New Era St. Louis Cardinals",
    description: "Bone New Era St. Louis Cardinals tamanho 7 3/4. Time historico da MLB.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/A02EEB48-E6B8-4A57-8D65-8C46B86F8772.jpg?v=1763667009"
    ],
    variants: [
      { id: "28-1", title: "7 3/4", price: 99.90, available: true, size: "7 3/4" }
    ],
    tags: ["caps", "new-era", "cardinals", "mlb", "red"],
    available: true,
    category: "Bones"
  },
  {
    id: "29",
    handle: "bone-new-era-san-francisco-giants",
    title: "Bone New Era San Francisco Giants",
    description: "Bone New Era San Francisco Giants. Classico da costa oeste americana.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/PHOTO-2025-10-05-11-34-48.jpg?v=1763666859"
    ],
    variants: [
      { id: "29-1", title: "7 1/2", price: 99.90, available: true, size: "7 1/2" }
    ],
    tags: ["caps", "new-era", "giants", "mlb", "orange", "black"],
    available: true,
    category: "Bones"
  },
  {
    id: "30",
    handle: "bone-new-era-montreal-expos-7-1-8",
    title: "Bone New Era Montreal Expos",
    description: "Bone New Era Montreal Expos tamanho 7 1/8. Time retro canadense - colecao vintage.",
    brand: "New Era",
    price: 99.90,
    compareAtPrice: 160.00,
    currency: "BRL",
    images: [
      "https://www.kitraro.com/cdn/shop/files/3FAA8350-C152-423A-B6CE-AD5D01E01C36.jpg?v=1763649467"
    ],
    variants: [
      { id: "30-1", title: "7 1/8", price: 99.90, available: true, size: "7 1/8" }
    ],
    tags: ["caps", "new-era", "expos", "mlb", "vintage", "retro"],
    available: true,
    category: "Bones"
  }
];

export const brands = [
  { name: "Nike", slug: "nike", logo: "/brands/nike.png" },
  { name: "Air Jordan", slug: "air-jordan", logo: "/brands/jordan.png" },
  { name: "BAPE", slug: "bape", logo: "/brands/bape.png" },
  { name: "New Era", slug: "new-era", logo: "/brands/new-era.png" },
  { name: "The North Face", slug: "the-north-face", logo: "/brands/tnf.png" },
  { name: "Kappa", slug: "kappa", logo: "/brands/kappa.png" },
  { name: "Vale", slug: "vale", logo: "/brands/vale.png" },
  { name: "Adidas", slug: "adidas", logo: "/brands/adidas.png" },
  { name: "Champions", slug: "champions", logo: "/brands/champions.png" },
  { name: "Lacoste", slug: "lacoste", logo: "/brands/lacoste.png" },
  { name: "Asics", slug: "asics", logo: "/brands/asics.png" },
  { name: "Revenge", slug: "revenge", logo: "/brands/revenge.png" },
  { name: "Versace", slug: "versace", logo: "/brands/versace.png" },
  { name: "Chase Authentics", slug: "chase-authentics", logo: "/brands/chase-authentics.svg" },
  { name: "Hugo Boss", slug: "hugo-boss", logo: "/brands/hugo-boss.png" },
];

export const categories = [
  {
    name: "Tenis",
    slug: "tenis",
    count: 3,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800",
    description: "Sneakers Exclusivos"
  },
  {
    name: "Bones",
    slug: "bones",
    count: 17,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",
    description: "New Era & Mais"
  },
  {
    name: "Jaquetas",
    slug: "jaquetas",
    count: 4,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    description: "Cortavento & Puffer"
  },
  {
    name: "Moletons",
    slug: "moletons",
    count: 2,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    description: "Hoodies Premium"
  },
  {
    name: "Calcas",
    slug: "calcas",
    count: 2,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
    description: "Cargos & Joggers"
  },
  {
    name: "Camisetas",
    slug: "camisetas",
    count: 2,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
    description: "Tees Streetwear"
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.compareAtPrice).slice(0, 4);
}

export function getNewArrivals(): Product[] {
  return products.slice(0, 6);
}

export function getSaleProducts(): Product[] {
  return products.filter(p => p.compareAtPrice);
}
