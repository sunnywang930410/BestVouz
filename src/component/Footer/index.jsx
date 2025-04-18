import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import { Link } from "react-router";


const Footer = () => {
    return (
        <div className="relative w-screen left-[50%] right-[50%] mx-[-50vw]  ">
            < footer className="footer footer-bg  justify-around items-center md:footer-horizontal text-base-content p-10" >
                <div>
                    <Link
                        className="w-16 h-auto"
                        to="/">
                        <img src="/img/Logo.png" alt="Logo" />
                    </Link>
                    <span className="text-sm mt-4 text-base-content">
                        Copyright © 2025 wish you have a bestvouz
                    </span>
                </div>
                <div>
                    <span className="footer-title text-base text-base-content mb-6">聯絡我們</span>
                    <div className="justify-center items-center">
                        <div className="flex flex-col flex-row mb-4">
                            <a className="link link-hover"><Mail /></a>
                            <span className="text-sm link link-hover px-4">BestVouz@gmail.com</span>
                        </div>
                        <div className="flex flex-row mb-4">
                            <a className="link link-hover"><Phone /></a>
                            <span className="mx-2 link link-hover px-4">(02)2868-1012</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="footer-title text-base mb-6 ">Follow Us</span>
                    <div className="mb-4">周一至周五 9:00~5:00
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-4 ">
                        <Instagram />
                        <Facebook />
                        <Twitter />
                    </div>
                </div>

            </footer >
        </div >
    )
}

export default Footer;