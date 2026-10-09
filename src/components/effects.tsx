"use client";
import { useEffect } from "react";
import { animate } from "motion";

export function Effects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (reduced.matches) return;
      let disposed = false;
      let destroyScroll = () => {};
      void import("lenis").then(({ default: Lenis }) => {
        if (disposed) return;
        const lenis = new Lenis({
          autoRaf: true,
          anchors: { offset: 0 },
          duration: 0.95,
        });
        destroyScroll = () => lenis.destroy();
      });
      const revealElements = [
        ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
      ];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const bounds = element.getBoundingClientRect();
              if (bounds.top > 100) {
                animate(
                  element,
                  { transform: ["translateY(24px)", "translateY(0px)"] },
                  { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                );
              }
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealElements.forEach((e) => observer.observe(e));
      const lines = [
        ...document.querySelectorAll<HTMLElement>(".hero-line > span"),
      ];
      lines.forEach((line, i) =>
        animate(
          line,
          { transform: ["translateY(12px)", "translateY(0px)"] },
          { duration: 0.7, delay: i * 0.065, ease: [0.22, 1, 0.36, 1] },
        ),
      );
      const spotlight = document.querySelector<HTMLElement>(".spotlight");
      const move = (e: PointerEvent) => {
        if (!fine.matches || !spotlight) return;
        spotlight.style.setProperty("--pointer-x", `${e.clientX}px`);
        spotlight.style.setProperty("--pointer-y", `${e.clientY}px`);
      };
      document.addEventListener("pointermove", move, { passive: true });
      const magnets = [
        ...document.querySelectorAll<HTMLElement>("[data-magnetic]"),
      ];
      const handlers = magnets.map((el) => {
        const enter = (e: PointerEvent) => {
          if (!fine.matches) return;
          const b = el.getBoundingClientRect();
          el.style.translate = `${(e.clientX - b.left - b.width / 2) * 0.12}px ${(e.clientY - b.top - b.height / 2) * 0.18}px`;
        };
        const leave = () => {
          el.style.translate = "0px 0px";
        };
        el.addEventListener("pointermove", enter);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", enter);
          el.removeEventListener("pointerleave", leave);
          leave();
        };
      });
      cleanup = () => {
        disposed = true;
        destroyScroll();
        observer.disconnect();
        document.removeEventListener("pointermove", move);
        handlers.forEach((fn) => fn());
        document
          .querySelectorAll<HTMLElement>("[data-reveal], .hero-line > span")
          .forEach((el) => (el.style.transform = "none"));
      };
    };
    setup();
    reduced.addEventListener("change", setup);
    fine.addEventListener("change", setup);
    return () => {
      cleanup();
      reduced.removeEventListener("change", setup);
      fine.removeEventListener("change", setup);
    };
  }, []);
  return <div className="spotlight" aria-hidden="true" />;
}
