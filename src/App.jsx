import { useEffect } from "react";
import { PaymentButton } from "./PaymentButton.jsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/Card.jsx";
import { Label } from "./components/Label.jsx";
import logocb from './components/logo-cb.jpg';
import logovisa from './components/logo-visa.png';
import logomastercard from './components/logo-mastercard.png';
import logomamex from './components/logo-amex.png';

export const App = () => {
  const style = {
    input: {
      base: {
        fontSize: '40px',
      },
    },
    placeholder: {
      base: {
        color: 'grey',
      },
    },
  };

  useEffect(() => {
    paygreenjs.attachEventListener(
      paygreenjs.Events.PAN_FIELD_FULFILLED,
      () => {
        paygreenjs.focus("exp");
      }
    );

    paygreenjs.attachEventListener(
      paygreenjs.Events.EXP_FIELD_FULFILLED,
      () => {
        paygreenjs.focus("cvv");
      }
    );

    paygreenjs.init({
      publicKey: "pk_6d92047e838d4870b74857ba47e2eebd",
      mode: "instrument",
      paymentMethod: "conecs",
      style,
      modeOptions: {
        shopId: "sh_69b974d635c34df18c807baed0794836",
      },
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="w-full h-full bg-gradient-to-r from-yellow to-yellow2 shadow-lg	">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent >
      <div className="flex flex-row justify-start space-x-4 pb-16">
        <div className="w-2/12 flex items-center justify-center">
          <img src={logocb} alt="CB Logo" />
        </div>
        <div className="w-2/12 flex items-center justify-center">
          <img src={logovisa} alt="Visa Logo" />
        </div>
        <div className="w-2/12 flex items-center justify-center">
          <img src={logomastercard} alt="Mastercard Logo" />
        </div>
        <div className="w-2/12 flex items-center justify-center">
          <img src={logomamex} alt="Mamex Logo" />
        </div>
      </div>
        <div id="paygreen-container"></div>
        <div id="paygreen-methods-container"></div>
        <div className="flex flex-col space-y-10 pb-40">
          <div className="flex flex-col space-y-8 ">
            <Label>Card Number</Label>
            <div id="paygreen-pan-frame"></div>
          </div>
          <div className="flex flex-col space-y-8">
            <Label>Expiration Date</Label>
            <div id="paygreen-exp-frame"></div>
          </div>
          <div className="flex flex-col space-y-8">
            <Label>Security Code</Label>
            <div id="paygreen-cvv-frame"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PaymentButton />
      </CardFooter>
    </Card>
    </div>
  );
};
