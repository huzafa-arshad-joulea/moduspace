import path from 'path-browserify';

export default function joinUrl(base: string, ...urlPath: string[]): string {
  const joinedURL = path.posix.join(...urlPath.map(String));
  return new URL(joinedURL, base).href;
}

export function joinPath(...urlPath: string[]): string {
  return path.posix.join(...urlPath.map(String));
}
