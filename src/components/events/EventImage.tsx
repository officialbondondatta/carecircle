"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface EventImageProps {
    src?: string | null;
    alt: string;
    sizes: string;
}

export default function EventImage({ src, alt, sizes }: EventImageProps) {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    let imageUrl = "";
    try {
        const url = new URL(src?.trim() || "");
        if (url.protocol === "https:" || url.protocol === "http:") {
            imageUrl = url.href;
        }
    } catch {
        // Missing and malformed URLs use the same fallback as failed downloads.
    }

    return (
        <div className="relative aspect-video overflow-hidden bg-carecircle-primary/10">
            {imageUrl && failedSrc !== imageUrl ? (
                <Image
                    key={imageUrl}
                    src={imageUrl}
                    alt={alt}
                    fill
                    unoptimized
                    sizes={sizes}
                    loading="eager"
                    className="object-cover"
                    onError={() => setFailedSrc(imageUrl)}
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-carecircle-primary/70" role="img" aria-label={`No image available for ${alt}`}>
                    <ImageOff className="size-8" aria-hidden="true" />
                    <span className="text-sm">No image available</span>
                </div>
            )}
        </div>
    );
}
