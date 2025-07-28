"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronDown, BookOpen, CheckCircle, Clock, Play, Trophy, Star, Timer } from "lucide-react"

interface SubjectTreeProps {
  grade: string
  onStartPomodoro?: (topic: string, subtopic: string) => void
  onAddToFavorites?: (topic: string, subtopic: string) => void
}

// Complete CBSE syllabus data structure
const cbseSyllabus = {
  "10": {
    Mathematics: {
      color: "from-blue-500 to-cyan-500",
      progress: 75,
      chapters: {
        "Unit I - Number Systems": {
          progress: 80,
          topics: {
            "Real Numbers": {
              progress: 100,
              subtopics: [
                "Euclid's Division Lemma",
                "Fundamental Theorem of Arithmetic",
                "Decimal Representation of Irrational Numbers",
                "Revisiting Rational Numbers",
              ],
              completed: [true, true, true, true],
            },
          },
        },
        "Unit II - Algebra": {
          progress: 70,
          topics: {
            Polynomials: {
              progress: 90,
              subtopics: ["Definition, Zeros", "Relationship between Zeros and Coefficients", "Polynomial Equations"],
              completed: [true, true, true],
            },
            "Pair of Linear Equations in Two Variables": {
              progress: 80,
              subtopics: [
                "Substitution Method",
                "Elimination Method",
                "Cross-Multiplication",
                "Graphical Method",
                "Consistency and Number of Solutions",
              ],
              completed: [true, true, true, true, false],
            },
            "Quadratic Equations": {
              progress: 60,
              subtopics: ["Standard Form", "Factorisation", "Quadratic Formula", "Nature of Roots (Discriminant)"],
              completed: [true, true, false, false],
            },
            "Arithmetic Progressions (AP)": {
              progress: 50,
              subtopics: ["Nth term", "Sum of first N terms"],
              completed: [true, false],
            },
          },
        },
        "Unit III - Coordinate Geometry": {
          progress: 65,
          topics: {
            "Coordinate Geometry": {
              progress: 65,
              subtopics: [
                "Cartesian Plane",
                "Distance Formula",
                "Section Formula (Internal & External)",
                "Area of Triangle Formed by Three Points",
              ],
              completed: [true, true, false, false],
            },
          },
        },
        "Unit IV - Geometry": {
          progress: 75,
          topics: {
            Triangles: {
              progress: 85,
              subtopics: ["Congruence (ASA, SAS, SSS)", "Similarity (AA, SAS, SSS)"],
              completed: [true, true],
            },
            Circles: {
              progress: 70,
              subtopics: ["Tangents and Related Properties"],
              completed: [true],
            },
            Constructions: {
              progress: 60,
              subtopics: ["Angle Bisector", "Triangle Construction (SSS/ASA)"],
              completed: [true, false],
            },
          },
        },
        "Unit V - Trigonometry": {
          progress: 55,
          topics: {
            Trigonometry: {
              progress: 55,
              subtopics: [
                "Trigonometric Ratios & Identities (sin²θ + cos²θ = 1, etc.)",
                "Heights & Distances (Angle of Elevation/Depression)",
              ],
              completed: [true, false],
            },
          },
        },
        "Unit VI - Mensuration": {
          progress: 40,
          topics: {
            Mensuration: {
              progress: 40,
              subtopics: [
                "Area of 2D Figures (Triangle, Quadrilaterals, Circle)",
                "Surface Area & Volume of 3D Solids (Cube, Cuboid, Cylinder, Cone, Sphere)",
              ],
              completed: [false, false],
            },
          },
        },
        "Unit VII - Statistics & Probability": {
          progress: 30,
          topics: {
            Statistics: {
              progress: 40,
              subtopics: ["Mean, Median, Mode (Ungrouped Data)"],
              completed: [false],
            },
            Probability: {
              progress: 20,
              subtopics: ["Classical Definition", "Simple Problems"],
              completed: [false, false],
            },
          },
        },
      },
    },
    Science: {
      color: "from-green-500 to-emerald-500",
      progress: 60,
      chapters: {
        "Unit I - Chemical Substances: Nature & Behaviour": {
          progress: 70,
          topics: {
            "Chemical Reactions & Equations": {
              progress: 80,
              subtopics: [
                "Write & Balance Equations",
                "Types: Combination, Decomposition, Displacement, Double Displacement, Redox",
              ],
              completed: [true, true],
            },
            "Acids, Bases & Salts": {
              progress: 75,
              subtopics: ["Definitions, Properties", "pH, Neutralisation"],
              completed: [true, true],
            },
            "Metals & Non-metals": {
              progress: 60,
              subtopics: ["Physical/Chemical Properties", "Reactivity Series", "Ionic Compounds", "Corrosion"],
              completed: [true, true, false, false],
            },
            "Carbon & Its Compounds": {
              progress: 50,
              subtopics: ["Covalent Bonding", "Tetravalency, Catenation", "Saturated/Unsaturated", "Functional Groups"],
              completed: [true, false, false, false],
            },
            "Periodic Classification of Elements": {
              progress: 65,
              subtopics: ["Atomic Properties", "Trends"],
              completed: [true, false],
            },
          },
        },
        "Unit II - World of Living": {
          progress: 55,
          topics: {
            "Life Processes": {
              progress: 70,
              subtopics: ["Nutrition", "Respiration", "Transport", "Excretion"],
              completed: [true, true, false, false],
            },
            "Control & Coordination": {
              progress: 60,
              subtopics: ["Plant Movements", "Hormones", "Nervous System", "Reflexes"],
              completed: [true, true, false, false],
            },
            "How Do Organisms Reproduce?": {
              progress: 40,
              subtopics: ["Asexual Reproduction", "Sexual Reproduction", "Reproductive Health"],
              completed: [true, false, false],
            },
            "Heredity & Evolution": {
              progress: 30,
              subtopics: ["Mendel's Laws", "Sex Determination", "Evolution"],
              completed: [false, false, false],
            },
          },
        },
        "Unit III - Natural Phenomena (Light)": {
          progress: 45,
          topics: {
            "Reflection & Refraction": {
              progress: 50,
              subtopics: ["Laws", "Curved Mirrors", "Lenses"],
              completed: [true, false, false],
            },
            "Human Eye & Colourful World": {
              progress: 40,
              subtopics: ["Defects", "Corrections", "Dispersion", "Atmospheric Refraction"],
              completed: [true, false, false, false],
            },
          },
        },
        "Unit IV - Effects of Current": {
          progress: 35,
          topics: {
            Electricity: {
              progress: 40,
              subtopics: [
                "Current, Voltage, Resistance (Ohm's Law)",
                "Series/Parallel Circuits",
                "Heating Effect, Power",
              ],
              completed: [true, false, false],
            },
            "Magnetic Effects": {
              progress: 30,
              subtopics: ["Magnetic Field", "Fleming's Rules", "Electromagnetic Induction", "Domestic Circuits"],
              completed: [false, false, false, false],
            },
          },
        },
        "Unit V - Natural Resources / Our Environment": {
          progress: 25,
          topics: {
            "Our Environment": {
              progress: 25,
              subtopics: ["Ecosystems", "Biodiversity", "Pollution Types", "Ozone Depletion", "Waste Management"],
              completed: [false, false, false, false, false],
            },
          },
        },
      },
    },
    "Social Science": {
      color: "from-purple-500 to-violet-500",
      progress: 65,
      chapters: {
        "History - India & Contemporary World-II": {
          progress: 70,
          topics: {
            "Rise of Nationalism in Europe": {
              progress: 80,
              subtopics: ["French Revolution", "Revolutions 1830/1848", "Unification of Germany/Italy"],
              completed: [true, true, false],
            },
            "Nationalism in India": {
              progress: 75,
              subtopics: ["WWI", "Khilafat", "Civil Disobedience", "Sense of Belonging"],
              completed: [true, true, true, false],
            },
            "Making of Global World": {
              progress: 60,
              subtopics: ["Trade", "Colonialism", "Inter-war Economy", "Reconstruction"],
              completed: [true, true, false, false],
            },
            "Age of Industrialisation": {
              progress: 65,
              subtopics: ["Pre-industrial", "Factory System", "Labour Conditions"],
              completed: [true, false, false],
            },
            "Print Culture": {
              progress: 70,
              subtopics: ["Printing Press", "Reading Mania", "Censorship"],
              completed: [true, true, false],
            },
          },
        },
        "Geography - Contemporary India-II": {
          progress: 60,
          topics: {
            "Resources & Development": {
              progress: 70,
              subtopics: ["Land Use", "Conservation", "Soil Erosion"],
              completed: [true, true, false],
            },
            "Forest & Wildlife Resources": {
              progress: 65,
              subtopics: ["Types", "Distribution", "Conservation"],
              completed: [true, true, false],
            },
            "Water Resources": {
              progress: 50,
              subtopics: ["Scarcity", "Harvesting", "Projects"],
              completed: [true, false, false],
            },
            Agriculture: {
              progress: 55,
              subtopics: ["Types", "Cropping Patterns", "Food Security", "Reforms"],
              completed: [true, true, false, false],
            },
            "Minerals & Energy": {
              progress: 45,
              subtopics: ["Types", "Conservation", "Energy Sources"],
              completed: [true, false, false],
            },
            "Manufacturing Industries": {
              progress: 40,
              subtopics: ["Location", "Pollution Control"],
              completed: [false, false],
            },
            "Lifelines of Economy": {
              progress: 35,
              subtopics: ["Transport", "Communication", "Trade", "Tourism"],
              completed: [false, false, false, false],
            },
          },
        },
        "Political Science - Democratic Politics-II": {
          progress: 65,
          topics: {
            "Power Sharing": {
              progress: 80,
              subtopics: ["Concepts", "Belgium/Sri Lanka Cases"],
              completed: [true, true],
            },
            Federalism: {
              progress: 70,
              subtopics: ["Centre-State Relations", "Decentralisation"],
              completed: [true, false],
            },
            "Gender, Religion & Caste": {
              progress: 60,
              subtopics: ["Political Divisions", "Representation", "Communalism"],
              completed: [true, false, false],
            },
            "Political Parties": {
              progress: 55,
              subtopics: ["Functions", "Challenges", "Reforms"],
              completed: [true, false, false],
            },
            "Outcomes of Democracy": {
              progress: 50,
              subtopics: ["Accountability", "Development", "Rights"],
              completed: [true, false, false],
            },
          },
        },
        "Economics - Understanding Economic Development": {
          progress: 55,
          topics: {
            Development: {
              progress: 70,
              subtopics: ["Goals", "Human Development"],
              completed: [true, false],
            },
            "Sectors of Economy": {
              progress: 60,
              subtopics: ["Primary, Secondary, Tertiary", "Organised vs Unorganised"],
              completed: [true, false],
            },
            "Money & Credit": {
              progress: 45,
              subtopics: ["Banking", "Loans", "SHGs"],
              completed: [true, false, false],
            },
            "Globalisation & Indian Economy": {
              progress: 40,
              subtopics: ["WTO", "Fair Globalisation"],
              completed: [false, false],
            },
            "Consumer Rights": {
              progress: 35,
              subtopics: ["Information", "Choice", "Redressal"],
              completed: [false, false, false],
            },
          },
        },
      },
    },
    English: {
      color: "from-pink-500 to-rose-500",
      progress: 80,
      chapters: {
        "Section A - Reading Skills": {
          progress: 85,
          topics: {
            "Unseen Comprehension": {
              progress: 85,
              subtopics: ["Discursive Passages", "Case-based Passages"],
              completed: [true, true],
            },
          },
        },
        "Section B - Writing & Grammar": {
          progress: 75,
          topics: {
            "Writing Formats": {
              progress: 80,
              subtopics: ["Formal Letters", "Analytical Paragraphs", "Speech", "Article", "Report"],
              completed: [true, true, true, false, false],
            },
            "Grammar Areas": {
              progress: 70,
              subtopics: ["Determiners", "Tenses", "Modals", "Reported Speech", "Editing", "Gap-Filling"],
              completed: [true, true, true, false, false, false],
            },
          },
        },
        "Section C - Literature": {
          progress: 80,
          topics: {
            "Prose & Poetry": {
              progress: 85,
              subtopics: ["Extract-based Questions", "Short Answer Questions", "Theme-based Long Answers"],
              completed: [true, true, false],
            },
            Drama: {
              progress: 75,
              subtopics: ["Select acts/excerpts as per syllabus"],
              completed: [true],
            },
          },
        },
      },
    },
  },
  "12": {
    streams: {
      Science: {
        "Mathematics (Science)": {
          color: "from-blue-500 to-cyan-500",
          progress: 45,
          chapters: {
            "Unit I - Relations & Functions": {
              progress: 60,
              topics: {
                Relations: {
                  progress: 70,
                  subtopics: ["Types", "Domain-range", "Representation"],
                  completed: [true, true, false],
                },
                Functions: {
                  progress: 50,
                  subtopics: ["Types (one-one, onto)", "Composite", "Inverse"],
                  completed: [true, false, false],
                },
              },
            },
            "Unit II - Algebra": {
              progress: 40,
              topics: {
                Matrices: {
                  progress: 45,
                  subtopics: ["Operations", "Types", "Determinant", "Inverse"],
                  completed: [true, false, false, false],
                },
                Determinants: {
                  progress: 35,
                  subtopics: ["Properties", "Applications (Cramer's rule)"],
                  completed: [false, false],
                },
              },
            },
            "Unit III - Calculus": {
              progress: 30,
              topics: {
                "Continuity & Differentiability": {
                  progress: 40,
                  subtopics: ["Continuity", "Differentiability"],
                  completed: [true, false],
                },
                Applications: {
                  progress: 25,
                  subtopics: ["Tangents", "Increasing/decreasing functions", "Max-Min"],
                  completed: [false, false, false],
                },
                Integrals: {
                  progress: 20,
                  subtopics: ["Definite", "Substitution", "By parts"],
                  completed: [false, false, false],
                },
                "Application: Area under curves": {
                  progress: 15,
                  subtopics: ["Area under curves"],
                  completed: [false],
                },
              },
            },
            "Unit IV - Vectors & 3D Geometry": {
              progress: 25,
              topics: {
                Vectors: {
                  progress: 30,
                  subtopics: ["Operations", "Scalar-triple product"],
                  completed: [false, false],
                },
                "3D Geometry": {
                  progress: 20,
                  subtopics: ["Direction ratios", "Equations of lines & planes"],
                  completed: [false, false],
                },
              },
            },
            "Unit V - Linear Programming": {
              progress: 15,
              topics: {
                "Linear Programming": {
                  progress: 15,
                  subtopics: ["Formulation", "Feasible region", "Graphical method"],
                  completed: [false, false, false],
                },
              },
            },
            "Unit VI - Probability": {
              progress: 20,
              topics: {
                Probability: {
                  progress: 20,
                  subtopics: ["Conditional probability", "Bayes' theorem", "Distributions: Binomial"],
                  completed: [false, false, false],
                },
              },
            },
          },
        },
        "Physics (Science)": {
          color: "from-green-500 to-emerald-500",
          progress: 35,
          chapters: {
            Electrostatics: {
              progress: 50,
              topics: {
                "Electric Charges & Fields": {
                  progress: 50,
                  subtopics: ["Electric charges", "Coulomb's law", "Field lines", "Potential", "Capacitance"],
                  completed: [true, true, false, false, false],
                },
              },
            },
            "Current Electricity": {
              progress: 40,
              topics: {
                "Current & Resistance": {
                  progress: 40,
                  subtopics: ["Ohm's law", "Resistances", "Kirchhoff's laws", "Heating effects"],
                  completed: [true, false, false, false],
                },
              },
            },
            "Magnetism & Electromagnetic Induction": {
              progress: 30,
              topics: {
                Magnetism: {
                  progress: 30,
                  subtopics: ["Magnetic fields", "Force", "Electromagnetic induction", "AC"],
                  completed: [false, false, false, false],
                },
              },
            },
            Optics: {
              progress: 25,
              topics: {
                "Ray & Wave Optics": {
                  progress: 25,
                  subtopics: ["Ray optics", "Wave optics", "Optical instruments"],
                  completed: [false, false, false],
                },
              },
            },
            "Modern Physics": {
              progress: 20,
              topics: {
                "Dual Nature & Atoms": {
                  progress: 25,
                  subtopics: ["Photoelectric effect", "De Broglie", "Atomic models"],
                  completed: [false, false, false],
                },
                "Nuclei & Electronics": {
                  progress: 15,
                  subtopics: ["Radioactivity", "Nuclear reactions", "Semiconductors"],
                  completed: [false, false, false],
                },
              },
            },
          },
        },
        "Chemistry (Science)": {
          color: "from-purple-500 to-violet-500",
          progress: 30,
          chapters: {
            "Physical Chemistry": {
              progress: 35,
              topics: {
                Solutions: {
                  progress: 40,
                  subtopics: ["Solutions", "Electrochemistry", "Chemical kinetics"],
                  completed: [true, false, false],
                },
              },
            },
            "Inorganic Chemistry": {
              progress: 30,
              topics: {
                "d- & f-block Elements": {
                  progress: 30,
                  subtopics: ["d- & f-block", "Coordination compounds", "Haloalkanes/Haloarenes"],
                  completed: [false, false, false],
                },
              },
            },
            "Organic Chemistry": {
              progress: 25,
              topics: {
                "Organic Compounds": {
                  progress: 25,
                  subtopics: [
                    "Alcohols, Phenols, Ethers",
                    "Aldehydes, Ketones",
                    "Carboxylic acids, Amines",
                    "Biomolecules",
                  ],
                  completed: [false, false, false, false],
                },
              },
            },
          },
        },
        "Biology (Science)": {
          color: "from-red-500 to-pink-500",
          progress: 40,
          chapters: {
            Reproduction: {
              progress: 50,
              topics: {
                "Sexual & Asexual Reproduction": {
                  progress: 50,
                  subtopics: ["Sexual Reproduction", "Asexual Reproduction"],
                  completed: [true, false],
                },
              },
            },
            "Genetics & Evolution": {
              progress: 35,
              topics: {
                Heredity: {
                  progress: 35,
                  subtopics: ["Molecular basis", "Chromosomal basis", "Evolution"],
                  completed: [false, false, false],
                },
              },
            },
            "Biology & Human Welfare": {
              progress: 30,
              topics: {
                "Health & Disease": {
                  progress: 30,
                  subtopics: ["Human health", "Disease", "Immunity"],
                  completed: [false, false, false],
                },
              },
            },
            "Biotechnology & Applications": {
              progress: 25,
              topics: {
                Biotechnology: {
                  progress: 25,
                  subtopics: ["Principles", "Applications"],
                  completed: [false, false],
                },
              },
            },
            "Ecology & Environment": {
              progress: 20,
              topics: {
                Ecology: {
                  progress: 20,
                  subtopics: ["Organisms", "Populations", "Ecosystems", "Biodiversity"],
                  completed: [false, false, false, false],
                },
              },
            },
          },
        },
        "English Core": {
          color: "from-pink-500 to-purple-500",
          progress: 60,
          chapters: {
            Reading: {
              progress: 70,
              topics: {
                "Reading Skills": {
                  progress: 70,
                  subtopics: ["Unseen passages", "Comprehension", "Note making"],
                  completed: [true, true, false],
                },
              },
            },
            Writing: {
              progress: 60,
              topics: {
                "Writing Skills": {
                  progress: 60,
                  subtopics: ["Essays", "Letters", "Reports"],
                  completed: [true, true, false],
                },
              },
            },
            Grammar: {
              progress: 55,
              topics: {
                Grammar: {
                  progress: 55,
                  subtopics: ["Modals", "Tenses", "Narration"],
                  completed: [true, false, false],
                },
              },
            },
            Literature: {
              progress: 50,
              topics: {
                Literature: {
                  progress: 50,
                  subtopics: ["Prose", "Poetry", "Drama"],
                  completed: [true, false, false],
                },
              },
            },
          },
        },
      },
      Commerce: {
        "Accountancy (Commerce)": {
          color: "from-yellow-500 to-orange-500",
          progress: 55,
          chapters: {
            "Partnership Accounts": {
              progress: 60,
              topics: {
                "Partnership Fundamentals": {
                  progress: 60,
                  subtopics: ["Admission", "Retirement", "Dissolution"],
                  completed: [true, false, false],
                },
              },
            },
            "Company Accounts": {
              progress: 50,
              topics: {
                "Share Capital": {
                  progress: 50,
                  subtopics: ["Issue of shares", "Forfeiture", "Reissue"],
                  completed: [true, false, false],
                },
              },
            },
            "Financial Statements Analysis": {
              progress: 45,
              topics: {
                Analysis: {
                  progress: 45,
                  subtopics: ["Ratio Analysis", "Cash Flow"],
                  completed: [true, false],
                },
              },
            },
            "Cash Flow Statement": {
              progress: 40,
              topics: {
                "Cash Flow": {
                  progress: 40,
                  subtopics: ["Preparation", "Analysis"],
                  completed: [false, false],
                },
              },
            },
          },
        },
        "Business Studies (Commerce)": {
          color: "from-indigo-500 to-blue-500",
          progress: 60,
          chapters: {
            "Part A: Principles & Functions": {
              progress: 65,
              topics: {
                Management: {
                  progress: 70,
                  subtopics: ["Management", "Planning", "Staffing", "Directing", "Controlling"],
                  completed: [true, true, false, false, false],
                },
              },
            },
            "Part B: Business Finance & Marketing": {
              progress: 55,
              topics: {
                "Finance & Marketing": {
                  progress: 55,
                  subtopics: ["Financial Management", "Markets", "Consumer Protection"],
                  completed: [true, false, false],
                },
              },
            },
          },
        },
        "Economics (Commerce)": {
          color: "from-teal-500 to-cyan-500",
          progress: 50,
          chapters: {
            "Introductory Macroeconomics": {
              progress: 55,
              topics: {
                "National Income": {
                  progress: 60,
                  subtopics: ["National Income", "Money & Banking", "Government Budget", "BOP"],
                  completed: [true, false, false, false],
                },
              },
            },
            "Indian Economic Development": {
              progress: 45,
              topics: {
                "Economic Development": {
                  progress: 45,
                  subtopics: ["Post-1991 Reforms", "Current Challenges"],
                  completed: [true, false],
                },
              },
            },
          },
        },
        "English Core": {
          color: "from-pink-500 to-purple-500",
          progress: 60,
          chapters: {
            Reading: {
              progress: 70,
              topics: {
                "Reading Skills": {
                  progress: 70,
                  subtopics: ["Unseen passages", "Comprehension", "Note making"],
                  completed: [true, true, false],
                },
              },
            },
            Writing: {
              progress: 60,
              topics: {
                "Writing Skills": {
                  progress: 60,
                  subtopics: ["Essays", "Letters", "Reports"],
                  completed: [true, true, false],
                },
              },
            },
            Grammar: {
              progress: 55,
              topics: {
                Grammar: {
                  progress: 55,
                  subtopics: ["Modals", "Tenses", "Narration"],
                  completed: [true, false, false],
                },
              },
            },
            Literature: {
              progress: 50,
              topics: {
                Literature: {
                  progress: 50,
                  subtopics: ["Prose", "Poetry", "Drama"],
                  completed: [true, false, false],
                },
              },
            },
          },
        },
      },
      Humanities: {
        "Political Science (Humanities)": {
          color: "from-violet-500 to-purple-500",
          progress: 45,
          chapters: {
            "Contemporary World Politics": {
              progress: 50,
              topics: {
                "Cold War Era": {
                  progress: 60,
                  subtopics: ["Bipolarity", "Power Centres", "Security", "Globalisation"],
                  completed: [true, true, false, false],
                },
              },
            },
            "Politics in India Post-Independence": {
              progress: 40,
              topics: {
                "Indian Politics": {
                  progress: 40,
                  subtopics: ["Party Challenges", "Nation-building", "Regionalism", "Democratic Crisis"],
                  completed: [true, false, false, false],
                },
              },
            },
          },
        },
        "Psychology (Humanities)": {
          color: "from-pink-500 to-red-500",
          progress: 40,
          chapters: {
            "Psychological Attributes & Personality": {
              progress: 45,
              topics: {
                "Individual Differences": {
                  progress: 45,
                  subtopics: [
                    "Variations in Psychological Attributes",
                    "Self & Personality",
                    "Life Challenges",
                    "Disorders",
                    "Therapies",
                    "Social Cognition & Group Influence",
                  ],
                  completed: [true, false, false, false, false, false],
                },
              },
            },
          },
        },
        "Sociology (Humanities)": {
          color: "from-emerald-500 to-teal-500",
          progress: 35,
          chapters: {
            "Social Institutions & Change": {
              progress: 40,
              topics: {
                "Indian Society": {
                  progress: 40,
                  subtopics: [
                    "Demography",
                    "Institutions",
                    "Inequality",
                    "Cultural Diversity",
                    "Social Change",
                    "Movements",
                  ],
                  completed: [true, false, false, false, false, false],
                },
              },
            },
          },
        },
        "English Core": {
          color: "from-pink-500 to-purple-500",
          progress: 60,
          chapters: {
            Reading: {
              progress: 70,
              topics: {
                "Reading Skills": {
                  progress: 70,
                  subtopics: ["Unseen passages", "Comprehension", "Note making"],
                  completed: [true, true, false],
                },
              },
            },
            Writing: {
              progress: 60,
              topics: {
                "Writing Skills": {
                  progress: 60,
                  subtopics: ["Essays", "Letters", "Reports"],
                  completed: [true, true, false],
                },
              },
            },
            Grammar: {
              progress: 55,
              topics: {
                Grammar: {
                  progress: 55,
                  subtopics: ["Modals", "Tenses", "Narration"],
                  completed: [true, false, false],
                },
              },
            },
            Literature: {
              progress: 50,
              topics: {
                Literature: {
                  progress: 50,
                  subtopics: ["Prose", "Poetry", "Drama"],
                  completed: [true, false, false],
                },
              },
            },
          },
        },
      },
    },
  },
}

