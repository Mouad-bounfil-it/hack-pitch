const userRolePropNames = [
  "isCoach",
  "isReviewer",
  "isInvestor",
  "isManager",
  "isSharedList",
  "isApplicant",
] as const;

export type UserRolePropNamesT = typeof userRolePropNames[number];
