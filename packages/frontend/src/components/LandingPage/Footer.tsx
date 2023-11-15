import React from "react";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";
import { useRouter } from "next/router";

const socialMediaLinks = [
  { icon: <FacebookIcon color="inherit" />, href: "https://www.facebook.com/" },
  {
    icon: <InstagramIcon color="inherit" />,
    href: "https://www.instagram.com/",
  },
  { icon: <LinkedInIcon color="inherit" />, href: "https://www.linkedin.com/" },
  { icon: <TwitterIcon color="inherit" />, href: "https://twitter.com/" },
];

const footerLinks = [
  { text: "Privacy Policy", className: "underline" },
  { text: "About Us" },
  { text: "Advertise" },
  { text: "Careers" },
  { text: "Industry Reports" },
  { text: "Terms of Use", className: "underline" },
];

const contactInfo = [
  { text: "Contact Us:" },
  { text: "Maltas technology Oy" },
  {text: "Name: Lassi Vuorinen"},
  { text: "Email: lassi@maltastech.com" },
  { text: "Phone: + (358)(0)50 514 2624" },
];

const Footer: React.FC = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        color: (theme) => theme.palette.common.white,
        backgroundImage: `url("/free_snow_image_dark.jpeg")`,
        backgroundSize: "auto",
        paddingBottom: (theme) => theme.spacing(10),
        textAlign: "center",
        position: "relative",
      }}
    >
      <Grid
        container
        sx={{
          background: "rgba(0, 0, 0, 0.2)",
          padding: (theme) => theme.spacing(8),
        }}
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: "inline",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: (theme) => theme.spacing(2),
            }}
          >
            <Image
              src="/Malta_logo.svg"
              alt="Maltas Logo"
              width={50}
              height={50}
              className="cursor-pointer"
              onClick={()=>{
                router.push("/")
              }}
            />
            <Typography variant="h5" sx={{ mb: 1 }}>
              Maltas technology Oy
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: (theme) => theme.spacing(2),
            }}
          >
            <span>
              <ul className="list-none text-left">
                {contactInfo.map((info, index) => (
                  <li key={index}>{info.text}</li>
                ))}
              </ul>
            </span>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: (theme) => theme.spacing(2),
            }}
          >
            <span>
              <ul className="list-none text-left">
                {footerLinks.map((link, index) => (
                  <li key={index} className={link.className}>
                    {link.text}
                  </li>
                ))}
              </ul>
            </span>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: (theme) => theme.spacing(2),
            }}
          >
            {socialMediaLinks.map((link, index) => (
              <IconButton
                key={index}
                sx={{
                  p: (theme) => theme.spacing(2),
                  color: "#fff",
                }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Typography
        sx={{
          padding: (theme) => theme.spacing(8),
          background: "rgba(0, 0, 0, 0.2)",
        }}
      >
        &copy; 2023 Maltas technology Oy
      </Typography>
    </Box>
  );
};

export default Footer;
