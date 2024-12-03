import { Outlet, Link } from 'react-router-dom'
import './App.css'
import { useEffect, useRef, useState } from 'react';
import { useScroll, useWindowWidth } from './hooks';
import MenuIcon from "./assets/menu.svg";
import { Language, LanguageProvider, useLanguage } from './contexts/LanguageContext';
import textSelector from './utils/textSelector';
import { replacePlaceholders } from './utils/replacePlaceholders';
import InstagramIcon from './assets/instagram-icon.svg';
import FacebookIcon from './assets/facebook-icon.svg';
import LinkedinIcon from './assets/linkedin-icon.svg';
import InitLogoBlackIcon from './assets/init-logo-black.svg';
import SGGWLogoBlackIcon from './assets/sggw-logo-black.svg';

const TopBar = () => {
  const [mobileTreshold, setMobileTreshold] = useState(0);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const windowWidth = useWindowWidth();
  const scroll = useScroll();
  const menuElements = textSelector().nav;
  const languageElements = Object.values(Language);
  const TopBarNavRef = useRef<HTMLDivElement>(null);
  const TopBarMobileMenuRef = useRef<HTMLDivElement>(null);
  const TopBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (TopBarMobileMenuRef.current && TopBarNavRef.current) {
      TopBarMobileMenuRef.current.style.paddingTop = `calc(${TopBarNavRef.current.offsetHeight}px + 4rem)`;
    }
  }, [TopBarMobileMenuRef.current, TopBarNavRef.current])

  useEffect(() => {
    const letterSize = 20; // size of one letter in px in worst case scenario
    const menuLetters = menuElements.map(element => element.name.length).reduce((a, b) => a + b, 0);
    const languageLetters = languageElements.map(element => element.length).reduce((a, b) => a + b, 0);
    const lettersWidth = (menuLetters + languageLetters) * letterSize;
    const gaps = (menuElements.length - 1) * 3 * letterSize + (languageElements.length - 1) * letterSize + 2 * 2.5 * letterSize;
    const treshold = lettersWidth + gaps;

    setMobileTreshold(treshold);
  }, [])

  useEffect(() => {
    if (TopBarNavRef.current) {
      if (windowWidth < mobileTreshold) {
        setIsMobileMenu(true);
      } else {
        setIsMobileMenu(false);
        setIsMobileMenuOpen(false);
      }
    }
  }, [windowWidth, mobileTreshold])

  useEffect(() => {
    if (TopBarRef.current) {
      if (scroll > 0) {
        TopBarRef.current.style.backgroundColor = 'var(--bg-color)';
        TopBarRef.current.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
      } else {
        TopBarRef.current.style.boxShadow = 'none';
        TopBarRef.current.style.backgroundColor = 'transparent';
      }

    }
  }, [scroll, TopBarRef.current])

  return (
    <div className='topbar__wrapper' ref={TopBarRef} id="topbar">
      <div className='topbar pagewidth' >
        <div className='topbar__logos'>
          <Link to='/' style={{ zIndex: 2 }} onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/init.svg" alt="KN init" />
          </Link>
          <Link to='https://sggw.edu.pl' target='_blank' style={{ zIndex: 2 }} onClick={() => setIsMobileMenuOpen(false)}>
            <img src={SGGWLogoBlackIcon} alt="SGGW" />
          </Link>
        </div>
        <div className='topbar__nav' ref={TopBarNavRef}>
          {isMobileMenu ? (
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <img src={MenuIcon} alt="menu" />
            </button>
          )
            : (
              <>
                <ul className='topbar__menu'>
                  {
                    menuElements.map((element, index) => (
                      <li key={index}>
                        <Link to={element.link}>{element.name}</Link>
                      </li>
                    ))
                  }
                </ul>

                {/* SEGREGATOR */}
                |
                {/* SEGREGATOR */}

                <ul className='topbar__language'>
                  {
                    languageElements.map((element, index) => (
                      <li className={`${language === element ? "topbar__language--active" : ""}`} key={index} onClick={() => setLanguage(element)}>{element}</li>
                    ))
                  }
                </ul>
              </>
            )}
        </div>
        {
          isMobileMenu &&
          <div className={`topbar__nav topbar__nav_mobile${isMobileMenuOpen ? " topbar__nav_mobile--open" : ""}`} ref={TopBarMobileMenuRef}>
            <ul>
              {
                menuElements.map((element, index) => (
                  <li key={index} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link to={element.link}>{element.name}</Link>
                  </li>
                ))
              }
            </ul>
            <ul>
              {
                languageElements.map((element, index) => (
                  <li className={`${language === element ? "topbar__language--active" : ""}`} key={index} onClick={() => setLanguage(element)}>{element}</li>
                ))
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

const BottomBar = () => {
  const componentText = textSelector().bottomBar;

  return (
    <div className='bottombar'>
      <div>
        <p>{componentText.socials}</p>
        <div className='bottombar__icons bottombar__icons--socials'>
          <a href="https://www.instagram.com/kn_init_/" target="_blank">
            <img src={InstagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/kninit/" target="_blank">
            <img src={FacebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/company/ko%C5%82o-naukowe-init/about/" target="_blank">
            <img src={LinkedinIcon} alt="Linkedin" />
          </a>
        </div>
      </div>
      <div>
        <div className='bottombar__icons'>
          <a href="https://www.hackarena.pl" target="_blank">
            <img src={InitLogoBlackIcon} alt="KN init" />
          </a>
          <a href="https://www.sggw.edu.pl/" target="_blank">
            <img src={SGGWLogoBlackIcon} alt="SGGW" />
          </a>
        </div>
        <p>{replacePlaceholders(componentText.copyrights, new Date().getFullYear().toString())}</p>
      </div>
    </div>
  )
}

function App() {

  return (
    <>
      <LanguageProvider>
        <TopBar />
        <Outlet />
        <BottomBar />
      </LanguageProvider>
    </>
  )
}

export default App
