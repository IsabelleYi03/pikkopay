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
      <Button disabled className="w-full h-36  bg-gradient-to-r from-[#e2fc26] to-[#f2e526] text-black text-5xl">

        <div className="w-14 h-14 relative">
        {/* Animation Spin 1 */}
        <div className="loader ease-linear rounded-full border-t-4 border-b-4 border-black h-10 w-10 absolute animate-spin"></div>
        {/* Animation Spin 2 */}
        <div className="loader ease-linear rounded-full border-t-4 border-b-4 border-white h-10 w-10 absolute animate-spin" style={{ animationDelay: '0.25s' }}></div>
      </div>
        Transaction Processing...
      </Button>
    );
  }

  const areAllFieldsFulfilled =
    isPanFulfilled && isCvvFulfilled && isExpFulfilled;

  if (!areAllFieldsFulfilled) {
    return (
        <Button
            disabled
            className="w-full h-36 text-5xl disabled:opacity-50"
        >
          <CreditCard className="mr-12 h-14 w-14" />
          Pay
        </Button>
    );
  }

  return (
    <Button
      onClick={handlePay}
      className="w-full h-36 bg-gradient-to-r from-[#e2fc26] to-[#f2e526] text-black text-5xl"
    >
      <CreditCard className="mr-12 h-14 w-14" />
      Pay
    </Button>
  );
};
