import {Search, ShoppingBag, Menu, User, X, ChevronDown} from 'lucide-react';


const NavBar = () => {
    return (
        <nav className={'w-full h-[4rem] bg-off-white flex items-center'}>
            <div className={'border w-full flex justify-between items-center'}>
                {/*    logo*/}
                <h1 className={"uppercase font-semibold text-[1.5rem]"}> monolith</h1>

            </div>
        </nav>
    )
}

export default NavBar