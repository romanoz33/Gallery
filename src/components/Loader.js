import React from 'react';
import atomize from "@quarkly/atomize";
import { Icon } from '@quarkly/widgets';
import styled, { keyframes } from "styled-components";
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg); 
  }
`;
const Rotate = styled(Icon)`
  animation: ${rotate} 2s linear infinite;
`;
export default atomize(Rotate)({
	name: "Sdaasd",
	effects: {
		hover: ":hover"
	},
	normalize: true,
	mixins: true,
	description: {
		en: "Sdaasd — my awesome component"
	},
	propInfo: {
		yourCustomProps: {
			control: "input"
		}
	}
});