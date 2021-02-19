import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Image, Icon } from '@quarkly/widgets';
import scroll from './Scrollblock';
import Loader from './Loader';
import { AiOutlineLoading } from "react-icons/ai";
const overrides = {
	'Loader': {
		'kind': 'Icon',
		'props': {
			'position': 'absolute',
			'top': 'calc(50% - 15px)',
			'left': 'calc(50% - 15px)',
			'z-index': '125',
			'category': 'ai',
			'icon': AiOutlineLoading,
			'size': '30px'
		}
	}
};

const loadImage = url => new Promise(resolve => {
	const img = document.createElement('img');
	img.addEventListener('load', () => resolve(img));
	img.src = url;
});

const Item = ({
	columsCountProp,
	rowsCountProp,
	imagesAutoResizeProp,
	showImageProp,
	srcPreview,
	srcSetPreview,
	sizesPreview,
	altPreview,
	titlePreview,
	objectFitPreview,
	objectPositionPreview,
	loadingPreview,
	srcFull,
	srcSetFull,
	sizesFull,
	altFull,
	titleFull,
	objectFitFull,
	objectPositionFull,
	loadingFull,
	index,
	addPictureParams,
	isOpen,
	setOpen,
	setIndex,
	selectdIndex,
	setBigImage,
	isBigImage,
	setZoom,
	scrollStatus,
	ratioSizes,
	setRatioSizes,
	ratioFormatsProp,
	columnsCountProp,
	borderWidthProp,
	imagesMinWidthProp,
	imagesMaxWidthProp,
	autoFillInProp,
	loaderFormatProp,
	galleryItemCountProp,
	addRef,
	...props
}) => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	const imageRef = useRef();
	const boxRef = useRef(); // Функция для записи всех картинок в объект

	addPictureParams(index, {
		srcFull,
		srcSetFull,
		sizesFull,
		altFull,
		titleFull,
		objectFitFull,
		objectPositionFull,
		loadingFull
	});
	useEffect(() => {
		setOpen(showImageProp);
		setIndex(selectdIndex);
	}, [showImageProp, selectdIndex]);
	useEffect(() => {
		addRef(index, imageRef.current);
	}, []); // }, [loaderFormatProp]); 
	// useEffect(() => {   
	// // window.addEventListener('scroll', function(e) { 
	// 	loadImage(srcPreview).then(img => {  
	// 		if (checkOnView(sizes)) {
	// 			imageRef.current.src = srcPreview;    
	// 		} 
	// 		// imageRef.current.style.backgroundImage = 'none'; 
	// 	});   
	// // });
	// }, [ratioFormatsProp]);  
	// useEffect(() => {   
	// 	loadImage(srcPreview).then(img => { 
	// 	checkOnView(imageRef.current);
	// 		imageRef.current.src = srcPreview;   
	// 		// imageRef.current.style.backgroundImage = 'none'; 
	// 	});  
	// }, [ratioFormatsProp]);  
	// const openGalleryItem = useCallback((e) => {
	// const openGalleryItem = (e) => {
	// 	loadImage(srcFull)  
	// 	.then(img => {
	// 		setIndex(index);
	// 		setBigImage(false);
	// 		setOpen(true);
	// 		if (scrollStatus) scroll.disable();
	// 		if (img.width > window.innerWidth) setBigImage(true);
	// 	}); 
	// 	window.addEventListener('keydown', (e) => {
	// 		if (e.keyCode === 27) {
	// 			setOpen(false);  
	// 			setZoom(false);
	// 			if (scrollStatus) scroll.enable();
	// 		} 
	// 	});	
	// }; 
	// }, [isOpen, index, isBigImage, scrollStatus]); 

	const changeFormat = useCallback((format, sizes) => {
		const params = {
			width: sizes.width,
			height: sizes.height
		};

		switch (format) {
			case '16:9':
				params.height = 9 * params.width / 16;
				break;

			case '4:3':
				params.height = 3 * params.width / 4;
				break;

			case '3:2':
				params.height = 2 * params.width / 3;
				break;

			case '1:1':
				params.height = params.width;
				break;

			case '2:3':
				params.height = 3 * params.width / 2;
				break;

			case '3:4':
				params.height = 4 * params.width / 3;
				break;

			case '9:16':
				params.height = 16 * params.width / 9;
				break;

			default:
				params.height = 'auto';
				params.width = 'auto';
		}

		setRatioSizes(params);
	}, [ratioFormatsProp, columnsCountProp, borderWidthProp, imagesMinWidthProp, imagesMaxWidthProp, autoFillInProp]);
	useEffect(() => {
		const sizes = boxRef.current.getBoundingClientRect();
		changeFormat(ratioFormatsProp, sizes);
	}, [ratioFormatsProp, columnsCountProp, borderWidthProp, imagesMinWidthProp, imagesMaxWidthProp, autoFillInProp]); // useEffect(() => { 
	// 	const sizes = boxRef.current.getBoundingClientRect();
	// 	setRatioSizes({
	// 		height: sizes.width,
	// 		width: sizes.width,
	// 	})
	// }, []); 

	useEffect(() => {// if (loaderFormatProp === 'Все сразу') setSrc(imageRef.current);
		// if (loaderFormatProp === 'При скроле') lazyLoader(imageRef.current);
		// loadImage(srcPreview).then(img => {  
		// 		// imageRef.current.src = srcPreview;    
		// });  
		// console.log(columnsCountProp, galleryItemCountProp)
		// lazyLoader(imageRef.current, columnsCountProp, index);
		// lazyLoader(imageRef.current);
		// console.log(imageRef.current.getBoundingClientRect())
		// console.log(imageRef.current.clientHeight )
		// console.log(imageRef) 
	}, []);
	return <Box
		ref={boxRef}
		{...rest}
		min-width='auto'
		min-height='auto'
		grid-column={`span ${columsCountProp}`}
		grid-row={`span ${rowsCountProp}`}
		position='relative'
		height='auto'
	>
		 
		<Image
			ref={imageRef}
			onClick={e => openGalleryItem(e)}
			max-width='100%'
			max-height='100%'
			display='block'
			min-width={imagesAutoResizeProp ? '100%' : 'auto'}
			min-height={imagesAutoResizeProp ? '100%' : 'auto'}
			object-fit={imagesAutoResizeProp ? 'cover' : objectFitPreview} // srcset={srcSetPreview}
			// sizes={sizesPreview}
			// alt={altPreview} 
			// title={titlePreview}
			// object-position={objectPositionPreview}

			loading={loadingPreview}
			src={srcPreview}
			width="300"
			height="300" // src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAGQCAYAAAAUdV17AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHmSURBVHgB7cCBAAAAAICg/akXqQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAaVPkAAR4KkGUAAAAASUVORK5CYII='
			// data-src={srcPreview}

			background-image='url(https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47w5icg0kkchsj6di3haw72lfkcuo7s9ge2ctq93r6&rid=giphy.gif)'
			background-repeat='no-repeat'
			background-position='center'
			{...ratioSizes}
		/>
		 
	</Box>;
}; // <Loader  
// 	ref={loadRef} 
// 	{...override('Loader')}
// /> 


