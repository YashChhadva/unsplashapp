import * as React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TileImage from './TileImage';
import Modal from '@mui/material/Modal';
import useDebouncedSearch from './hooks/debounce';
import { borderRadius } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  height: "70vh",
  borderRadius: '10px',
  padding : "10px"
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#D3D3D3" , 0.5),
  '&:hover': {
    backgroundColor: alpha("#D3D3D3" , 1),
  },
  marginLeft: 0,
  width: '40vw',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const useSearchPhotos = () => useDebouncedSearch(async text => await axios.get(`https://api.unsplash.com/search/photos?query=${text}&client_id=U8Q5SJvTR0yrZZ8hjjRMboW1WlXv8zXJyxMdaI_EYsA`))

function App() {
  const [images, setImages] = useState([]);
  const [currentItem, setCurrentItem] = useState("")
  const [open, setOpen] = React.useState(false);
  const { inputText, setInputText, searchResults } = useSearchPhotos();
  const handleOpen = (item) => {
    setCurrentItem(item);
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  useEffect(async () => {
    console.log("searhing....")
    // let im = await axios.get("https://api.unsplash.com/search/photos?query=mumbai&client_id=U8Q5SJvTR0yrZZ8hjjRMboW1WlXv8zXJyxMdaI_EYsA");
    // console.log("this is search results")
    // console.log(searchResults)
    {
      try {
        setImages(searchResults.result.data.results);
        console.log(searchResults.result.data.results)
      } catch (err) {
        console.log("some error")
      }
      // searchResults && searchResults.result && searchResults.result.data && searchResults.result.data.length>0 && setImages(searchResults.result.data.results);

    }

    // console.log(im)
    // console.log(im.data.results.length);
    // console.log(im[0])
  }, [searchResults]);


  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{ color: "black" }}
          >
            Image Gallery
          </Typography>
          <div style={{position:"absolute" , left:"40%"}}>
          <Search style={{ color: "black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={e => setInputText(e.target.value)}
              value={inputText}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </div>
          <Button variant="outlined" style={{margin:"10px"}}>Explore</Button>
          <Button variant="outlined" style={{margin:"10px"}}>Collection</Button>
          <Button variant="outlined" style={{margin:"10px"}}>Community</Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          currentItem != "" && (
            <Card style={style}>
              <CardMedia
                component="img"
                image={currentItem.urls.raw}
                style={{ height: "70%" , borderRadius : '10px' }}
              />
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Avatar alt="user image" src={currentItem.user.profile_image.small} />
                    <div style={{ display: "flex", flexFlow: "column" , marginLeft : "10px" , marginRight : "10px"}}>
                      <Typography variant="body2" color="text.secondary">
                        {`${currentItem.user.first_name} ${currentItem.user.last_name}`}
                      </Typography>
                      <Typography variant="body4" color="text.secondary">
                        {`@ ${currentItem.user.username}`}
                      </Typography>
                    </div>
                    <Stack direction="row">
                    <InstagramIcon/>{`${currentItem.user.social.instagram_username ? currentItem.user.social.instagram_username : "Not Available"}`}
                    </Stack>
                    <Stack direction="row" style={{marginLeft : "10px"}}>
                    <TwitterIcon/>{`${currentItem.user.social.twitter_username ? currentItem.user.social.twitter_username : "Not Available"}`}
                    </Stack>
                    {/* <Typography variant="body4" color="text.secondary">
                    
                      </Typography>
                      <Typography variant="body4" color="text.secondary">
                      
                      </Typography> */}
                  </div>
                  <div>
                    <Typography variant="body3" color="text.secondary">
                      {`Likes ${currentItem.likes}`}
                    </Typography>
                  </div>

                </div>

                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px"}}>
                  {
                    currentItem.tags.length > 0 && currentItem.tags.map((tag) => {
                      return (
                        <div style={{ backgroundColor: "#D3D3D3", borderRadius: "10px" , paddingX:"3px" , margin : "3px" , minWidth:"80px" , height : 'auto'}}><p style={{textAlign: 'center'}}>{tag.title}</p></div>
                      )
                    })
                  }
                </div>

              </CardContent>

            </Card>
          )
        }

      </Modal>
      <div style={{ display: 'flex', justifyContent: "space-around", alignItems: 'flex-start', flexFlow: "row wrap" }}>
        {
          images && images.length > 0 && images.map((item) => {
            return (
              <TileImage
                modalHandler={handleOpen}
                item={item}
                style={{ width: "33%", marginBottom: "20px", height: "400px" }}
              />
              // <img src={`${item.urls.small}`} />
            );
          })
        }
      </div>
    </Box>

  );
}

export default App;
