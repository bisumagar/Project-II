import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  const status = order?.orderStatus || 'PENDING';
  const trackerStep =
    status === 'CONFIRMED' || status === 'SHIPPED'
      ? 1
      : status === 'DELIVERED'
        ? 2
        : 0;

  const shipping = order?.shippingAddress
    ? {
        firstName: order.shippingAddress.firstName,
        lastName: order.shippingAddress.lastName ?? order.shippingAddress.lasttName,
        streetAddress: order.shippingAddress.streetAddress,
        city: order.shippingAddress.city ?? order.shippingAddress.cityName,
        state: order.shippingAddress.state,
        zipCode: order.shippingAddress.zipCode,
        mobile: order.shippingAddress.mobile ?? order.shippingAddress.mobileNumber,
      }
    : null;

  return (
    <div className="px-4 lg:px-20">
      <div>
        <h1 className="font-bold py-7 text-xl">Delivery Address</h1>
        <AddressCard deliveryAddress={shipping} />
      </div>

      <div className="py-20 flex justify-center w-full">
        <div className="w-full max-w-6xl">
          <OrderTracker activeStep={trackerStep} />
        </div>
      </div>

      <div className="flex flex-col items-center w-full pb-8 gap-4">
        {loading && (
          <div className="w-full max-w-6xl p-4">Loading...</div>
        )}
        {error && (
          <div className="w-full max-w-6xl p-4 text-red-600">{String(error)}</div>
        )}
        {(order?.orderItems || []).map((item, index) => (
          <div
            key={item?._id || index}
            className="shadow-xl rounded-md p-5 border border-gray-400 bg-white"
            style={{ maxWidth: '1200px', width: '100%' }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <img
                  className="h-24 w-24 object-cover object-top rounded flex-shrink-0"
                  src={item?.product?.imageUrl}
                  alt=""
                />
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className="font-bold">
                      {item?.product?.title || 'Product'}
                    </p>
                    <Box
                      sx={{
                        color: deepPurple[500],
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <StarOutlineIcon sx={{ fontSize: '1.5rem', mr: 1 }} />
                      <span className="text-sm whitespace-nowrap">
                        Rate & Review Product
                      </span>
                    </Box>
                  </div>
                  <div className="text-xs font-semibold text-black/55">
                    <span>Size: {String(item?.size ?? '-')}</span>
                    <span className="mx-1">Qty: {String(item?.quantity ?? 1)}</span>
                  </div>
                  <div className="font-semibold">
                    <p>
                      Npr{' '}
                      {String(
                        item?.discountedPrice ??
                          item?.price ??
                          item?.product?.discountedPrice ??
                          item?.product?.price ??
                          '-'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
