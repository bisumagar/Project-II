import { AccountCircle, SettingsCell, TrendingUp } from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
const salesData = [
    {states:'245K',
    Title:"Sales",
    color:"#a84f7d",
    icon:<TrendingUp sx={{fontSize:"1.75rem"}}/> 
},
{states:'12.5K',
    Title:"Customers",
    color:"#76a84f",
    icon:<AccountCircle sx={{fontSize:"1.75rem"}}/> 
},
{states:'1.54K',
    Title:"Products",
    color:"#684fa8  ",
    icon:<SettingsCell sx={{fontSize:"1.75rem"}}/> 
},
{states:'88K',
    Title:"Revenue",
    color:"#a8794f",
    icon:<AttachMoneyIcon sx={{fontSize:"1.75rem"}}/> 
}
]

const renderStats=()=>{
    return salesData.map((item,index)=>(
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{
                display:"flex", alignItems:'center'
            }}>
                <Avatar variant="rounded" sx={{
                    mr:3,
                    width:44,
                    height:44,
                    boxShadow:3,
                    color:"white",
                    bgcolor:`${item.color}`
                }}>
                    {item.icon}
                </Avatar>
            
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='caption'>
                        {item.Title}
                    </Typography>
                    <Typography variant='h6'>
                        {item.states}
                    </Typography>
                </Box>

            </Box>
        </Grid>
    ))
}


const MonthlyOverview = () => {
  return (
    <Card sx={{}}>
    <CardHeader title="Monthly OVerview" 
    action={
        <IconButton  size="small">
            <MoreVertIcon />
        </IconButton>
    }

    subheader={
        <Typography variant="body2">
            <Box component="span" sx={{fontWeight:600,}}>
                  Total 48.5% growth
            </Box>


            This month

        </Typography>
    }
    titleTypographyProps={{
        sx:{
            mb:2.5,
            lineHeight:'2rem ! important',
            letterSpacing:'.15px !important'
        }
    }}
    
    />

    <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
      <Grid container spacing={[5, 0]}>
        {renderStats()}
      </Grid>
    </CardContent>

        
    </Card>
  )
}

export default MonthlyOverview
