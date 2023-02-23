import { describe, expect, it } from 'vitest';
import setToTargetContrast from '../../utilities/colour/autoContrast';

(() => {
  const output = '#ffffff';
  describe(`#setToTargetContrast`, () => {
    it(`Works for setToTargetContrast `, () => {
      expect(setToTargetContrast('#000000', 25).resultingHex).toBe(output);
      expect(setToTargetContrast('#000000', 25).resultingContrastRatio).toBe(21);
    });
  });
})();

(() => {
  const output = '#000000';
  describe(`#setToTargetContrast`, () => {
    it(`Works for setToTargetContrast `, () => {
      expect(setToTargetContrast('#ffffff', 25, 'down').resultingHex).toBe(output);
      expect(setToTargetContrast('#ffffff', 25, 'down').resultingContrastRatio).toBeGreaterThan(20);
    });
  });
})();

(() => {
  describe(`#setToTargetContrast`, () => {
    it(`Works for setToTargetContrast `, () => {
      expect(setToTargetContrast('#ff0fff', 5, 'down').resultingContrastRatio).toBe(5);
    });
  });
})();

(() => {
  describe(`#setToTargetContrast`, () => {
    it(`Works for setToTargetContrast `, () => {
      expect(setToTargetContrast('#010101', 5, 'up').resultingContrastRatio).toBe(5);
    });
  });
})();
