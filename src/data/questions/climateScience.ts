// src/data/climateScienceQuestions.ts
import type { Question } from "../../types/question";

export const climateScienceQuestions: Question[] = [
  // EASY
  {
    id: "CS-E1",
    type: "mcq",
    question: "Which gas is the primary contributor to global warming?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctOptionIndex: 1,
    explanation:
      "Carbon dioxide is the main greenhouse gas responsible for global warming.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E2",
    type: "truefalse",
    statement: "The burning of fossil fuels releases carbon dioxide.",
    answer: true,
    explanation:
      "Burning fossil fuels releases CO₂, contributing to global warming.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E3",
    type: "mcq",
    question: "Which of these is NOT a greenhouse gas?",
    options: ["Carbon Dioxide", "Methane", "Nitrogen", "Water Vapor"],
    correctOptionIndex: 2,
    explanation:
      "Nitrogen is not a greenhouse gas; it makes up most of the atmosphere but does not trap heat.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E4",
    type: "mcq",
    question: "What does CO₂ stand for?",
    options: [
      "Carbon Double",
      "Carbon Dioxide",
      "Carbon Oxide",
      "Carbon Hydroxide",
    ],
    correctOptionIndex: 1,
    explanation: "CO₂ stands for Carbon Dioxide, a key greenhouse gas.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E5",
    type: "truefalse",
    statement: "Climate change and weather are the same thing.",
    answer: false,
    explanation:
      "Weather is short-term atmospheric conditions; climate is the long-term pattern.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E6",
    type: "mcq",
    question: "Which human activity contributes the most to climate change?",
    options: [
      "Planting trees",
      "Driving cars",
      "Recycling",
      "Listening to music",
    ],
    correctOptionIndex: 1,
    explanation:
      "Transportation and fossil fuel combustion are major contributors to climate change.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E7",
    type: "truefalse",
    statement: "Glaciers are melting faster due to global warming.",
    answer: true,
    explanation:
      "Rising global temperatures are causing glaciers to melt at accelerated rates.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E8",
    type: "mcq",
    question: "Which layer of Earth’s atmosphere traps heat?",
    options: ["Stratosphere", "Troposphere", "Exosphere", "Ozone Layer"],
    correctOptionIndex: 1,
    explanation:
      "The troposphere contains greenhouse gases that trap heat near Earth's surface.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E9",
    type: "mcq",
    question: "Which of these is renewable energy?",
    options: ["Coal", "Oil", "Solar", "Natural Gas"],
    correctOptionIndex: 2,
    explanation:
      "Solar energy is renewable and does not emit greenhouse gases when used.",
    category: "Climate Science",
    difficulty: "easy",
  },
  {
    id: "CS-E10",
    type: "truefalse",
    statement:
      "The Earth has always had a climate, but humans are changing it faster.",
    answer: true,
    explanation:
      "Human activity is accelerating changes to Earth's climate beyond natural variation.",
    category: "Climate Science",
    difficulty: "easy",
  },

  // MEDIUM
  {
    id: "CS-M1",
    type: "mcq",
    question:
      "Which gas has the highest global warming potential per molecule?",
    options: ["Carbon Dioxide", "Methane", "Nitrous Oxide", "Ozone"],
    correctOptionIndex: 2,
    explanation:
      "Nitrous oxide traps more heat per molecule than CO₂ or methane.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M2",
    type: "truefalse",
    statement: "Methane is more powerful than carbon dioxide at trapping heat.",
    answer: true,
    explanation:
      "Methane has a higher heat-trapping potential than CO₂ over a 100-year period.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M3",
    type: "mcq",
    question:
      "What percentage of scientists agree that climate change is human-caused?",
    options: ["50%", "75%", "97%", "100%"],
    correctOptionIndex: 2,
    explanation:
      "Over 97% of climate scientists agree that humans are driving climate change.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M4",
    type: "mcq",
    question: "What is the main source of methane emissions?",
    options: [
      "Transportation",
      "Agriculture (livestock)",
      "Deforestation",
      "Industry",
    ],
    correctOptionIndex: 1,
    explanation:
      "Livestock produce methane through digestion and manure management.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M5",
    type: "truefalse",
    statement: "The ozone hole is the same issue as climate change.",
    answer: false,
    explanation:
      "Ozone depletion and climate change are separate environmental issues.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M6",
    type: "mcq",
    question: "Which ocean absorbs the most heat from global warming?",
    options: ["Atlantic", "Pacific", "Indian", "Southern"],
    correctOptionIndex: 1,
    explanation:
      "The Pacific Ocean absorbs more heat than other oceans due to its size and currents.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M7",
    type: "shortanswer",
    question: "Name one greenhouse gas besides carbon dioxide.",
    acceptableAnswers: ["Methane", "Nitrous Oxide", "Water Vapor", "Ozone"],
    explanation:
      "Other greenhouse gases include methane, nitrous oxide, water vapor, and ozone.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M8",
    type: "mcq",
    question: "What do scientists use to study past climates?",
    options: ["Tree rings", "Soil", "Bones", "Stars"],
    correctOptionIndex: 0,
    explanation:
      "Tree rings provide historical climate data based on growth patterns.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M9",
    type: "truefalse",
    statement: "Melting ice caps contribute to sea level rise.",
    answer: true,
    explanation: "Ice melting adds water to oceans, raising sea levels.",
    category: "Climate Science",
    difficulty: "medium",
  },
  {
    id: "CS-M10",
    type: "mcq",
    question:
      "Which sector is the largest contributor to global CO₂ emissions?",
    options: [
      "Transportation",
      "Electricity and Heat Production",
      "Agriculture",
      "Waste",
    ],
    correctOptionIndex: 1,
    explanation:
      "Electricity and heat production is the largest source of CO₂ emissions globally.",
    category: "Climate Science",
    difficulty: "medium",
  },

  // HARD
  {
    id: "CS-H1",
    type: "shortanswer",
    question: "Name one major international agreement to reduce emissions.",
    acceptableAnswers: [
      "Paris Agreement",
      "Kyoto Protocol",
      "Montreal Protocol",
    ],
    explanation:
      "International agreements like the Paris Agreement aim to limit greenhouse gas emissions.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H2",
    type: "mcq",
    question:
      "What is the approximate pre-industrial level of CO₂ in the atmosphere?",
    options: ["180 ppm", "280 ppm", "350 ppm", "400 ppm"],
    correctOptionIndex: 1,
    explanation: "Pre-industrial CO₂ levels were around 280 ppm.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H3",
    type: "mcq",
    question: "What is the current CO₂ concentration in the atmosphere (2025)?",
    options: ["300 ppm", "350 ppm", "420+ ppm", "500 ppm"],
    correctOptionIndex: 2,
    explanation: "CO₂ concentrations in 2025 are above 420 ppm.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H4",
    type: "truefalse",
    statement: "Climate feedback loops can accelerate warming.",
    answer: true,
    explanation:
      "Feedback loops like ice-albedo effect can accelerate warming.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H5",
    type: "mcq",
    question: "Which gas stays longest in the atmosphere?",
    options: ["Carbon Dioxide", "Methane", "Nitrous Oxide", "Ozone"],
    correctOptionIndex: 0,
    explanation: "CO₂ can remain in the atmosphere for hundreds of years.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H6",
    type: "shortanswer",
    question: "Name one natural carbon sink.",
    acceptableAnswers: ["Oceans", "Forests", "Soil"],
    explanation:
      "Natural carbon sinks absorb CO₂ from the atmosphere, such as forests, soils, and oceans.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H7",
    type: "mcq",
    question:
      "Which climate scientist first warned about the greenhouse effect in the 19th century?",
    options: [
      "Svante Arrhenius",
      "Charles Keeling",
      "James Hansen",
      "Rachel Carson",
    ],
    correctOptionIndex: 0,
    explanation:
      "Svante Arrhenius was the first to calculate the warming effect of CO₂ in the 19th century.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H8",
    type: "truefalse",
    statement: "Permafrost thawing releases methane.",
    answer: true,
    explanation:
      "Thawing permafrost releases trapped methane, a potent greenhouse gas.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H9",
    type: "mcq",
    question: "Which report is the main scientific source on climate change?",
    options: [
      "IPCC Assessment Report",
      "UNESCO Report",
      "World Bank Report",
      "WHO Report",
    ],
    correctOptionIndex: 0,
    explanation:
      "The IPCC Assessment Report is the primary source of climate Science knowledge.",
    category: "Climate Science",
    difficulty: "hard",
  },
  {
    id: "CS-H10",
    type: "shortanswer",
    question: "Name one tipping point in the climate system.",
    acceptableAnswers: [
      "Greenland ice sheet melt",
      "Amazon rainforest dieback",
      "West Antarctic ice sheet collapse",
      "Permafrost thaw",
    ],
    explanation:
      "Tipping points are critical thresholds that can trigger large, irreversible changes in the climate system.",
    category: "Climate Science",
    difficulty: "hard",
  },
];
