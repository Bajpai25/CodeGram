import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import MainHeading from "../components/MainHeading";

interface UserData {
    id: string;
    username: string;
    email: string;
    problems_solved: string[];
    problems_attempted: string[];
    submissions: any[];
}

const ActivityChart = ({ submissions }: { submissions: any[] }) => {
    // Generate last 6 months of dates
    const getLastSixMonths = () => {
        const months = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push(month.toLocaleString('default', { month: 'short' }));
        }
        return months;
    };

    const months = getLastSixMonths();
    
    // Generate random activity data (replace with real data later)
    const generateActivityData = () => {
        return Array.from({ length: 6 }, () => Math.floor(Math.random() * 20));
    };

    const activityData = generateActivityData();

    return (
        <div className="bg-[#282828] rounded-lg border border-[#3e3e3e] p-6">
            <h2 className="text-xl font-bold text-white mb-6">Activity</h2>
            <div className="relative h-64">
                {/* Y-axis */}
                <div className="absolute left-0 h-full flex flex-col justify-between text-[#8a8a8a] text-sm">
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                </div>
                
                {/* Chart */}
                <div className="ml-8 h-full flex items-end">
                    {activityData.map((value, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                                className="w-4/5 bg-[#2cbb5d] rounded-sm transition-all duration-500"
                                style={{ height: `${(value / 20) * 100}%` }}
                            ></div>
                            <span className="text-[#8a8a8a] text-sm mt-2">{months[index]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProfilePage = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError("");
            
            try {
                if (id) {
                    const response = await axios.get(`${API_URL}/api/accounts/id/${id}`, {
                        headers: { Authorization: token },
                    });
                    setUserData(response.data);
                }
            } catch (e) {
                const error = e as Error | AxiosError;
                console.error("Error fetching profile:", error);
                setError(error.message || "Failed to load profile");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token, id]);

    if (isLoading) {
        return (
            <div className="bg-[#1a1a1a] min-h-screen">
                <MainHeading data={{ status: "none" }} />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#1a1a1a] min-h-screen">
                <MainHeading data={{ status: "none" }} />
                <div className="flex items-center justify-center h-[60vh] text-red-500">
                    <div className="bg-[#282828] p-6 rounded-lg border border-[#3e3e3e]">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#1a1a1a] min-h-screen">
            <MainHeading 
                data={{
                    username: userData?.username || "",
                    status: "loggedin",
                    items: [{ text: "Problem List", link_path: "/problemset" }],
                }}
            />
            
            {userData && (
                <>
                    {/* Profile Header Section */}
                    <div className="w-[calc(100%-72px)] bg-[#282828] mx-auto mt-[8px] rounded-lg border border-[#3e3e3e] p-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            {/* Profile Picture */}
                            <div className="w-24 h-24 bg-[#3e3e3e] rounded-full flex items-center justify-center">
                                <span className="text-4xl text-white">{userData.username[0]?.toUpperCase()}</span>
                            </div>
                            
                            {/* User Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-white mb-2">{userData.username}</h1>
                                <div className="text-[#8a8a8a] mb-4">{userData.email}</div>
                                
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                    <div className="stat-card">
                                        <div className="text-[#8a8a8a]">Problems Solved</div>
                                        <div className="text-xl font-bold text-white">{userData.problems_solved.length}</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="text-[#8a8a8a]">Problems Attempted</div>
                                        <div className="text-xl font-bold text-white">{userData.problems_attempted.length}</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="text-[#8a8a8a]">Total Submissions</div>
                                        <div className="text-xl font-bold text-white">{userData.submissions.length}</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="text-[#8a8a8a]">Success Rate</div>
                                        <div className="text-xl font-bold text-white">
                                            {userData.submissions.length > 0 
                                                ? Math.round((userData.problems_solved.length / userData.submissions.length) * 100)
                                                : 0}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-[calc(100%-72px)] mx-auto mt-4">
                        {/* Activity Chart */}
                        <ActivityChart submissions={userData.submissions} />

                        {/* Recent Submissions */}
                        <div className="bg-[#282828] rounded-lg border border-[#3e3e3e] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Recent Submissions</h2>
                            {userData.submissions.length > 0 ? (
                                <div className="space-y-4">
                                    {userData.submissions.slice(0, 5).map((submission, index) => (
                                        <div key={index} className="submission-card">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-white font-medium">Problem {index + 1}</div>
                                                    <div className="text-[#8a8a8a] text-sm">
                                                        {new Date().toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="text-[#2cbb5d]">Accepted</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-[#8a8a8a] text-center py-8">
                                    No submissions yet
                                </div>
                            )}
                        </div>
                    </div>

                    <style>{`
                        .stat-card {
                            @apply bg-[#323232] rounded-lg p-4 transition-all duration-300 hover:bg-[#3a3a3a];
                        }
                        .submission-card {
                            @apply bg-[#323232] rounded-lg p-4 transition-all duration-300 hover:bg-[#3a3a3a];
                        }
                    `}</style>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
