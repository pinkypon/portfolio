import React, { useState, useEffect, useMemo, useCallback } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  z: number;
  speed: number;
  color: string;
  brightness: number;
  trailLength: number;
  isMoving: boolean;
}

const StarfieldAnimation: React.FC = () => {
  const [movingStars, setMovingStars] = useState<Star[]>([]);
  const [staticStars, setStaticStars] = useState<Star[]>([]);

  // Detect if mobile for reduced star count
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    );
  }, []);

  // Reduce star counts on mobile
  const staticStarCount = isMobile ? 100 : 200;
  const movingStarCount = isMobile ? 15 : 25;

  // Cache center coordinates
  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 400;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

  const createStar = useCallback(
    (isMoving = true): Star => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 500 + 50;

      return {
        id: Math.random(),
        x: Math.cos(angle) * radius + centerX,
        y: Math.sin(angle) * radius + centerY,
        z: Math.random() * 1000 + 1,
        speed: isMoving ? Math.random() * 3 + 0.5 : 0,
        color:
          Math.random() < 0.4
            ? "#ffffff"
            : Math.random() < 0.7
            ? "#ffff99"
            : "#ffd700",
        brightness: Math.random() * 0.8 + 0.2,
        trailLength: Math.random() * 80 + 20,
        isMoving: isMoving,
      };
    },
    [centerX, centerY]
  );

  useEffect(() => {
    const initialStaticStars = Array.from({ length: staticStarCount }, () =>
      createStar(false)
    );
    setStaticStars(initialStaticStars);

    const initialMovingStars = Array.from({ length: movingStarCount }, () =>
      createStar(true)
    );
    setMovingStars(initialMovingStars);

    let animationId: number;
    let lastTime = 0;
    // Reduce frame rate on mobile
    const frameRate = isMobile ? 30 : 60;
    const frameInterval = 1000 / frameRate;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        setMovingStars((prevStars) =>
          prevStars.map((star) => {
            let newZ = star.z - star.speed;
            let newX = star.x;
            let newY = star.y;

            if (newZ <= 0) {
              newZ = 1000;
              const angle = Math.random() * Math.PI * 2;
              const radius = Math.random() * 500 + 50;
              newX = Math.cos(angle) * radius + centerX;
              newY = Math.sin(angle) * radius + centerY;
            }

            return {
              ...star,
              x: newX,
              y: newY,
              z: newZ,
            };
          })
        );
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [
    createStar,
    staticStarCount,
    movingStarCount,
    isMobile,
    centerX,
    centerY,
  ]);

  const renderStar = useCallback(
    (star: Star, isStatic = false) => {
      const perspective = 1000;
      const projectedX = (star.x - centerX) * (perspective / star.z) + centerX;
      const projectedY = (star.y - centerY) * (perspective / star.z) + centerY;

      const size = Math.max(0.5, (1000 - star.z) / 200);
      const opacity = Math.min(1, ((1000 - star.z) / 1000) * star.brightness);
      const trailOpacity = opacity * 0.3;
      const trailLength = !isStatic ? (1000 - star.z) / 10 : 0;

      const windowWidth =
        typeof window !== "undefined" ? window.innerWidth : 800;
      const windowHeight =
        typeof window !== "undefined" ? window.innerHeight : 600;

      // Early return for off-screen stars
      if (
        projectedX < -100 ||
        projectedX > windowWidth + 100 ||
        projectedY < -100 ||
        projectedY > windowHeight + 100 ||
        star.z > 700
      ) {
        return null;
      }

      // Simplify rendering on mobile - skip glow effects
      const showGlow = !isMobile && !isStatic && size > 3;
      const showTrail = !isMobile && !isStatic && trailLength > 1;

      return (
        <div key={star.id}>
          {showTrail && (
            <div
              className="absolute"
              style={{
                left: projectedX,
                top: projectedY,
                width: `${Math.max(1, trailLength)}px`,
                height: "1px",
                background: `linear-gradient(90deg, ${star.color}${Math.floor(
                  trailOpacity * 255
                )
                  .toString(16)
                  .padStart(2, "0")} 0%, transparent 100%)`,
                transform: `translate(-50%, -50%) rotate(${Math.atan2(
                  projectedY - centerY,
                  projectedX - centerX
                )}rad)`,
                transformOrigin: "left center",
                willChange: "transform",
              }}
            />
          )}

          <div
            className="absolute rounded-full"
            style={{
              left: projectedX,
              top: projectedY,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: star.color,
              opacity: isStatic ? opacity * 0.7 : opacity,
              transform: "translate(-50%, -50%)",
              boxShadow: !isStatic
                ? `0 0 ${size * (isMobile ? 2 : 4)}px ${star.color}`
                : `0 0 ${size * 2}px ${star.color}`,
              filter: isMobile
                ? "none"
                : `blur(${Math.max(0, (size - 2) * 0.3)}px)`,
              willChange: "transform",
            }}
          />

          {showGlow && (
            <div
              className="absolute rounded-full"
              style={{
                left: projectedX,
                top: projectedY,
                width: `${size * 2.5}px`,
                height: `${size * 2.5}px`,
                background: `radial-gradient(circle, ${star.color}15 0%, transparent 70%)`,
                transform: "translate(-50%, -50%)",
                opacity: opacity * 0.4,
                willChange: "transform",
              }}
            />
          )}
        </div>
      );
    },
    [centerX, centerY, isMobile]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <div className="absolute inset-0" style={{ willChange: "contents" }}>
        {staticStars.map((star) => renderStar(star, true))}
        {movingStars.map((star) => renderStar(star, false))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
};

export default StarfieldAnimation;
