import Logo from "@/assets/Logo.svg";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";

export function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center">
        <Card className="shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          <CardHeader className="flex justify-center">
            <div className="max-w-sm flex flex-col gap-3 items-center text-center">
                <img src={Logo} alt="Showup Logo" className="h-6" />
                <CardDescription>
                We help you find the best bus routes to reach your destination
                effortlessly.
                </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Footer / Step counter or progress area */}
      <div className="h-11">Step counter goes here</div>
    </div>
  );
}
