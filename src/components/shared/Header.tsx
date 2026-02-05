import Logo from "@/assets/Logo.svg";
import { CardDescription } from "@/components/ui/card";

export function Header({ noDescription }: { noDescription?: boolean }) {
  return (
    <div className="flex flex-col gap-3 items-center text-center z-[999]">
      <h1>
        <img src={Logo} alt="Showup Logo" className="h-6" />
      </h1>
      {!noDescription && (
        <CardDescription>
          We help you find the best bus routes to reach your destination
          effortlessly.
        </CardDescription>
      )}
    </div>
  );
}
