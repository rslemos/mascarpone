export function makeFull(oldValue: string, newValue: string, selectionStart: number, selectionEnd: number, selectionDirection: string): {
  value: string,
  selectionStart: number,
  selectionEnd: number,
  selectionDirection: string,
} {
  const ops = lcsDiff(oldValue, newValue);
  const offsets = computeOffsets(ops, oldValue.length);

  const sum = (a: number, b: number) => a + b;
  selectionStart += offsets.slice(0, selectionStart).reduce(sum, 0);
  selectionEnd += offsets.slice(0, selectionEnd).reduce(sum, 0);

  return {
    value: newValue,
    selectionStart: selectionStart,
    selectionEnd: selectionEnd,
    selectionDirection: selectionDirection,
  };
}

/*********************************vvv BLACK MAGIC vvv*********************************/

/**
 *
 * 1222.221.111-11 x 122.222.111-11
 * -> 0200000210000000
 * -> 00010200200000000 (simpler?) [http://lcs-demo.sourceforge.net/]
 */
function lcsDiff(original: string, edited: string): EditOp[] {
  // to simplify things, we'll stuff an additional char at the beginning,
  // which will never be compared
  original = 'O' + original;
  edited =   'E' + edited;

  const m = lcsDynamicMatrix(original, edited);
  return lcsBacktrack(m, original, edited);
}

function lcsDynamicMatrix(original: string, edited: string): number[][] {

  // matrix of the longest common sequence length
  // computed by dynamic programming
  const m: number[][] = [];

  m.push([]);

  for (let i = 0; i < original.length; i++) {
    m[0].push(0);
  }

  // skip first line, already initialized;
  for (let j = 1; j < edited.length; j++) {
    m.push([0]);
  }

  // see? the first character will be discarded
  for (let i = 1; i < original.length; i++) {
    // again, the first character will be discarded
    for (let j = 1; j < edited.length; j++) {
      let ij: number;

      if (original.codePointAt(i) === edited.codePointAt(j)) {
        ij = m[j - 1][i - 1] + 1;
      } else {
        ij = Math.max(m[j - 1][i], m[j][i - 1]);
      }

      m[j].push(ij);
    }
  }

  return m;
}

enum EditOp {
  MATCH,
  INSERT,
  DELETE,
}

function lcsBacktrack(m: number[][], original: string, edited: string): EditOp[] {
  // backtracking from longest common subsequence
  const backtrack: EditOp[] = [];

  let i = original.length - 1;
  let j = edited.length - 1;
  while (i > 0 && j > 0) {
    if (original.codePointAt(i) === edited.codePointAt(j)) {
      backtrack.push(EditOp.MATCH); i--; j--;
    } else {
      if (m[j - 1][i] > m[j][i - 1]) {
        backtrack.push(EditOp.INSERT); j--;
      } else if (m[j - 1][i] < m[j][i - 1]) {
        backtrack.push(EditOp.DELETE); i--;
      } else {
        // (chosen by roll of dice)
        // backtrack.push(EditOp.INSERT); j--; // ties resolve to INSERT
        backtrack.push(EditOp.DELETE); i--; // ties resolve to DELETE
      }
    }
  }

  {
    // the order here is not important at all
    // since only either i or j will be >0 (but never both)
    while (i-- > 0) {
      backtrack.push(EditOp.DELETE);
    }

    while (j-- > 0) {
      backtrack.push(EditOp.INSERT);
    }
  }

  return backtrack.reverse();
}

function computeOffsets(actions: EditOp[], length: number): number[] {
  const offsets: number[] = [];

  for (let i = 0; i <= length; i++) {
    offsets[i] = 0;
  }

  for (let i = 0, k = 0; i <= length && k < actions.length; i++, k++) {
    switch (actions[k]) {
      case EditOp.INSERT:
        offsets[Math.max(i--, 0)]++;
        break;
      case EditOp.DELETE:
        offsets[Math.max(i, 0)]--;
        break;
    }
  }

  return offsets;
}
