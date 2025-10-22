import React, { useState, useEffect } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

// --- TYPE DEFINITIONS ---
type Page = 'splash' | 'auth' | 'userMenu' | 'chefMenu' | 'profile' | 'search' | 'orders' | 'bookmarks' | 'cart' | 'checkout';
type AuthMode = 'login' | 'signup';
type UserRole = 'user' | 'chef';
type ModalType = 'add' | 'edit' | 'delete' | 'itemDetail' | null;

// --- MODULE AUGMENTATION FOR REACT-NATIVE-SVG ---
declare module "react-native-svg" {
  interface SvgProps {
    className?: string;
  }
}
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  category: 'Starters' | 'Mains' | 'Desserts';
}

interface CartItem extends MenuItem {
    quantity: number;
}

// --- MOCK DATA ---
const initialMenuData: MenuItem[] = [
  {
    id: 1,
    name: 'CRISPY CHICKEN NACHOS',
    description: 'Crispy tortilla chips piled high with seasoned shredded chicken, melted cheddar, fresh salsa, jalapeños, and a swirl of sour cream.',
    price: '$22',
    rating: 4,
    image: 'https://fedandfit.com/wp-content/uploads/2022/02/240306_sheet-pan-nachos-10.jpg',
    category: 'Starters',
  },
  {
    id: 2,
    name: 'GRILLED CHEESE & TOMATO SOUP',
    description: 'A buttery, melted cheese sandwich paired with warm, tangy tomato soup.',
    price: '$20',
    rating: 5,
    image: 'https://simply-delicious-food.com/wp-content/uploads/2019/08/Tomato-soup-with-grilled-cheese-5.jpg',
    category: 'Starters',
  },
  {
      id: 3,
      name: 'AVO ON TOAST',
      description: 'Creamy avocado spread on toasted bread, simple and fresh.',
      price: '$18',
      rating: 4,
      image: 'https://www.eatingbirdfood.com/wp-content/uploads/2023/12/avocado-toast-hero-cropped.jpg',
      category: 'Starters',
  },
  {
    id: 4,
    name: 'PASTA ALFREDO',
    description: 'Creamy fettuccine alfredo with grilled chicken and parmesan.',
    price: '$25',
    rating: 5,
    image: 'https://midwestfoodieblog.com/wp-content/uploads/2023/07/chicken-alfredo-1.jpg',
    category: 'Mains',
  },
  {
      id: 5,
      name: 'CHOCOLATE LAVA CAKE',
      description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.',
      price: '$12',
      rating: 5,
      image: 'https://www.billyparisi.com/wp-content/uploads/2022/02/lava-cake-1.jpg',
      category: 'Desserts',
  }
];


// --- SVG ICON PROPS ---
interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}


