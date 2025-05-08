import { useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import SidePanel from "./SidePanel";
import Notification from "./Notification";

// Define the type for the navigation items
interface NavItem {
    text: string;
    link_path: string;
    icon: string;
    isExternal?: boolean;
  }

// Define the MainHeadingData type
interface MainHeadingData {
    status?: "loggedin" | "not-loggedin" | "none";
    username?: string;
    items?: NavItem[];
  }

const MainHeading = ({ data }: { data?: MainHeadingData }) => {
    const [sidePanelState, setSidePanelState] = useState<boolean>(false);
    const [notifDisplayState, setNotifDisplayState] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
    // Default navigation items with icons
    const defaultNavItems: NavItem[] = [
        { text: "Home", link_path: "/", icon: "bi-house-fill" },
        { text: "Roadmaps", link_path: "/roadmap", icon: "bi-map" },
        { text: "Compete", link_path: "/compete", icon: "bi-trophy" },
        { text: "Onboarding", link_path: "/onboarding", icon: "bi-compass" },
        { text: "CodeChat", link_path: "https://codegramxcodechat.onrender.com/", icon: "bi-chat-dots", isExternal: true }
    ];

    // Use provided items or default items
    const navItems = (data?.items && data.items.length > 0) ? data.items : defaultNavItems;

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <div className="fixed w-full h-[60px] bg-black border-b border-borders flex felx-row z-[100]">
                <Link to="/" className=" select-none">
                    <div
                        id="logo-cont"
                        className="inline-block text-[24px] font-bold mx-[36px] mt-[12px]"
                    >
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 px-[1px]">
                            Code
                        </span>
                        <span>Gram</span>
                    </div>
                </Link>
                {/* Desktop Navigation Links with Icons */}
                <div className="hidden md:flex">
                {navItems.map((elem, index) => (
                    elem.isExternal ? (
                        // External link for CodeChat
                        <a
                            key={index}
                            href={elem.link_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-[15px] font-bold text-lg text-[14px] h-fit px-[20px] text-[#fff] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 transition group"
                        >
                            <div id={elem.text} className="flex items-center">
                                <i className={`${elem.icon} mr-2 text-base`}></i>
                                {elem.text}
                            </div>
                        </a>
                    ) : (
                        // Internal links
                        <Link
                            key={index}
                            to={elem.link_path}
                            className="mt-[15px] font-bold text-lg text-[14px] h-fit px-[20px] text-[#fff] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 transition group"
                        >
                            <div id={elem.text} className="flex items-center">
                                <i className={`${elem.icon} mr-2 text-base`}></i>
                                {elem.text}
                            </div>
                        </Link>
                    )
                ))}
                </div>
                
                {data?.status === "loggedin" || data?.status == undefined ? (
                <div className="fixed flex flex-row right-[36px] items-center h-[60px]">
                    {/* Mobile Menu Button */}
                    <div className="inline-block p-[5px] text-[14px] text-[#fff] md:hidden">
                    <div 
                        className="group w-[32px] h-[32px] border border-borders rounded-[99px] relative hover:bg-[#222] cursor-pointer"
                        onClick={toggleMobileMenu}
                    >
                        <i className="bi bi-three-dots-vertical absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-white"></i>
                    </div>
                    </div>

                    <div
                    id="notification"
                    className="inline-block p-[5px] text-[14px] text-[#fff]"
                    >
                    <Notification
                        display={notifDisplayState}
                        displayFn={setNotifDisplayState}
                    />
                    </div>
                    <div
                    id="profile-picture"
                    className="inline-block relative p-[5px] text-[14px] text-[#fff]"
                    onClick={() => setSidePanelState(!sidePanelState)}
                    >
                    <Tooltip text={data?.username || ""}>
                        <div className="w-[32px] h-[32px] border border-borders rounded-[99px]"></div>
                    </Tooltip>
                    </div>
                    <SidePanel
                    displayFn={setSidePanelState}
                    display={sidePanelState}
                    data={{
                        username: data?.username || "",
                    }}
                    />
                </div>
                ) : data?.status === "not-loggedin" ? (
                <div className="fixed flex flex-row right-[36px] items-center h-[60px]">
                    {/* Mobile Menu Button for not logged in state */}
                    <div className="inline-block p-[5px] mr-3 text-[14px] text-[#808080] md:hidden">
                    <div 
                        className="group w-[32px] h-[32px] border border-borders rounded-[99px] relative hover:bg-[#222] cursor-pointer"
                        onClick={toggleMobileMenu}
                    >
                        <i className="bi bi-three-dots-vertical absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-white"></i>
                    </div>
                    </div>
                    <Link
                    to="/login"
                    className="inline-block font-bold py-[6px] px-[16px] bg-black hover:bg-borders border rounded-md border-borders text-white text-[14px]"
                    >
                    Log In
                    </Link>
                    <Link
                    to="/signup"
                    className="ml-[8px] font-bold inline-block py-[6px] px-[16px] bg-gradient-to-r from-orange-500 to-red-600 border rounded-md border-borders text-black text-[14px] hover:bg-red-800"
                    >
                    Sign Up
                    </Link>
                </div>
                ) : (
                <></>
                )}
            </div>
            <div className="h-[60px]"></div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="fixed text-bold top-[60px] right-0 w-[200px] bg-black border-l border-b border-borders z-[99] md:hidden">
                {navItems.map((elem, index) => (
                    <Link
                    key={index}
                    to={elem.link_path}
                    className="block py-3 px-5 text-[14px] text-[#fff] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 transition border-b border-borders last:border-b-0"
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    <div className="flex items-center">
                        <i className={`${elem.icon} mr-3 text-base`}></i>
                        {elem.text}
                    </div>
                    </Link>
                ))}
                </div>
            )}
        </>
    );
};

export default MainHeading;
