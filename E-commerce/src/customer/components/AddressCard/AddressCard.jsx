const AddressCard = ({ deliveryAddress }) => {
  // Show user's filled delivery address when provided (from checkout step 2)
  if (deliveryAddress && (deliveryAddress.firstName || deliveryAddress.streetAddress)) {
    const name = [deliveryAddress.firstName, deliveryAddress.lastName].filter(Boolean).join(' ');
    const addressLine = [
      deliveryAddress.streetAddress,
      deliveryAddress.city ?? deliveryAddress.cityName,
      deliveryAddress.state,
      deliveryAddress.zipCode,
    ].filter(Boolean).join(', ');
    const phone = deliveryAddress.mobile ?? deliveryAddress.mobileNumber;
    return (
      <div>
        <div className="space-y-3 border-gray-400">
          <p className="font-semibold">{name || 'Delivery Address'}</p>
          <p>{addressLine || '—'}</p>
          <div className="space-y-1">
            <p>Phone Number</p>
            <p className="font-semibold">{phone || '—'}</p>
          </div>
        </div>
      </div>
    );
  }

  // Default / saved address when no form data passed
  return (
    <div>
      <div className="space-y-3 border-gray-400">
        <p className="font-semibold">Bishal</p>
        <p>Letang, Morang, 2005</p>
        <div className="space-y-1">
          <p>Phone Number</p>
          <p className="font-semibold">9704168051</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