const propInfo = {
	columsCountProp: {
		title: 'Ширина в столбцах',
		description: {
			en: 'Количество столбцов, которое должно занимать изображение'
		},
		control: 'input',
		category: 'Main',
		weight: 1
	},
	rowsCountProp: {
		title: 'Высота в колонках',
		description: {
			en: 'Количество колонок, которое должно занимать изображение'
		},
		control: 'input',
		category: 'Main',
		weight: 1
	},
	imagesAutoResizeProp: {
		title: 'Растянуть на всю ширину и высоту',
		description: {
			en: 'Растягивать изображения на всю ширину и высоту, если есть свободное пространство'
		},
		control: 'checkbox',
		category: 'images',
		weight: 1
	},
	showImageProp: {
		title: 'Показать изображение',
		description: {
			ru: 'Показать полное изображение'
		},
		control: 'checkbox',
		category: 'images',
		weight: 1
	},
	srcPreview: {
		weight: 1,
		control: "image",
		category: "Image preview",
		title: "Src",
		description: {
			en: "src — image address",
			ru: "src — aдрес изображения"
		}
	},
	srcSetPreview: {
		title: "Srcset",
		weight: 1,
		type: "string",
		control: "srcSet",
		multiply: true,
		category: "Image preview",
		description: {
			en: "srcSet — a string which identifies one or more image sources with descriptors",
			ru: "srcSet — строка, определяющая один или несколько источников изображений с дескрипторами"
		}
	},
	sizesPreview: {
		title: "Sizes",
		weight: 1,
		type: "string",
		control: "sizes",
		multiply: true,
		category: "Image preview",
		description: {
			en: "sizes — image slot sizes from srcSet for different breakpoints",
			ru: "sizes — размеры контейнера изображения из srcSet для различных брейкпоинтов"
		}
	},
	altPreview: {
		title: "Alt",
		weight: 1,
		type: "string",
		category: "Image preview",
		description: {
			en: "alt – a piece of text that appears when an image cannot be displayed",
			ru: "alt — текст, который будет отображаться когда изображение недоступно"
		}
	},
	titlePreview: {
		title: "Title",
		weight: 1,
		type: "string",
		category: "Image preview",
		description: {
			en: "title – additional information for the element that appears as a tooltip",
			ru: "title — описывает содержимое элемента в виде всплывающей подсказки"
		}
	},
	objectFitPreview: {
		title: "Object fit",
		weight: 1,
		type: "string",
		control: "select",
		variants: ["fill", "contain", "cover", "none", "scale-down"],
		category: "Image preview",
		description: {
			en: "object-fit – defines how the content of the replaced element should be resized to fit its container",
			ru: "object-fit — определяет, как содержимое заменяемого элемента должно заполнять контейнер"
		}
	},
	objectPositionPreview: {
		title: "Object position",
		weight: 1,
		type: "string",
		category: "Image preview",
		description: {
			en: "object-position – specifies the alignment of the selected replaced element contents within the element box relative to the X and Y coordinate axes",
			ru: "object-position — задаёт положение содержимого замещаемого элемента внутри контейнера относительно координатных осей X и Y"
		}
	},
	loadingPreview: {
		title: "Loading",
		weight: 1,
		type: "string",
		category: "Image preview",
		control: "select",
		variants: ["eager", "lazy"],
		description: {
			en: "loading - indicates how the browser should load the image",
			ru: "loading — указывает как браузер должен загружать изображение"
		}
	},
	srcFull: {
		weight: 1,
		control: "image",
		category: "Image Full",
		title: "Src",
		description: {
			en: "src — image address",
			ru: "src — aдрес изображения"
		}
	},
	srcSetFull: {
		title: "Srcset",
		weight: 1,
		type: "string",
		control: "srcSet",
		multiply: true,
		category: "Image Full",
		description: {
			en: "srcSet — a string which identifies one or more image sources with descriptors",
			ru: "srcSet — строка, определяющая один или несколько источников изображений с дескрипторами"
		}
	},
	sizesFull: {
		title: "Sizes",
		weight: 1,
		type: "string",
		control: "sizes",
		multiply: true,
		category: "Image Full",
		description: {
			en: "sizes — image slot sizes from srcSet for different breakpoints",
			ru: "sizes — размеры контейнера изображения из srcSet для различных брейкпоинтов"
		}
	},
	altFull: {
		title: "Alt",
		weight: 1,
		type: "string",
		category: "Image Full",
		description: {
			en: "alt – a piece of text that appears when an image cannot be displayed",
			ru: "alt — текст, который будет отображаться когда изображение недоступно"
		}
	},
	titleFull: {
		title: "Title",
		weight: 1,
		type: "string",
		category: "Image Full",
		description: {
			en: "title – additional information for the element that appears as a tooltip",
			ru: "title — описывает содержимое элемента в виде всплывающей подсказки"
		}
	},
	objectFitFull: {
		title: "Object fit",
		weight: 1,
		type: "string",
		control: "select",
		variants: ["fill", "contain", "cover", "none", "scale-down"],
		category: "Image Full",
		description: {
			en: "object-fit – defines how the content of the replaced element should be resized to fit its container",
			ru: "object-fit — определяет, как содержимое заменяемого элемента должно заполнять контейнер"
		}
	},
	objectPositionFull: {
		title: "Object position",
		weight: 1,
		type: "string",
		category: "Image Full",
		description: {
			en: "object-position – specifies the alignment of the selected replaced element contents within the element box relative to the X and Y coordinate axes",
			ru: "object-position — задаёт положение содержимого замещаемого элемента внутри контейнера относительно координатных осей X и Y"
		}
	},
	loadingFull: {
		title: "Loading",
		weight: 1,
		type: "string",
		category: "Image Full",
		control: "select",
		variants: ["eager", "lazy"],
		description: {
			en: "loading - indicates how the browser should load the image",
			ru: "loading — указывает как браузер должен загружать изображение"
		}
	}
};
const defaultProps = {
	columsCountProp: 1,
	rowsCountProp: 1,
	imagesAutoResizeProp: true,
	showImageProp: false,
	srcPreview: 'https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=6&m=1222357475&s=170667a&w=0&h=sCVQ6Qaut-zK8EdXE4s70nmmXRQeK8FmooCqvE32spQ='
};
Object.assign(Item, {
	overrides,
	propInfo,
	defaultProps
});
export default Item;