type ProjectImageRef = {
  title: string;
  imageTitle?: string;
};

type GalleryImageRef = {
  label: string;
  imageTitle?: string;
  imageLabel?: string;
  imageUrl?: string;
  assetPath?: string;
};

const projectCoverImages = import.meta.glob<string>(
  ["../assets/projects/covers/*.svg", "../assets/projects/covers/*.webp"],
  { eager: true, import: "default" },
);

const projectGalleryImages = import.meta.glob<string>(
  ["../assets/projects/gallery/*.svg", "../assets/projects/gallery/*.webp"],
  {
    eager: true,
    import: "default",
  },
);

const socialMediaImages = import.meta.glob<string>(
  [
    "../assets/social/**/*.svg",
    "../assets/social/**/*.webp",
  ],
  { eager: true, import: "default" },
);

const getImageTitle = (project: ProjectImageRef) => project.imageTitle ?? project.title;

const normalizePath = (path: string) =>
  path.toLowerCase().replace(/\s+/g, "-").replace(/['()_,–—]+/g, "").replace(/-+/g, "-").replace(/-\./g, ".");

const getAsset = (assets: Record<string, string>, path: string) =>
  assets[`${path}.svg`] ??
  assets[`${path}.webp`];

const tryGetAsset = (assets: Record<string, string>, path: string) => {
  const result = getAsset(assets, path);
  if (result) return result;
  const normalizedPath = normalizePath(path);
  if (normalizedPath !== path) return getAsset(assets, normalizedPath);
  return undefined;
};

export const getProjectCoverImage = (project: ProjectImageRef) =>
  tryGetAsset(projectCoverImages, `../assets/projects/covers/${getImageTitle(project)}`);

export const getProjectGalleryImage = (project: ProjectImageRef, item: GalleryImageRef) =>
  item.imageUrl ??
  (item.assetPath
    ? tryGetAsset(socialMediaImages, `../assets/social/${item.assetPath}`)
    : undefined) ??
  tryGetAsset(
    projectGalleryImages,
    `../assets/projects/gallery/${item.imageTitle ?? getImageTitle(project)} - ${
      item.imageLabel ?? item.label
    }`,
  );

export const getSocialMediaProjectImages = (slug: string) => {
  const seen = new Map<string, string>();
  const entries = Object.entries(socialMediaImages)
    .filter(([path]) => path.includes(`/social/${slug}/`))
    .sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" }),
    );

  for (const [path, image] of entries) {
    const basePath = path.replace(/\.(webp|png|jpg|jpeg|svg)$/i, "");
    if (!seen.has(basePath) || path.endsWith(".webp")) {
      seen.set(basePath, image);
    }
  }

  return Array.from(seen.values());
};
