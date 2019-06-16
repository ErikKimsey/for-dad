import React, { useRef } from 'react';
import { clamp } from 'lodash';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './App.scss';

const pages = [
	'https://i.imgur.com/UnldTHJ.png',
	'https://i.imgur.com/Xq50D2J.png',
	'https://i.imgur.com/w7QtqBm.png',
	'https://i.imgur.com/j6ivkCd.png',
	'https://i.imgur.com/zsmh9Gr.png',
	'https://i.imgur.com/0x15AEL.png',
	'https://i.imgur.com/23C1kkC.png',
	'https://i.imgur.com/mRPtcdE.png',
	'https://i.imgur.com/A4NLnNX.png'
];

function Viewpager() {
	const index = useRef(0);
	const [ props, set ] = useSprings(pages.length, (i) => ({ x: i * window.innerWidth, sc: 1, display: 'block' }));
	const bind = useGesture(({ down, delta: [ xDelta ], direction: [ xDir ], distance, cancel }) => {
		if (down && distance > window.innerWidth / 2)
			cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)));
		set((i) => {
			if (i < index.current - 1 || i > index.current + 1) return { display: 'none' };
			const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
			const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
			return { x, sc, display: 'block' };
		});
	});
	return props.map(({ x, display, sc }, i) => (
		<animated.div
			{...bind()}
			className="App-header"
			key={i}
			style={{ display, transform: x.interpolate((x) => `translate3d(${x}px,0,0)`) }}
		>
			<animated.div
				className="card"
				style={{ transform: sc.interpolate((s) => `scale(${s})`), backgroundImage: `url(${pages[i]})` }}
			/>
		</animated.div>
	));
}

export default Viewpager;
