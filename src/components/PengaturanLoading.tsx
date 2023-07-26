"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { FormControl, FormItem, FormLabel } from "./ui/Form";
import { Skeleton } from "./ui/Skeleton";

export default function PengaturanLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-[98px] h-[24px]" />
        {/* <CardTitle>Profil Pengguna</CardTitle> */}
        {/* <CardDescription>
          Lengkapi data diri Anda sebelum mengajukan cuti
        </CardDescription> */}
        <Skeleton className="w-[120px] h-[20px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-[24px] h-[17px] mt-2 mb-3" />

          <Skeleton className="w-full h-10 border" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-[24px] h-[17px] mt-2 mb-3" />

          <Skeleton className="w-full h-10 border" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-[24px] h-[17px] mt-2 mb-3" />

          <Skeleton className="w-full h-10 border" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="w-[24px] h-[17px] mt-2 mb-3" />

            <Skeleton className="w-full h-10 border" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-[24px] h-[17px] mt-2 mb-3" />

            <Skeleton className="w-full h-10 border" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="w-[24px] h-[17px] mt-2 mb-3" />

          <Skeleton className="w-full h-10 border" />
        </div>

        {/* <FormField
          name="tandaTangan"
          render={({ field: { onChange, onBlur, name, value } }) => (
            <FormItem>
              <FormLabel>Tanda tangan</FormLabel>
              <div className="flex flex-col items-start gap-4 lg:flex lg:items-center lg:flex-row lg:gap-4">
                <FormControl>
                  <div className="relative w-[80%] h-[150px] md:w-[350px]">
                    {isLoading ? (
                      <Skeleton className="absolute w-full h-full border rounded-lg" />
                    ) : (
                      <SignatureCanvas
                        onBegin={onBlur}
                        penColor="black"
                        ref={(data) => setSignature(data)}
                        canvasProps={{
                          className: "border rounded-lg absolute w-full h-full",
                        }}
                      />
                    )}
                  </div>
                </FormControl>
                <div className="flex gap-4">
                  <Button
                    onClick={clearSignatureHandler}
                    type="button"
                    variant="outline"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={signatureDataHandler}
                    type="button"
                    variant="secondary"
                  >
                    Save
                  </Button>
                </div>
              </div>
              <div className="text-gray-500">
                <small>
                  Klik save terlebih dahulu untuk menyimpan data tanda tangan.
                </small>
              </div>
            </FormItem>
          )}
        /> */}
      </CardContent>
      <CardFooter>
        {/* <Button disabled={isLoadingSubmit || !signatureDataUrl} type="submit">
          {isLoadingSubmit && (
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}{" "}
          Submit
        </Button> */}
      </CardFooter>
    </Card>
  );
}
