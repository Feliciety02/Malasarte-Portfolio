import { accentLastWord } from "@/components/site/HeadingAccent";
import { getProjectCoverImage } from "@/data/projectImages";
import { getBrandingCoverImage } from "@/data/projects";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import {
  BrandColorPalette,
  BrandTypographyBlock,
  BrandPersonalityList,
  BrandSymbolBlock,
} from "./blocks/BrandBlocks";
import type { SectionProps } from "../types/templates";

export function IdentitySection({ project, sectionNumber }: SectionProps) {
  const branding = project.branding;
  const identityImage =
    branding?.symbol?.image ?? getBrandingCoverImage(project) ?? getProjectCoverImage(project);
  const identityImages = branding?.identityImages?.length
    ? branding.identityImages
    : identityImage
      ? [
          {
            src: identityImage,
            alt: branding?.symbol?.title ?? `${project.title} visual identity`,
          },
        ]
      : [];
  const hasRichBranding =
    identityImages.length > 0 ||
    Boolean(branding?.symbol) ||
    Boolean(branding?.colors?.length) ||
    Boolean(branding?.typography) ||
    Boolean(branding?.personality?.length);

  return (
    <SectionAnchor id="identity">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Identity" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Visual identity")}
        </h2>
      </FadeIn>
      {hasRichBranding ? (
        <div className="mt-8 space-y-10">
          {branding?.symbol?.image ? (
            <FadeIn>
              <div className="flex items-center justify-center rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-6">
                <img
                  src={branding.symbol.image}
                  alt={branding.symbol.title ?? `${project.title} logo symbol`}
                  className="max-h-48 w-full object-contain sm:max-h-64 md:max-h-72"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ) : null}
          {identityImages.map((image, index) => (
            <FadeIn key={image.src} delay={index * 0.06}>
              {image.title || image.description ? (
                <div className="mb-4 max-w-3xl">
                  {image.title ? (
                    <h3 className="font-display text-xl font-semibold text-white/90 md:text-2xl">
                      {image.title}
                    </h3>
                  ) : null}
                  {image.description ? (
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {image.description}
                    </p>
                  ) : null}
                </div>
              ) : null}
              <div className="flex items-center justify-center rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-6">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
          {!identityImages.length && (
            <>
              {branding?.symbol ? <BrandSymbolBlock symbol={branding.symbol} /> : null}
              {branding?.colors?.length ? <BrandColorPalette colors={branding.colors} /> : null}
              {branding?.typography ? <BrandTypographyBlock typography={branding.typography} /> : null}
              {branding?.personality?.length ? (
                <BrandPersonalityList personality={branding.personality} />
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </SectionAnchor>
  );
}
