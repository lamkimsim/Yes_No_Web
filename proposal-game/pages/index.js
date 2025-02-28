// pages/index.js
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';

// Level 1 Buttons component with clickable fake buttons
const Level1Buttons = ({ onRealNoClick }) => {
	const [buttons, setButtons] = useState(() => {
		// Create an array of random button positions - reduced to 15 buttons
		return Array.from({ length: 15 }, (_, i) => ({
			id: i,
			left: Math.random() * 85,
			top: Math.random() * 85,
			size: 0.6 + Math.random() * 0.4, // Size multiplier between 0.6-1.0
			rotation: Math.random() * 10 - 5,
			speed: 0.2 + Math.random() * 0.6,
			direction: Math.random() * 2 * Math.PI, // Random direction in radians
			opacity: 0.6 + Math.random() * 0.4,
			visible: true,
		}));
	});

	const [remainingButtons, setRemainingButtons] = useState(15);
	const [showRealNo, setShowRealNo] = useState(false);

	// Function to handle clicking on a fake No button
	const handleClickFake = (id) => {
		// Hide the clicked button
		setButtons((prevButtons) =>
			prevButtons.map((button) =>
				button.id === id ? { ...button, visible: false } : button
			)
		);

		// Decrease remaining buttons count
		setRemainingButtons((prev) => {
			const newCount = prev - 1;
			// When all buttons are cleared, show the real No button
			if (newCount === 0) {
				setShowRealNo(true);
			}
			return newCount;
		});
	};

	// Animation effect to move buttons
	useEffect(() => {
		const interval = setInterval(() => {
			setButtons((prevButtons) =>
				prevButtons.map((button) => {
					if (!button.visible) return button;

					// Calculate new position based on direction and speed
					let newLeft = button.left + Math.cos(button.direction) * button.speed;
					let newTop = button.top + Math.sin(button.direction) * button.speed;

					// Bounce off edges
					let newDirection = button.direction;
					if (newLeft < 0 || newLeft > 85) {
						newDirection = Math.PI - newDirection;
						newLeft = Math.max(0, Math.min(85, newLeft));
					}
					if (newTop < 0 || newTop > 85) {
						newDirection = -newDirection;
						newTop = Math.max(0, Math.min(85, newTop));
					}

					return {
						...button,
						left: newLeft,
						top: newTop,
						direction: newDirection,
					};
				})
			);
		}, 50); // Update every 50ms for smooth animation

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{/* Counter of remaining buttons */}
			<div className='absolute top-2 right-2 bg-purple-100 px-3 py-1 rounded-full text-xs font-semibold text-purple-800 z-30'>
				{remainingButtons} buttons left
			</div>

			{/* Real No button that only appears when all fake buttons are gone */}
			{showRealNo && (
				<button
					onClick={onRealNoClick}
					className='absolute px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg text-lg animate-pulse'
					style={{
						left: '50%',
						top: '75%',
						transform: 'translate(-50%, -50%)',
						zIndex: 25,
					}}
				>
					Final No
				</button>
			)}

			{buttons.map(
				(button) =>
					button.visible && (
						<div
							key={button.id}
							className='absolute px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md flex items-center justify-center cursor-pointer active:opacity-0'
							style={{
								left: `${button.left}%`,
								top: `${button.top}%`,
								transform: `scale(${button.size}) rotate(${button.rotation}deg)`,
								opacity: button.opacity,
								zIndex: 5,
								transition: 'transform 0.2s, opacity 0.2s',
							}}
							onClick={() => handleClickFake(button.id)}
						>
							No
						</div>
					)
			)}
		</>
	);
};

// Level 2 Buttons component - clicking No spawns Yes buttons
const Level2Buttons = ({ onRealNoClick, onYesClick }) => {
	const [noButtons, setNoButtons] = useState(() => {
		// Create an array of random No button positions - 10 buttons for level 2
		return Array.from({ length: 10 }, (_, i) => ({
			id: i,
			left: Math.random() * 85,
			top: Math.random() * 85,
			size: 0.6 + Math.random() * 0.2, // Size multiplier
			rotation: Math.random() * 10 - 5,
			speed: 0.2 + Math.random() * 0.4,
			direction: Math.random() * 2 * Math.PI,
			opacity: 0.8,
			visible: true,
		}));
	});

	const [yesButtons, setYesButtons] = useState([]);
	const [remainingButtons, setRemainingButtons] = useState(10);

	// Function to handle clicking on a No button
	const handleNoClick = (id) => {
		// Hide the clicked button
		setNoButtons((prevButtons) =>
			prevButtons.map((button) =>
				button.id === id ? { ...button, visible: false } : button
			)
		);

		// Decrease remaining buttons count
		setRemainingButtons((prev) => {
			const newCount = prev - 1;

			// If last button clicked, proceed to next level
			if (newCount === 0) {
				setTimeout(() => {
					onRealNoClick();
				}, 500);
			}

			return newCount;
		});

		// Spawn 3 new Yes buttons
		const newYesButtons = Array.from({ length: 3 }, (_, i) => ({
			id: `yes-${yesButtons.length + i}`,
			left: Math.random() * 85,
			top: Math.random() * 85,
			size: 0.9 + Math.random() * 0.3, // Bigger than No buttons
			rotation: Math.random() * 10 - 5,
			opacity: 1,
			timeCreated: Date.now(),
		}));

		setYesButtons((prev) => [...prev, ...newYesButtons]);
	};

	// Animation effect to move No buttons
	useEffect(() => {
		const interval = setInterval(() => {
			setNoButtons((prevButtons) =>
				prevButtons.map((button) => {
					if (!button.visible) return button;

					// Calculate new position based on direction and speed
					let newLeft = button.left + Math.cos(button.direction) * button.speed;
					let newTop = button.top + Math.sin(button.direction) * button.speed;

					// Bounce off edges
					let newDirection = button.direction;
					if (newLeft < 0 || newLeft > 85) {
						newDirection = Math.PI - newDirection;
						newLeft = Math.max(0, Math.min(85, newLeft));
					}
					if (newTop < 0 || newTop > 85) {
						newDirection = -newDirection;
						newTop = Math.max(0, Math.min(85, newTop));
					}

					return {
						...button,
						left: newLeft,
						top: newTop,
						direction: newDirection,
					};
				})
			);
		}, 50);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{/* Counter of remaining buttons */}
			<div className='absolute top-2 right-2 bg-purple-100 px-3 py-1 rounded-full text-xs font-semibold text-purple-800 z-30'>
				{remainingButtons} NO buttons left
			</div>

			{/* Message if there are lots of Yes buttons */}
			{yesButtons.length > 15 && (
				<div className='absolute bottom-2 left-2 bg-white bg-opacity-80 px-3 py-1 rounded-lg text-xs text-pink-700 z-30'>
					So many YES buttons&#33; Keep looking for NO...
				</div>
			)}

			{/* Yes buttons (spawned when clicking No) */}
			{yesButtons.map((button) => (
				<button
					key={button.id}
					className='absolute px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md flex items-center justify-center cursor-pointer'
					style={{
						left: `${button.left}%`,
						top: `${button.top}%`,
						transform: `scale(${button.size}) rotate(${button.rotation}deg)`,
						opacity: button.opacity,
						zIndex: 5,
					}}
					onClick={onYesClick}
				>
					Yes
				</button>
			))}

			{/* No buttons */}
			{noButtons.map(
				(button) =>
					button.visible && (
						<div
							key={button.id}
							className='absolute px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md flex items-center justify-center cursor-pointer'
							style={{
								left: `${button.left}%`,
								top: `${button.top}%`,
								transform: `scale(${button.size}) rotate(${button.rotation}deg)`,
								opacity: button.opacity,
								zIndex: 10,
							}}
							onClick={() => handleNoClick(button.id)}
						>
							No
						</div>
					)
			)}
		</>
	);
};

// Component for Hell Mode No button
const NoButtonHell = ({ onNoClick }) => {
	const [position, setPosition] = useState({ top: 50, left: 40 });

	// Move button randomly when user tries to touch it
	const handleTouchStart = (e) => {
		e.preventDefault();

		const newTop = Math.floor(Math.random() * 80);
		const newLeft = Math.floor(Math.random() * 80);

		setPosition({ top: newTop, left: newLeft });
	};

	return (
		<button
			onTouchStart={handleTouchStart}
			onMouseEnter={handleTouchStart}
			onClick={onNoClick}
			className='absolute px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 ease-out'
			style={{
				top: `${position.top}%`,
				left: `${position.left}%`,
			}}
		>
			No
		</button>
	);
};

export default function Home() {
	const router = useRouter();
	const [level, setLevel] = useState(1);

	// Handle Yes button click
	const handleYes = () => {
		router.push('/congratulations');
	};

	// Handle No button click
	const handleNo = () => {
		if (level < 3) {
			setLevel(level + 1);
		} else {
			// At level 3, redirect to a special "last chance" page
			router.push('/last-chance');
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4'>
			<Head>
				<title>Be My Girl?</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
					rel='stylesheet'
				/>
			</Head>

			<main className='w-full max-w-md mx-auto text-center'>
				<div className='bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-500 hover:scale-105'>
					<h1 className='text-3xl font-bold text-purple-600 mb-2'>
						Would you be my girl?
					</h1>

					{level === 1 && (
						<>
							<p className='text-gray-600 mb-6'>Level 1&#58; Easy Mode</p>
							<div className='relative h-80 mb-4 overflow-hidden'>
								{/* The real Yes button in the center */}
								<button
									onClick={handleYes}
									className='absolute px-10 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 active:scale-95 text-xl z-20'
									style={{
										left: '50%',
										top: '30%',
										transform: 'translate(-50%, -50%)',
									}}
								>
									Yes
								</button>

								{/* Custom component for clickable fake No buttons and the final real one */}
								<Level1Buttons onRealNoClick={handleNo} />
							</div>
							<p className='text-sm text-gray-600 italic'>
								Click away all the fake buttons to find the real one!
							</p>
						</>
					)}

					{level === 2 && (
						<>
							<p className='text-gray-600 mb-4'>Level 2: Hard Mode</p>
							<div className='relative h-80 mb-4 overflow-hidden'>
								{/* The Yes button (main one that actually does something) */}
								<button
									onClick={handleYes}
									className='absolute px-10 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 active:scale-95 text-xl z-20'
									style={{
										left: '50%',
										top: '30%',
										transform: 'translate(-50%, -50%)',
									}}
								>
									Yes
								</button>

								{/* Level 2 buttons (clicking No spawns Yes buttons) */}
								<Level2Buttons
									onRealNoClick={handleNo}
									onYesClick={handleYes}
								/>
							</div>
							<p className='text-sm text-gray-600 italic'>
								Level 2&#58; Finding No creates more Yes!
							</p>
						</>
					)}

					{level === 3 && (
						<>
							<p className='text-gray-600 mb-6'>Level 3: Hell Mode</p>
							<div className='relative h-64 mb-4 flex items-center justify-center'>
								<button
									onClick={handleYes}
									className='px-12 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 active:scale-95 text-2xl animate-pulse'
								>
									Yes
								</button>
							</div>
							<p className='text-sm text-pink-500 italic'>
								Maybe it's time to say Yes? ❤️
							</p>
						</>
					)}

					<div className='mt-8 pt-4 border-t border-gray-200'>
						<p className='text-gray-500 text-sm'>❤️ Take a chance on love ❤️</p>
					</div>
				</div>
			</main>
		</div>
	);
}
