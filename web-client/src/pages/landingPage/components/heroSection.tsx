import { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
// import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";

import cornerShop from "../../../assets/cornershop-logo.png";
import headSpace from "../../../assets/headspace-logo.png";
import pixar from "../../../assets/pixar-logo.png";
import spotify from "../../../assets/spotify-logo-v2.png";
import travelperk from "../../../assets/travelperk-logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(10, 6, 6, 6),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 3),
      },
    },
    partnerImg: {
      width: "80px",
      height: "18px",
    },
    link: {
      textDecoration: "none",
    },
  })
);

export const HeroSection: FC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item md={6} xs={12}>
        <Typography
          variant="body1"
          fontWeight="bold"
          fontSize={50}
          lineHeight={1}
          color="secondary"
        >
          One workspace. Every team.
        </Typography>
        <Box my={3} pr={10}>
          <Typography variant="body1" color="#555" lineHeight={1.5}>
            We’re more than a doc. Or a table. Customize Notion to work the way
            you do.
          </Typography>
        </Box>
        <div>
          <Link to="/authentication" className={classes.link}>
            <Button variant="contained" color="secondary">
              Get started
            </Button>
          </Link>
        </div>
        <Box my={2}>
          <Typography color="#444" variant="body2">
            TRUSTED BY TEAMS AT
          </Typography>
          <Box
            py={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              src={cornerShop}
              alt="cornershop"
              className={classes.partnerImg}
            />
            <img
              src={headSpace}
              alt="headspace"
              className={classes.partnerImg}
            />
            <img src={pixar} alt="pixar" className={classes.partnerImg} />
            <img src={spotify} alt="spotify" className={classes.partnerImg} />
            <img
              src={travelperk}
              alt="travelperk"
              className={classes.partnerImg}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item md={6} xs={12}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          width="auto"
          height="auto"
          viewBox="0 0 826.38189 505.13"
          // xmlns="http://www.w3.org/1999/xlink"
        >
          <path
            id="e73ea6d0-018f-4f1a-b9fb-ec835afd7d29-100"
            data-name="Path 438"
            d="M958.436,653.57547a24.21462,24.21462,0,0,1-23.38268-4.11877c-8.18977-6.87442-10.758-18.196-12.84671-28.68191l-6.17973-31.01657,12.9377,8.90836c9.30465,6.40641,18.81827,13.01866,25.26011,22.29785s9.25223,21.94708,4.07792,31.988"
            transform="translate(-186.80906 -197.435)"
            fill="#e6e6e6"
          />
          <path
            id="adfa37d6-6055-4e93-a6c7-1993979ff9f6-101"
            data-name="Path 439"
            d="M956.43833,693.286c1.62839-11.86369,3.30382-23.88079,2.15884-35.87167-1.01466-10.64933-4.26373-21.04881-10.87831-29.57938a49.20592,49.20592,0,0,0-12.62466-11.44039c-1.26215-.79648-2.42409,1.20354-1.16733,1.997a46.7794,46.7794,0,0,1,18.50446,22.32562c4.02858,10.24607,4.67545,21.41582,3.98154,32.30029-.41944,6.58218-1.31074,13.12121-2.20588,19.65252a1.19816,1.19816,0,0,0,.808,1.4225,1.16347,1.16347,0,0,0,1.42253-.808Z"
            transform="translate(-186.80906 -197.435)"
            fill="#f2f2f2"
          />
          <path
            id="ab8f3b7e-46a3-4c45-91c1-6e6ed9e46d7b-102"
            data-name="Path 442"
            d="M944.7173,674.24958a17.82512,17.82512,0,0,1-15.53141,8.01861c-7.8644-.37318-14.41806-5.85972-20.31713-11.07026l-17.452-15.40881,11.54987-.5528c8.3062-.39784,16.82672-.771,24.73814,1.79338s15.20757,8.72639,16.654,16.9154"
            transform="translate(-186.80906 -197.435)"
            fill="#e6e6e6"
          />
          <path
            id="a06078c2-c2e6-4e9e-9e9d-932246ef76f7-103"
            data-name="Path 443"
            d="M961.04131,700.10571c-7.83972-13.87142-16.93234-29.28794-33.1808-34.21551a37.02581,37.02581,0,0,0-13.95544-1.44105c-1.4819.128-1.1118,2.41174.367,2.28454a34.39821,34.39821,0,0,1,22.27164,5.89215c6.27994,4.27453,11.16975,10.21755,15.30781,16.51907,2.53511,3.8605,4.80577,7.88445,7.07642,11.903C959.65349,702.33242,961.77532,701.40488,961.04131,700.10571Z"
            transform="translate(-186.80906 -197.435)"
            fill="#f2f2f2"
          />
          <polygon
            points="494.22 150.5 494.22 282.58 189.16 282.58 189.16 352.71 108.51 352.71 108.51 150.5 494.22 150.5"
            fill="#fff"
          />
          <path
            d="M291.80906,344.435v209.22h84.16015v-7.01H298.81906V351.445h378.71v128.57h7.01V344.435Z"
            transform="translate(-186.80906 -197.435)"
            fill="#e5e5e5"
          />
          <rect
            x="189.35419"
            y="225.34781"
            width="244.49561"
            height="8.63082"
            fill="#e5e5e5"
          />
          <rect
            x="189.35419"
            y="247.78794"
            width="244.49561"
            height="8.63082"
            fill="#e5e5e5"
          />
          <rect
            x="189.35419"
            y="270.22806"
            width="244.49561"
            height="8.63082"
            fill="#e5e5e5"
          />
          <circle cx="174.51342" cy="229.98892" r="5.63266" fill="#e5e5e5" />
          <polygon
            points="389.22 3.5 389.22 135.58 84.16 135.58 84.16 205.71 3.51 205.71 3.51 3.5 389.22 3.5"
            fill="#fff"
          />
          <path
            d="M186.80906,197.435v209.22h84.16015v-7.01H193.81906v-195.2h378.71v128.57h7.01V197.435Z"
            transform="translate(-186.80906 -197.435)"
            fill="#f1f1f1"
          />
          <rect
            x="84.35419"
            y="78.34781"
            width="244.49561"
            height="8.63082"
            fill="#f1f1f1"
          />
          <rect
            x="84.35419"
            y="100.78794"
            width="244.49561"
            height="8.63082"
            fill="#f1f1f1"
          />
          <rect
            x="84.35419"
            y="123.22806"
            width="244.49561"
            height="8.63082"
            fill="#f1f1f1"
          />
          <circle cx="69.51342" cy="82.98892" r="5.63266" fill="#f1f1f1" />
          <rect
            x="209.77619"
            y="299.41412"
            width="385.71729"
            height="202.20937"
            fill="#fff"
          />
          <path
            d="M785.80906,702.565H393.07873V493.3426H785.80906Zm-385.71729-7.013H778.796V500.35564H400.09177Z"
            transform="translate(-186.80906 -197.435)"
            fill="#cbcbcb"
          />
          <rect
            x="290.20038"
            y="374.57656"
            width="244.49561"
            height="8.63082"
            fill="#6c63ff"
          />
          <rect
            x="290.20038"
            y="397.01669"
            width="244.49561"
            height="8.63082"
            fill="#6c63ff"
          />
          <rect
            x="290.20038"
            y="419.45681"
            width="244.49561"
            height="8.63082"
            fill="#6c63ff"
          />
          <circle cx="275.35962" cy="379.21767" r="5.63266" fill="#6c63ff" />
          <path
            d="M725.44621,493.35007a10.06737,10.06737,0,0,1,3.92234-14.93042l27.89641-87.347,19.4284,10.09245-33.53042,82.68569a10.12188,10.12188,0,0,1-17.71673,9.49924Z"
            transform="translate(-186.80906 -197.435)"
            fill="#9f616a"
          />
          <path
            d="M748.2368,403.1514a4.50917,4.50917,0,0,1,.02119-3.75868l9.55481-20.54247a12.53637,12.53637,0,0,1,24.06046,7.05209l-3.1935,22.50386a4.51406,4.51406,0,0,1-5.7515,3.69356l-21.85912-6.47651A4.509,4.509,0,0,1,748.2368,403.1514Z"
            transform="translate(-186.80906 -197.435)"
            fill="#6c63ff"
          />
          <polygon
            points="642.019 209.183 640.461 231.001 587.475 249.702 586.696 228.663 642.019 209.183"
            fill="#9f616a"
          />
          <path
            d="M761.038,374.671l17.14237-12.46718,28.05117-7.792,23.376,4.67519,3.896,36.62235-4.67519,23.376-60.77752,14.02558-6.2336-10.90878s-14.02558-14.02558-3.11679-29.60956Z"
            transform="translate(-186.80906 -197.435)"
            fill="#6c63ff"
          />
          <path
            d="M754.80436,342.67164V322.20853a32.64353,32.64353,0,1,1,65.28706,0v20.46311a4.3899,4.3899,0,0,1-4.385,4.385H759.18932A4.38991,4.38991,0,0,1,754.80436,342.67164Z"
            transform="translate(-186.80906 -197.435)"
            fill="#2f2e41"
          />
          <circle cx="599.32681" cy="125.4871" r="23.93309" fill="#9f616a" />
          <path
            d="M761.54594,322.82992a2.43626,2.43626,0,0,1-.57024-1.9422l2.835-19.7418a2.43962,2.43962,0,0,1,1.37838-1.86989c14.47068-6.7725,29.145-6.78107,43.61567-.02569a2.4548,2.4548,0,0,1,1.39218,1.98408l1.89249,19.76749a2.43565,2.43565,0,0,1-2.42514,2.66827h-4.79961a2.44551,2.44551,0,0,1-2.20747-1.4055l-2.07138-4.43825a1.46155,1.46155,0,0,0-2.77486.43679l-.40918,3.27253a2.4396,2.4396,0,0,1-2.41729,2.13443H763.387A2.43621,2.43621,0,0,1,761.54594,322.82992Z"
            transform="translate(-186.80906 -197.435)"
            fill="#2f2e41"
          />
          <path
            d="M865.4392,483.15889a10.06731,10.06731,0,0,1-6.97655-13.77062L821.35,385.54107l21.23033-5.34724,29.80474,84.10047a10.12188,10.12188,0,0,1-6.94588,18.86459Z"
            transform="translate(-186.80906 -197.435)"
            fill="#9f616a"
          />
          <path
            d="M822.61484,400.56782a4.50922,4.50922,0,0,1-2.479-2.82535L813.647,376.03573a12.53637,12.53637,0,0,1,22.67679-10.69584l12.54864,18.95135a4.514,4.514,0,0,1-1.85016,6.5802L826.374,400.53662A4.509,4.509,0,0,1,822.61484,400.56782Z"
            transform="translate(-186.80906 -197.435)"
            fill="#6c63ff"
          />
          <polygon
            points="639.353 490.356 625.845 490.355 619.419 438.253 639.355 438.254 639.353 490.356"
            fill="#9f616a"
          />
          <path
            d="M829.60666,700.88487l-43.55544-.00162v-.5509a16.95391,16.95391,0,0,1,16.953-16.95273h.00107l26.60219.00108Z"
            transform="translate(-186.80906 -197.435)"
            fill="#2f2e41"
          />
          <polygon
            points="629.087 380.349 619.878 390.231 577.378 359.413 590.97 344.828 629.087 380.349"
            fill="#9f616a"
          />
          <path
            d="M827.8241,584.18961l-29.69366,31.86476-.40305-.37556a16.95391,16.95391,0,0,1-.84575-23.96l.00074-.00079,18.13594-19.46185Z"
            transform="translate(-186.80906 -197.435)"
            fill="#2f2e41"
          />
          <path
            d="M830.38667,428.43574l4.32015,4.32016c21.60958,21.60958,26.92973,51.573,24.33455,82.02316a85.20579,85.20579,0,0,1-2.16194,13.39415c-7.792,31.168-3.1168,130.90543-18.70078,137.139L835.06186,676.221l-30.38876-1.12278.7792-9.786s-7.01279-14.80478-2.3376-24.15517,14.80478-78.6991,14.80478-78.6991l-5.45439-56.88152-40.51835,20.25917s21.03837,11.688,19.48,19.48c0,0,12.46718,3.11679,9.35038,10.90878l4.6752,9.35039-10.90879,17.14238s-73.2447-43.63515-67.01111-65.45272,45.19354-37.40155,45.19354-37.40155l3.1168-23.376-2.68732-12.73714,54.51749-20.95656Z"
            transform="translate(-186.80906 -197.435)"
            fill="#2f2e41"
          />
          <path
            d="M1012.19094,702.565h-444a1,1,0,0,1,0-2h444a1,1,0,0,1,0,2Z"
            transform="translate(-186.80906 -197.435)"
            fill="#cbcbcb"
          />
        </svg>
      </Grid>
    </Grid>
  );
};
