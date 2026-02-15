import { Button } from "@/components/ui/button";
import noBus from "@/assets/noBus.png";
import notifyBus from "@/assets/notifyBus.png";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom";
import { maskPhoneNumber } from "@/lib/utils";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { notifyMe } from "@/store/actions/tripActions";

export function BusEmpty({phone, userId, routeId}:{phone:string, userId:string, routeId:string}) {
  const [open, setOpen] = useState(false)
  const [isNotifying, setIsNotifying] = useState(false)
  const [hasNotified, setHasNotified] = useState(false)
  const dispatch = useAppDispatch()

  const handleNotifyMe = async ()=>{
    const payload ={
      user_id: userId,
      route_id: routeId
    }
    try {
      setIsNotifying(true)
      await dispatch(notifyMe(payload))
      setIsNotifying(false)
      setHasNotified(true)
      setOpen(true)
    } catch (error) {
      console.log(error)
      setIsNotifying(false)
    }
  }
  
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
      <div className={`grid ${hasNotified ? 'grid-cols-1': 'grid-cols-2'} gap-4 mt-6 w-full`}>
        <Link to='/'>
          <Button variant="outline" size="lg" className="w-full cursor-pointer">
            Back
          </Button>                      
        </Link>
        {
          !hasNotified &&
          <Button onClick={handleNotifyMe} disabled={isNotifying || hasNotified} size="lg" className="w-full cursor-pointer">
            {isNotifying ?"Please Wait ..." : "Notify me"}
          </Button>          
        }


            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-sm">

                <div className="w-full flex flex-col gap-4 items-center justify-center">
                  <img src={notifyBus} alt="No bus" className="w-20 h-20 mx-auto" />

                  <p className="font-medium text-[20px]">You're on the list</p>

                  <p className="text-center">
                    We'll alert you on
                    WhatsApp at {maskPhoneNumber(phone)} of the next available bus along the route you selected.
                  </p>                  
                </div>

  
                <DialogFooter>
                  <div className="flex w-full justify-between items-center gap-4 flex-col">
                    <Button onClick={()=>setOpen(false)} variant={'outline'} className="grow w-full" size="lg">
                      Cancel
                    </Button>
                    <Button onClick={()=>setOpen(false)} className="grow w-full" size="lg">
                      Got It
                    </Button>

                  </div>                  
                </DialogFooter>

              </DialogContent>
            </Dialog>
      </div>
    </div>
  );
}
