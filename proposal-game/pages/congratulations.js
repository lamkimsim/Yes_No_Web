// pages/congratulations.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function Congratulations() {
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		// Trigger confetti explosion
		const duration = 5 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);

			// Since they will be fired simultaneously, spread them out a bit
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				})
			);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				})
			);
		}, 250);

		// Show message with delay for dramatic effect
		setTimeout(() => {
			setShowMessage(true);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4'>
			<Head>
				<title>Congratulations! 💕</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
					rel='stylesheet'
				/>
			</Head>

			<main className='text-center'>
				<div
					className={`transform transition-all duration-1000 ${
						showMessage ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
					}`}
				>
					<div className='bg-white bg-opacity-90 rounded-xl shadow-xl p-8 mb-6 max-w-md'>
						<h1 className='text-4xl font-bold text-purple-700 mb-4'>
							<span className='animate-pulse inline-block'>💖</span> She said
							YES! <span className='animate-pulse inline-block'>💖</span>
						</h1>

						<p className='text-xl text-gray-700 mb-6'>
							Congratulations! This is the beginning of something beautiful!
						</p>

						<div className='py-4'>
							<div className='h-1 w-full bg-pink-200 rounded-full mb-1 animate-pulse'></div>
							<div className='h-1 w-2/3 mx-auto bg-pink-300 rounded-full mb-1'></div>
							<div className='h-1 w-1/3 mx-auto bg-pink-400 rounded-full'></div>
						</div>

						<p className='text-gray-600 italic mt-4'>
							"Love is not about how many days, months, or years you have been
							together. Love is about how much you love each other every single
							day."
						</p>

						<div className='mt-8'>
							<Link
								href='/'
								className='inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 active:scale-95'
							>
								Back to Home
							</Link>
						</div>
					</div>

					<div className='mt-4 text-white text-sm'>
						<p>❤️ Now go plan that first date! ❤️</p>
					</div>
				</div>
			</main>
		</div>
	);
}
