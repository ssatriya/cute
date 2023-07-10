import { useRouter } from "next/navigation";

import { Button } from "./ui/Button";

export default function VerifikasiBerkasButton({ id }: { id: number }) {
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => {
        router.push(`/verifikator/verifikasi-berkas/${id}`);
      }}
    >
      Cek
    </Button>
  );
}
