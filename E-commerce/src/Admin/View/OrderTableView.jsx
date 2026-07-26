import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    confirmOrder,
    deleteOrder,
    deliverOrder,
    getOrders,
} from "../../State/Admin/Order/Action";

const statusStyles = (statusRaw) => {
  const status = (statusRaw || "").toUpperCase();
  switch (status) {
    case "CONFIRMED":
      return { bg: "#4caf50", color: "white" };
    case "PENDING":
    case "PLACED":
      return { bg: "#9e9e9e", color: "white" };
    case "DELIVERED":
      return { bg: "#009688", color: "white" };
    case "CANCELLED":
      return { bg: "#f44336", color: "white" };
    default:
      return { bg: "#e0e0e0", color: "#424242" };
  }
};

const OrdersTableView = () => {
  const dispatch = useDispatch();
  const { orders: adminOrders, loading, error } = useSelector((state) => state.adminOrder);
  const orders = Array.isArray(adminOrders) ? adminOrders : (adminOrders?.content ?? []);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const openStatusMenu = (event, orderId) => {
    setMenuAnchor(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const closeStatusMenu = () => {
    setMenuAnchor(null);
    setSelectedOrderId(null);
  };

  const handleChangeStatus = (type) => {
    if (!selectedOrderId) return;
    if (type === "CONFIRMED") dispatch(confirmOrder(selectedOrderId));
    else if (type === "DELIVERED") dispatch(deliverOrder(selectedOrderId));
    closeStatusMenu();
  };

  const handleDelete = (orderId) => {
    if (orderId) dispatch(deleteOrder(orderId));
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Items</TableCell>
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Order Id</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(orders || []).filter(Boolean).map((order) => (
                <TableRow
                  key={order._id || order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <div className="flex flex-col gap-2">
                      <AvatarGroup max={4}>
                        {(order.orderItems || [])
                          .filter((oi) => oi?.product?.imageUrl || oi?.imageUrl)
                          .map((orderItem, idx) => (
                            <Avatar
                              key={orderItem._id || orderItem.id || idx}
                              src={orderItem.product?.imageUrl || orderItem.imageUrl}
                            />
                          ))}
                      </AvatarGroup>
                      <div className="flex flex-col gap-1">
                        {(order.orderItems || []).filter(Boolean).map((orderItem, idx) => {
                          const product = orderItem.product;
                          const title =
                            product?.title ||
                            orderItem.productTitle ||
                            orderItem.title ||
                            "Product";
                          const size =
                            orderItem.size?.name || orderItem.size || orderItem.selectedSize;
                          const qty = orderItem.quantity ?? orderItem.qty ?? 1;
                          const price =
                            orderItem.discountedPrice ??
                            orderItem.price ??
                            product?.discountedPrice ??
                            product?.price;
                          return (
                            <div
                              key={orderItem._id || orderItem.id || idx}
                              className="flex items-center gap-2"
                            >
                              <Avatar
                                sx={{ width: 28, height: 28 }}
                                src={product?.imageUrl || orderItem.imageUrl}
                              >
                                {title?.[0]}
                              </Avatar>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium">
                                  {title}{" "}
                                  {product ? "" : (
                                    <span className="text-xs text-gray-500">(deleted)</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {size ? <>Size: {String(size)} · </> : null}
                                  Qty: {String(qty)}
                                  {price != null ? <> · Price: {String(price)}</> : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    {(() => {
                      const fromAddress = order.shippingAddress;
                      const fromUser = order.user;
                      if (fromAddress?.firstName != null || fromAddress?.lastName != null || fromAddress?.lasttName != null)
                        return [fromAddress.firstName, fromAddress.lastName ?? fromAddress.lasttName].filter(Boolean).join(" ").trim() || "—";
                      if (fromUser?.firstName != null || fromUser?.lastName != null)
                        return [fromUser.firstName, fromUser.lastName].filter(Boolean).join(" ").trim() || "—";
                      return fromUser?.name ?? "—";
                    })()}
                  </TableCell>
                  <TableCell align="left">
                    {order.totalDiscountedPrice ?? order.totalPrice ?? order.totalAmount ?? "-"}
                  </TableCell>
                  <TableCell align="left">
                    {(() => {
                      const rawStatus = order.orderStatus || order.status || "-";
                      const status = String(rawStatus).toUpperCase() === "SHIPPED" ? "CONFIRMED" : rawStatus;
                      const { bg, color } = statusStyles(status);
                      return (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "999px",
                            backgroundColor: bg,
                            color,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          {String(status)}
                        </span>
                      );
                    })()}
                  </TableCell>
                  <TableCell align="left">{order._id || order.id || "-"}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => openStatusMenu(e, order._id || order.id)}
                    >
                      STATUS
                    </Button>
                    {/* <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => handleDelete(order._id || order.id)}
                    >
                      DELETE
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeStatusMenu}
      >
        <MenuItem onClick={() => handleChangeStatus("CONFIRMED")}>
          Confirmed Order
        </MenuItem>
        <MenuItem onClick={() => handleChangeStatus("SHIPPED")}>
          Shipped Order
        </MenuItem>
        <MenuItem onClick={() => handleChangeStatus("DELIVERED")}>
          Delivered Order
        </MenuItem>
      </Menu> */}
    </>
  );
};

export default OrdersTableView;
