// import { add } from "date-fns";

// export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

// export const thirtyDaysFromNow = (): Date => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

// export const fortyFiveMinutesFromNow = (): Date => {
//   const now = new Date();
//   now.setMinutes(now.getMinutes() + 45);
//   return now;
// };
// export const tenMinutesAgo = (): Date => new Date(Date.now() - 10 * 60 * 1000);

// export const threeMinutesAgo = (): Date => new Date(Date.now() - 3 * 60 * 1000);

// export const anHourFromNow = (): Date => new Date(Date.now() + 60 * 60 * 1000);

// export const calculateExpirationDate = (expiresIn: string = "15m"): Date => {
//   // Match number + unit (m = minutes, h = hours, d = days)
//   const match = expiresIn.match(/^(\d+)([mhd])$/);
//   if (!match) throw new Error('Invalid format. Use "15m", "1h", or "2d".');
//   const [, value, unit] = match;
//   const expirationDate = new Date();

//   // Check the unit and apply accordingly
//   switch (unit) {
//     case "m": // minutes
//       return add(expirationDate, { minutes: parseInt(value) });
//     case "h": // hours
//       return add(expirationDate, { hours: parseInt(value) });
//     case "d": // days
//       return add(expirationDate, { days: parseInt(value) });
//     default:
//       throw new Error('Invalid unit. Use "m", "h", or "d".');
//   }
// };

import { add } from "date-fns";

// Constants
export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

// Date Calculations
export const thirtyDaysFromNow = (): Date => new Date(Date.now() + 30 * ONE_DAY_IN_MS);

export const fortyFiveMinutesFromNow = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  return now;
};

export const tenMinutesAgo = (): Date => new Date(Date.now() - 10 * 60 * 1000);

export const threeMinutesAgo = (): Date => new Date(Date.now() - 3 * 60 * 1000);

export const anHourFromNow = (): Date => new Date(Date.now() + 60 * 60 * 1000);

// Expiration Date Calculator Supporting "s" (seconds)
export const calculateExpirationDate = (expiresIn: string = "15m"): Date => {
  // Match number + unit (s = seconds, m = minutes, h = hours, d = days)
  const match = expiresIn.match(/^(\d+)([smhd])$/);

  if (!match) throw new Error('Invalid format. Use "10s", "15m", "1h", or "2d".');

  const [, value, unit] = match;
  const expirationDate = new Date();

  // Apply time based on the provided unit
  switch (unit) {
    case "s": // seconds
      return add(expirationDate, { seconds: parseInt(value, 10) });
    case "m": // minutes
      return add(expirationDate, { minutes: parseInt(value, 10) });
    case "h": // hours
      return add(expirationDate, { hours: parseInt(value, 10) });
    case "d": // days
      return add(expirationDate, { days: parseInt(value, 10) });
    default:
      throw new Error('Invalid unit. Use "s", "m", "h", or "d".');
  }
};
