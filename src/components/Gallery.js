import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Button } from '@quarkly/widgets';
import Item from './Item';
import Lightbox from './Lightbox';
const windowHeightSize = 1.5;
const overrides = {
	'Wrapper': {
		'kind': 'Box'
	},
	'Item': {
		'kind': 'Item',
		'props': {
			'cursor': 'pointer'
		}
	},
	'Lightbox': {
		'kind': 'Lightbox',
		'props': {
			'height': 0,
			'min-height': 0
		}
	},
	'Button More': {
		'kind': 'Button',
		'props': {
			'margin': '0 auto',
			'display': 'block',
			'margin-top': '20px'
		}
	},
	'Button More:on': {
		'kind': 'Button',
		'props': {
			'display': 'block'
		}
	},
	'Button More:off': {
		'kind': 'Button',
		'props': {
			'display': 'none'
		}
	}
};

const changeStrInNumber = str => {
	const reg = /^[\d.,]+$/;
	const newStr = str.replace(/\s/g, '');

	if (reg.test(newStr)) {
		return `${parseInt(newStr)}px`;
	}

	return `${newStr}`;
}; // Собираем и храним все пропсы по картинкам


const picturesParams = [];

const addPictureParams = (index, data) => {
	picturesParams[index] = {
		'src': data.srcFull,
		'srcset': data.srcSetFull,
		'sizes': data.sizesFull,
		'alt': data.altFull,
		'title': data.titleFull,
		'objectFit': data.objectFitFull,
		'objectPosition': data.objectPositionFull,
		'loading': data.loadingFull
	};
};

const getAPI = () => {
	if (typeof window !== "undefined") {
		return window.QAPI || {};
	}

	if (typeof global !== "undefined") {
		return global.QAPI || {};
	}

	return {};
};

