import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const createStar = (isMoving = true): Star => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 500 + 50;

      return {
        id: Math.random(),
        x:
          Math.cos(angle) * radius +
          (typeof window !== "undefined" ? window.innerWidth / 2 : 400),
        y:
          Math.sin(angle) * radius +
          (typeof window !== "undefined" ? window.innerHeight / 2 : 400),
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
    };

    const initialStaticStars = Array.from({ length: 200 }, () =>
      createStar(false)
    );
    setStaticStars(initialStaticStars);

    const initialMovingStars = Array.from({ length: 25 }, () =>
      createStar(true)
    );
    setMovingStars(initialMovingStars);

    let animationId: number;
    let lastTime = 0;
    const frameRate = 60;
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
              newX =
                Math.cos(angle) * radius +
                (typeof window !== "undefined" ? window.innerWidth / 2 : 400);
              newY =
                Math.sin(angle) * radius +
                (typeof window !== "undefined" ? window.innerHeight / 2 : 400);
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
  }, []);

  const renderStar = (star: Star, isStatic = false) => {
    const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 400;
    const centerY =
      typeof window !== "undefined" ? window.innerHeight / 2 : 400;

    const perspective = 1000;
    const projectedX = (star.x - centerX) * (perspective / star.z) + centerX;
    const projectedY = (star.y - centerY) * (perspective / star.z) + centerY;

    const size = Math.max(0.5, (1000 - star.z) / 200);
    const opacity = Math.min(1, ((1000 - star.z) / 1000) * star.brightness);
    const trailOpacity = opacity * 0.3;
    const trailLength = !isStatic ? (1000 - star.z) / 10 : 0;

    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 800;
    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 600;

    if (
      projectedX < -100 ||
      projectedX > windowWidth + 100 ||
      projectedY < -100 ||
      projectedY > windowHeight + 100 ||
      star.z > 700
    ) {
      return null;
    }

    return (
      <div key={star.id}>
        {!isStatic && trailLength > 1 && (
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
              ? `0 0 ${size * 4}px ${star.color}`
              : `0 0 ${size * 2}px ${star.color}`,
            filter: `blur(${Math.max(0, (size - 2) * 0.3)}px)`,
          }}
        />

        {!isStatic && size > 3 && (
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
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <div className="absolute inset-0">
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
