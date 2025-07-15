export function mapQuizToClinical(answers) {
  const clinical = {};

  // Estimate Glucose
  clinical.glucose = (() => {
    let base = 90;
    if (answers.smoking === "4-7") base += 20;
    else if (answers.smoking === "8-10") base += 30;
    else if (answers.smoking === "10+") base += 40;

    if (answers.sugarIntake === "3–5 times/week") base += 15;
    else if (answers.sugarIntake === "Daily") base += 25;

    if (answers.alcohol === "Daily") base += 20;
    if (answers.meals === "Never") base += 10;

    return base;
  })();

  // Estimate BMI
  clinical.bmi = (() => {
    let base = 24;
    if (answers.exercise === "None") base += 8;
    else if (answers.exercise === "<15 mins") base += 5;
    else if (answers.exercise === "15-30 mins") base += 3;

    if (answers.screenTime === "3–5 hrs") base += 2;
    else if (answers.screenTime === "5+ hrs") base += 4;

    if (answers.fruitVeg === "Rarely") base += 1;
    else if (answers.fruitVeg === "Never") base += 2;

    return base;
  })();

  // Estimate Insulin
  clinical.insulin = (() => {
    let base = 90;
    if (answers.diet === "Average") base += 30;
    else if (answers.diet === "High sugar/junk food") base += 60;

    if (answers.alcohol === "Regularly (3–5 times/week)") base += 10;
    else if (answers.alcohol === "Daily") base += 25;

    return base;
  })();

  // Estimate Blood Pressure
  clinical.bloodPressure = (() => {
    let base = 75;
    if (answers.stress === "High") base += 10;
    else if (answers.stress === "Very High") base += 15;
    return base;
  })();

  // Constant or lightly estimated values
  clinical.skinThickness = 20;
  clinical.age = Number(answers.age) || 30;

  // Diabetes Pedigree Function
  clinical.diabetesPedigreeFunction = (() => {
    if (answers.familyHistory === "Both parents") return 1.5;
    if (answers.familyHistory === "One parent") return 0.7;
    return 0.3;
  })();

  // Pregnancies logic
  clinical.pregnancies =
    answers.gender === "Male" ? 0 : parsePregnancies(answers.pregnancies);

  return clinical;
}

// Helper for pregnancy parsing
function parsePregnancies(value) {
  if (!value) return 0;
  if (value === "4+") return 4;
  return parseInt(value);
}
