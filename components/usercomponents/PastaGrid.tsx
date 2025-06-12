import * as motion from "motion/react-client";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GridGalleryProps {
  className?: string;
}

export default function PastaGrid({ className }: GridGalleryProps) {
  // Direct import of images - adjust these paths to match your project structure
  const images = [
    { src: "/pasta1.webp", alt: "The best Creamy Ragu pasta in addis ababa" },
    { src: "/pasta2.webp", alt: "The best Chicken Alfredo pasta in addis ababa" },
    { src: "/pasta3.webp", alt: "The best Polpettini pasta in addis ababa" },
    { src: "/pasta4.webp", alt: "The best Al Pomodoro pasta in addis ababa" },
    { src: "/pasta5.webp", alt: "The best Ragu pasta in addis ababa" },
    { src: "/pasta6.webp", alt: "The best Pesto Pasta with Fish pasta in addis ababa" },
    { src: "/pasta7.webp", alt: "The best Mushroom Pasta pasta in addis ababa" },
    { src: "/pasta8.webp", alt: "The best Arrabbiata pasta in addis ababa" },
  ];

  // For demonstration, we'll use placeholder images if the actual images aren't available
  const getImageSrc = (index: number) => {
    return images[index]?.src || `/placeholder.svg?height=${index % 2 === 0 ? 400 : 500}&width=500`;
  };

  const getImageAlt = (index: number) => {
    return images[index]?.alt || `Gallery image ${index + 1}`;
  };

  return (
    <div className={cn("w-full max-w-7xl mx-auto p-2", className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <motion.div
            className="aspect-[4/3] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(0) || "/placeholder.svg"}
              alt={getImageAlt(0)}
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="aspect-[4/5] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(1) || "/placeholder.svg"}
              alt={getImageAlt(1)}
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <motion.div
            className="aspect-[4/5] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(2) || "/placeholder.svg"}
              alt={getImageAlt(2)}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="aspect-[4/3] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(3) || "/placeholder.svg"}
              alt={getImageAlt(3)}
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <motion.div
            className="aspect-[4/3] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(4) || "/placeholder.svg"}
              alt={getImageAlt(4)}
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="aspect-[4/5] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(5) || "/placeholder.svg"}
              alt={getImageAlt(5)}
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-4">
          <motion.div
            className="aspect-[4/5] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(6) || "/placeholder.svg"}
              alt={getImageAlt(6)}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="aspect-[4/3] bg-black w-full overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={getImageSrc(7) || "/placeholder.svg"}
              alt={getImageAlt(7)}
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
