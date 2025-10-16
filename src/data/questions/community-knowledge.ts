import type { Question } from "../../types/question";

export const communityKnowledgeQuestions: Question[] = [
  // Easy (10)
  {
    id: "CK-E1",
    type: "mcq",
    question:
      "Which traditional practice is often used by communities to maintain soil fertility?",
    options: [
      "Shifting cultivation",
      "Monocropping",
      "Slash-and-burn only",
      "Overgrazing",
    ],
    correctOptionIndex: 0,
    explanation:
      "Shifting cultivation rotates crops to maintain soil fertility sustainably.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E2",
    type: "truefalse",
    statement:
      "Community knowledge systems often emphasize living in harmony with nature.",
    answer: true,
    explanation:
      "Community knowledge typically values balance with ecosystems rather than exploitation.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E3",
    type: "mcq",
    question: "Which practice helps in preserving water during droughts?",
    options: [
      "Rainwater harvesting",
      "Intensive irrigation",
      "Fertilizer runoff",
      "Deforestation",
    ],
    correctOptionIndex: 0,
    explanation:
      "Rainwater harvesting is widely used in local communities to store water sustainably.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E4",
    type: "mcq",
    question:
      "The Maasai community is known for which climate-adaptive practice?",
    options: [
      "Pastoralism",
      "Mining",
      "Intensive rice farming",
      "Urban planning",
    ],
    correctOptionIndex: 0,
    explanation:
      "Pastoralism is a traditional Maasai practice adapted to local ecosystems.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E5",
    type: "shortanswer",
    question:
      "What is the term for seeds passed down through generations in local communities?",
    acceptableAnswers: ["Heirloom seeds"],
    explanation:
      "Heirloom seeds are traditional varieties preserved and shared over generations.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E6",
    type: "truefalse",
    statement:
      "Sacred forests in many local traditions are important for biodiversity conservation.",
    answer: true,
    explanation:
      "Many communities protect sacred forests to preserve biodiversity and ecosystem services.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E7",
    type: "mcq",
    question:
      "Which community in the Amazon is known for protecting biodiversity?",
    options: ["Yanomami", "Inuit", "Maasai", "Sami"],
    correctOptionIndex: 0,
    explanation:
      "The Yanomami have traditional practices that maintain and protect the Amazon rainforest.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E8",
    type: "mcq",
    question:
      "Which farming technique involves planting different crops together to improve resilience?",
    options: ["Monoculture", "Polyculture", "Overcropping", "Deforestation"],
    correctOptionIndex: 1,
    explanation:
      "Polyculture improves soil health and reduces risk of pest outbreaks.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E9",
    type: "shortanswer",
    question:
      "What do many local traditions call the Earth, emphasizing respect and care?",
    acceptableAnswers: ["Mother Earth"],
    explanation:
      "Many cultures refer to the Earth as 'Mother Earth' to show respect for natural systems.",
    category: "Community Knowledge",
    difficulty: "easy",
  },
  {
    id: "CK-E10",
    type: "truefalse",
    statement:
      "Traditional fire management can help prevent destructive wildfires.",
    answer: true,
    explanation:
      "Controlled burns are a common technique used to prevent larger uncontrolled fires.",
    category: "Community Knowledge",
    difficulty: "easy",
  },

  // Medium (10)
  {
    id: "CK-M1",
    type: "mcq",
    question: "Which practice supports sustainable fishing?",
    options: [
      "Seasonal fishing restrictions",
      "Overfishing",
      "Bottom trawling",
      "Dynamite fishing",
    ],
    correctOptionIndex: 0,
    explanation:
      "Seasonal restrictions allow fish populations to recover sustainably.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M2",
    type: "shortanswer",
    question:
      "Which Arctic community relies on deep ecological knowledge to navigate ice conditions?",
    acceptableAnswers: ["Inuit"],
    explanation:
      "The Inuit use detailed knowledge of ice, snow, and weather patterns for safe travel.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M3",
    type: "truefalse",
    statement:
      "Traditional weather forecasting often uses animal behavior and plant cycles.",
    answer: true,
    explanation:
      "Many communities observe nature to predict seasonal changes accurately.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M4",
    type: "mcq",
    question: "Which Kenyan community is known for forest protection?",
    options: ["Ogiek", "Swahili", "Luo", "Kikuyu"],
    correctOptionIndex: 0,
    explanation:
      "The Ogiek have traditionally managed forests sustainably for generations.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M5",
    type: "mcq",
    question:
      "Which traditional practice helps restore soil fertility in fallow periods?",
    options: [
      "Agroforestry",
      "Deforestation",
      "Soil mining",
      "Intensive tilling",
    ],
    correctOptionIndex: 0,
    explanation:
      "Agroforestry uses trees and crops together to restore nutrients and prevent erosion.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M6",
    type: "truefalse",
    statement:
      "Women often play key roles in seed saving and food security in local communities.",
    answer: true,
    explanation:
      "Women are often custodians of traditional agricultural knowledge.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M7",
    type: "mcq",
    question:
      "Which Scandinavian community is known for sustainable reindeer herding?",
    options: ["Sami", "Inuit", "Yanomami", "Zulu"],
    correctOptionIndex: 0,
    explanation:
      "The Sami have traditionally managed reindeer herding sustainably.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M8",
    type: "mcq",
    question:
      "What traditional practice do Pacific Islanders use to manage marine resources?",
    options: ["Taboo areas", "Deep-sea mining", "Overfishing", "Drift nets"],
    correctOptionIndex: 0,
    explanation:
      "Taboo areas restrict access to allow fish populations to recover.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M9",
    type: "shortanswer",
    question:
      "Which concept describes the idea of making decisions with future generations in mind?",
    acceptableAnswers: ["Seven generations"],
    explanation:
      "The 'Seven generations' principle ensures that decisions consider long-term impacts.",
    category: "Community Knowledge",
    difficulty: "medium",
  },
  {
    id: "CK-M10",
    type: "truefalse",
    statement:
      "Ecological calendars can track climate changes more precisely than standard calendars in some regions.",
    answer: true,
    explanation:
      "Traditional ecological calendars are finely tuned to local environmental cues.",
    category: "Community Knowledge",
    difficulty: "medium",
  },

  // Hard (10)
  {
    id: "CK-H1",
    type: "mcq",
    question:
      "Which community’s water management system is recognized by UNESCO?",
    options: [
      "Subak in Bali",
      "Maasai in Kenya",
      "Inuit in Arctic",
      "Zulu in South Africa",
    ],
    correctOptionIndex: 0,
    explanation:
      "The Subak system in Bali is a community-based water management method.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H2",
    type: "mcq",
    question:
      "Which legal concept emphasizes the rights of rivers and landscapes?",
    options: [
      "Earth jurisprudence",
      "Anthropocentrism",
      "Industrial law",
      "Market sovereignty",
    ],
    correctOptionIndex: 0,
    explanation:
      "Earth jurisprudence recognizes the inherent rights of nature and ecosystems.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H3",
    type: "shortanswer",
    question:
      "Which philosophy inspired Ecuador’s constitution to include rights of nature?",
    acceptableAnswers: ["Buen Vivir"],
    explanation:
      "Buen Vivir is an Andean philosophy emphasizing harmony with nature.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H4",
    type: "truefalse",
    statement:
      "Some traditional fire management practices are now integrated into modern wildfire prevention policies.",
    answer: true,
    explanation:
      "Controlled burns and traditional knowledge help prevent catastrophic wildfires.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H5",
    type: "mcq",
    question:
      "Which North American community has led legal battles against pipeline projects?",
    options: ["Standing Rock Sioux", "Sami", "Yanomami", "Maasai"],
    correctOptionIndex: 0,
    explanation:
      "The Standing Rock Sioux have used legal advocacy to protect water and land rights.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H6",
    type: "mcq",
    question:
      "Which concept promotes the idea that humans are custodians, not owners, of land?",
    options: ["Stewardship", "Ownership", "Colonization", "Privatization"],
    correctOptionIndex: 0,
    explanation:
      "Stewardship emphasizes responsible care and long-term sustainability of land.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H7",
    type: "mcq",
    question:
      "Which philosophy emphasizes the interconnectedness of all beings in the Andes?",
    options: ["Pachamama", "Ubuntu", "Kaitiakitanga", "Buen Vivir"],
    correctOptionIndex: 0,
    explanation:
      "Pachamama reflects the Andean worldview of interconnectedness and respect for nature.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H8",
    type: "shortanswer",
    question:
      "Which Māori concept refers to guardianship and sustainable management of the environment?",
    acceptableAnswers: ["Kaitiakitanga"],
    explanation:
      "Kaitiakitanga is the Māori principle of caring for land and ecosystems.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H9",
    type: "truefalse",
    statement:
      "Community knowledge is increasingly recognized in IPCC climate reports.",
    answer: true,
    explanation:
      "Traditional knowledge is now being included in major scientific assessments.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
  {
    id: "CK-H10",
    type: "mcq",
    question:
      "Which practice supports climate resilience by combining trees and crops?",
    options: [
      "Agroforestry",
      "Hydroponics",
      "Industrial farming",
      "Clear-cutting",
    ],
    correctOptionIndex: 0,
    explanation:
      "Agroforestry increases biodiversity and improves soil and water retention.",
    category: "Community Knowledge",
    difficulty: "hard",
  },
];
