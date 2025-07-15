export const quizQuestions = [
  {
    id: "smoking",
    question: "How many cigarettes do you smoke per day?",
    options: ["None", "1-3", "4-7", "8-10", "10+"],
  },
  {
    id: "alcohol",
    question: "How often do you consume alcohol?",
    options: [
      "Never",
      "Occasionally (1–2 times/week)",
      "Regularly (3–5 times/week)",
      "Daily",
    ],
  },
  {
    id: "exercise",
    question: "How long do you walk or exercise in the morning?",
    options: ["None", "<15 mins", "15-30 mins", "30-60 mins", "1+ hour"],
  },
  {
    id: "diet",
    question: "How would you describe your daily diet?",
    options: ["Healthy", "Average", "High sugar/junk food"],
  },
  {
    id: "water",
    question: "How much water do you drink daily?",
    options: ["<1L", "1-2L", "2-3L", "3+L"],
  },
  {
    id: "sleep",
    question: "How well do you sleep?",
    options: ["<4 hrs", "4-6 hrs", "6-8 hrs", "8+ hrs"],
  },
  {
    id: "meals",
    question: "Do you have your meals at regular times every day?",
    options: ["Always", "Mostly", "Rarely", "Never"],
  },
  {
    id: "sugarIntake",
    question: "How often do you eat sugary snacks or desserts?",
    options: ["Rarely", "1–2 times/week", "3–5 times/week", "Daily"],
  },
  {
    id: "stress",
    question: "How would you describe your daily stress levels?",
    options: ["Low", "Moderate", "High", "Very High"],
  },
  {
    id: "screenTime",
    question:
      "How many hours do you spend on screens (phone, TV, computer) daily?",
    options: ["<1 hr", "1–3 hrs", "3–5 hrs", "5+ hrs"],
  },
  {
    id: "fruitVeg",
    question: "How often do you eat fresh fruits and vegetables?",
    options: ["Daily", "Few times/week", "Rarely", "Never"],
  },
  {
    id: "familyHistory",
    question: "Do you have a family history of diabetes?",
    options: ["No", "One parent", "Both parents"],
  },
  {
    id: "gender",
    question: "What is your gender?",
    options: ["Male", "Female", "Other"],
  },
  {
    id: "pregnancies",
    question: "How many times have you been pregnant?",
    options: ["0", "1", "2", "3", "4+"],
    condition: (answers) =>
      answers.gender === "Female" || answers.gender === "Other",
  },
  {
    id: "age",
    question: "What is your age?",
    inputType: "number",
  },
];
