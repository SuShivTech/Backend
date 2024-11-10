
const rateLimit = require('express-rate-limit');

module.exports.rateLimiterUsingThirdParty = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min  unit is in milli second
  max: 100,
  message: 'You have exceeded the 50 requests in 0.5 hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});