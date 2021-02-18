import React, { useCallback, useEffect } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Icon, Image } from '@quarkly/widgets';
import scroll from './Scrollblock';
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
			'transition-duration': '.7s'
		}
	},
	'Overlay :close': {
		'kind': 'Box',
		'props': {
			'opacity': 0,
			'z-index': -1,
			'visibility': 'hidden',
			'transition-property': 'opacity, visibility, z-index',
			'transition-duration': '.7s'
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
	'transition-duration': '.7s',
	'transition-timing-function': 'ease-in-out'
};
const imageIsClose = {
	'opacity': 0,
	'z-index': -1,
	'visibility': 'hidden',
	'transform': 'scale(.9)',
	'transition-property': 'opacity, visibility, z-index, transform, max-height, max-width',
	'transition-duration': '.7s',
	'transition-timing-function': 'ease-in-out'
}; // Остановка слушателя для дочерих элементов

const stopEventClick = e => {
	e.stopPropagation();
	e.cancelBubble = true; // для IE
};

const Lightbox = ({
	picturesParams,
	isOpen,
	setOpen,
	selectdIndex,
	setIndex,
	isBigImage,
	isZoom,
	setZoom,
	scrollStatus,
	...props
}) => {
	useEffect(() => {// В случае, когда отключаем Lighbox с помощью пропса, убираем блокировку скрола
		// if (!isOpen) scroll.enable();
	}, [isOpen]);
	const closeLightbox = useCallback(() => {
		setOpen(false);
		setZoom(false); // if (scrollStatus) scroll.enable();
	}, [scrollStatus, isOpen]);
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
				onClick={e => zoomImage(e)}
				{...isZoom ? isBigImage && imageIsZoomIn : isBigImage && imageIsZoomOut}
				{...isOpen ? imageIsOpen : imageIsClose}
				src={picturesParams[selectdIndex].src || 'http://placehold.it/800'}
				{...override('Image')}
			/>
		</Box>
		  
	</Box>;
};

Object.assign(Lightbox, {
	overrides
});
export default Lightbox;