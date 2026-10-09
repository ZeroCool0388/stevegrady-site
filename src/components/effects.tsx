"use client";
import { useEffect } from "react";
import { animate } from "motion/mini";
export function Effects() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 1024px) and (pointer: fine)");
    let cleanups: (() => void)[] = [];
    let disposed = false;
    let generation = 0;
    const revealed = new WeakSet<Element>();
    function setup() {
      const current = ++generation;
      cleanups.forEach((fn) => fn());
      cleanups = [];
      document
        .getElementById("identity")
        ?.classList.toggle("compact", window.scrollY > 40);
      const scroll = () =>
        document
          .getElementById("identity")
          ?.classList.toggle("compact", window.scrollY > 40);
      window.addEventListener("scroll", scroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", scroll));
      if (reduced.matches) return;
      import("lenis").then(({ default: Lenis }) => {
        if (disposed || reduced.matches || generation !== current) return;
        const lenis = new Lenis({
          autoRaf: true,
          anchors: true,
          duration: 0.8,
        });
        cleanups.push(() => lenis.destroy());
      });
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting && !revealed.has(entry.target)) {
              revealed.add(entry.target);
              const animation = animate(
                entry.target as HTMLElement,
                {
                  opacity: [0, 1],
                  transform: ["translateY(12px)", "translateY(0)"],
                },
                { duration: 0.38, ease: "easeOut" },
              );
              cleanups.push(() => animation.stop());
              observer.unobserve(entry.target);
            }
        },
        { threshold: 0.08 },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!revealed.has(el)) observer.observe(el);
      });
      cleanups.push(() => observer.disconnect());
      if (!desktop.matches) return;
      const spot = document.getElementById("spotlight");
      const pointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        spot?.style.setProperty("--x", `${event.clientX}px`);
        spot?.style.setProperty("--y", `${event.clientY}px`);
      };
      window.addEventListener("pointermove", pointer, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", pointer));
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((el) => {
          const move = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            animate(
              el,
              {
                transform: `translate(${(event.clientX - rect.left - rect.width / 2) * 0.15}px, ${(event.clientY - rect.top - rect.height / 2) * 0.15}px)`,
              },
              { duration: 0.2 },
            );
          };
          const reset = () => {
            animate(
              el,
              { transform: "translate(0px, 0px)" },
              { duration: 0.2 },
            );
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", reset);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", reset);
            el.style.transform = "";
          });
        });
    }
    setup();
    reduced.addEventListener("change", setup);
    desktop.addEventListener("change", setup);
    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
      reduced.removeEventListener("change", setup);
      desktop.removeEventListener("change", setup);
    };
  }, []);
  return <div id="spotlight" className="spotlight" aria-hidden="true" />;
}
