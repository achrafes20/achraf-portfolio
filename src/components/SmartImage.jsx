import imageSizes from "../data/image-sizes.json";

// <img> qui renseigne automatiquement width/height (générés par `npm run images`)
// afin que le navigateur réserve l'espace avant le chargement : aucun décalage de mise en page.
export default function SmartImage({ src, alt, ...props }) {
  const size = imageSizes[src];
  return (
    <img
      src={src}
      alt={alt}
      width={size?.width}
      height={size?.height}
      decoding="async"
      {...props}
    />
  );
}
