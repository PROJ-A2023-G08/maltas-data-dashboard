import React, { useState, useEffect } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import testimonials from "./data";

function Testimonials() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {   
    const autoMoveSlide = () => {
     setActiveSlideIndex((prev) =>{
       if(prev === 5 || prev > 5 || prev < 0){
        return 0;
       }
       return prev + 1;
     })
     
    };

    const intervalId = setInterval(autoMoveSlide, 7000);
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependen

  return (
    <div className="m-6">
      <div className="flex flex-col items-center">
        <Typography
          sx={{
            textAlign: "center",
            color: "primary.main",
            fontWeight: 700,
          }}
          variant="h2"
        >
          What Clients Say
        </Typography>
        <Typography className="text-slate-400 m-2" maxWidth="sm">
          We place huge value on strong relationships and have seen the benefit
          they bring to our business. Customer feedback is vital in helping us
          to get it right.
        </Typography>
      </div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        swipeTreshold={60}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            margin: 15,
            alignSelf: "center",
            background: "#247fbc",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: "center",
            background: "#247fbc",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
            margin: 15,
          },
          children: <span>{`<`}</span>,
        }}
        dotsNav={{
          show: true,
          itemBtnProps: {
            style: {
              height: 16,
              width: 16,
              margin: 5,
              borderRadius: "50%",
              border: 0,
              background: "#C0C0C0"
            },
          },
          activeItemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              border: 0,
              margin: 5,
              background: "#247fbc",
            },
          },
        }}
        responsiveProps={[
          {
            itemsToShow: 3,
            itemsToScroll: 3,
            minWidth: 1000,
          },
        ]}
        speed={400}
        centerMode
        easing="linear"
      >
        {testimonials.map((item, index) => {
          return (
            <TestimonialCard
              key={index}
              userCountry={item.location}
              userTitle={item.jobTitle}
              description={item.description}
              avartarAlt={item.imageAlt}
              avartarImageUrl={item.imageUrl}
              name={item.name}
            />
          );
        })}
      </ReactSimplyCarousel>
    </div>
  );
}

export default Testimonials;

interface TestimonialCardProps {
  avartarImageUrl?: string;
  avartarAlt?: string;
  name?: string;
  userTitle?: string;
  userCountry?: string;
  description?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = (props) => {
  const {
    avartarImageUrl,
    avartarAlt,
    name,
    userCountry,
    userTitle,
    description,
  } = props;
  return (
    <Card sx={{ minWidth: 350, m: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {avartarImageUrl ? (
          <Avatar
            sx={{
              border: "2px solid #fff",
              height: (theme) => theme.spacing(12),
              width: (theme) => theme.spacing(12),
              margin: (theme) => theme.spacing(2),
            }}
            alt={avartarAlt || "This is an avartar"}
            src={avartarImageUrl}
          />
        ) : null}
        {description ? (
          <Typography
            sx={{
              fontSize: 16,
              p: 2,
              textAlign: "center",
            }}
            color="text.secondary"
          >
            <span className="font-extrabold">&#8221;</span>
            {description}
            <span className="font-extrabold">&#8221;</span>
          </Typography>
        ) : null}

        {name ? (
          <Typography
            sx={{ m: (theme) => theme.spacing(1), fontWeight: 600 }}
            color="primary.main"
          >
            {name}
          </Typography>
        ) : null}
        <Typography className="mt-2" color="text.secondary">
          {userTitle ? <span>{userTitle}</span> : null}
          {userTitle && userCountry ? ", " : null}
          {userCountry ? <span>{userCountry}</span> : null}
        </Typography>
      </CardContent>
    </Card>
  );
};
