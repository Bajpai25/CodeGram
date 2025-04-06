// src/pages/Home.tsx
import LandingPage from "./LandingPage";
import HomeBanner from "../components/Homebanner"; // Assuming you have this

const Home = ({ token, id }: { token: string | null, id: string | null }) => {
    return (
        <div className="flex flex-col">
            <LandingPage token={token} id={id} />
            <HomeBanner />
        </div>
    );
};

export default Home;

