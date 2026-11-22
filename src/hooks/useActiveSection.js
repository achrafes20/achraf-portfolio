import { useEffect, useState } from "react";

// Renvoie l'identifiant de la section actuellement visible, pour surligner
// le lien correspondant dans la navigation.
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = idsKey.split("|");
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0 || !("IntersectionObserver" in window)) return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        if (current) setActiveId(current);
      },
      // Une section est « active » quand elle traverse la bande située juste sous la navigation.
      { rootMargin: "-35% 0px -60% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
