type ProjectImageRef = {
  title: string;
  imageTitle?: string;
};

type GalleryImageRef = {
  label: string;
  imageTitle?: string;
  imageLabel?: string;
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

const getImageTitle = (project: ProjectImageRef) => project.imageTitle ?? project.title;

const getAsset = (assets: Record<string, string>, path: string) =>
  assets[`${path}.svg`] ?? assets[`${path}.png`];

export const getProjectCoverImage = (project: ProjectImageRef) =>
  getAsset(projectCoverImages, `../assets/work-placeholders/projects/${getImageTitle(project)}`);

export const getProjectGalleryImage = (project: ProjectImageRef, item: GalleryImageRef) =>
  getAsset(
    projectGalleryImages,
    `../assets/work-placeholders/project-gallery/${item.imageTitle ?? getImageTitle(project)} - ${
      item.imageLabel ?? item.label
    }`,
  );
