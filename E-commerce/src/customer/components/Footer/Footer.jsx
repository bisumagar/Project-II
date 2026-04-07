import { Button, Divider, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Grid sx={{ bgcolor: "black", color: "white", mt: 10 }}>

      {/* TOP FOOTER */}
      <Grid
        container
        spacing={4}
        sx={{ 
          py: 6, 
          px: { xs: 3, md: 10 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography pb={2} variant="h6">Company</Typography>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>About</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Blog</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Jobs</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Partners</Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography pb={2} variant="h6">Solutions</Typography>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Marketing</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Analytics</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Commerce</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Insights</Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography pb={2} variant="h6">Documentation</Typography>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Guides</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>API Status</Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography pb={2} variant="h6">Legal</Typography>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Claims</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Privacy</Button>
          <Button fullWidth color="inherit" sx={{ mb: 1 }}>Terms</Button>
        </Grid>
      </Grid>

      {/* DIVIDER */}
      <Divider sx={{ bgcolor: "gray", opacity: 0.3 }} />

      {/* BOTTOM COPYRIGHT */}
      <Grid
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <Typography variant="body2">
          © 2026 My Company. All rights reserved.
        </Typography>

        <Typography variant="body2">
          Made with  by Me.
        </Typography>

        <Typography variant="body2">
          Icons made by{" "}
          <Link href="https://www.freepik.com" color="inherit" underline="always">
            Freepik
          </Link>{" "}
          from{" "}
          <Link href="https://www.flaticon.com/" color="inherit" underline="always">
            www.flaticon.com
          </Link>
        </Typography>
      </Grid>

    </Grid>
  );
};

export default Footer;
