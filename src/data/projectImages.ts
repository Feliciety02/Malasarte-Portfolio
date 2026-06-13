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
  ["../assets/work-placeholders/projects/*.svg", "../assets/work-placeholders/projects/*.png"],
  {
    eager: true,
    import: "default",
  },
);

const projectGalleryImages = import.meta.glob<string>(
  [
    "../assets/work-placeholders/project-gallery/*.svg",
    "../assets/work-placeholders/project-gallery/*.png",
  ],
  {
    eager: true,
    import: "default",
  },
);

const socialMediaImages = import.meta.glob<string>(
  [
    "../assets/social-media-graphics/**/*.svg",
    "../assets/social-media-graphics/**/*.png",
    "../assets/social-media-graphics/**/*.jpg",
    "../assets/social-media-graphics/**/*.jpeg",
    "../assets/social-media-graphics/**/*.webp",
  ],
  {
    eager: true,
    import: "default",
  },
);

const getImageTitle = (project: ProjectImageRef) => project.imageTitle ?? project.title;

const getAsset = (assets: Record<string, string>, path: string) =>
  assets[`${path}.svg`] ??
  assets[`${path}.png`] ??
  assets[`${path}.jpg`] ??
  assets[`${path}.jpeg`] ??
  assets[`${path}.webp`];

export const getProjectCoverImage = (project: ProjectImageRef) =>
  getAsset(projectCoverImages, `../assets/work-placeholders/projects/${getImageTitle(project)}`);

export const getProjectGalleryImage = (project: ProjectImageRef, item: GalleryImageRef) =>
  item.imageUrl ??
  (item.assetPath
    ? getAsset(socialMediaImages, `../assets/social-media-graphics/${item.assetPath}`)
    : undefined) ??
  getAsset(
    projectGalleryImages,
    `../assets/work-placeholders/project-gallery/${item.imageTitle ?? getImageTitle(project)} - ${
      item.imageLabel ?? item.label
    }`,
  );

export const getSocialMediaProjectImages = (slug: string) =>
  Object.entries(socialMediaImages)
    .filter(([path]) => path.includes(`/social-media-graphics/${slug}/`))
    .sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map(([, image]) => image);
