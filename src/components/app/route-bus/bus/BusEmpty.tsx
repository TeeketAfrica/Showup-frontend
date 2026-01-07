import { Button } from "@/components/ui/button";
import noBus from "@/assets/noBus.png";
import notifyBus from "@/assets/notifyBus.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function BusEmpty() {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-left">
      <div className="flex flex-col gap-2 text-center mb-4">
        <img src={noBus} alt="No bus" className="w-20 h-20 mx-auto" />
        <h4 className="text-sm font-semibold">This trip is fully booked</h4>
        <p className="text-sm text-muted-foreground">
          The route you selected is currently unavailable for today. Please
          choose a different route or check back for upcoming trips.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 w-full">
        <Button variant="outline" size="lg" className="w-full cursor-pointer">
          Back
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button size="lg" className="w-full cursor-pointer">
              Notify me
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-sm">
            <AlertDialogHeader>
              <img src={notifyBus} alt="No bus" className="w-20 h-20 mx-auto" />
              <AlertDialogTitle className="flex w-full justify-center">
                You're on the list
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                If a seat opens up on the 5:00 AM bus, we'll alert you on
                WhatsApp at {"0817 *** ****"}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="grow" size="lg">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="grow" size="lg">
                Got it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
