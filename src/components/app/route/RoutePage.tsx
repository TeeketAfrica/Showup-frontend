import { Card } from "@/components/ui/card";
import { Header } from "@/components/shared/Header";
import { Stepper } from "@/components/shared/Stepper";

export function RoutePage() {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          {/* Showup logo + description */}
          <Header />

          {/* Main content here */}
          <div className="bg-gray-50 rounded-xl p-4 text-left">

            {/* Body heading */}
            <div className="flex flex-col mb-4">
              <h2 className="text-sm font-semibold text-card-foreground">
                Route selection
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose your route first and then select the bus to take next.
              </p>
            </div>

            {/* Route selection */}
            <div className="flex flex-col gap-2">
                 
            </div>
            

          </div>
        </Card>
      </div>

      {/* Stepper UI to move between steps*/}
      <Stepper />
    </div>
  );
}
