import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import { Link } from "react-router";


const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
                <nav>
                    <Link
                        className="w-16 h-auto"
                        to="/">
                        <img src="/img/Logo.png" alt="Logo" />
                    </Link>
                    <p>
                        Copyright © 2025 wish you have a bestvouz
                    </p>
                </nav>
                <nav>
                    <h6 className="footer-title">聯絡我們</h6>
                    <div>
                        <div className="flex">
                            <a className="link link-hover"><Mail />
                                <p className="text-sm">BestVouz@gmail.com</p>
                            </a>
                        </div>
                        <div className="flex">
                            <a className="link link-hover"><Phone />
                                <p className="mx-2">(02)2868-1012</p>
                            </a>
                        </div>
                    </div>
                </nav>
                <nav>
                    <h6 className="footer-title">訂閱我們</h6>
                    <fieldset className="w-80">
                        <div className="join">
                            <input
                                type="text"
                                placeholder="輸入電子信箱"
                                className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Enter</button>
                        </div>
                    </fieldset>
                    <div className="grid grid-flow-col gap-4">
                        <Instagram />
                        <Facebook />
                        <Twitter />
                    </div>
                </nav>
            </footer>
        </div>
    )
}

export default Footer;