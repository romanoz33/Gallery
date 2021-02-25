import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Button } from '@quarkly/widgets';
import Item from './Item';
import Lightbox from './Lightbox';
const rowsCountLoader = 2;
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
}; // // Собираем и храним все ref картинок
// const allRef = [];
// const addRef = (index, ref) => {
//   allRef[index] = ref;
// }   
// Собираем и храним все пропсы по картинкам


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

const getVisibleSpace = () => {
	return window.innerHeight * windowHeightSize;
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
	const [isOpen, setOpen] = useState(false);
	const [selectdIndex, setIndex] = useState(0);
	const [isBigImage, setBigImage] = useState(false);
	const [isZoom, setZoom] = useState(false);
	const [scrollStatus, setScrollStatus] = useState(offScrollProp);
	const [ratioSizes, setRatioSizes] = useState({}); // Кол-во изображений, которые нужно загружать

	const [itemsLoadingCount, setItemsLoadingCount] = useState();
	const galleryRef = useRef(); // Получаем ширину ячейки 

	const getItemSize = window.innerWidth / columnsCountProp - (columnsCountProp - 1) * borderWidthProp; // Получаем количество картинок, котороые помещаются в видимую область

	const getItemCountOnView = () => {
		const {
			mode,
			projectType
		} = getAPI();
		if (mode === 'development') return parseInt(galleryItemCountProp); // Высота 1.5 окна

		const visibleSpace = getVisibleSpace(); // Примерная ширина и высота картинки 

		const itemWidth = window.innerWidth / columnsCountProp - (columnsCountProp - 1) * borderWidthProp; // Кол-во рядов. Округляем в большую сторону

		const visibleRows = Math.ceil(visibleSpace / itemWidth); // Возвращаем кол-во изображений

		return visibleRows * columnsCountProp;
	};

	useEffect(() => {
		const itemss = getItemCountOnView();
		setItemsLoadingCount(itemss);
		console.log(itemss);
		console.log(itemsLoadingCount);
	}, []);
	useEffect(() => {
		setScrollStatus(offScrollProp);
	}, [offScrollProp]); // useEffect(() => {  
	//     switch (loaderFormatProp) { 
	//   case 'Все сразу':
	//     setSrcOnScroll();  
	//     window.addEventListener('scroll', setSrcOnScroll); 
	//     window.addEventListener('resize', setSrcOnScroll);
	//     window.addEventListener('orientationchange', setSrcOnScroll);
	//     break;
	//   case 'При скроле':
	//     setSrcAlways();
	//     break;
	//   default:
	//   } 
	// }, [loaderFormatProp]);   
	// Условие, чтобы количество Item было не меньше 0.
	// Иначе получаем ошибку при переборе массива

	if (galleryItemCountProp > 0) {
		galleryItemCountProp = parseInt(galleryItemCountProp);
	} else {
		galleryItemCountProp = 0;
	}

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
		getVisibleSpace={getVisibleSpace}
		galleryItemCountProp={galleryItemCountProp}
		columnsCountProp={columnsCountProp}
		borderWidthProp={borderWidthProp}
		getItemSize={getItemSize}
		getAPI={getAPI}
		galleryRef={galleryRef} // addRef={addRef} 

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
		  
        
		<Button {...override(`Button More`, `Button More${loaderFormatProp === 'По кнопке' ? ':on' : ':off'}`)} // onClick={} 
		>
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