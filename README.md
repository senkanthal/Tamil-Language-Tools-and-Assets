# Tamil Language Tools and Assets

A comprehensive collection of **regular expression mappings** for converting between **legacy Tamil ASCII fonts** and **Unicode Tamil**.

Ideal for building Tamil text converters, font migration tools, OCR post-processors, and web-based Tamil typing systems.

---

## Export Structure

### **Default Export (All Fonts + Available Reverses)**

The root `index.ts` exports the combined `allRegExData` object, which includes **all forward mappings** and **reverse mappings** for the fonts that have them.

```ts
import allRegExData from '@senkanthal/tamil-language-tools-and-assets';

const { Bamini, UniBamini } = allRegExData;

console.log(Bamini); // ASCII → Unicode
console.log(UniBamini); // Unicode → ASCII (if defined)
```

> ⚠️ Not every font has a reverse mapping — `Uni*` entries only exist where conversion rules are fully defined.

---

### **Per-Font Imports (Forward Only)**

If you only need a specific font for ASCII → Unicode conversion, you can import it directly:

```ts
import { Bamini, Anjal } from '@senkanthal/tamil-language-tools-and-assets';

console.log(Bamini);
console.log(Anjal);
```

These exports include **forward-only** mappings (legacy → Unicode).

---

## 📚 Available Fonts

| Font Name  | ASCII → Unicode | Unicode → ASCII  |
| ---------- | --------------- | ---------------- |
| Anjal      | ✅ Yes          | ⚠️ Not available |
| Anjal1     | ✅ Yes          | ⚠️ Not available |
| Bamini     | ✅ Yes          | ✅ Available     |
| Boomi      | ✅ Yes          | ⚠️ Not available |
| Dinakaran  | ✅ Yes          | ⚠️ Not available |
| Dinamani   | ✅ Yes          | ⚠️ Not available |
| Indoweb    | ✅ Yes          | ⚠️ Not available |
| Keyman     | ✅ Yes          | ✅ Available     |
| Koeln      | ✅ Yes          | ⚠️ Not available |
| Libi       | ✅ Yes          | ⚠️ Not available |
| Murasoli   | ✅ Yes          | ⚠️ Not available |
| Mylai      | ✅ Yes          | ⚠️ Not available |
| Nakkeeran  | ✅ Yes          | ⚠️ Not available |
| Oldvikatan | ✅ Yes          | ⚠️ Not available |
| Roman      | ✅ Yes          | ⚠️ Not available |
| Senthamizh | ✅ Yes          | ⚠️ Not available |
| Tab        | ✅ Yes          | ✅ Available     |
| Tam        | ✅ Yes          | ⚠️ Not available |
| Thanthy    | ✅ Yes          | ⚠️ Not available |
| Tscii      | ✅ Yes          | ✅ Available     |
| Webulagam  | ✅ Yes          | ⚠️ Not available |

### **Available Fonts Array**

You can also import an array of available font names:

```ts
import { availableFonts } from '@senkanthal/tamil-language-tools-and-assets';

console.log(availableFonts); // ['Anjal', 'Anjal1', 'Bamini', ...]
```

This array contains all supported font names for easy iteration and validation.

---

## ⚙️ Type Definition

```ts
interface RegexMapping {
  [fontName: string]: (string | RegExp)[][]; // forward mappings
  [uniFontName?: string]: (string | RegExp)[][]; // optional reverse mappings
}

declare const allRegExData: RegexMapping;
export default allRegExData;
```

Each mapping is an array of `[pattern, replacement]` pairs.

---

## 💡 Usage Examples

### Convert Bamini → Unicode

```ts
import { Bamini } from '@senkanthal/tamil-language-tools-and-assets';

function convert(text: string, mapping: (string | RegExp)[][]): string {
  return mapping.reduce(
    (acc, [pattern, replacement]) =>
      acc.replace(pattern as RegExp, replacement as string),
    text
  );
}

console.log(convert('fp fh f', Bamini)); // → தமிழ்
```

---

### Convert Unicode → Bamini (if available)

```ts
import allRegExData from '@senkanthal/tamil-language-tools-and-assets';

const { UniBamini } = allRegExData;

if (UniBamini) {
  console.log(convert('தமிழ்', UniBamini)); // → fp fh f
} else {
  console.warn('Reverse mapping not available for this font.');
}
```

---

## 🧩 Notes

- **Per-font exports** → only **forward (ASCII → Unicode)**
- **`allRegExData`** → includes **forward mappings for all**, and **reverse mappings** only for fonts that support it
- **Consistent naming**:
  - `FontName` = forward (ASCII → Unicode)
  - `UniFontName` = reverse (Unicode → ASCII, optional)

---

## 📜 License

Licensed under the **GNU Affero General Public License v3.0**.
See the [LICENSE](./LICENSE) file for details.

---
