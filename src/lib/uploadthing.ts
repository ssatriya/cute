import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { ExpandedRouteConfig } from "@/types";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();

const generatePermittedFileTypes = (config?: ExpandedRouteConfig) => {
  const fileTypes = config ? Object.keys(config) : [];

  const maxFileCount = config
    ? Object.values(config).map((v) => v.maxFileCount)
    : [];

  return { fileTypes, multiple: maxFileCount.some((v) => v && v > 1) };
};

const INTERNAL_doFormatting = (config?: ExpandedRouteConfig): string => {
  if (!config) return "";

  const allowedTypes = Object.keys(config) as (keyof ExpandedRouteConfig)[];

  const formattedTypes = allowedTypes.map((f) => (f === "blob" ? "file" : f));

  const key = allowedTypes[0];
  const formattedKey = formattedTypes[0];

  const { maxFileSize, maxFileCount } = config[key]!;

  // Format multi-type uploader label as "Supports videos, images and files";
  // Add max file size assuming the file size are the same for different type of file;
  if (formattedTypes.length > 1) {
    const lastType = formattedTypes.pop();
    return `${formattedTypes.join("s, ")} and ${lastType}s, max ${maxFileSize}`;
  }

  // Single type uploader label

  if (maxFileCount && maxFileCount > 1) {
    return `${formattedKey}s up to ${maxFileSize}, max ${maxFileCount}`;
  } else {
    return `${formattedKey} (${maxFileSize})`;
  }
};

const capitalizeStart = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const allowedContentTextLabelGenerator = (
  config?: ExpandedRouteConfig
): string => {
  return capitalizeStart(INTERNAL_doFormatting(config));
};
