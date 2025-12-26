export const generateId = (): string => // random id genete krne ke liye.
  Math.random().toString(36).substring(2) + Date.now().toString(36);
