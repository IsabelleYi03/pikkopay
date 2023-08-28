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
  useEffect(() => {
    paygreenjs.attachEventListener(
      paygreenjs.Events.PAN_FIELD_FULFILLED,
      () => {
        paygreenjs.focus("cvv");
      }
    );

    paygreenjs.attachEventListener(
      paygreenjs.Events.CVV_FIELD_FULFILLED,
      () => {
        paygreenjs.focus("exp");
      }
    );

    paygreenjs.init({
      publicKey: "pk_6d92047e838d4870b74857ba47e2eebd",
      mode: "instrument",
      paymentMethod: "conecs",
      modeOptions: {
        shopId: "sh_69b974d635c34df18c807baed0794836",
      },
    });
  }, []);

  return (
    <div className="flex justify-center items-center">
    <Card className="w-[390px] bg-gradient-to-r from-amber-50 to-lime-100	">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="flex flex-row justify-start space-x-2 pb-10">
          <div className="w-1/12 flex items-center justify-center">
            <img src = {logocb} />
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <img src = {logovisa} /> 
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <img src = {logomastercard} />
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <img src = {logomamex} />
          </div>
        </div>
        <div id="paygreen-container"></div>
        <div id="paygreen-methods-container"></div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-4">
            <Label>Card Number</Label>
            <div id="paygreen-pan-frame"></div>
          </div>
          <div className="flex flex-col space-y-4">
            <Label>Expiry Date</Label>
            <div id="paygreen-exp-frame"></div>
          </div>
          <div className="flex flex-col space-y-4 pb-4">
            <Label>Security Code</Label>
            <div id="paygreen-cvv-frame"></div>
          </div>
        </div>
        <div id="paygreen-reuse-checkbox-container"></div>
        
      </CardContent>
      <CardFooter>
        <PaymentButton />
      </CardFooter>
    </Card>
    </div>
  );
};
