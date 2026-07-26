function normalize(str) {
  return String(str ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// Levenshtein distance (iterative, O(n*m) time, O(min(n,m)) space)
function levenshtein(a, b) {
  a = normalize(a);
  b = normalize(b);
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  // Ensure b is the shorter string to save memory
  if (a.length < b.length) {
    const tmp = a;
    a = b;
    b = tmp;
  }

  const prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    let prevDiag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      prev[j] = Math.min(
        prev[j] + 1,       // deletion
        prev[j - 1] + 1,   // insertion
        prevDiag + cost    // substitution
      );
      prevDiag = tmp;
    }
  }

  return prev[b.length];
}

// Returns 0..1, higher is better
function similarity(a, b) {
  a = normalize(a);
  b = normalize(b);
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length) || 1;
  return 1 - dist / maxLen;
}

function bestSimilarity(query, candidates) {
  let best = 0;
  for (const c of candidates) {
    const s = similarity(query, c);
    if (s > best) best = s;
  }
  return best;
}

module.exports = { levenshtein, similarity, bestSimilarity, normalize };

