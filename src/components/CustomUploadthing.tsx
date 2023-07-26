// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";

import {
  allowedContentTextLabelGenerator,
  useUploadThing,
} from "@/lib/uploadthing";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./Icons";
import { toast } from "@/hooks/use-toast";

interface CustomUploadthingProps {
  setFileData: (
    fileData: {
      fileKey: string;
      fileUrl: string;
    }[]
  ) => void;
  fileData: {
    fileKey: string;
    fileUrl: string;
  }[];
}

export function CustomUploadthing({
  setFileData,
  fileData,
}: CustomUploadthingProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [paths, setPaths] = useState<
    {
      blob: string;
      path: File;
    }[]
  >([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // setFiles(acceptedFiles);
      setFiles((prev) => prev.concat(acceptedFiles));

      setPaths((prev) =>
        prev.concat(
          acceptedFiles.map((file) => ({
            blob: URL.createObjectURL(file),
            path: file,
          }))
        )
      );
    },
    [setFiles, setPaths]
  );

  const fileTypes = ["image", "blob"];

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "mediaPost",
    {
      onClientUploadComplete: (res) => {
        if (res) {
          setFiles([]);
          setPaths([]);
          setFileData(res);
        }
      },
      onUploadError: (error) => {
        return toast({
          title: "Gagal mengunggah file.",
          description:
            "File gagal diunggah, pastikan ukurang dibawah 4MB dan coba lagi nanti.",
          variant: "destructive",
        });
      },
      // onUploadProgress: (progress) => {
      //   setProgressValue(progress);
      // },
    }
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const deleteFile = (fileKey: FileWithPath) => {
    setFiles((prev) => prev.filter((file) => file.path !== fileKey.path));
    setPaths((prev) => prev.filter((file) => file.path !== fileKey));
  };

  return (
    <div
      className={cn(
        "mt-2 flex flex-col items-center justify-center rounded-lg border-dashed border p-4",
        isDragActive ? "bg-blue-600/10" : ""
      )}
    >
      <div className="w-full h-full">
        <div
          className="flex flex-col items-center justify-center w-full h-full py-4 text-center rounded-lg hover:bg-foreground/5"
          {...getRootProps()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-12 h-12 mx-auto text-gray-400"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="flex mt-4 text-sm leading-6">
            <label
              htmlFor="file-upload"
              className="relative font-semibold cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
            >
              {`Choose files`}
              <input
                className="sr-only"
                {...getInputProps()}
                onChange={(e) => {
                  if (!e.target.files) return;
                  void startUpload(files);
                }}
              />
            </label>
            <p className="pl-1">{`or drag and drop`}</p>
          </div>
          <div className="h-[1.25rem] my-1">
            <p className="text-xs leading-5">
              {allowedContentTextLabelGenerator(permittedFileInfo?.config)}
            </p>
          </div>
          {files.length > 0 && (
            <>
              <div className="flex justify-center my-2">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!files) return;

                    void startUpload(files);
                  }}
                >
                  <span className="px-3 py-2 ">
                    {isUploading ? (
                      <Spinner />
                    ) : (
                      `Upload ${files.length} file${
                        files.length === 1 ? "" : "s"
                      }`
                    )}
                  </span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {paths.length > 0 && (
        <h2 className="mt-2 mb-2 text-sm">Selected files</h2>
      )}
      <div className="flex gap-4">
        {paths.length > 0 &&
          paths.map((file) => (
            <div key={file.blob} className="flex">
              <div className="absolute flex">
                <Button
                  className="z-10 opacity-45 bg-black/30 hover:bg-black/50"
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteFile(file.path)}
                >
                  <Icons.close className="text-white" />
                </Button>
                {/* <Button
              variant="outline"
              className="z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!files) return;
                
                void startUpload(files);
              }}
              >
              Upload
            </Button> */}
              </div>
              <Image
                width={100}
                height={50}
                style={{ objectFit: "contain" }}
                alt="path"
                src={file.blob}
                className="relative rounded-lg hover:opacity-90 bg-secondary"
              />
            </div>
          ))}
      </div>
      {fileData.length > 0 && <h2 className="my-2 text-sm">Uploaded files</h2>}
      <div className="flex gap-4">
        {fileData.length > 0 &&
          fileData.map((file) => {
            return (
              <div key={file.fileUrl}>
                <a href={file.fileUrl} target="__blank">
                  <Image
                    width={100}
                    height={50}
                    style={{ objectFit: "contain" }}
                    alt="path"
                    src={file.fileUrl}
                    className="relative rounded-lg hover:opacity-90 bg-secondary"
                  />
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const Spinner = () => {
  return (
    <svg
      className="w-5 h-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 576 512"
    >
      <path
        fill="currentColor"
        d="M256 32C256 14.33 270.3 0 288 0C429.4 0 544 114.6 544 256C544 302.6 531.5 346.4 509.7 384C500.9 399.3 481.3 404.6 465.1 395.7C450.7 386.9 445.5 367.3 454.3 351.1C470.6 323.8 480 291 480 255.1C480 149.1 394 63.1 288 63.1C270.3 63.1 256 49.67 256 31.1V32z"
      />
    </svg>
  );
};
