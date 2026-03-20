const DOT_GLYPHS = {
  ' ': ['000', '000', '000', '000', '000'],
  '.': ['0', '0', '0', '0', '1'],
  '3': ['1111', '0001', '0111', '0001', '1111'],
  '4': ['1001', '1001', '1111', '0001', '0001'],
  E: ['1111', '1000', '1110', '1000', '1111'],
  I: ['111', '010', '010', '010', '111'],
  N: ['1001', '1101', '1011', '1001', '1001'],
  O: ['0110', '1001', '1001', '1001', '0110'],
  R: ['1110', '1001', '1110', '1010', '1001'],
  S: ['0111', '1000', '0110', '0001', '1110'],
  V: ['10001', '10001', '10001', '01010', '00100'],
};

export function renderDotVersionLabel(text = 'VERSION 4.3') {
  const rows = Array.from({ length: 5 }, () => []);

  for (const rawChar of text.toUpperCase()) {
    const glyph = DOT_GLYPHS[rawChar] || DOT_GLYPHS[' '];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      const cells = glyph[rowIndex]
        .split('')
        .map((value) => `<span class="dot-version-dot${value === '1' ? ' is-on' : ''}"></span>`)
        .join('');

      rows[rowIndex].push(`<span class="dot-version-char">${cells}</span>`);
    }
  }

  return `
    <span class="dot-version" aria-label="${text}">
      ${rows
        .map((row) => `<span class="dot-version-row" aria-hidden="true">${row.join('')}</span>`)
        .join('')}
    </span>
  `;
}
