import { useRouter } from "next/navigation";

import { Button } from "./ui/Button";
import { Icons } from "./Icons";

export default function VerifikasiButton({
  path,
  id,
}: {
  path: string;
  id: number;
}) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          router.push(`${path}${id}`);
        }}
      >
        <Icons.chevronRight />
      </Button>
    </div>
  );
}
