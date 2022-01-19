import React from "react";
import { Cover, Bar, Grid } from "components";
import TeamImg from "img/team.jpg";
import Partner1 from "img/partner1.jpg";
import Partner2 from "img/partner2.jpg";

const partners = [
  {
    title: "Pro 1 Realty Inc",
    info: "@2021",
    link: "https://pro1mainst.com/",
    avatar_link: Partner1,
  },
  {
    title: "Pinarello",
    info: "@2021",
    link: "https://pinarello.com/",
    avatar_link: Partner2,
  },
  {
    title: "Pro 1 Realty Inc",
    info: "@2021",
    link: "https://pro1mainst.com/",
    avatar_link: Partner1,
  },
  {
    title: "Pinarello",
    info: "@2021",
    link: "https://pinarello.com/",
    avatar_link: Partner2,
  },
  {
    title: "Pro 1 Realty Inc",
    info: "@2021",
    link: "https://pro1mainst.com/",
    avatar_link: Partner1,
  },
  {
    title: "Pinarello",
    info: "@2021",
    link: "https://pinarello.com/",
    avatar_link: Partner2,
  },
  {
    title: "Pro 1 Realty Inc",
    info: "@2021",
    link: "https://pro1mainst.com/",
    avatar_link: Partner1,
  },
  {
    title: "Pinarello",
    info: "@2021",
    link: "https://pinarello.com/",
    avatar_link: Partner2,
  },
];

const index = () => {
  return (
    <div>
      <Cover text="PARTNERS" src={TeamImg} />
      <Bar title="PARTNERS" />
      <Grid data={partners} />
    </div>
  );
};

export default index;
