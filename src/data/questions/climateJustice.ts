// src/data/climateJusticeQuestions.ts
import type { Question } from "../../types/question";

export const climateJusticeQuestions: Question[] = [
  // Easy
  {
    id: "CJ-E1",
    type: "truefalse",
    statement: "Climate change impacts all people equally.",
    answer: false,
    explanation:
      "Climate change disproportionately affects vulnerable populations.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E2",
    type: "mcq",
    question: "Which communities are often most affected by climate change?",
    options: [
      "Wealthy urban neighborhoods",
      "Marginalized and low-income communities",
      "Tech companies",
      "Universities",
    ],
    correctOptionIndex: 1,
    explanation:
      "Marginalized and low-income communities are often hit hardest by climate impacts due to limited resources.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E3",
    type: "mcq",
    question: "What does 'climate justice' emphasize?",
    options: [
      "Equal rights and fairness in climate action",
      "Only reducing emissions",
      "Building more factories",
      "Ignoring vulnerable groups",
    ],
    correctOptionIndex: 0,
    explanation:
      "'Climate justice' emphasizes fairness and equity in climate action, prioritizing vulnerable communities.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E4",
    type: "truefalse",
    statement: "Local communities often protect large amounts of biodiversity.",
    answer: true,
    explanation:
      "Local communities manage lands that contain significant biodiversity.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E5",
    type: "mcq",
    question:
      "Which continent is disproportionately affected by climate change despite contributing the least emissions?",
    options: ["Europe", "North America", "Africa", "Australia"],
    correctOptionIndex: 2,
    explanation:
      "Africa suffers heavily from climate impacts while contributing minimally to global emissions.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E6",
    type: "truefalse",
    statement:
      "Women are often more vulnerable to climate impacts due to unequal access to resources.",
    answer: true,
    explanation:
      "Gender inequalities increase women's vulnerability to climate-related impacts.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E7",
    type: "mcq",
    question: "Which youth activist is known globally for Fridays for Future?",
    options: [
      "Wangari Maathai",
      "Greta Thunberg",
      "Vanessa Nakate",
      "Naomi Klein",
    ],
    correctOptionIndex: 1,
    explanation:
      "Greta Thunberg founded the Fridays for Future movement to mobilize youth climate action.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E8",
    type: "mcq",
    question: "Which group is particularly at risk from rising sea levels?",
    options: [
      "Mountain climbers",
      "Island nations",
      "Airline companies",
      "Astronauts",
    ],
    correctOptionIndex: 1,
    explanation:
      "Low-lying island nations face extreme risks from sea level rise.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E9",
    type: "truefalse",
    statement: "Climate justice links environmental issues with human rights.",
    answer: true,
    explanation:
      "Climate justice emphasizes that climate impacts intersect with human rights and equity.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },
  {
    id: "CJ-E10",
    type: "mcq",
    question:
      "Which Kenyan activist linked climate, peace, and women’s rights?",
    options: [
      "Wangari Maathai",
      "Greta Thunberg",
      "Naomi Klein",
      "Christiana Figueres",
    ],
    correctOptionIndex: 0,
    explanation:
      "Wangari Maathai was a pioneer in linking environmental protection, peace, and women’s rights.",
    category: "Climate Justice & Inequality",
    difficulty: "easy",
  },

  // Medium
  {
    id: "CJ-M1",
    type: "truefalse",
    statement:
      "People in the Global South contribute least to emissions but suffer the most.",
    answer: true,
    explanation:
      "Global South countries emit less but experience severe climate impacts.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M2",
    type: "mcq",
    question: "What is 'loss and damage' in climate negotiations?",
    options: [
      "Insurance payouts for destroyed homes",
      "Compensation for irreversible climate impacts",
      "New types of recycling",
      "Technical fixes",
    ],
    correctOptionIndex: 1,
    explanation:
      "Loss and damage refers to compensation for harm from climate impacts that cannot be avoided.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M3",
    type: "mcq",
    question:
      "Which African youth leader has amplified voices on climate justice?",
    options: [
      "Greta Thunberg",
      "Naomi Klein",
      "Vanessa Nakate",
      "Jane Goodall",
    ],
    correctOptionIndex: 2,
    explanation:
      "Vanessa Nakate is a prominent African youth climate activist.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M4",
    type: "truefalse",
    statement:
      "Queer and trans people may face unique risks in climate disasters.",
    answer: true,
    explanation:
      "Marginalized gender and sexual minorities face disproportionate climate vulnerabilities.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M5",
    type: "mcq",
    question: "What do climate refugees often lack?",
    options: [
      "Legal recognition and protection",
      "Tourist visas",
      "Cell phones",
      "Music and entertainment",
    ],
    correctOptionIndex: 0,
    explanation:
      "Climate refugees often lack legal protection in host countries.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M6",
    type: "mcq",
    question: "What principle says polluters should bear the costs of damage?",
    options: [
      "The Polluter Pays Principle",
      "The Charity Principle",
      "The Justice Principle",
      "The Equality Principle",
    ],
    correctOptionIndex: 0,
    explanation:
      "The 'Polluter Pays Principle' requires those causing pollution to cover the costs of environmental damage.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M7",
    type: "truefalse",
    statement: "Food insecurity is a climate justice issue.",
    answer: true,
    explanation:
      "Climate impacts on agriculture affect access to food, linking it to justice.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M8",
    type: "mcq",
    question: "Which global framework mentions 'climate justice' explicitly?",
    options: [
      "Paris Agreement",
      "Kyoto Protocol",
      "Montreal Protocol",
      "Rio Declaration",
    ],
    correctOptionIndex: 0,
    explanation:
      "The Paris Agreement explicitly refers to climate justice principles.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M9",
    type: "shortanswer",
    question:
      "Name one vulnerable group disproportionately impacted by climate change.",
    acceptableAnswers: [
      "Women",
      "Children",
      "Indigenous peoples",
      "LGBTQ+ people",
      "Elderly",
    ],
    explanation:
      "Certain groups are disproportionately affected due to social, economic, and political factors.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },
  {
    id: "CJ-M10",
    type: "truefalse",
    statement: "Climate justice connects economic systems to ecological harm.",
    answer: true,
    explanation:
      "Economic structures and policies can exacerbate environmental harm, linking climate and social justice.",
    category: "Climate Justice & Inequality",
    difficulty: "medium",
  },

  // Hard
  {
    id: "CJ-H1",
    type: "mcq",
    question:
      "Which Caribbean nation led calls for a loss and damage fund at COP27?",
    options: ["Jamaica", "Barbados", "Cuba", "Haiti"],
    correctOptionIndex: 1,
    explanation:
      "Barbados advocated strongly for a loss and damage fund at COP27.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H2",
    type: "truefalse",
    statement:
      "Climate colonialism refers to the exploitation of vulnerable regions for climate solutions.",
    answer: true,
    explanation:
      "Some solutions exploit less-resourced regions rather than addressing root causes.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H3",
    type: "mcq",
    question:
      "Which Indigenous leader in North America has linked pipelines to violations of Indigenous rights?",
    options: [
      "Winona LaDuke",
      "Jane Goodall",
      "Naomi Klein",
      "Wangari Maathai",
    ],
    correctOptionIndex: 0,
    explanation:
      "Winona LaDuke is a well-known Indigenous environmental leader advocating for Indigenous rights.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H4",
    type: "shortanswer",
    question: "Name one feminist approach to climate justice.",
    acceptableAnswers: ["Ecofeminism", "Intersectional feminism"],
    explanation:
      "Feminist approaches like ecofeminism highlight gendered impacts of climate change.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H5",
    type: "mcq",
    question: "What does the term 'just transition' mean?",
    options: [
      "A move to clean energy that is fair to workers and communities",
      "Only switching to electric cars",
      "Moving companies overseas",
      "Recycling everything",
    ],
    correctOptionIndex: 0,
    explanation:
      "'Just transition' ensures that moving to clean energy is equitable and protects workers and communities.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H6",
    type: "truefalse",
    statement: "Debt justice and climate justice are linked.",
    answer: true,
    explanation:
      "Financial systems and debt burdens are connected to climate vulnerability and equity.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H7",
    type: "mcq",
    question: "Which global financial demand is linked to climate reparations?",
    options: [
      "Debt cancellation",
      "More loans with high interest",
      "Free trade zones",
      "Export subsidies",
    ],
    correctOptionIndex: 0,
    explanation:
      "Debt cancellation is advocated as part of climate reparations for vulnerable nations.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H8",
    type: "shortanswer",
    question:
      "Name one Global South youth climate leader besides Vanessa Nakate.",
    acceptableAnswers: ["Dominique Palmer", "Disha Ravi", "Mitzi Jonelle Tan"],
    explanation:
      "These youth leaders are active in climate justice advocacy in the Global South.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H9",
    type: "mcq",
    question:
      "Which group coined the slogan 'system change, not climate change'?",
    options: [
      "Friends of the Earth",
      "350.org",
      "Climate Justice Now!",
      "IPCC",
    ],
    correctOptionIndex: 2,
    explanation:
      "The slogan was popularized by the Climate Justice Now! network.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
  {
    id: "CJ-H10",
    type: "truefalse",
    statement:
      "Climate justice requires addressing racism, sexism, and inequality.",
    answer: true,
    explanation:
      "Effective climate justice must consider social inequalities and systemic discrimination.",
    category: "Climate Justice & Inequality",
    difficulty: "hard",
  },
];
