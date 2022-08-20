export default function (prop: string | undefined | null | boolean) {
  if (prop === undefined || prop === null) return false;
  if (typeof prop === "boolean") return prop;
  if (prop === "false") return false;

  return true;
}
