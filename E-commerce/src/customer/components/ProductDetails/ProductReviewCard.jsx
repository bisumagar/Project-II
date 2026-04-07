import { Avatar, Box, Grid, Rating } from '@mui/material'

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>

            <Box>
                <Avatar className='text-white' sx={{width:56,height:56,bgcolor:"#9155fd"}}>
                    B
                </Avatar>
            </Box>

        </Grid>

        <Grid item xs={9}>

           <div className='space-y-2 '>

            <div>
                <p className='font-bold text-lg'>Bishal</p>
                <p className='opacity-70'>June 3, 2025</p>
            </div>

           </div>
           <Rating value={4.5} name='half-rating 'readOnly precision={.5}/>
           <p>This is amazing, I like this Shirt</p>

        </Grid>
      </Grid>
    </div>
  )
}

export default ProductReviewCard
