// Generate a 6-digit numeric OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Range: 100000–999999
};

// Generate expiry time for OTP (default 5 minutes)
export const otpExpiryTime = (minutes = 5) => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry;
};