export function SubjectTree({ grade, onStartPomodoro, onAddToFavorites }: SubjectTreeProps) {
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(["Mathematics"])
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["Quadratic Equations"])
  const [selectedStream, setSelectedStream] = useState<string>("")

  const toggleSubject = (subject: string) => {
    setExpandedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const toggleChapter = (chapter: string) => {
    setExpandedChapters((prev) => (prev.includes(chapter) ? prev.filter((c) => c !== chapter) : [...prev, chapter]))
  }

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  // For Class 12, show stream selection if no stream is selected
  if (grade === "12" && !selectedStream) {
    const streams = ["Science", "Commerce", "Humanities"]

    return (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white text-glow-blue mb-4">Choose Your Stream</h2>
          <p className="text-gray-300 text-lg">Select your Class 12 stream to access subjects</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {streams.map((stream) => (
            <Card
              key={stream}
              className="glass-card hover-lift cursor-pointer group"
              onClick={() => setSelectedStream(stream)}
            >
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  {/* Removed the inner blur div for the icon glow */}
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-r ${
                      stream === "Science"
                        ? "from-blue-500 to-cyan-500"
                        : stream === "Commerce"
                          ? "from-green-500 to-emerald-500"
                          : "from-purple-500 to-violet-500"
                    } rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{stream}</h3>
                <Badge variant="secondary" className="glass-dark border-white/20">
                  Class 12
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Get the appropriate data based on grade and stream
  const getCurrentData = () => {
    const gradeData = cbseSyllabus[grade as keyof typeof cbseSyllabus]

    if (!gradeData) {
      return null
    }

    if (grade === "10") {
      return gradeData
    }

    if (grade === "12" && selectedStream) {
      return gradeData.streams[selectedStream as keyof typeof gradeData.streams]
    }

    return null // Should not be reached if logic is correct, but as a fallback
  }

  const currentData = getCurrentData()

  // If no data is available, show error message
  if (!currentData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">No Data Available</h2>
        <p className="text-gray-300">Please select a valid grade and stream.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white text-glow-blue mb-4">
          Grade {grade} {grade === "12" && selectedStream ? `- ${selectedStream} Stream` : ""} Subjects
        </h2>
        <p className="text-gray-300 text-lg">Navigate through your CBSE syllabus and track progress</p>
        {grade === "12" && selectedStream && (
          <Button onClick={() => setSelectedStream("")} className="mt-4 neon-button neon-purple">
            Change Stream
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {Object.entries(currentData).map(([subject, subjectInfo]) => (
          <Card key={subject} className="glass-card hover-lift overflow-hidden">
            <CardHeader
              className="cursor-pointer hover:bg-white/5 transition-colors p-6"
              onClick={() => toggleSubject(subject)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {expandedSubjects.includes(subject) ? (
                    <ChevronDown className="w-6 h-6 text-blue-400" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-blue-400" />
                  )}
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${subjectInfo.color} rounded-full blur-lg opacity-50`}
                    />
                    <div className={`relative w-4 h-4 bg-gradient-to-r ${subjectInfo.color} rounded-full`} />
                  </div>
                  <CardTitle className="text-2xl text-white">{subject}</CardTitle>
                  <Badge className="glass-dark border-white/20 text-white">{subjectInfo.progress}% Complete</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span className="text-lg font-medium text-yellow-400">
                    Level {Math.floor(subjectInfo.progress / 20) + 1}
                  </span>
                </div>
              </div>
              <div className="mt-4 relative">
                <Progress value={subjectInfo.progress} className="h-3 progress-glow" />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${subjectInfo.color} rounded-full opacity-75`}
                  style={{ width: `${subjectInfo.progress}%` }}
                />
              </div>
            </CardHeader>

            {expandedSubjects.includes(subject) && (
              <CardContent className="pt-0 pb-6">
                <div className="space-y-4">
                  {Object.entries(subjectInfo.chapters).map(([chapter, chapterInfo]) => (
                    <div key={chapter} className="glass-dark rounded-lg p-6 hover-lift">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleChapter(chapter)}
                      >
                        <div className="flex items-center gap-3">
                          {expandedChapters.includes(chapter) ? (
                            <ChevronDown className="w-5 h-5 text-purple-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-purple-400" />
                          )}
                          <BookOpen className="w-5 h-5 text-blue-400" />
                          <span className="font-semibold text-white text-lg">{chapter}</span>
                          <Badge className="glass border-white/20 text-purple-400">{chapterInfo.progress}%</Badge>
                        </div>
                      </div>

                      {expandedChapters.includes(chapter) && (
                        <div className="mt-6 ml-8 space-y-4">
                          {Object.entries(chapterInfo.topics).map(([topic, topicInfo]) => (
                            <div key={topic} className="border-l-2 border-blue-400/30 pl-6">
                              <div
                                className="flex items-center justify-between cursor-pointer py-3"
                                onClick={() => toggleTopic(topic)}
                              >
                                <div className="flex items-center gap-3">
                                  {expandedTopics.includes(topic) ? (
                                    <ChevronDown className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-green-400" />
                                  )}
                                  <span className="font-medium text-white">{topic}</span>
                                  {topicInfo.progress === 100 && <CheckCircle className="w-5 h-5 text-green-400" />}
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button
                                    className="neon-button neon-blue h-8 px-4"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      console.log(`Starting study session for: ${topic}`)
                                      // Add your study logic here
                                    }}
                                  >
                                    <Timer className="w-3 h-3 mr-1 text-white" />
                                    Study
                                  </Button>
                                  <Button
                                    className="neon-button neon-green h-8 px-4"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      console.log(`Starting quiz for: ${topic}`)
                                      // Add your quiz logic here
                                    }}
                                  >
                                    <Play className="w-3 h-3 mr-1 text-white" />
                                    Quiz
                                  </Button>
                                </div>
                              </div>

                              {expandedTopics.includes(topic) && (
                                <div className="mt-4 space-y-2">
                                  {topicInfo.subtopics.map((subtopic, index) => (
                                    <div
                                      key={subtopic}
                                      className="flex items-center justify-between py-2 px-4 glass rounded-lg hover-lift"
                                    >
                                      <div className="flex items-center gap-3">
                                        {topicInfo.completed[index] ? (
                                          <CheckCircle className="w-4 h-4 text-green-400" />
                                        ) : (
                                          <Clock className="w-4 h-4 text-gray-400" />
                                        )}
                                        <span className="text-white">{subtopic}</span>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button
                                          className="neon-button neon-purple h-6 px-3 text-xs"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            if (onStartPomodoro) {
                                              onStartPomodoro(topic, subtopic)
                                            }
                                          }}
                                        >
                                          <Timer className="w-3 h-3 text-white" />
                                        </Button>
                                        <Button
                                          className="neon-button neon-pink h-6 px-3 text-xs"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            if (onAddToFavorites) {
                                              onAddToFavorites(topic, subtopic)
                                            }
                                          }}
                                        >
                                          <Star className="w-3 h-3 text-white" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
