import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get("step") || "2";

  const stepIndex = Math.max(0, parseInt(step, 10) - 1);

  const handleBack = () => {
    if (step === "3") {
      navigate('/checkout?step=2');
    } else if (step === "4") {
      navigate('/checkout?step=3');
    } else if (step === "2") {
      navigate('/cart');
    }
  };

  return (
    <div className='px-40 lg:px-30 mt-5'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={stepIndex}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        </Box>

        <div className='mt-10 '>
          {step === "2" ? <DeliveryAddressForm /> : <OrderSummary />}
        </div>
      </Box>
    </div>
  );
}
