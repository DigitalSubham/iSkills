function otpGenerator() {
  // Generate a random 6-digit number
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Display the random number
  //   console.log("Random Number:", randomNumber);
  return randomNumber;
}

// Call the function to generate a random number

module.exports = { otpGenerator };
