import { Button } from "./components/Button.jsx";
import { useEffect, useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

export const PaymentButton = () => {
  const [isPanFulfilled, setIsPanFulfilled] = useState(false);
  const [isCvvFulfilled, setIsCvvFulfilled] = useState(false);
  const [isExpFulfilled, setIsExpFulfilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    paygreenjs.attachEventListener(
      paygreenjs.Events.PAN_FIELD_FULFILLED,
      () => {
        setIsPanFulfilled(true);
      }
    );
    paygreenjs.attachEventListener(
      paygreenjs.Events.CVV_FIELD_FULFILLED,
      () => {
        setIsCvvFulfilled(true);
      }
    );
    paygreenjs.attachEventListener(
      paygreenjs.Events.EXP_FIELD_FULFILLED,
      () => {
        setIsExpFulfilled(true);
      }
    );
  }, []);

  const handlePay = () => {
    // paygreenjs.submitPayment();
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <Button disabled className="w-full  bg-gradient-to-r from-[#e2fc26] to-[#f2e526] text-black">
        <Loader2 className="mr-2 h-4 w-4 animate-spin " />
        Transaction Processing...
      </Button>
    );
  }

  const areAllFieldsFulfilled =
    isPanFulfilled && isCvvFulfilled && isExpFulfilled;

  return (
    <Button
      onClick={handlePay}
      disabled={!areAllFieldsFulfilled}
      className="w-full bg-gradient-to-r from-[#e2fc26] to-[#f2e526] text-black"
    >
      <CreditCard className="mr-2 h-4 w-4" />
      Pay
    </Button>
  );
};
