import styled from '@emotion/styled';

const StyledButton = styled('button')<{ variant: string }>`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;

  display: flex;
  justify-content: center;
  outline: none;
  cursor: pointer;
  border: 0;

  --shadow-primary: 0 2px 8px -1px hsla(var(--palette-blue-50), 0.32);
  --shadow-hover-primary: 0 4px 40px -2px hsla(var(--palette-blue-50), 0.7);

  border-radius: var(--border-radius-1);

  font-size: 16px;
  font-weight: 500;
  min-width: 150px;
  height: 44px;

  padding: 10px 12px;

  transform: scale(var(--button-scale, 1)) translateZ(0);
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;

  ${(p) =>
    p.variant === 'primary' &&
    `

  background: var(--background, var(--maximeheckel-colors-brand));
  color: hsl(var(--palette-gray-00));

  box-shadow: var(--shadow, --shadow-primary);

  &:hover {
    --shadow: var(--shadow-hover-primary);
  }

  &:focus-visible {
    --shadow: var(--shadow-hover-primary);
  }
  `}

  ${(p) =>
    p.variant === 'secondary' &&
    `
    background: transparent;
    color: var(--color, var(--maximeheckel-colors-brand));

    // box-shadow: var(--shadow-primary);

    // &:hover {
    //   --shadow: var(--shadow-hover-primary);
    // }
  `}


  &:active {
    --button-scale: 0.95;
    // --shadow-y: 2px;
    // --shadow-blur: 4px;
  }

  &:focus-visible {
  }
`;

// @ts-ignore
const Button = (props) => {
  const { variant = 'primary', children } = props;
  return <StyledButton variant={variant}>{children}</StyledButton>;
};

export default Button;

// const pulse = keyframes({
//   "100%": { boxShadow: "0 0 0 20px rgba(255, 255, 255, 0)" },
// });

// const exampleWrapper = styled("a", {
// padding: "12px 24px",
//   backgroundColor: "black",
//   color: "white",
//   borderRadius: 7,
//   boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.1)",
//   animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1),
// });

// .exampleClass span {
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   background-color: white;
//   animation: flashing 1.4s infinite linear;
//   margin: 0 4px;
//   display: inline-block;
// }

// .exampleClass span:nth-child(2) {
//   animation-delay: 0.2s;
// }

// .exampleClass span:nth-child(3) {
//   animation-delay: 0.4s;
// }

// @keyframes flashing {
//   0% {
//     opacity: 0.2;
//   }
//   20% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0.2;
//   }
// }
