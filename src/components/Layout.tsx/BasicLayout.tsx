import { Header } from "@/components/shared/Header";
import { Stepper } from "@/components/shared/Stepper";

interface BasicLayoutProps{
    children: React.ReactNode
}

const BasicLayout = ({children}:BasicLayoutProps) => {

  return (
    <div className="flex flex-col items-center h-screen">
        <div className="fixed pt-8 bg-white z-[9999]">
            <Stepper />             
            <Header />      
        </div>
     
        <div className="container pt-[25vh] flex-1 flex flex-col items-center">
            {children}
        </div>
    </div>
  );
}


export default BasicLayout