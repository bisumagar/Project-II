import { Button, Card, CardContent, styled, Typography } from '@mui/material';


const TringleImg=styled('img')({
    right:0,
    buttom:0,
    height:170,
    position:"absolute"
})

const TrophyImg = styled('img')({
  position: "absolute",
  right: "20px",
  top: "50%",
  transform: "translateY(-50%)",
  height: "90px",
});


const Achievement = () => {
  return (
    <Card sx={{position:"relative"}}>
        <CardContent>
            <Typography variant='h6' sx={{letterSpacing:".25px"}}>
             Shop with Bishal
            </Typography>

            <Typography variant='body2'>
                Congratulations!
            </Typography>
            <Typography variant='h5' sx={{my:3.1 }}>420.9k</Typography>

            <Button size='small' variant='contained'> View Sales</Button>

            <TringleImg src=''></TringleImg>


            <TrophyImg src='https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3NtYWxsZGVzaWduY29tcGFueTAxX3Bob3RvX29mX3dpbm5lcnNfZ29sZF90cm9waHlfY3VwX2Nsb3NlX3VwX19lZmU0N2Y0NC04NzdkLTQyMzgtYjc2Ni1hNGU5NGYzYjBkZjkucG5n.png' alt='trophy'></TrophyImg>
        </CardContent>

    </Card>
  )
}

export default Achievement
