import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import Lenis from 'lenis'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  Avatar,
  Chip,
  Stack,
  useScrollTrigger
} from '@mui/material'
import {
  LocalShipping as LocalShippingIcon,
  HeadsetMic as HeadsetMicIcon,
  Verified as VerifiedIcon,
  ShoppingCart as ShoppingCartIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  BedroomParent as BedroomIcon,
  Weekend as LivingIcon,
  Restaurant as DiningIcon,
  Security as SecurityIcon,
  Warehouse as WarehouseIcon,
  Style as StyleIcon,
} from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Desert white theme with blue accents
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  palette: {
    mode: 'light',
    background: {
      default: '#FAF7F2', // desert-white
      paper: '#FFFFFF',
    },
    primary: {
      main: '#205b9e', // deep blue accent
    },
    secondary: {
      main: '#d2a679', // sand accent
    },
    text: {
      primary: '#2A2A2A',
      secondary: '#5C5C5C',
    },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          boxShadow: '0 6px 20px rgba(32,91,158,0.15)',
        },
      },
    },
  },
})

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (x) => 1 - Math.pow(1 - x, 2),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}

function RevealSection({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Box ref={ref} sx={{ opacity: 0, transform: 'translateY(24px)', transition: 'all .8s ease-out' }}>
      {children}
    </Box>
  )
}

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 })
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: { backgroundColor: trigger ? 'rgba(255,255,255,0.9)' : 'transparent', backdropFilter: trigger ? 'saturate(180%) blur(8px)' : 'none' }
  })
}

function Navbar() {
  return (
    <ElevationScroll>
      <AppBar position="sticky" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ bgcolor: 'secondary.main' }}>F</Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Furniture</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {['Home', 'Services', 'Doctors', 'Products', 'Gallery'].map((item) => (
              <Button key={item} color="inherit">{item}</Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton color="primary"><ShoppingCartIcon /></IconButton>
            <Button variant="contained">Buy Now</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}

function Hero() {
  return (
    <Box sx={{ position: 'relative', height: { xs: 520, md: 680 }, overflow: 'hidden', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <Spline scene="https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </Box>
      <Container sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ bgcolor: 'rgba(255,255,255,0.66)', p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.12)', backdropFilter: 'blur(6px)' }}>
          <Chip label="New Season" color="secondary" sx={{ mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 2 }}>Discover Our New Collection</Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3, maxWidth: 560 }}>
            Elegant, minimal, and crafted to elevate your space. Luxury pieces with timeless design.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large">Shop Now</Button>
            <Button variant="outlined" size="large">Explore</Button>
          </Stack>
        </Box>
      </Container>
      <Box className="pointer-events-none" sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(250,247,242,0.0) 60%, rgba(250,247,242,1) 100%)' }} />
    </Box>
  )
}

