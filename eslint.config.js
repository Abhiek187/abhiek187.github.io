import eslint from "@eslint/js";
import react from "eslint-plugin-react/configs/recommended.js";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import path from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  react,
  /* Follow https://github.com/facebook/react/pull/28773 &
   * https://github.com/facebook/react/issues/28313
   * until eslint-plugin-react-hooks supports flat configs
   */
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        // Open issue: https://github.com/typescript-eslint/typescript-eslint/issues/8891
        project: true,
        tsconfigRootDir: __dirname, // use import.meta.dirname in Node 20+
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
