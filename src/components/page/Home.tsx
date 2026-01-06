import Logo from "@/assets/Logo.svg";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
            {/* Show up logo + description */}
          <CardHeader className="flex justify-center">
            <div className="flex flex-col gap-3 items-center text-center">
                <h1>
                    <img src={Logo} alt="Showup Logo" className="h-6" />
                </h1>
              <CardDescription>
                We help you find the best bus routes to reach your destination
                effortlessly.
              </CardDescription>
            </div>
          </CardHeader>

        {/* Main content here */}
          <div className="bg-gray-50 rounded-xl p-4">

                {/* Form heading */}
                <div className="flex flex-col ">
                    <h2 className="text-sm font-semibold"> Personal details </h2>
                    <p className="text-sm text-muted-foreground">We are collecting this detail so we can properly identify you when you showup</p>
                </div>


          </div>
        </Card>
      </div>

      {/* Footer / Step counter or progress area */}
      <div className="h-11">Step counter goes here</div>
    </div>
  );
}
