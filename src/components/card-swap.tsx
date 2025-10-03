import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  onFrontChange?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-purple-400/20 bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
        customClass ?? ""
      } ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onFrontChange,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const isHoveredRef = useRef(false);

  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  const bringCardToFront = (clickedIdx: number) => {
    if (isAnimating) return;

    const currentOrder = order.current;
    const positionInOrder = currentOrder.indexOf(clickedIdx);

    // If already at front, do nothing
    if (positionInOrder === 0) return;

    setIsAnimating(true);

    // Clear any ongoing animations
    if (tlRef.current) {
      tlRef.current.kill();
    }
    stopInterval();

    const clickedEl = refs[clickedIdx].current!;
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setHoveredCard(null);
        isHoveredRef.current = false;
        // Restart the interval after animation completes
        startInterval();
      },
    });
    tlRef.current = tl;

    // 👇 Trigger text update immediately
    onFrontChange?.(clickedIdx);

    // Move clicked card down and out
    tl.to(clickedEl, {
      y: "+=500",
      duration: config.durDrop,
      ease: config.ease,
    });

    // Promote cards that were in front of the clicked card
    tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

    const cardsToPromote = currentOrder.slice(0, positionInOrder);
    cardsToPromote.forEach((idx, i) => {
      const el = refs[idx].current!;
      const newPosition = i + 1; // Shift by 1 position back
      const slot = makeSlot(
        newPosition,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${i * 0.15}`
      );
    });

    // Bring clicked card to front (position 0)
    const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
    tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(clickedEl, { zIndex: frontSlot.zIndex });
      },
      undefined,
      "return"
    );
    tl.to(
      clickedEl,
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        duration: config.durReturn,
        ease: config.ease,
      },
      "return"
    );

    // Update order
    tl.call(() => {
      const newOrder = [
        clickedIdx,
        ...cardsToPromote,
        ...currentOrder.slice(positionInOrder + 1),
      ];
      order.current = newOrder;
      onFrontChange?.(clickedIdx);
    });
  };

  const swap = () => {
    if (order.current.length < 2 || isHoveredRef.current || isAnimating) return;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current!;
    const tl = gsap.timeline();
    tlRef.current = tl;

    onFrontChange?.(rest[0]);

    tl.to(elFront, {
      y: "+=500",
      duration: config.durDrop,
      ease: config.ease,
    });

    tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current!;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(
      refs.length - 1,
      cardDistance,
      verticalDistance,
      refs.length
    );
    tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      "return"
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease,
      },
      "return"
    );

    tl.call(() => {
      order.current = [...rest, front];
      onFrontChange?.(rest[0]);
    });
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(swap, delay);
  };

  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current!,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onMouseEnter: () => {
            setHoveredCard(i);
            isHoveredRef.current = true;
            if (tlRef.current && !isAnimating) {
              tlRef.current.pause();
            }
            stopInterval();
          },
          onMouseLeave: () => {
            setHoveredCard(null);
            isHoveredRef.current = false;
            if (tlRef.current && !isAnimating) {
              tlRef.current.play();
            }
            if (!isAnimating) {
              startInterval();
            }
          },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
            bringCardToFront(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="absolute perspective-[900px] overflow-visible"
      style={{
        width,
        height,
        top: "65%",
        right: "-5%", // This pushes cards to the right, adjust percentage to show more/less
        transform: "translateY(-50%)",
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
