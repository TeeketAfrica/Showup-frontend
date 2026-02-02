import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { motion } from "framer-motion";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { CircleUser, MessageCircleMore, Mail } from "lucide-react";
import { checkUser, registerUser } from "@/store/actions/authAction";
import { useNavigate } from "react-router-dom";

export function PersonalDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { loading, exists } = useAppSelector((s) => s.auth);

  const [phone, setPhone] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleContinue = () => {
    if (!exists) {
      dispatch(checkUser({mobile: phone}));
    }else{
      navigate('/route')
    }
  };

  const isRegisterMode = exists === false;

  const handleRegister = () => {
    if (isRegisterMode) {
      if(form.firstName && form.lastName && form.email){
        dispatch(registerUser({
          mobile: phone,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
        }));
        navigate('/route')
      }else{
        alert("Please fill all fields");
      }
  }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 text-left">
      <div className="flex flex-col mb-4">
        <h2 className="text-sm font-semibold">Personal details</h2>
        <p className="text-sm text-muted-foreground">
          We are collecting this detail so we can properly identify you.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* PHONE FIELD (ALWAYS FIRST) */}
          <InputGroup className="bg-white py-5">
            <InputGroupAddon>
              <MessageCircleMore />
            </InputGroupAddon>
            <InputGroupInput
              type="tel"
              placeholder="Whatsapp no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>

          {/* 👇 SHOW REGISTRATION FIELDS IF USER NOT FOUND */}
          {isRegisterMode && (
            <>
              <InputGroup className="bg-white py-5">
                <InputGroupAddon>
                  <CircleUser />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup className="bg-white py-5">
                <InputGroupAddon>
                  <CircleUser />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup className="bg-white py-5">
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </InputGroup>
            </>
          )}
        </div>

        <Button
          size="lg"
          disabled={loading || phone.length < 10}
          onClick={isRegisterMode ? handleRegister : handleContinue}
          type="button"
        >
          {loading || phone.length < 10 ? "Checking..." : isRegisterMode ? "Register" : "Continue"}
        </Button>
      </form>
    </div>
  );
}
