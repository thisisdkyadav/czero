import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  // React components bundle
  {
    input: "src/react/index.ts",
    output: [
      {
        file: "dist/react/index.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/react/index.cjs",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist/react",
        outDir: "./dist/react",
      }),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
  // Type declarations bundle
  {
    input: "dist/react/index.d.ts",
    output: [{ file: "dist/react/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
