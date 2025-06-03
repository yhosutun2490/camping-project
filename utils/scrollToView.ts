  export function scrollIntoElement({
    targetId,
    containerId,
    offset,
  }: {
    targetId: string;
    containerId: string;
    offset: number;
  }) {
    const el = document.getElementById(targetId);
    const container = document.getElementById(containerId);
    if (el && container) {
      const y = el.offsetTop - offset + 40;
      container.scrollTo({ top: y, behavior: "smooth" });
    }
  }