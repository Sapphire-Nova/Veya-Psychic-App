/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminLive from './pages/AdminLive';
import AskPriestess from './pages/AskPriestess';
import Astrology from './pages/Astrology';
import BookingConfirmation from './pages/BookingConfirmation';
import CandleRitual from './pages/CandleRitual';
import ChakraCheckIn from './pages/ChakraCheckIn';
import ChakraDetail from './pages/ChakraDetail';
import Chakras from './pages/Chakras';
import Community from './pages/Community';
import Contact from './pages/Contact';
import Crystals from './pages/Crystals';
import DailyGuidance from './pages/DailyGuidance';
import FullMoonCircle from './pages/FullMoonCircle';
import Herbs from './pages/Herbs';
import Home from './pages/Home';
import IntentionBuilder from './pages/IntentionBuilder';
import JourneyTracker from './pages/JourneyTracker';
import Lightworkers from './pages/Lightworkers';
import LiveChat from './pages/LiveChat';
import LiveRoom from './pages/LiveRoom';
import LiveSessions from './pages/LiveSessions';
import Meditations from './pages/Meditations';
import Messages from './pages/Messages';
import MyJourney from './pages/MyJourney';
import ProtectionGuides from './pages/ProtectionGuides';
import Sanctuary from './pages/Login';
import Services from './pages/Services';
import SessionDetail from './pages/SessionDetail';
import SoulPathQuiz from './pages/SoulPathQuiz';
import Tarot from './pages/Tarot';
import UserProfile from './pages/UserProfile';
import VioletGuide from './pages/VioletGuide';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminDashboard": AdminDashboard,
    "AdminLive": AdminLive,
    "AskPriestess": AskPriestess,
    "Astrology": Astrology,
    "BookingConfirmation": BookingConfirmation,
    "CandleRitual": CandleRitual,
    "ChakraCheckIn": ChakraCheckIn,
    "ChakraDetail": ChakraDetail,
    "Chakras": Chakras,
    "Community": Community,
    "Contact": Contact,
    "Crystals": Crystals,
    "DailyGuidance": DailyGuidance,
    "FullMoonCircle": FullMoonCircle,
    "Herbs": Herbs,
    "Home": Home,
    "IntentionBuilder": IntentionBuilder,
    "JourneyTracker": JourneyTracker,
    "Lightworkers": Lightworkers,
    "LiveChat": LiveChat,
    "LiveRoom": LiveRoom,
    "LiveSessions": LiveSessions,
    "Meditations": Meditations,
    "Messages": Messages,
    "MyJourney": MyJourney,
    "ProtectionGuides": ProtectionGuides,
    "Sanctuary": Sanctuary,
    "Services": Services,
    "SessionDetail": SessionDetail,
    "SoulPathQuiz": SoulPathQuiz,
    "Tarot": Tarot,
    "UserProfile": UserProfile,
    "VioletGuide": VioletGuide,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};