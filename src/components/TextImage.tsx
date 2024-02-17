import { useEffect, useRef } from "react";

const coords = "411,514,558,566";

const TextImage = () => {
  const elRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null); // Ref to the overlay element

  useEffect(() => {
    const calculateOverlayPosition = () => {
      // Remove existing overlay before creating a new one
      if (overlayRef.current) {
        overlayRef.current.remove();
      }

      if (elRef.current) {
        const imgRect = elRef.current.getBoundingClientRect();
        const [x1, y1, x2, y2] = coords.split(",").map(Number);

        const scaleX = imgRect.width / 1237; // 1237 is the original width of the image
        const scaleY = imgRect.height / 1224; // 1224 is the original height of the image

        const imageX1 = imgRect.left + x1 * scaleX;
        const imageY1 = imgRect.top + y1 * scaleY;
        const imageX2 = imgRect.left + x2 * scaleX;
        const imageY2 = imgRect.top + y2 * scaleY;

        // Create a new overlay element
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.style.position = "absolute";
        overlay.style.left = `${imageX1}px`;
        overlay.style.top = `${imageY1}px`;
        overlay.style.width = `${imageX2 - imageX1}px`;
        overlay.style.height = `${imageY2 - imageY1}px`;

        // Store the reference to the overlay element
        overlayRef.current = overlay;

        elRef.current.parentElement?.appendChild(overlay);
      }
    };

    calculateOverlayPosition();

    window.addEventListener("resize", calculateOverlayPosition);

    return () => {
      window.removeEventListener("resize", calculateOverlayPosition);
    };
  }, []);

  return (
    <div>
      <img
        ref={elRef}
        src={
          "https://clicflyercdnlive-vrz.azureedge.net/appimages/flyerpages/flyerprocessing_240203190522680_1_ow.jpg"
        }
        alt="Flyer"
      />
    </div>
  );
};

export default TextImage;
