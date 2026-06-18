import { accentLastWord } from "@/components/site/HeadingAccent";
import { getProjectCoverImage } from "@/data/projectImages";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import {
  BrandSymbolBlock,
  BrandColorPalette,
  BrandTypographyBlock,
  BrandPersonalityList,
} from "./blocks/BrandBlocks";
import type { SectionProps } from "../types/templates";

export function IdentitySection({ project, sectionNumber }: SectionProps) {
  const branding = project.branding;
  const identityImage = branding?.symbol?.image ?? getProjectCoverImage(project);
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
          Visual <em>identity</em>
        </h2>
      </FadeIn>
      {hasRichBranding ? (
        <div className="mt-8 space-y-14">
          {identityImages.map((image, index) => (
            <FadeIn key={image.src} delay={index * 0.06}>
              <figure>
                {image.title || image.description ? (
                  <figcaption className="mb-5 max-w-3xl">
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
                  </figcaption>
                ) : null}
                <div className="flex min-h-[28rem] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-3 shadow-sm sm:p-5 md:min-h-[40rem] md:p-8">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </figure>
            </FadeIn>
          ))}
          {branding?.symbol && !identityImages.length ? (
            <BrandSymbolBlock symbol={branding.symbol} />
          ) : null}
          {branding?.colors?.length ? <BrandColorPalette colors={branding.colors} /> : null}
          {branding?.typography ? <BrandTypographyBlock typography={branding.typography} /> : null}
          {branding?.personality?.length ? (
            <BrandPersonalityList personality={branding.personality} />
          ) : null}
        </div>
      ) : null}
    </SectionAnchor>
  );
}
