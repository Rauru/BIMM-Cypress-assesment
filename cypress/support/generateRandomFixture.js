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

// Generate random user with completely random text
function generateRandomUser() {
  // Generate random first and last part for constructing email
  const firstPart = generateRandomString(5 + Math.floor(Math.random() * 6)); // 5-10 chars
  const lastPart = generateRandomString(5 + Math.floor(Math.random() * 6)); // 5-10 chars
  
  return {
    fullName: generateRandomString(8 + Math.floor(Math.random() * 10)), // 8-17 chars
    email: `${firstPart}.${lastPart}@example.com`,
    currentAddress: generateRandomString(15 + Math.floor(Math.random() * 15)), // 15-29 chars
    permanentAddress: generateRandomString(15 + Math.floor(Math.random() * 15)) // 15-29 chars
  };
}

module.exports = { generateRandomUser };