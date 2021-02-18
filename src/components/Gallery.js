import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box } from '@quarkly/widgets';
import Item from './Item';
import Lightbox from './Lightbox';
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
	}
};

const changeStrInNumber = str => {
	const reg = /^[\d.,]+$/;
	const newStr = str.replace(/\s/g, '');

	if (reg.test(newStr)) {
		return `${parseInt(newStr)}px`;
	}

	return `${newStr}`;
}; // const checkOnView = (sizes) => {
//   const visibleSpace = window.innerHeight + (window.innerHeight / 2);
//   console.log(visibleSpace)
//   if (sizes.top + sizes.height < visibleSpace + window.scrollY) return true;
//   return false;
// }; 
// const setSrc = (img) => {
//   const sizes = img.getBoundingClientRect();
//   if(checkOnView(sizes)) { 
//     // const src = img.getAttribute('data-src');
//     // img.setAttribute('src', src); 
//   } 
//    console.log(checkOnView(sizes))
//     console.log(sizes)   
// };


const allRef = [];

const addRef = (index, ref) => {
	allRef[index] = ref;
};

const lazyLoader = img => {
	window.addEventListener('scroll', setSrc(img));
	window.addEventListener('load', setSrc(img));
	window.addEventListener('resize', setSrc(img));
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
	const [ratioSizes, setRatioSizes] = useState({});
	useEffect(() => {
		setScrollStatus(offScrollProp);
	}, [offScrollProp]);

	const checkOnView = sizes => {
		const visibleSpace = window.innerHeight + window.innerHeight / 2;
		console.log(visibleSpace);
		if (sizes.top + sizes.height < visibleSpace + window.scrollY) return true;
		return false;
	};

	const cheche = () => {
		allRef.forEach(img => {
			const sizes = img.getBoundingClientRect();
			console.log(sizes);
			console.log(checkOnView(sizes));

			if (checkOnView(sizes)) {
				const src = img.getAttribute('data-src');
				img.setAttribute('src', src);
			}
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', cheche()); // window.addEventListener('load',  setSrc(img)); 
		// window.addEventListener('resize', setSrc(img)); 
	});
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
	}; // useEffect(() => { 
	//   // const tooltipPapams = imageBlockRef.current.getBoundingClientRect();
	//   console.log(imageBlockRef.current.getBoundingClientRect())
	//   setRatioSizes({ 
	//     width: '100%', 
	//     height: '56.25%'
	//   }); 
	// }, [ratioFormatsProp]);   
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
	const items = Array(galleryItemCountProp).fill().map((item, index) => <Item
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
		columnsCountProp={columnsCountProp}
		borderWidthProp={borderWidthProp}
		imagesMinWidthProp={imagesMinWidthProp}
		imagesMaxWidthProp={imagesMaxWidthProp}
		autoFillInProp={autoFillInProp}
		loaderFormatProp={loaderFormatProp}
		galleryItemCountProp={galleryItemCountProp}
		addRef={addRef}
		lazyLoader={lazyLoader}
	/>);
	return <Box {...rest}>
		      
		<Box display='grid' grid-gap={`${changeStrInNumber(borderWidthProp)}`} grid-auto-flow={autoFillInProp ? 'dense' : 'row'} grid-template-columns={`repeat(${columnsCountProp}, 
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