// --- SVG ICONS ---
const HomeIcon = ({ size = 24, color = '#000', className, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
    <Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const SearchIcon = ({ size = 24, color = '#000', className, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
    <Path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const ListIcon = ({ size = 24, color = '#000', className, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
    <Path d="M4 6h16M4 12h16M4 18h7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const BookmarkIcon = ({ size = 24, color = '#000', className, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
    <Path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const UserIcon = ({ size = 24, color = '#000', className, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
    <Path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const EditIcon = ({ size = 24, color = '#374151', className, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
    <Path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const DeleteIcon = ({ size = 24, color = '#374151', className, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
    <Path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// --- Additional Inline Icons (converted to components) ---
    const ArrowRightIcon = ({ size = 24, color = '#000', className, ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={className ? 'currentColor' : color} className={className} {...props}>
        <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </Svg>
);
const GoogleIcon = ({ className, ...props }: IconProps) => (
    <Svg className={className} viewBox="0 0 48 48" {...props}>
        <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></Path>
        <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></Path>
        <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></Path>
        <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></Path>
        <Path fill="none" d="M0 0h48v48H0z"></Path>
    </Svg>
);

const TwitterIcon = ({ className, ...props }: IconProps) => (
    <Svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <Path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.633 4.21 3.793 4.649-.55.149-1.13.21-1.729.21-.299 0-.58-.027-.85-.079.618 1.953 2.423 3.377 4.564 3.417-1.796 1.407-4.066 2.245-6.516 2.245-.42 0-.834-.025-1.24-.073 2.298 1.474 5.021 2.34 8.001 2.34 9.673 0 14.966-7.933 14.588-14.868.995-.717 1.853-1.612 2.534-2.625z"></Path>
    </Svg>
);

const CartIcon = ({ className, ...props }: IconProps) => (
    <Svg width={24} height={24} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </Svg>
);


// --- MODAL COMPONENT ---
const Modal: React.FC<{ children: React.ReactNode, onClose: () => void, title: string }> = ({ children, onClose, title }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl p-6 w-11/12 max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            {children}
        </div>
    </div>
);


// --- UI COMPONENTS ---

const SplashScreen: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onNavigate();
        }, 2000); // Navigate after 2 seconds
        return () => clearTimeout(timer);
    }, [onNavigate]);

    return (
        <div className="w-full h-full bg-[#f87171] flex flex-col justify-between p-8 rounded-3xl relative text-white font-sans">
            <div className="self-end">
                <button onClick={onNavigate} className="transform transition-transform hover:scale-110">
                    <ArrowRightIcon className="h-8 w-8" />
                </button>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center text-center -mt-16">
                 <h1 className="text-4xl lg:text-6xl font-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>WELCOME TO</h1>
                <h1 className="text-4xl lg:text-6xl font-bold mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>CHRISTOFFELS KITCHEN !!!</h1>
                <p className="text-3xl lg:text-4xl">Your very own</p>
                <p className="text-3xl lg:text-4xl">private</p>
                <p className="text-3xl lg:text-4xl">chef &lt;3</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop)' }}></div>
        </div>
    );
};

const AuthScreen: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [role, setRole] = useState<UserRole>('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleAuthAction = () => {
        if (mode === 'login') {
            if (email.toLowerCase().includes('chef')) {
                onLogin('chef');
            } else {
                onLogin('user');
            }
        } else {
            onLogin(role);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-10 font-sans relative overflow-hidden">
            <div className="absolute -top-10 left-0 right-0 h-72 bg-[#f87171] rounded-b-full z-0 flex items-center justify-center pt-10">
                 <h1 className="text-4xl lg:text-5xl font-bold text-black" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>CHRISTOFFELS KITCHEN</h1>
            </div>
            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl w-11/12 max-w-sm z-10 mt-32">
                <div className="flex justify-center border border-gray-200 rounded-full p-1 mb-6">
                    <button
                        onClick={() => setMode('login')}
                        className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'login' ? 'bg-[#ef4444] text-white shadow' : 'text-gray-500'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'signup' ? 'bg-[#ef4444] text-white shadow' : 'text-gray-500'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    <input type="text" placeholder="Enter email or username" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border-b-2 border-gray-200 focus:outline-none focus:border-[#ef4444] text-sm"/>
                    <div className="relative">
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border-b-2 border-gray-200 focus:outline-none focus:border-[#ef4444] text-sm"/>
                        {mode === 'login' && <span className="absolute right-2 top-2 text-gray-400 cursor-pointer">👁️</span>}
                    </div>
                    {mode === 'signup' && (
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-2 border-b-2 border-gray-200 focus:outline-none focus:border-[#ef4444] text-sm"/>
                    )}
                </div>

                {mode === 'login' && (
                    <div className="text-right text-xs text-gray-500 mb-6">
                        <a href="#" className="hover:text-[#ef4444]">Forgot Password?</a>
                    </div>
                )}
                
                {mode === 'signup' && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Sign up as:</p>
                        <div className="flex items-center justify-center space-x-4">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} className="form-radio text-[#ef4444]"/>
                                <span className="ml-2 text-sm">User</span>
                            </label>
                             <label className="flex items-center cursor-pointer">
                                <input type="radio" name="role" value="chef" checked={role === 'chef'} onChange={() => setRole('chef')} className="form-radio text-[#ef4444]"/>
                                <span className="ml-2 text-sm">Chef</span>
                            </label>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleAuthAction}
                    className="w-full bg-gradient-to-r from-[#f87171] to-[#ef4444] text-white font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    {mode === 'login' ? 'Login' : 'Sign Up'}
                </button>

                <div className="text-center text-gray-400 my-4 text-sm">OR</div>

                <div className="flex justify-center space-x-4">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md">f</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md">
                        <GoogleIcon className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white shadow-md">
                        <TwitterIcon className="w-6 h-6" />
                    </button>
                </div>

            </div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2069&auto=format&fit=crop)' }}></div>
        </div>
    );
};


// ...existing code...
const UserMenuScreen: React.FC<{ 
    menuItems: MenuItem[],
    onNavigate: (page: Page) => void,
    onSelectItem: (item: MenuItem) => void,
    cartItemCount: number,
}> = ({ menuItems, onNavigate, onSelectItem, cartItemCount }) => {
    // ...existing code...
    const [activeCategory, setActiveCategory] = useState<'Starters' | 'Mains' | 'Desserts'>('Starters');
    const [searchQuery, setSearchQuery] = useState('');

    const displayedItems = menuItems
        .filter(item => item.category === activeCategory)
        .filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const CategoryButton: React.FC<{ name: string, icon: string, isActive: boolean, onClick: () => void }> = ({ name, icon, isActive, onClick }) => (
        <button onClick={onClick} className={`flex flex-col items-center justify-center w-24 h-28 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-lg scale-105 border-2 border-[#f87171]' : 'bg-white shadow'}`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${isActive ? '' : 'bg-gray-100'}`}>
                <img src={icon} alt={name} className="w-10 h-10 object-contain"/>
            </div>
            <span className={`text-xs font-semibold ${isActive ? 'text-[#f87171]' : 'text-gray-600'}`}>{name}</span>
        </button>
    );

    const MenuItemCard: React.FC<{ item: MenuItem, isFeatured: boolean }> = ({ item, isFeatured }) => (
       <button onClick={() => onSelectItem(item)} className={`flex-shrink-0 w-48 h-64 lg:w-full lg:h-80 rounded-3xl p-4 flex flex-col justify-end items-center text-center relative overflow-hidden transition-all duration-300 ${isFeatured ? 'bg-[#f87171] text-white shadow-2xl' : 'bg-white shadow-lg'}`}>
            <img src={item.image} alt={item.name} className={`absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover transition-transform duration-300 ${isFeatured ? 'scale-110' : ''}`} />
            <div className="mt-auto pt-24 lg:pt-32">
                <h3 className="text-sm lg:text-base font-bold leading-tight mb-1">{item.name}</h3>
                <div className="flex justify-center items-center text-xs mb-2">
                    {Array(5).fill(0).map((_, i) => (
                        <span key={i} className={i < item.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                </div>
                <p className={`font-bold text-lg ${isFeatured ? 'text-white' : 'text-black'}`}>{item.price}</p>
            </div>
        </button>
    );

    return (
        <div className="w-full h-full p-6 lg:p-10 font-sans overflow-y-auto pb-24 lg:pb-6">
            <header className="flex justify-between items-center mb-6">
                <button>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Path d="M4 6h16M4 12h16M4 18h7" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                </button>
                <span className="text-xs font-bold">OX</span>
                <button onClick={() => onNavigate('profile')} className="bg-[#f87171] text-white text-xs font-bold px-3 py-1 rounded-full">YOUR PROFILE</button>
            </header>

            <section className="mb-6">
                <h2 className="text-2xl lg:text-4xl font-bold">Choose the</h2>
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-700">food you love</h2>
                <div className="relative mt-4">
                    <input 
                        type="text" 
                        placeholder="Search for a food item" 
                        className="w-full bg-gray-100 border-none rounded-full py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#f87171]"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                </div>
            </section>

            <section className="mb-6">
                <h3 className="font-bold text-lg lg:text-xl mb-3">Categories</h3>
                <div className="flex justify-around items-center">
                    <CategoryButton name="Starters" icon="https://img.icons8.com/plasticine/100/spring-roll.png" isActive={activeCategory === 'Starters'} onClick={() => setActiveCategory('Starters')} />
                    <CategoryButton name="Mains" icon="https://img.icons8.com/plasticine/100/steak.png" isActive={activeCategory === 'Mains'} onClick={() => setActiveCategory('Mains')} />
                    <CategoryButton name="Desserts" icon="https://img.icons8.com/plasticine/100/cake.png" isActive={activeCategory === 'Desserts'} onClick={() => setActiveCategory('Desserts')} />
                </div>
            </section>
            
            <section>
                 <h3 className="font-bold text-lg mb-3 uppercase lg:text-xl">{activeCategory}:</h3>
                 <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-x-0 lg:overflow-visible lg:px-0 lg:mx-0">
                     {displayedItems.length > 0 ? 
                        displayedItems.map((item, index) => <MenuItemCard key={item.id} item={item} isFeatured={index === 0} />) :
                        <div className="w-full text-center py-10 text-gray-500">No items match your search.</div>
                    }
                 </div>
                 <div className="flex justify-center items-center space-x-1.5 mt-4 lg:hidden">
                     <div className="w-4 h-1.5 bg-[#f87171] rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                 </div>
            </section>

             <div className="fixed bottom-0 left-0 right-0 p-4 w-full max-w-md mx-auto lg:hidden">
                 <div className="relative">
                    <div className="bg-white rounded-full shadow-lg flex justify-around items-center h-16 text-gray-400">
                        {/* Left Icons */}
                        <div className="flex justify-around w-2/5">
                            <button onClick={() => onNavigate('userMenu')} className="text-[#f87171]"><HomeIcon/></button>
                            <button onClick={() => onNavigate('search')}><SearchIcon/></button>
                        </div>
                        {/* Right Icons */}
                        <div className="flex justify-around w-2/5">
                            <button onClick={() => onNavigate('bookmarks')}><BookmarkIcon/></button>
                            <button onClick={() => onNavigate('profile')}><UserIcon/></button>
                        </div>
                    </div>
                     {/* Centered Cart Button */}
                     <button onClick={() => onNavigate('cart')} className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#ef4444] rounded-full flex items-center justify-center text-white shadow-xl">
                        <CartIcon className="h-8 w-8" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-[#ef4444] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#ef4444]">
                                {cartItemCount}
                            </span>
                        )}
                     </button>
                 </div>
             </div>
        </div>
    );
};

const ChefMenuScreen: React.FC<{}> = () => {
    const [menuItems, setMenuItems] = useState(initialMenuData);
    const [modal, setModal] = useState<ModalType>(null);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    
    const openModal = (type: ModalType, item: MenuItem | null = null) => {
        setModal(type);
        setSelectedItem(item);
    };
    
    const closeModal = () => {
        setModal(null);
        setSelectedItem(null);
    };

    const handleSave = (itemToSave: MenuItem) => {
        if (modal === 'add') {
            setMenuItems(prev => [...prev, { ...itemToSave, id: Date.now() }]);
        } else if (modal === 'edit' && selectedItem) {
            setMenuItems(prev => prev.map(item => item.id === selectedItem.id ? itemToSave : item));
        }
        closeModal();
    };

    const handleDeleteConfirm = () => {
        if (selectedItem) {
            setMenuItems(prev => prev.filter(item => item.id !== selectedItem.id));
        }
        closeModal();
    };

    const categories = ['Starters', 'Mains', 'Desserts'];
    
    return (
        <div className="w-full h-full p-6 lg:p-10 font-sans overflow-y-auto pb-24 lg:pb-6">
            <header className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-[#ef4444]">Welcome back, chef</h1>
                <div className="flex items-center space-x-2 mt-4">
                    <span className="font-semibold text-gray-700">EDIT MENU:</span>
                    <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full flex items-center space-x-1 focus:outline-none">
                        <option value="all">ALL CATEGORIES</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                    </select>
                </div>
            </header>

            <main>
                {categories.filter(cat => activeCategory === 'all' || activeCategory === cat).map(category => (
                    <div key={category} className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">{category.toUpperCase()}:</h2>
                        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 lg:space-y-0">
                            {menuItems.filter(i => i.category === category).map(item => (
                                 <div key={item.id} className="flex items-start space-x-4">
                                     <button onClick={() => openModal('delete', item)} className="pt-1 text-gray-500 hover:text-red-500">
                                         <DeleteIcon />
                                     </button>
                                     <div className="flex-grow flex items-start space-x-4">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover"/>
                                        <div className="flex-grow">
                                             <h3 className="font-bold lg:text-lg">{item.name}</h3>
                                             <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                        </div>
                                     </div>
                                     <button onClick={() => openModal('edit', item)} className="pt-1 text-gray-500 hover:text-blue-500">
                                        <EditIcon/>
                                     </button>
                                 </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
            
            <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-4 bg-[#f0eade] lg:bg-transparent lg:static lg:mt-8">
                <button onClick={() => openModal('add')} className="w-full bg-black text-white font-bold py-4 rounded-full flex items-center justify-center space-x-2 shadow-lg">
                    <ListIcon/>
                    <span>ADD MENU ITEMS</span>
                </button>
            </div>
            
            {modal && (
                modal === 'delete' ? (
                     <Modal onClose={closeModal} title="Confirm Deletion">
                        <p>Are you sure you want to delete "{selectedItem?.name}"?</p>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                            <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Delete</button>
                        </div>
                    </Modal>
                ) : modal === 'add' || modal === 'edit' ? (
                    <AddEditItemModal item={selectedItem} onSave={handleSave} onClose={closeModal} mode={modal}/>
                ) : null
            )}
        </div>
    );
};

const AddEditItemModal: React.FC<{item: MenuItem | null, onSave: (item: MenuItem) => void, onClose: () => void, mode: 'add' | 'edit'}> = ({item, onSave, onClose, mode}) => {
    const [formData, setFormData] = useState<Omit<MenuItem, 'id' | 'rating'>>({
        name: item?.name || '',
        description: item?.description || '',
        price: item?.price || '',
        image: item?.image || '',
        category: item?.category || 'Starters',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: item?.id || 0, rating: item?.rating || 0 });
    };

    return (
         <Modal onClose={onClose} title={mode === 'add' ? "Add Menu Item" : "Edit Menu Item"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded"/>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded"></textarea>
                <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded"/>
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded"/>
                 <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="Starters">Starters</option>
                    <option value="Mains">Mains</option>
                    <option value="Desserts">Desserts</option>
                </select>
                <div className="flex justify-end space-x-4 mt-6">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">Save</button>
                </div>
            </form>
        </Modal>
    );
};

// --- NEW COMPONENTS for Item Detail and Cart ---

const ItemDetailModal: React.FC<{
    item: MenuItem;
    onClose: () => void;
    onAddToCart: (item: CartItem) => void;
}> = ({ item, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart({ ...item, quantity });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
            <div className="bg-white rounded-t-3xl p-6 w-full max-w-md shadow-xl">
                 <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-2xl mb-4"/>
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                        {Array(5).fill(0).map((_, i) => <span key={i}>{i < item.rating ? '★' : '☆'}</span>)}
                    </div>
                    <span className="text-gray-500 ml-2 text-sm">{item.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{item.description}</p>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-full bg-gray-200 text-lg font-bold">-</button>
                        <span className="text-xl font-bold">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 rounded-full bg-gray-200 text-lg font-bold">+</button>
                    </div>
                    <span className="text-3xl font-bold">{item.price}</span>
                </div>
                <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-[#f87171] to-[#ef4444] text-white font-bold py-4 rounded-full shadow-lg">
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

const CartScreen: React.FC<{
    cartItems: CartItem[];
    onNavigate: (page: Page) => void;
    onRemoveItem: (itemId: number) => void;
}> = ({ cartItems, onNavigate, onRemoveItem }) => {

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    return (
        <div className="w-full h-full p-6 font-sans flex flex-col">
            <header className="flex items-center mb-6">
                <button onClick={() => onNavigate('userMenu')} className="mr-4 p-2 -ml-2">
                    <Svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></Svg>
                </button>
                <h1 className="text-2xl font-bold">My Cart</h1>
            </header>
            
            {cartItems.length === 0 ? (
                <div className="flex-grow flex flex-col justify-center items-center text-gray-500">
                    <CartIcon className="h-24 w-24 mb-4" strokeWidth={1}/>
                    <p className="text-lg">Your cart is empty.</p>
                    <button onClick={() => onNavigate('userMenu')} className="mt-4 bg-[#f87171] text-white px-6 py-2 rounded-full">Start Shopping</button>
                </div>
            ) : (
                <div className="flex-grow overflow-y-auto -mx-6 px-6">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center mb-4 bg-white p-3 rounded-2xl shadow">
                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover mr-4"/>
                            <div className="flex-grow">
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-500">x {item.quantity}</p>
                                <p className="font-bold text-lg mt-1">{item.price}</p>
                            </div>
                            <button onClick={() => onRemoveItem(item.id)} className="text-red-500">
                                <DeleteIcon/>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <footer className="mt-auto pt-4 border-t">
                    <div className="flex justify-between items-center mb-4 font-bold text-xl">
                        <span>Total:</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <button onClick={() => onNavigate('checkout')} className="w-full bg-gradient-to-r from-[#f87171] to-[#ef4444] text-white font-bold py-4 rounded-full shadow-lg">
                        Proceed to Checkout
                    </button>
                </footer>
            )}
        </div>
    );
};


// --- PLACEHOLDER SCREENS ---
const PlaceholderScreen: React.FC<{ screenName: string, onBack: () => void }> = ({ screenName, onBack }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-8">{screenName}</h1>
        <p className="text-center text-gray-600 mb-8">This is a placeholder for the {screenName.toLowerCase()} screen. The full functionality would be built out here.</p>
        <button onClick={onBack} className="bg-[#f87171] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">Go Back to Menu</button>
    </div>
);

const WebLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    // This component wraps the app and provides a desktop-friendly layout
    // It's only for web, so we can use web-specific elements and styles.
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 lg:p-8" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
            {children}
        </div>
    );
}

// --- MAIN APP COMPONENT ---
export default function App() {
    const [page, setPage] = useState<Page>('splash');
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const handleLogin = (role: UserRole) => {
        setUserRole(role);
        setPage(role === 'chef' ? 'chefMenu' : 'userMenu');
    };
    
    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
    };

    const handleSelectItem = (item: MenuItem) => {
        setSelectedItem(item);
    };

    const handleAddToCart = (itemToAdd: CartItem) => {
        setCartItems(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item => 
                    item.id === itemToAdd.id 
                    ? { ...item, quantity: item.quantity + itemToAdd.quantity } 
                    : item
                );
            }
            return [...prevCart, itemToAdd];
        });
    };

    const handleRemoveFromCart = (itemId: number) => {
        setCartItems(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const renderPage = () => {
        switch (page) {
            case 'splash':
                return <SplashScreen onNavigate={() => setPage('auth')} />;
            case 'auth':
                return <AuthScreen onLogin={handleLogin} />;
            case 'userMenu':
                return <UserMenuScreen 
                            menuItems={initialMenuData} 
                            onNavigate={handleNavigate}
                            onSelectItem={handleSelectItem}
                            cartItemCount={cartItems.length}
                        />;
            case 'chefMenu':
                return <ChefMenuScreen />;
            case 'cart':
                return <CartScreen cartItems={cartItems} onNavigate={handleNavigate} onRemoveItem={handleRemoveFromCart}/>;
            case 'profile':
                 return <PlaceholderScreen screenName="Your Profile" onBack={() => handleNavigate(userRole === 'chef' ? 'chefMenu' : 'userMenu')} />;
            case 'search':
                 return <PlaceholderScreen screenName="Search" onBack={() => handleNavigate('userMenu')} />;
            case 'bookmarks':
                 return <PlaceholderScreen screenName="Bookmarks" onBack={() => handleNavigate('userMenu')} />;
            case 'checkout':
                 return <PlaceholderScreen screenName="Checkout" onBack={() => handleNavigate('cart')} />;
            default:
                return <div>Page not found</div>;
        }
    };

    return (
        <WebLayout>
            <main className="w-full max-w-md h-[95vh] max-h-[800px] bg-white shadow-2xl overflow-hidden relative rounded-3xl lg:max-w-7xl lg:flex lg:h-[90vh] lg:max-h-[900px]">
                {/* Sidebar for Desktop */}
                {userRole === 'user' && page !== 'splash' && page !== 'auth' && (
                    <div className="hidden lg:flex flex-col items-center w-24 bg-gray-50/75 py-8 space-y-8 border-r border-gray-200/50">
                        <span className="text-3xl font-bold text-[#f87171]">CK</span>
                        <nav className="flex flex-col items-center space-y-6 text-gray-500">
                            <button onClick={() => handleNavigate('userMenu')} className={`p-3 rounded-lg ${page === 'userMenu' ? 'text-white bg-[#f87171]' : 'hover:bg-gray-200'}`}><HomeIcon/></button>
                            <button onClick={() => handleNavigate('search')} className={`p-3 rounded-lg ${page === 'search' ? 'text-white bg-[#f87171]' : 'hover:bg-gray-200'}`}><SearchIcon/></button>
                            <button onClick={() => handleNavigate('bookmarks')} className={`p-3 rounded-lg ${page === 'bookmarks' ? 'text-white bg-[#f87171]' : 'hover:bg-gray-200'}`}><BookmarkIcon/></button>
                            <button onClick={() => handleNavigate('profile')} className={`p-3 rounded-lg ${page === 'profile' ? 'text-white bg-[#f87171]' : 'hover:bg-gray-200'}`}><UserIcon/></button>
                        </nav>
                        <div className="mt-auto relative">
                            <button onClick={() => handleNavigate('cart')} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100">
                                <CartIcon className="h-6 w-6 text-gray-600" />
                                {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItems.length}</span>}
                            </button>
                        </div>
                    </div>
                )}
                <div className="flex-1 h-full overflow-y-auto">
                    {renderPage()}
                </div>
                {selectedItem && page !== 'chefMenu' && <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={handleAddToCart} />}
            </main>
        </WebLayout>
    );
}