function FeaturesRow() {
  const items = [
    { icon: <LocalShippingIcon color="primary" />, title: 'Free Delivery', text: 'Complimentary shipping on all orders' },
    { icon: <HeadsetMicIcon color="primary" />, title: '24/7 Support', text: 'We are here whenever you need' },
    { icon: <VerifiedIcon color="primary" />, title: '100% Authentic', text: 'Quality guaranteed, always' },
  ]
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={3}>
        {items.map((it) => (
          <Grid item xs={12} md={4} key={it.title}>
            <RevealSection>
              <Card sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {it.icon}
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{it.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{it.text}</Typography>
                  </Box>
                </Stack>
              </Card>
            </RevealSection>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function InspirationGrid() {
  const cards = [
    { title: 'Plants', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop', desc: 'Greenery that brings life indoors.' },
    { title: 'Decor', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop', desc: 'Thoughtful accents and art pieces.' },
    { title: 'Lighting', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop', desc: 'Warm light for cozy evenings.' },
  ]
  return (
    <Container sx={{ py: 8 }}>
      <RevealSection>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Inspiration Collection</Typography>
      </RevealSection>
      <Grid container spacing={3}>
        {cards.map((c) => (
          <Grid item xs={12} md={4} key={c.title}>
            <RevealSection>
              <Card sx={{ transition: 'transform .4s ease', '&:hover': { transform: 'translateY(-6px)' } }}>
                <CardActionArea>
                  <CardMedia component="img" height="240" image={c.img} alt={c.title} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{c.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{c.desc}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </RevealSection>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function SplitBeautify() {
  return (
    <Container sx={{ py: 10 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <RevealSection>
            <Typography variant="overline" color="secondary">Elevate</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Beautify Your Space</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Curated pieces to transform your living areas. From textures to tones, update your home with character and comfort.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Discover</Button>
              <Button variant="outlined">Our Story</Button>
            </Stack>
          </RevealSection>
        </Grid>
        <Grid item xs={12} md={6}>
          <RevealSection>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', inset: -20, zIndex: 0, background: 'radial-gradient(600px 200px at 70% 30%, rgba(32,91,158,0.15), rgba(210,166,121,0.12))', borderRadius: 6 }} />
              <Card sx={{ borderRadius: 6, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                <CardMedia component="img" image="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600&auto=format&fit=crop" alt="profile" sx={{ filter: 'blur(0.2px)', transform: 'scale(1.02)' }} />
              </Card>
            </Box>
          </RevealSection>
        </Grid>
      </Grid>
    </Container>
  )
}

function BrowseRange() {
  const items = [
    { title: 'Dining', icon: <DiningIcon color="primary" />, img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop', desc: 'Tables and chairs for memorable meals.' },
    { title: 'Living', icon: <LivingIcon color="primary" />, img: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600&auto=format&fit=crop', desc: 'Lounges that invite conversation.' },
    { title: 'Bedroom', icon: <BedroomIcon color="primary" />, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop', desc: 'Comfort that supports deep rest.' },
  ]
  return (
    <Container sx={{ py: 8 }}>
      <RevealSection>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Browse The Range</Typography>
      </RevealSection>
      <Grid container spacing={3}>
        {items.map((it) => (
          <Grid item xs={12} md={4} key={it.title}>
            <RevealSection>
              <Card sx={{ overflow: 'hidden', transition: 'transform .3s ease', '&:hover': { transform: 'translateY(-6px)' } }}>
                <CardMedia component="img" height="220" image={it.img} alt={it.title} />
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: .5 }}>
                    {it.icon}
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{it.title}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">{it.desc}</Typography>
                </CardContent>
              </Card>
            </RevealSection>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function HowItWorks() {
  const steps = [
    { n: 1, title: 'Purchase Securely', icon: <SecurityIcon color="primary" />, text: 'Checkout with encrypted payments and peace of mind.' },
    { n: 2, title: 'Ships From Warehouse', icon: <WarehouseIcon color="primary" />, text: 'Fast dispatch from our local facilities.' },
    { n: 3, title: 'Style Your Room', icon: <StyleIcon color="primary" />, text: 'Unbox and enjoy your elevated space.' },
  ]
  return (
    <Container sx={{ py: 8 }}>
      <RevealSection>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>How It Works</Typography>
      </RevealSection>
      <Grid container spacing={3}>
        {steps.map((s) => (
          <Grid item xs={12} md={4} key={s.n}>
            <RevealSection>
              <Card sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Avatar sx={{ bgcolor: 'primary.main', color: 'white', width: 36, height: 36 }}>{s.n}</Avatar>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {s.icon}
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{s.title}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">{s.text}</Typography>
                </Box>
              </Card>
            </RevealSection>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function Newsletter() {
  return (
    <Container sx={{ py: 10 }}>
      <RevealSection>
        <Card sx={{ p: { xs: 3, md: 5 }, background: 'linear-gradient(135deg, #FFFFFF, #F3EFE8)' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Join our newsletter</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>Exclusive offers, new arrivals, and interior tips.</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField fullWidth label="Email address" variant="outlined" />
                <Button variant="contained" size="large">Subscribe</Button>
              </Stack>
              {/* Replace with production newsletter handler */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                {[1,2,3,4,5,6].map((i) => (
                  <Grid key={i} item xs={4}>
                    <Card>
                      <CardMedia component="img" height="100" image={`https://source.unsplash.com/random/200x200?interior,${i}`} alt="gallery" />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </RevealSection>
    </Container>
  )
}

function Footer() {
  return (
    <Box sx={{ bgcolor: '#0e2a4b', color: 'white', mt: 8, pt: 8, pb: 4 }}>
      <Container>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Furniture</Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
              Classic design for modern living. Crafted with premium materials and attention to detail.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="inherit"><InstagramIcon /></IconButton>
              <IconButton color="inherit"><FacebookIcon /></IconButton>
              <IconButton color="inherit"><TwitterIcon /></IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              {[1,2,3,4,5,6].map((i) => (
                <Grid item xs={4} key={i}>
                  <Card sx={{ borderRadius: 2 }}>
                    <CardMedia component="img" height="100" image={`https://source.unsplash.com/random/200x200?furniture,${i}`} alt="insta" />
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'rgba(255,255,255,0.7)' }}>
              Contact: hello@example.com • +1 (555) 000-0000
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="caption" sx={{ display: 'block', mt: 4, color: 'rgba(255,255,255,0.6)' }}>
          © {new Date().getFullYear()} Furniture. Replace with your company legal name.
        </Typography>
      </Container>
    </Box>
  )
}

export default function App() {
  useLenis()
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Navbar />
        <Hero />
        <FeaturesRow />
        <InspirationGrid />
        <SplitBeautify />
        <BrowseRange />
        <HowItWorks />
        <Newsletter />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
