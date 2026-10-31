import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Trigger only once */
  once?: boolean;
  /** IntersectionObserver rootMargin */
  margin?: string;
};

/**
 * Track whether an element is visible in the viewport.
 */
const useInView = ({
  once = true,
  margin = "-100px",
}: UseInViewOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin]);

  return { ref, inView };
};

export default useInView;
