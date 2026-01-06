import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { CircleUser, MessageCircleMore } from "lucide-react";

export function PersonalDetails() {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-left">
      {/* Body heading */}

      <div className="flex flex-col mb-4">
        <h2 className="text-sm font-semibold text-card-foreground">
          Personal details
        </h2>
        <p className="text-sm text-muted-foreground">
          We are collecting this detail so we can properly identify you when you
          showup.
        </p>
      </div>

      <form name="personal-details" className="flex flex-col gap-4">
        {/* Input fields */}
        <div className="flex flex-col gap-2">
          <InputGroup className="bg-white py-5 shadow-none ring-0 placeholder:text-gray-400">
            <InputGroupAddon>
              <CircleUser className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput type="text" placeholder="Your name" />
          </InputGroup>

          <InputGroup className="bg-white py-5 shadow-none ring-0 placeholder:text-gray-400">
            <InputGroupAddon>
              <MessageCircleMore className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput type="tel" placeholder="Whatsapp no." />
          </InputGroup>
          <p className="text-xs text-muted-foreground">
            We are going to send your{" "}
            <span className="text-gray-900 font-medium">payment receipt</span>{" "}
            and{" "}
            <span className="text-gray-900 font-medium">
              {" "}
              transportation details{" "}
            </span>{" "}
            here.
          </p>
        </div>

        {/* Button */}

        <Button size="lg" className="cursor-pointer">
          {" "}
          Continue
        </Button>
      </form>
    </div>
  );
}
