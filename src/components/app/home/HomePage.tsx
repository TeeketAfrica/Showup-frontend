import { Card } from "@/components/ui/card";
import { PersonalDetails } from "@/components/app/home/PersonalDetails";
import BasicLayout from "@/components/Layout.tsx/BasicLayout";

export function HomePage() {

  return (
    <BasicLayout>
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          <PersonalDetails />            
        </Card>
    </BasicLayout>
  );
}
