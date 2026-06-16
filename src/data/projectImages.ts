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
  ["../assets/projects/covers/*.svg", "../assets/projects/covers/*.png", "../assets/projects/covers/*.jpg", "../assets/projects/covers/*.jpeg"],
  { eager: true, import: "default" },
);

const projectGalleryImages = import.meta.glob<string>(
  ["../assets/projects/gallery/*.svg", "../assets/projects/gallery/*.png", "../assets/projects/gallery/*.jpg", "../assets/projects/gallery/*.jpeg"],
  {
    eager: true,
    import: "default",
  },
);

const socialMediaImages = import.meta.glob<string>(
  [
    "../assets/social/**/*.svg",
    "../assets/social/**/*.png",
    "../assets/social/**/*.jpg",
    "../assets/social/**/*.jpeg",
    "../assets/social/**/*.webp",
  ],
  { eager: true, import: "default" },
);

const getImageTitle = (project: ProjectImageRef) => project.imageTitle ?? project.title;

const getAsset = (assets: Record<string, string>, path: string) =>
  assets[`${path}.svg`] ??
  assets[`${path}.png`] ??
  assets[`${path}.jpg`] ??
  assets[`${path}.jpeg`] ??
  assets[`${path}.webp`];

export const getProjectCoverImage = (project: ProjectImageRef) =>
  getAsset(projectCoverImages, `../assets/projects/covers/${getImageTitle(project)}`);

export const getProjectGalleryImage = (project: ProjectImageRef, item: GalleryImageRef) =>
  item.imageUrl ??
  (item.assetPath
    ? getAsset(socialMediaImages, `../assets/social/${item.assetPath}`)
    : undefined) ??
  getAsset(
    projectGalleryImages,
    `../assets/projects/gallery/${item.imageTitle ?? getImageTitle(project)} - ${
      item.imageLabel ?? item.label
    }`,
  );

export const getSocialMediaProjectImages = (slug: string) =>
  Object.entries(socialMediaImages)
    .filter(([path]) => path.includes(`/social/${slug}/`))
    .sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map(([, image]) => image);
