import { Box, Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";

const DeliveryAddressForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            cityName: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobileNumber: data.get("phoneNumber"),
        };
        // Navigate to Order Summary with filled address so it shows there
        navigate('/checkout?step=3', { state: { deliveryAddress: address } });
    };

    const handleDeliveryHere = () => {
        // When selecting existing address, pass null or existing address if you have it
        navigate('/checkout?step=3', { state: { deliveryAddress: null } });
    }
    return (
        <Box  sx={{ width: "100%" }}>

            <Grid className="space-x-4" container spacing={4} sx={{ width: "100%", m: 0 }}>

                {/* LEFT SIDE - ADDRESS LIST */}
                <Grid item xs={12} lg={5}>
                    <Box className=" border-gray-400 rounded-md shadow-md h-150 overflow-y-scroll p-5">
                        <AddressCard />
                        <Button
                            fullWidth
                            sx={{ mt: 2, bgcolor: "RGB(145, 85, 253)" }}
                            size="large"
                            variant="contained"
                            onClick={handleDeliveryHere}
                        >
                            Delivery Here
                        </Button>
                    </Box>
                </Grid>

                {/* RIGHT SIDE - FORM */}
                <Grid item xs={12} lg={7}>
                    <Box className="border-gray-400 rounded-md shadow-md p-5">
                        <form onSubmit={handleSubmit}>
                            <Grid >

                                <Grid container spacing={3}>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First Name"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Last Name"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} mt={2} >
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="address"
                                        fullWidth
                                        autoComplete="given-name"
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} mt={2}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="city"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} mt={2}>
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} mt={2}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip/Postal code"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} mt={2}>
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="phoneNumber"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} mt={2}>
                                    <Button
                                        
                                        sx={{ mt: 2, bgcolor: "RGB(145, 85, 253)" }}
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Delivery Here
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </Box>
                </Grid>

            </Grid>





        </Box>
    )
}

export default DeliveryAddressForm
