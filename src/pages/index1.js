import React from "react";
import theme from "theme";
import { Theme, Link, Box, Text } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { Override, Section } from "@quarkly/components";
import * as Components from "components";
export default (() => {
	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index1"} />
		<Helmet>
			<title>
				Quarkly export
			</title>
			<meta name={"description"} content={"Web site created using quarkly.io"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/readme/cra/favicon-32x32.ico"} type={"image/x-icon"} />
		</Helmet>
		<Section padding="100px 0" sm-padding="40px 0">
			<Override slot="SectionContent" align-items="center" display="block" />
			<Box />
			<Text
				as="h2"
				font="--headline1"
				md-font="--headline2"
				margin="20px 0 0 0"
				text-align="center"
			>
				{" \n\t\t"}About Us
			</Text>
			{" "}
			<Box height="100px" />
			<Components.Gallery
				offScrollProp
				autoFillInProp
				loaderFormatProp="При скроле"
				galleryItemCountProp="16"
				ratioFormatsProp="9:16"
				imagesMaxWidthProp="2fr"
				imagesMinWidthProp="84"
				mdColumnsCountProp="2"
				smColumnsCountProp="5"
				lgColumnsCountProp="6"
			>
				<Override slot="Item 2" srcPreview="https://images.unsplash.com/photo-1611095564985-89765398121e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" srcFull="https://images.unsplash.com/photo-1613000308053-179042bbef9e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" showImageProp />
				<Override slot="Lightbox" showImageProp={false} offLightboxProp={false}>
					<Override slot="Icon prev" category="fa" />
				</Override>
				<Override
					slot="Item"
					showImageProp={false}
					srcFull="https://images.unsplash.com/photo-1613565101545-63d41fa3571b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000"
					imagesAutoResizeProp
					loadingPreview="eager"
				/>
				<Override slot="Item 3" srcFull="https://images.unsplash.com/photo-1613061588991-6dd130548bc7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" srcPreview="https://images.unsplash.com/photo-1613077655246-c8c1ab3820d7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" />
				<Override slot="Item 0" srcFull="http://placehold.it/800" srcPreview="https://images.unsplash.com/photo-1613053341085-db794820ce43?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" />
				<Override slot="Item 1" srcPreview="https://images.unsplash.com/photo-1611095780122-d692cee29291?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 4" srcPreview="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 5" srcPreview="https://images.unsplash.com/photo-1612831200752-a70d1d1bb83b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 6" srcPreview="https://images.unsplash.com/photo-1613002143253-8587d9ad2004?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 7" srcPreview="https://images.unsplash.com/photo-1612999087483-b6b89bcf07dc?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" />
				<Override slot="Item 8" srcPreview="https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 9" srcPreview="https://images.unsplash.com/photo-1613066803104-00fab99c0d5a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" />
				<Override slot="Item 10" srcPreview="https://images.unsplash.com/photo-1613048286755-37d7800b04ea?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" />
				<Override slot="Item 11" srcPreview="https://images.unsplash.com/photo-1613052182267-ea06867f2b48?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" />
				<Override slot="Item 12" srcPreview="https://images.unsplash.com/photo-1612831200752-a70d1d1bb83b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 13" srcPreview="https://images.unsplash.com/photo-1612923032660-5c872a1dd5f6?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 14" srcPreview="https://images.unsplash.com/photo-1612831200091-c08595b18e6b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" />
				<Override slot="Item 15" srcPreview="https://images.unsplash.com/photo-1613113459353-f1bc3bf6b29f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000" />
			</Components.Gallery>
		</Section>
		<Section text-align="center" padding="100px 0" sm-padding="40px 0">
			<Text as="h1" font="--headline1" md-font="--headline2" margin="20px 0 0 0">
				About Us
			</Text>
			<Text as="p" font="--lead" margin="20px 0 0 0">
				Hi! I'm a paragraph. Click here to add your own text and edit me. It’s a piece of cake. I’m a great space for you to tell a story and let your site visitors know more about you. Talk about your business and what products and services you offer. Share how you came up with the idea for your company and what makes you different from your competitors. Make your business stand out and show your visitors who you are.{" "}
			</Text>
			<Box display="flex" margin="40px 0 20px 0" justify-content="space-around" sm-flex-direction="column">
				<Box padding="10px" />
				<Box padding="10px" />
				<Box padding="10px" />
			</Box>
		</Section>
		<Link
			font={"--capture"}
			font-size={"10px"}
			position={"fixed"}
			bottom={"12px"}
			right={"12px"}
			z-index={"4"}
			border-radius={"4px"}
			padding={"5px 12px 4px"}
			background-color={"--dark"}
			opacity={"0.6"}
			hover-opacity={"1"}
			color={"--light"}
			cursor={"pointer"}
			transition={"--opacityOut"}
			quarkly-title={"Badge"}
			text-decoration-line={"initial"}
			href={"https://quarkly.io/"}
			target={"_blank"}
		>
			Made on Quarkly
		</Link>
	</Theme>;
});