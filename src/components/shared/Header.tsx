import Logo from "@/assets/Logo.svg";
import { CardDescription } from "@/components/ui/card";

export function Header() {
  return (
    <div className="flex flex-col gap-3 items-center text-center">
      <h1>
        <img src={Logo} alt="Showup Logo" className="h-6" />
      </h1>
      <CardDescription>
        We help you find the best bus routes to reach your destination
        effortlessly.
      </CardDescription>
    </div>
  );
}