const Gallery = ({
	galleryItemCountProp,
	columnsCountProp,
	lgColumnsCountProp,
	mdColumnsCountProp,
	smColumnsCountProp,
	ratioFormatsProp,
	loaderFormatProp,
	autoFillInProp,
	imagesMaxWidthProp,
	imagesMinWidthProp,
	borderWidthProp,
	offScrollProp,
	...props
}) => {
	const galleryRef = useRef();
	const [isOpen, setOpen] = useState(false);
	const [selectdIndex, setIndex] = useState(0);
	const [isBigImage, setBigImage] = useState(false);
	const [isZoom, setZoom] = useState(false);
	const [scrollStatus, setScrollStatus] = useState(offScrollProp);
	const [ratioSizes, setRatioSizes] = useState({}); // Статус кнопки

	const [isButton, setButton] = useState(); // Кол-во изображений, которые нужно загружать изначально

	const [itemsLoadingCount, setItemsLoadingCount] = useState(); // Получаем примерную ширину ячейки 

	const getItemSize = () => {
		return window.innerWidth / columnsCountProp - (columnsCountProp - 1) * borderWidthProp;
	}; // Получаем количество картинок, котороые помещаются в видимую область


	const getItemCountOnView = useCallback(() => {
		// Высота 1.5 окна
		const visibleSpace = window.innerHeight * windowHeightSize; // Кол-во рядов. Округляем в большую сторону 

		const visibleRows = Math.ceil(visibleSpace / getItemSize()); // Возвращаем кол-во изображений

		const items = visibleRows * columnsCountProp;
		if (items > galleryItemCountProp) return parseInt(galleryItemCountProp);
		return items;
	}, [galleryItemCountProp, columnsCountProp, borderWidthProp, loaderFormatProp, ratioFormatsProp, autoFillInProp, imagesMaxWidthProp, imagesMinWidthProp]); // Условие, чтобы количество Item было не меньше 0.
	// Иначе получаем ошибку при переборе массива

	if (galleryItemCountProp > 0) {
		galleryItemCountProp = parseInt(galleryItemCountProp);
	} else {
		galleryItemCountProp = 0;
	}

	useEffect(() => {
		setScrollStatus(offScrollProp);
	}, [offScrollProp]); // Функция дозагрузки по клику

	const loadMore = () => {
		const items = getItemCountOnView();
		const newItems = picturesParams.length + items;

		if (newItems < galleryItemCountProp) {
			setItemsLoadingCount(newItems);
		} else {
			setItemsLoadingCount(galleryItemCountProp);
			setButton(false);
		}
	};

	const loadingOnScroll = () => {
		const scrollTop = window.scrollY;
		const gallerySizes = galleryRef.current.getBoundingClientRect();
		console.log(gallerySizes.top);
		console.log(scrollTop);
		console.log(gallerySizes.height); // console.log(gallerySizes.top + scrollTop > gallerySizes.height / 3) 
		// if (gallerySizes.top + scrollTop > gallerySizes.height / 3) {
		// } 
	};

	useEffect(() => {
		const items = getItemCountOnView();
		const {
			mode,
			projectType
		} = getAPI(); // if (mode === 'development') {
		//   if (loaderFormatProp === 'Все сразу' || loaderFormatProp === 'При скроле'){
		//     setItemsLoadingCount(galleryItemCountProp);
		//   } 
		//   else if (loaderFormatProp === 'По кнопке') {
		//     setItemsLoadingCount(items);
		//     if (items == galleryItemCountProp) {
		//       setButton(false);
		//     } else {
		//       setButton(true);
		//     }
		//   }
		// } else if(mode === 'production'){ 

		if (loaderFormatProp === 'Все сразу') setItemsLoadingCount(galleryItemCountProp);

		if (loaderFormatProp === 'При скроле') {
			window.addEventListener('scroll', loadingOnScroll);
			window.addEventListener('resize', loadingOnScroll);
			window.addEventListener('orientationchange', loadingOnScroll);
			setItemsLoadingCount(items);
		}

		;

		if (loaderFormatProp === 'По кнопке') {
			setItemsLoadingCount(items);

			if (items == galleryItemCountProp) {
				setButton(false);
			} else {
				setButton(true);
			} // if (items == galleryItemCountProp) setButton(false);

		}

		; // }  
	}, [galleryItemCountProp, columnsCountProp, borderWidthProp, loaderFormatProp, ratioFormatsProp, autoFillInProp, imagesMaxWidthProp, imagesMinWidthProp]);
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	const items = Array(itemsLoadingCount).fill().map((item, index) => <Item
		{...override(`Item`, `Item ${index}`)}
		index={index}
		addPictureParams={addPictureParams}
		isOpen={isOpen}
		setOpen={setOpen}
		setIndex={setIndex}
		selectdIndex={selectdIndex}
		setBigImage={setBigImage}
		isBigImage={isBigImage}
		setZoom={setZoom}
		scrollStatus={scrollStatus}
		ratioSizes={ratioSizes}
		setRatioSizes={setRatioSizes}
		ratioFormatsProp={ratioFormatsProp}
		imagesMinWidthProp={imagesMinWidthProp}
		imagesMaxWidthProp={imagesMaxWidthProp}
		autoFillInProp={autoFillInProp}
		loaderFormatProp={loaderFormatProp}
		galleryItemCountProp={galleryItemCountProp}
		columnsCountProp={columnsCountProp}
		borderWidthProp={borderWidthProp}
		getItemSize={getItemSize}
	/>);
	return <Box {...rest}>
		      
		<Box
			ref={galleryRef}
			display='grid'
			grid-gap={`${changeStrInNumber(borderWidthProp)}`}
			grid-auto-flow={autoFillInProp ? 'dense' : 'row'}
			grid-template-columns={`repeat(${columnsCountProp}, 
          minmax(${changeStrInNumber(imagesMinWidthProp)}, 
          ${changeStrInNumber(imagesMaxWidthProp)}))`} // lg-grid-template-columns={
			//   `repeat(${lgColumnsCountProp}, 
			//   minmax(${changeStrInNumber(imagesMinWidthProp)}, 
			//   ${changeStrInNumber(imagesMaxWidthProp)}))`
			// }
			// md-grid-template-columns={
			//   `repeat(${mdColumnsCountProp}, 
			//   minmax(${changeStrInNumber(imagesMinWidthProp)},  
			//   ${changeStrInNumber(imagesMaxWidthProp)}))`
			// }
			// sm-grid-template-columns={
			//   `repeat(${smColumnsCountProp}, 
			//   minmax(${changeStrInNumber(imagesMinWidthProp)}, 
			//   ${changeStrInNumber(imagesMaxWidthProp)}))`
			// }

		>
			        
			{items}
			 
      
		</Box>
		  
        
		<Button onClick={e => loadMore(e)} {...override(`Button More`, `Button More${isButton ? ':on' : ':off'}`)}>
			          Загрузить еще
        
		</Button>
		       
		<Lightbox
			{...override(`Lightbox`)}
			picturesParams={picturesParams}
			selectdIndex={selectdIndex}
			setIndex={setIndex}
			isOpen={isOpen}
			setOpen={setOpen}
			isBigImage={isBigImage}
			isZoom={isZoom}
			setZoom={setZoom}
			scrollStatus={scrollStatus}
		/>
		  
    
	</Box>;
};

