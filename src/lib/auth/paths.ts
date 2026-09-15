export function isSafeStudioPath(path: string): boolean {
  return path.startsWith("/studio") && !path.startsWith("//") && !path.includes("\\");
}
