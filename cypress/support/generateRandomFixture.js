// Random Text Cypress Fixture Generator
// Function to generate random string of specified length
function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomItem(items) {
  return items[randomInt(0, items.length - 1)];
}

// 1 to max distinct items, in random order
function randomItems(items, max) {
  return Cypress._.sampleSize(items, randomInt(1, max));
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Generate random user with completely random text
function generateRandomUser() {
  // Generate random first and last part for constructing email
  const firstPart = generateRandomString(5 + Math.floor(Math.random() * 6)); // 5-10 chars
  const lastPart = generateRandomString(5 + Math.floor(Math.random() * 6)); // 5-10 chars

  return {
    fullName: generateRandomString(8 + Math.floor(Math.random() * 10)), // 8-17 chars
    email: `${firstPart}.${lastPart}@example.com`,
    currentAddress: generateRandomString(15 + Math.floor(Math.random() * 15)), // 15-29 chars
    permanentAddress: generateRandomString(15 + Math.floor(Math.random() * 15)), // 15-29 chars
  };
}

// Options offered by the DemoQA Practice Form. Cities depend on the selected state.
const GENDERS = ['Male', 'Female', 'Other'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const SUBJECTS = [
  'Maths',
  'English',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Commerce',
  'Accounting',
  'Economics',
  'Arts',
  'History',
  'Civics',
  'Hindi',
];
const HOBBIES = ['Sports', 'Reading', 'Music'];
const STATES_AND_CITIES = {
  NCR: ['Delhi', 'Gurgaon', 'Noida'],
  'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
  Haryana: ['Karnal', 'Panipat'],
  Rajasthan: ['Jaipur', 'Jaiselmer'],
};

// Generate a random student with valid values for every Practice Form field
function generateRandomStudent() {
  const firstName = capitalize(generateRandomString(randomInt(4, 10)));
  const lastName = capitalize(generateRandomString(randomInt(4, 10)));
  const state = randomItem(Object.keys(STATES_AND_CITIES));

  return {
    firstName,
    lastName,
    email: `${firstName}.${lastName}@example.com`.toLowerCase(),
    gender: randomItem(GENDERS),
    mobile: `${randomInt(1, 9)}${randomInt(0, 999999999)}`.padEnd(10, '0'), // 10 digits
    dateOfBirth: {
      day: randomInt(1, 28), // 28 exists in every month
      month: randomItem(MONTHS),
      year: String(randomInt(1950, 2005)),
    },
    subjects: randomItems(SUBJECTS, 3),
    hobbies: randomItems(HOBBIES, 3),
    currentAddress: `${randomInt(1, 999)} ${capitalize(generateRandomString(randomInt(5, 12)))} St`,
    state,
    city: randomItem(STATES_AND_CITIES[state]),
  };
}

export { generateRandomUser, generateRandomStudent };
