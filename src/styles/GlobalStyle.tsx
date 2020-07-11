import { createGlobalStyle, css } from 'styled-components';
import { device } from './breakpoint';

const GlobalStyle = createGlobalStyle`
*,
*:before,
*:after {
   box-sizing: border-box;
}
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video,
main {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}
iframe {
    width: 100%;
}
body {
    font-family: ${props => props.theme.fontFamilyString};
    color: ${props => props.theme.textColor};
    background-color:  ${props => props.theme.pageBg()};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
main {
    display: block;
}
ul {
    list-style: none;
}
nav ul {
    list-style: none;
}
blockquote,
q {
    quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
   content: '';
   content: none;
}
a {
   margin: 0;
   padding: 0;
   font-size: 100%;
   vertical-align: baseline;
   background: transparent;
   text-decoration: none;
   color: ${props => props.theme.textColor};
}
ins {
   background-color: #ff9;
   color: #000;
   text-decoration: none;
}
mark {
   background-color: #ff9;
   color: #000;
   font-style: italic;
   font-weight: bold;
}
del {
   text-decoration: line-through;
}
button {
    background: none;
    border: none;
    cursor: pointer;
}
abbr[title],
dfn[title] {
   border-bottom: 1px dotted;
   cursor: help;
}
/* tables still need cellspacing="0" in the markup */
table {
   border-collapse: collapse;
   border-spacing: 0;
}
hr {
   display: block;
   height: 1px;
   border: 0;
   padding: 0;
   margin: ${props => props.theme.gutter} 0;
}
input,
select {
   vertical-align: middle;
}
small {
   font-size: 0.8em;
}
img {
    max-width: 100%;
    height: auto;
}
h1,h2,h3,h4,h5,h6 {
    ${props => props.theme.headingFont('700')}
    letter-spacing: -0.5px;
}
button {
    ${props => props.theme.headingFont('700')}
}
h1 {
    ${props => css`
        ${props.theme.fontSize(24, props.theme.gutterValue(props.theme.gutterMobile))};
        @media ${device.tabletMin} {
            ${props.theme.fontSize(32, props.theme.gutterValue(props.theme.gutterTablet))};
        }
        @media ${device.laptopMin} {
            ${props.theme.fontSize(40, props.theme.gutterValue())};
        }
    `}
}
h2 {
    ${props => css`
        ${props.theme.fontSize(20, props.theme.gutterValue(props.theme.gutterMobile))};
        @media ${device.tabletMin} {
            ${props.theme.fontSize(28, props.theme.gutterValue(props.theme.gutterTablet))};
        }
        @media ${device.laptopMin} {
            ${props.theme.fontSize(32, props.theme.gutterValue())};
        }
    `}
}
h3,h4,h5,h6 {
    ${props => props.theme.font('600')}
}
h3 {
    ${props => css`
        ${props.theme.fontSize(18, props.theme.gutterValue(props.theme.gutterMobile))};
        @media ${device.tabletMin} {
            ${props.theme.fontSize(20, props.theme.gutterValue(props.theme.gutterTablet))};
        }
        @media ${device.laptopMin} {
            ${props.theme.fontSize(24, props.theme.gutterValue())};
        }
    `}
}
h4 {
    ${props => css`
        ${props.theme.fontSize(14, props.theme.gutterValue(props.theme.gutterMobile))};
        @media ${device.tabletMin} {
            ${props.theme.fontSize(16, props.theme.gutterValue(props.theme.gutterTablet))};
        }
        @media ${device.laptopMin} {
            ${props.theme.fontSize(18, props.theme.gutterValue())};
        }
    `}
}
p {
    ${props => css`
        ${props.theme.fontSize(13, props.theme.gutterValue(props.theme.gutterMobile))};
        @media ${device.tabletMin} {
            ${props.theme.fontSize(14, props.theme.gutterValue(props.theme.gutterTablet))};
        }
        @media ${device.laptopMin} {
            line-height: 1.7;
            ${props.theme.fontSize(15, props.theme.gutterValue())};
        }
    `}
}
/* Make the font consistent across all inputs, styles may change */
input,select,textarea {
    ${props => props.theme.font('400')}
}
`;

export default GlobalStyle;
