// src/data/climateSolutionsQuestions.ts
import type { Question } from "../../types/question";

export const climateSolutionsQuestions: Question[] = [
  // EASY
  {
    id: "CSOL-E1",
    type: "mcq",
    question: "Which of these is a renewable energy source?",
    options: ["Coal", "Oil", "Solar", "Natural Gas"],
    correctOptionIndex: 2,
    explanation: "Solar is a renewable energy source, unlike fossil fuels.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E2",
    type: "truefalse",
    statement: "Planting trees helps absorb carbon dioxide.",
    answer: true,
    explanation:
      "Trees absorb CO₂ through photosynthesis, reducing greenhouse gases.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E3",
    type: "mcq",
    question: "Which of the following reduces your carbon footprint?",
    options: ["Cycling", "Driving solo", "Flying often", "Leaving lights on"],
    correctOptionIndex: 0,
    explanation:
      "Cycling produces zero emissions and reduces personal carbon footprint.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E4",
    type: "truefalse",
    statement: "Wind power is a type of clean energy.",
    answer: true,
    explanation:
      "Wind power generates electricity without emitting greenhouse gases.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E5",
    type: "mcq",
    question: "Which country leads in installed solar energy capacity?",
    options: ["Kenya", "China", "Brazil", "Canada"],
    correctOptionIndex: 1,
    explanation: "China leads the world in installed solar power capacity.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E6",
    type: "truefalse",
    statement: "Eating more plant-based meals can lower emissions.",
    answer: true,
    explanation:
      "Plant-based diets reduce emissions compared to meat-heavy diets.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E7",
    type: "mcq",
    question: "Which practice helps save energy at home?",
    options: [
      "Unplugging devices",
      "Running water endlessly",
      "Leaving lights on",
      "Burning coal indoors",
    ],
    correctOptionIndex: 0,
    explanation:
      "Unplugging unused devices prevents unnecessary energy consumption.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E8",
    type: "truefalse",
    statement: "Recycling materials like aluminum saves energy.",
    answer: true,
    explanation:
      "Recycling uses less energy than producing new materials from raw resources.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E9",
    type: "mcq",
    question: "Which mode of travel is most climate-friendly?",
    options: ["Airplane", "Car", "Train", "Motorbike"],
    correctOptionIndex: 2,
    explanation:
      "Trains are generally more energy-efficient and produce fewer emissions.",
    category: "Climate Solutions",
    difficulty: "easy",
  },
  {
    id: "CSOL-E10",
    type: "truefalse",
    statement: "Energy efficiency is part of climate solutions.",
    answer: true,
    explanation:
      "Using energy more efficiently reduces emissions and energy demand.",
    category: "Climate Solutions",
    difficulty: "easy",
  },

  // MEDIUM
  {
    id: "CSOL-M1",
    type: "mcq",
    question: "What does 'net zero' mean?",
    options: [
      "Producing zero electricity",
      "Balancing emissions with removals",
      "Stopping all economic activity",
      "Using only coal",
    ],
    correctOptionIndex: 1,
    explanation:
      "Net zero means emissions are balanced by removals like carbon capture or reforestation.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M2",
    type: "truefalse",
    statement: "Carbon capture and storage is a potential solution.",
    answer: true,
    explanation:
      "Carbon capture can remove CO₂ from the atmosphere or prevent its release.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M3",
    type: "mcq",
    question: "Which sector contributes the most to deforestation?",
    options: ["Construction", "Agriculture", "Mining", "Tourism"],
    correctOptionIndex: 1,
    explanation:
      "Agriculture, particularly livestock and soy production, drives deforestation.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M4",
    type: "shortanswer",
    question: "Name one type of renewable energy besides solar.",
    acceptableAnswers: ["Wind", "Hydro", "Geothermal", "Biomass"],
    explanation:
      "Other renewable energies include wind, hydro, geothermal, and biomass.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M5",
    type: "truefalse",
    statement:
      "Electric cars produce no emissions at all, including in production.",
    answer: false,
    explanation:
      "Electric cars have emissions during production, though less over their lifetime.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M6",
    type: "mcq",
    question: "Which global city has pledged to be carbon neutral by 2050?",
    options: ["Paris", "Tokyo", "Lagos", "Dubai"],
    correctOptionIndex: 0,
    explanation: "Paris has committed to carbon neutrality by 2050.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M7",
    type: "truefalse",
    statement: "Community-led renewable projects can improve equity.",
    answer: true,
    explanation:
      "Community projects help distribute benefits and access fairly.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M8",
    type: "mcq",
    question: "Which farming method supports climate action?",
    options: ["Agroecology", "Monoculture", "Slash-and-burn", "Overgrazing"],
    correctOptionIndex: 0,
    explanation:
      "Agroecology integrates sustainable practices that reduce emissions and preserve soil.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M9",
    type: "truefalse",
    statement: "Buildings account for a large share of global emissions.",
    answer: true,
    explanation:
      "Buildings consume energy for heating, cooling, and electricity, contributing to emissions.",
    category: "Climate Solutions",
    difficulty: "medium",
  },
  {
    id: "CSOL-M10",
    type: "mcq",
    question:
      "Which international agreement encourages countries to reduce emissions?",
    options: [
      "Paris Agreement",
      "Kyoto Protocol",
      "Montreal Protocol",
      "Doha Round",
    ],
    correctOptionIndex: 0,
    explanation:
      "The Paris Agreement sets targets for countries to limit global warming.",
    category: "Climate Solutions",
    difficulty: "medium",
  },

  // HARD
  {
    id: "CSOL-H1",
    type: "mcq",
    question: "What is a 'just transition'?",
    options: [
      "Moving workers and communities fairly into green jobs",
      "A sudden switch to electric cars",
      "Closing all industries overnight",
      "Shifting all farming to cities",
    ],
    correctOptionIndex: 0,
    explanation:
      "A just transition ensures workers and communities benefit fairly from green jobs.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H2",
    type: "truefalse",
    statement:
      "Hydrogen energy can be green or polluting, depending on how it’s produced.",
    answer: true,
    explanation:
      "Green hydrogen uses renewable energy, while gray hydrogen emits CO₂.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H3",
    type: "mcq",
    question: "Which country has achieved near 100% renewable electricity?",
    options: ["Iceland", "USA", "India", "South Africa"],
    correctOptionIndex: 0,
    explanation:
      "Iceland generates nearly all electricity from renewable sources like geothermal and hydro.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H4",
    type: "shortanswer",
    question: "Name one negative emission technology.",
    acceptableAnswers: [
      "Direct Air Capture",
      "Bioenergy with Carbon Capture and Storage",
    ],
    explanation:
      "Technologies like DAC and BECCS remove CO₂ from the atmosphere.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H5",
    type: "truefalse",
    statement: "Geoengineering is a universally agreed upon solution.",
    answer: false,
    explanation:
      "Geoengineering is controversial and not universally accepted.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H6",
    type: "mcq",
    question: "What does 'energy justice' focus on?",
    options: [
      "Fair access to affordable, clean energy",
      "Only building more power plants",
      "Shutting down all coal mines immediately",
      "Investing in oil and gas",
    ],
    correctOptionIndex: 0,
    explanation:
      "Energy justice ensures equitable access to sustainable energy.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H7",
    type: "truefalse",
    statement: "Cities account for over 70% of CO₂ emissions.",
    answer: true,
    explanation:
      "Urban areas are major energy consumers, contributing to most global emissions.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H8",
    type: "mcq",
    question: "What is the role of climate finance?",
    options: [
      "Funding adaptation and mitigation in vulnerable countries",
      "Paying oil companies",
      "Buying luxury goods",
      "Expanding highways",
    ],
    correctOptionIndex: 0,
    explanation:
      "Climate finance supports mitigation and adaptation in countries vulnerable to climate change.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H9",
    type: "shortanswer",
    question:
      "Name one sector besides energy where deep decarbonization is needed.",
    acceptableAnswers: ["Transport", "Industry", "Agriculture", "Buildings"],
    explanation:
      "Deep decarbonization is needed in transport, industry, agriculture, and buildings.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
  {
    id: "CSOL-H10",
    type: "mcq",
    question:
      "Which movement emphasizes local, community-based climate solutions?",
    options: ["Transition Towns", "World Bank", "IMF", "FIFA"],
    correctOptionIndex: 0,
    explanation:
      "Transition Towns focuses on grassroots, community-led climate action.",
    category: "Climate Solutions",
    difficulty: "hard",
  },
];
