/**
 * Realistic fake usernames mapped to DummyJSON user IDs (1–100).
 * Used wherever the API returns only a numeric userId.
 */
const FAKE_NAMES = {
  1: "Emily Sanders",
  2: "Michael Torres",
  3: "Sophia Williams",
  4: "James Mitchell",
  5: "Olivia Chen",
  6: "Daniel Reeves",
  7: "Isabella Parker",
  8: "Lucas Rivera",
  9: "Ava Thompson",
  10: "Noah Bennett",
  11: "Mia Collins",
  12: "Ethan Foster",
  13: "Charlotte Hayes",
  14: "Ryan Murphy",
  15: "Amelia Clark",
  16: "Benjamin Lewis",
  17: "Harper Scott",
  18: "Mason Young",
  19: "Evelyn Harris",
  20: "Logan Walker",
  21: "Abigail Hall",
  22: "Alexander Allen",
  23: "Ella Martin",
  24: "William Gonzalez",
  25: "Scarlett Nelson",
  26: "James Carter",
  27: "Grace Mitchell",
  28: "Henry Perez",
  29: "Chloe Roberts",
  30: "Sebastian Turner",
  31: "Zoey Phillips",
  32: "Jack Campbell",
  33: "Lily Parker",
  34: "Owen Evans",
  35: "Hannah Edwards",
  36: "Liam King",
  37: "Aria Collins",
  38: "Aiden Stewart",
  39: "Layla Sanchez",
  40: "Jackson Morris",
  41: "Penelope Rogers",
  42: "Lincoln Reed",
  43: "Riley Cook",
  44: "Samuel Morgan",
  45: "Nora Bell",
  46: "David Murphy",
  47: "Lillian Bailey",
  48: "Joseph Rivera",
  49: "Hazel Cooper",
  50: "Carter Richardson",
  51: "Aubrey Cox",
  52: "Wyatt Howard",
  53: "Stella Ward",
  54: "John Torres",
  55: "Victoria Peterson",
  56: "Dylan Gray",
  57: "Camila Ramirez",
  58: "Elijah James",
  59: "Ellie Watson",
  60: "Mateo Brooks",
  61: "Sophie Kelly",
  62: "Christian Sanders",
  63: "Alice Price",
  64: "Christopher Bennett",
  65: "Sadie Wood",
  66: "Jaxon Barnes",
  67: "Leah Ross",
  68: "Nathan Henderson",
  69: "Zoe Coleman",
  70: "Isaiah Jenkins",
  71: "Natalie Perry",
  72: "Josiah Powell",
  73: "Addison Long",
  74: "Hudson Patterson",
  75: "Madison Butler",
  76: "Julian Simmons",
  77: "Audrey Foster",
  78: "Levi Bryant",
  79: "Brooklyn Gonzalez",
  80: "Gabriel Alexander",
  81: "Bella Russell",
  82: "Oliver Griffin",
  83: "Savannah Diaz",
  84: "Eli Hayes",
  85: "Claire Myers",
  86: "Aaron Ford",
  87: "Lucy Hamilton",
  88: "Ian Graham",
  89: "Paisley Sullivan",
  90: "Adam Wallace",
  91: "Skylar Woods",
  92: "Jonathan West",
  93: "Eliana Cole",
  94: "Charles Jordan",
  95: "Genesis Kim",
  96: "Thomas Grant",
  97: "Serenity Fisher",
  98: "Jordan Stone",
  99: "Violet Hunt",
  100: "Caleb Fisher",
};

/**
 * Returns a realistic display name for a given userId.
 * Falls back to "User {id}" for unknown IDs.
 */
export function getFakeUsername(userId) {
  if (!userId) return "Unknown User";
  return FAKE_NAMES[Number(userId)] || `User ${userId}`;
}

/**
 * Returns a short @handle derived from the fake name.
 * e.g. "Emily Sanders" → "@emily.sanders"
 */
export function getFakeHandle(userId) {
  const name = FAKE_NAMES[Number(userId)];
  if (!name) return `@user${userId}`;
  return "@" + name.toLowerCase().replace(" ", ".");
}