const propInfo = {
	galleryItemCountProp: {
		title: 'Количество изображений',
		description: {
			en: 'Количество изображений галереи'
		},
		control: 'input',
		category: 'Gallery',
		weight: 1
	},
	columnsCountProp: {
		title: 'Количество столбцов',
		description: {
			en: 'Укажите количество столбцов для изображений'
		},
		control: 'input',
		category: 'Gallery',
		weight: 1
	},
	lgColumnsCountProp: {
		title: 'lg',
		control: 'input',
		category: 'Gallery',
		weight: .3
	},
	mdColumnsCountProp: {
		title: 'md',
		control: 'input',
		category: 'Gallery',
		weight: .3
	},
	smColumnsCountProp: {
		title: 'sm',
		control: 'input',
		category: 'Gallery',
		weight: .3
	},
	borderWidthProp: {
		title: 'Ширина отступов',
		description: {
			en: 'Укажите ширину отступов'
		},
		control: 'input',
		category: 'Gallery',
		weight: 1
	},
	autoFillInProp: {
		title: 'Атоматиечски заполнять свободные места',
		description: {
			en: 'Если есть свободное пространство, заполнить его изображением'
		},
		control: 'checkbox',
		category: 'Gallery',
		weight: 1
	},
	loaderFormatProp: {
		title: 'Варианты загрузки изображений',
		description: {
			en: 'Как загружать изображения?'
		},
		control: 'radio-group',
		variants: ['Все сразу', 'При скроле', 'По кнопке'],
		category: 'images',
		weight: 1
	},
	ratioFormatsProp: {
		title: 'Соотношение сторон',
		description: {
			en: 'Выберите соотношение сторон изображений'
		},
		control: 'select',
		variants: ['auto', '16:9', '4:3', '3:2', '1:1', '2:3', '3:4', '9:16'],
		category: 'images',
		weight: 1
	},
	imagesMaxWidthProp: {
		title: 'Максимальная ширина изображений',
		description: {
			en: 'Укажите максимальную ширину изображений'
		},
		control: 'input',
		category: 'images',
		weight: 1
	},
	imagesMinWidthProp: {
		title: 'Минимальная ширина изображений',
		description: {
			en: 'Укажите минимальную ширину изображений'
		},
		control: 'input',
		category: 'images',
		weight: 1
	},
	offScrollProp: {
		title: 'Отключить скролл',
		description: {
			ru: 'Отключить скролл при показе полного изображения'
		},
		control: 'checkbox',
		category: 'Lightbox',
		weight: 1
	}
};
const defaultProps = {
	galleryItemCountProp: 8,
	columnsCountProp: 4,
	lgColumnsCountProp: 3,
	mdColumnsCountProp: 2,
	smColumnsCountProp: 1,
	ratioFormatsProp: 'auto',
	loaderFormatProp: 'Все сразу',
	autoFillInProp: true,
	imagesAutoResizeProp: false,
	imagesMinWidthProp: '80',
	imagesMaxWidthProp: '1fr',
	borderWidthProp: '10',
	offScrollProp: true
};
Object.assign(Gallery, {
	overrides,
	propInfo,
	defaultProps
});
export default Gallery;