import { Card } from "@/components/ui/card";
import { Header } from "@/components/app/Header";
import { PersonalDetails } from "@/components/page/home/PersonalDetails";

export function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          {/* Show up logo + description */}
          <Header />
          {/* Main content here */}
          <PersonalDetails />
        </Card>
      </div>

      {/* Footer / Step counter or progress area */}
      <div className="max-w-xl py-10">
       
      </div>
    </div>
  );
}
