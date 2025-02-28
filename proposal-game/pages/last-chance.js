// pages/last-chance.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function LastChance() {
	const router = useRouter();
	const [isShaking, setIsShaking] = useState(false);

	// Handle final Yes button click
	const handleFinalYes = () => {
		router.push('/congratulations');
	};

	// Handle the fake No button click
	const handleFakeNo = () => {
		setIsShaking(true);
		setTimeout(() => {
			setIsShaking(false);
			router.push('/congratulations');
		}, 1000);
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-purple-600 p-4'>
			<Head>
				<title>Last Chance</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>

			<main className='w-full max-w-md mx-auto text-center'>
				<div
					className={`bg-white rounded-xl shadow-lg p-6 mb-8 ${
						isShaking ? 'animate-bounce' : ''
					}`}
				>
					<h1 className='text-3xl font-bold text-red-600 mb-2'>Last Chance!</h1>
					<p className='text-gray-600 mb-4'>
						You&apos;ve tried to say no 3 times 😔
					</p>
					<p className='text-xl font-semibold text-purple-700 mb-6'>
						Are you absolutely sure?
					</p>

					<div className='flex flex-col space-y-4'>
						<button
							onClick={handleFinalYes}
							className='px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 active:scale-95 text-xl animate-pulse'
						>
							Fine, I&apos;ll say Yes! ❤️
						</button>

						<button
							onClick={handleFakeNo}
							className='px-8 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 active:scale-95 text-lg'
						>
							Still No 💔
						</button>
					</div>

					<div className='mt-8 pt-4 border-t border-gray-200'>
						<p className='text-pink-500 text-sm font-medium'>
							You know you want to say yes... 💕
						</p>
					</div>
				</div>

				<div className='text-white text-xs opacity-70'>
					<p>The heart wants what it wants!</p>
				</div>
			</main>
		</div>
	);
}
