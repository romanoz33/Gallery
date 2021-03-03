import React, { useCallback, useEffect, useState } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Icon, Image } from '@quarkly/widgets';
import scroll from './Scrollblock';
import Loader from './Loader';
import { IoMdClose } from "react-icons/io";
const overrides = {
	'Overlay': {
		'kind': 'Box',
		'props': {
			'position': 'fixed',
			'bottom': 0,
			'right': 0,
			'left': 0,
			'top': 0,
			'background': 'rgba(0, 0, 0, .7)',
			'display': 'flex',
			'justify-content': 'center',
			'align-items': 'center'
		}
	},
	'Overlay :open': {
		'kind': 'Box',
		'props': {
			'opacity': 1,
			'z-index': 110,
			'visibility': 'visible',
			'transition-property': 'opacity, visibility, z-index',
			'transition-duration': '.3s'
		}
	},
	'Overlay :close': {
		'kind': 'Box',
		'props': {
			'opacity': 0,
			'z-index': -1,
			'visibility': 'hidden',
			'transition-property': 'opacity, visibility, z-index',
			'transition-duration': '.3s'
		}
	},
	'Image': {
		'kind': 'Lightbox Image'
	},
	'Close': {
		'kind': 'Icon',
		'props': {
			'position': 'absolute',
			'top': '15px',
			'right': '20px',
			'size': '30px',
			'color': '#fff',
			'cursor': 'pointer',
			'z-index': '124',
			'category': 'io',
			'icon': IoMdClose
		}
	},
	'Loader': {
		'kind': 'Icon'
	}
};
const imageIsZoomIn = {
	'max-width': '100%',
	'max-height': '100%',
	'cursor': 'zoom-out'
};
const imageIsZoomOut = {
	'max-width': '80%',
	'max-height': '80%',
	'cursor': 'zoom-in'
};
const imageIsOpen = {
	'opacity': 1,
	'z-index': 110,
	'visibility': 'visible',
	'transform': 'scale(1)',
	'transition-property': 'opacity, visibility, z-index, transform, max-height, max-width',
	'transition-duration': '.3s',
	'transition-timing-function': 'ease-in-out'
};
const imageIsClose = {
	'opacity': 0,
	'z-index': -1,
	'visibility': 'hidden',
	'transform': 'scale(.9)',
	'transition-property': 'opacity, visibility, z-index, transform, max-height, max-width',
	'transition-duration': '.3s',
	'transition-timing-function': 'ease-in-out'
}; // Остановка слушателя для дочерих элементов

const stopEventClick = e => {
	e.stopPropagation();
	e.cancelBubble = true; // для IE
};

const Lightbox = ({
	loadImage,
	somePictureParams,
	setSomePictureParams,
	isOpen,
	setOpen,
	isBigImage,
	setBigImage,
	isZoom,
	setZoom,
	offScrollProp,
	// isLoadingFullPic, 
	// setLoadingFullPic,
	defaultFullSrc,
	fullLoaderStatusProp,
	clicked,
	setClicked,
	...props
}) => {
	// Загружена ли полная картинка
	const [isLoadingFullPic, setLoadingFullPic] = useState(true);
	useEffect(() => {
		// В случае, когда отключаем Lighbox с помощью пропса, убираем блокировку скрола
		if (!isOpen) scroll.enable();
	}, [isOpen]);
	useEffect(() => {
		if (clicked) {
			setOpen(true);
			loadImage(somePictureParams.src || defaultFullSrc).then(img => {
				setBigImage(false);
				setLoadingFullPic(false);
				if (offScrollProp) scroll.disable();
				if (img.width > window.innerWidth) setBigImage(true);
			});
		}
	}, [isOpen, clicked]);
	const closeLightbox = useCallback(() => {
		setLoadingFullPic(true);
		setOpen(false);
		setZoom(false);
		setClicked(false);
		setSomePictureParams({});
		if (offScrollProp) scroll.enable();
	}, [offScrollProp, isOpen]);
	const zoomImage = useCallback(e => {
		stopEventClick(e);
		setZoom(!isZoom);
	}, [isZoom]);
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	return <Box {...rest}>
		 
		<Box onClick={closeLightbox} {...override('Overlay', `Overlay ${isOpen ? ':open' : ':close'}`)}>
			<Icon onClick={closeLightbox} {...override('Close')} />
			<Image
				margin='0 auto'
				max-width='80%'
				max-height='80%'
				min-height='0'
				min-weight='0'
				onClick={zoomImage}
				{...isZoom ? isBigImage && imageIsZoomIn : isBigImage && imageIsZoomOut}
				{...isOpen ? imageIsOpen : imageIsClose}
				src={isLoadingFullPic ? '' : somePictureParams.src || defaultFullSrc}
				title={somePictureParams['title']}
				alt={somePictureParams['alt']}
				srcset={somePictureParams['srcset']}
				sizes={somePictureParams['sizes']}
				object-fit={somePictureParams['object-fit']}
				object-position={somePictureParams['object-position']}
				loading={somePictureParams['loading']}
				{...override('Image')}
			/>
			 
			{fullLoaderStatusProp ? '' : <Loader {...override('Loader')} isLoading={isLoadingFullPic} />}
		</Box>
		  
	</Box>;
};

Object.assign(Lightbox, {
	overrides
});
export default Lightbox;