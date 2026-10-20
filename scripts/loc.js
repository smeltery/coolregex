import { $ } from "bun";

const files = (await $`git ls-files --cached --others --exclude-standard`.text()).trim().split("\n");
for (const [name, pattern, budget] of [
  ["application", /^(app|components|lib)\/.*\.(tsx?|jsx?|css)$/, 1300],
  ["automation", /^scripts\/.*\.(ts|js|sh)$/, 80],
]) {
  let count = 0;
  for (const file of files.filter((file) => pattern.test(file))) {
    const text = await Bun.file(file).text();
    count += text.split("\n").length - Number(text.endsWith("\n"));
  }
  console.log(`${name}: ${count}/${budget} lines`);
  if (count > budget) process.exitCode = 1;
}
