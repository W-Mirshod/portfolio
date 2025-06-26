import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { cn } from '../ui/utils'
import { Globe, Github, Menu, X } from 'lucide-react'
import mirshodLogo from '../../assets/images/Mirshod.png'

const langs = [
	{ code: 'en', label: 'English', short: 'EN' },
	{ code: 'uz', label: "O'zbekcha", short: 'UZ' },
	{ code: 'ru', label: 'Русский', short: 'RU' },
]

const navLinks = [
	{ id: 'home', label: 'navigation.home' },
	{ id: 'about', label: 'navigation.about' },
	{ id: 'experience', label: 'navigation.experience' },
	{ id: 'skills', label: 'navigation.skills' },
	{ id: 'achievements', label: 'navigation.achievements' },
	{ id: 'certificate', label: 'navigation.certificate' },
	{ id: 'projects', label: 'navigation.projects' },
	{ id: 'contact', label: 'navigation.contact' },
]

const Header = () => {
	const { t, i18n } = useTranslation()
	const [scrolled, setScrolled] = useState(false)
	const [activeSection, setActiveSection] = useState('home')
	const [currentLang, setCurrentLang] = useState(i18n.language || 'en')

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 24)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const handleIntersection = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) setActiveSection(entry.target.id)
			})
		}
		const observer = new window.IntersectionObserver(handleIntersection, { threshold: 0.4 })
		document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
		return () => observer.disconnect()
	}, [])

	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang)
		setCurrentLang(lang)
	}

	return (
		<motion.header
			id="header"
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 100, damping: 20 }}
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
				'backdrop-blur-2xl bg-gradient-to-b from-[#0a0b0f]/95 via-[#0a0b0f]/90 to-[#0a0b0f]/80',
				'border-b border-white/5 shadow-2xl shadow-black/50',
				scrolled 
					? 'py-3 bg-[#0a0b0f]/98 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
					: 'py-5 bg-[#0a0b0f]/85'
			)}
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
				<motion.a 
					href="#home" 
					className="flex items-center gap-4 group relative"
					whileHover={{ scale: 1.02 }}
					transition={{ type: 'spring', stiffness: 400, damping: 25 }}
				>
					<div className="relative">
						<motion.img
							src={mirshodLogo}
							alt="W"
							width={52}
							height={52}
							className="rounded-2xl shadow-xl shadow-black/40 border border-white/10 bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-1"
							whileHover={{ 
								scale: 1.1,
								rotate: 5,
								boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
							}}
							transition={{ type: 'spring', stiffness: 300, damping: 20 }}
						/>
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</div>
					<span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none hidden sm:block drop-shadow-sm">
						Mirshod
					</span>
				</motion.a>

				<nav className="hidden lg:flex items-center gap-2 xl:gap-3 bg-white/5 rounded-2xl p-2 backdrop-blur-sm border border-white/10 shadow-inner shadow-black/20">
					{navLinks.map((link, index) => (
						<motion.a
							key={link.id}
							href={`#${link.id}`}
							className={cn(
								'relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden',
								'hover:text-white hover:shadow-lg hover:shadow-blue-900/20',
								activeSection === link.id
									? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30 border border-blue-500/50'
									: 'text-white/70 hover:bg-white/10 hover:text-white/90'
							)}
							whileHover={{ 
								scale: 1.05,
								y: -2
							}}
							whileTap={{ scale: 0.98 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								type: 'spring', 
								stiffness: 400, 
								damping: 25,
								delay: index * 0.05
							}}
						>
							{activeSection === link.id && (
								<motion.div
									layoutId="activeSection"
									className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
									transition={{ type: 'spring', stiffness: 400, damping: 30 }}
								/>
							)}
							<span className="relative z-10">{t(link.label)}</span>
						</motion.a>
					))}
					
					<div className="w-px h-8 bg-white/10 mx-2"></div>
					
					<motion.a
						href="https://github.com/W-Mirshod"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20"
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<Github className="w-5 h-5" />
						<span>GitHub</span>
					</motion.a>
				</nav>

				<div className="flex items-center gap-3">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<motion.button
								className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-xl shadow-black/30 border border-white/10 text-white/80 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 backdrop-blur-sm"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								<Globe className="w-5 h-5" />
								<span className="text-sm font-semibold hidden md:inline-block">
									{langs.find((l) => l.code === currentLang)?.short || 'EN'}
								</span>
								<div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
							</motion.button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 rounded-2xl mt-3 p-2 min-w-[160px]">
							{langs.map((lang) => (
								<DropdownMenuItem
									key={lang.code}
									onClick={() => changeLanguage(lang.code)}
									className={cn(
										'px-4 py-3 text-sm rounded-xl transition-all duration-200 cursor-pointer',
										'hover:bg-gradient-to-r hover:from-blue-600/80 hover:to-purple-600/80 hover:text-white hover:shadow-lg',
										currentLang === lang.code 
											? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg' 
											: 'text-white/80'
									)}
								>
									{lang.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<motion.a
						href="https://github.com/W-Mirshod"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-xl shadow-black/30 border border-white/10 text-white/80 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 backdrop-blur-sm relative overflow-hidden"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.98 }}
					>
						<Github className="w-6 h-6 relative z-10" />
						<div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
					</motion.a>

					<Sheet>
						<SheetTrigger asChild>
							<motion.button
								className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-xl shadow-black/30 border border-white/10 text-white/80 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 backdrop-blur-sm relative overflow-hidden"
								aria-label="Open menu"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								<Menu className="w-6 h-6 relative z-10" />
								<div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
							</motion.button>
						</SheetTrigger>
						<AnimatePresence>
							<SheetContent side="top" className="bg-gradient-to-b from-[#0a0b0f]/98 to-[#0f172a]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50 px-0 pt-20 pb-8 rounded-b-3xl">
								<div className="flex flex-col items-center gap-2 px-6">
									{navLinks.map((link, index) => (
										<motion.a
											key={link.id}
											href={`#${link.id}`}
											className={cn(
												'w-full text-center px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden',
												'hover:text-white hover:shadow-lg hover:shadow-blue-900/20',
												activeSection === link.id
													? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30'
													: 'text-white/70 hover:bg-white/10 hover:text-white/90'
											)}
											initial={{ opacity: 0, x: -50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											{t(link.label)}
										</motion.a>
									))}
									<motion.a
										href="https://github.com/W-Mirshod"
										target="_blank"
										rel="noopener noreferrer"
										className="w-full text-center px-6 py-4 rounded-2xl font-semibold text-lg text-white/70 hover:text-white/90 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 mt-4 border-t border-white/10 pt-6"
										initial={{ opacity: 0, x: -50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: navLinks.length * 0.1 }}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Github className="w-6 h-6" />
										<span>GitHub</span>
									</motion.a>
								</div>
							</SheetContent>
						</AnimatePresence>
					</Sheet>
				</div>
			</div>
		</motion.header>
	)
}

export default Header
