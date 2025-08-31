import CircleSkeletons from '@/components/skeletons/CircleSkeletons';
import RectangleSkeleton from '@/components/skeletons/RectangleSkeleton';
import { auth, firestore } from '@/firebase/firebase';
import { DBProblem, Problem } from '@/utils/types/problem';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';

type problemDescriptionProps = {
    problem: Problem;
};

const ProblemDescription: React.FC<problemDescriptionProps> = ({ problem }) => {
    const [user] = useAuthState(auth);
    const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
    const { liked, disliked, solved, setData, starred } = useGetUserDataOnProblem(problem.id);

    const handleLike = async () => {
        if (!user) {
            toast.error("You must be logged in to like a problem.", { position: "top-left", theme: "dark" });
            return;
        }

        await runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", user.uid);
            const problemRef = doc(firestore, "problems", problem.id);
            const userDoc = await transaction.get(userRef);
            const problemDoc = await transaction.get(problemRef);

            if (userDoc.exists() && problemDoc.exists()) {
                if (liked) {
                    transaction.update(userRef, {
                        likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id)
                    });
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes - 1
                    });
                    setCurrentProblem((prev) => ({ ...prev, likes: prev.likes - 1 }));
                    setData((prev) => ({ ...prev, liked: false }));
                } else if (disliked) {
                    transaction.update(userRef, {
                        likedProblems: [...userDoc.data().likedProblems, problem.id],
                        dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                    });
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes + 1,
                        dislikes: problemDoc.data().dislikes - 1
                    });
                    setCurrentProblem((prev) => ({ ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }));
                    setData((prev) => ({ ...prev, liked: true, disliked: false }));
                } else {
                    transaction.update(userRef, {
                        likedProblems: [...userDoc.data().likedProblems, problem.id]
                    });
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes + 1
                    });
                    setCurrentProblem((prev) => ({ ...prev, likes: prev.likes + 1 }));
                    setData((prev) => ({ ...prev, liked: true }));
                }
            }
        });
    };

    const handleDislike = async () => {
        if (!user) {
            toast.error("You must be logged in to dislike a problem.", { position: "top-left", theme: "dark" });
            return;
        }

        await runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", user.uid);
            const problemRef = doc(firestore, "problems", problem.id);
            const userDoc = await transaction.get(userRef);
            const problemDoc = await transaction.get(problemRef);

            if (userDoc.exists() && problemDoc.exists()) {
                if (disliked) {
                    transaction.update(userRef, {
                        dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                    });
                    transaction.update(problemRef, {
                        dislikes: problemDoc.data().dislikes - 1
                    });
                    setCurrentProblem((prev) => ({ ...prev, dislikes: prev.dislikes - 1 }));
                    setData((prev) => ({ ...prev, disliked: false }));
                } else if (liked) {
                    transaction.update(userRef, {
                        likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
                        dislikedProblems: [...userDoc.data().dislikedProblems, problem.id]
                    });
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes - 1,
                        dislikes: problemDoc.data().dislikes + 1
                    });
                    setCurrentProblem((prev) => ({ ...prev, likes: prev.likes - 1, dislikes: prev.dislikes + 1 }));
                    setData((prev) => ({ ...prev, disliked: true, liked: false }));
                } else {
                    transaction.update(userRef, {
                        dislikedProblems: [...userDoc.data().dislikedProblems, problem.id]
                    });
                    transaction.update(problemRef, {
                        dislikes: problemDoc.data().dislikes + 1
                    });
                    setCurrentProblem((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
                    setData((prev) => ({ ...prev, disliked: true }));
                }
            }
        });
    };

    return (
        <div className='bg-gray-200'>
            <div className='flex h-11 w-full items-center pt-2 bg-gray-100 text-black overflow-x-hidden'>
                <div className={'bg-gray-300 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer'}>Description</div>
            </div>
            <div className='flex px-0 py-4 h-[calc(100vh-60px)] overflow-y-auto'>
                <div className='px-5'>
                    <div className='w-full'>
                        <div className='flex space-x-4'>
                            <div className='flex-1 mr-2 text-lg text-black font-medium'>{problem?.title}</div>
                        </div>
                        {!loading && currentProblem && (
                            <div className='flex item-center mt-3'>
                                <div className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}>
                                    {currentProblem.difficulty}
                                </div>
                                <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-700'>
                                    <BsCheck2Circle />
                                </div>

                                {/* Like Button */}
                                <div
                                    className='flex items-center cursor-pointer hover:bg-gray-50 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-700'
                                    onClick={handleLike}
                                >
                                    {liked ? <AiFillLike className='text-blue-500' /> : <AiFillLike />}
                                    <span className='text-xs'>{currentProblem.likes}</span>
                                </div>

                                {/* Dislike Button */}
                                <div
                                    className='flex items-center cursor-pointer hover:bg-gray-50 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-700'
                                    onClick={handleDislike}
                                >
                                    {disliked ? <AiFillDislike className='text-red-500' /> : <AiFillDislike />}
                                    <span className='text-xs'>{currentProblem.dislikes}</span>
                                </div>

                                <div className='cursor-pointer hover:bg-gray-100 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-orange-500 text-orange-400'>
                                    <TiStarOutline />
                                </div>
                            </div>
                        )}
                        {loading && (
                            <div className='mt-3 flex space-x-2'>
                                <RectangleSkeleton />
                                <CircleSkeletons />
                                <RectangleSkeleton />
                                <RectangleSkeleton />
                                <CircleSkeletons />
                            </div>
                        )}
                    </div>
                    <div className='text-black text-sm'>
                        <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }}></div>
                    </div>
                    <div className='mt-4'>
                        {problem.examples.map((example, index) => (
                            <div key={example.id}>
                                <p className='font-medium text-black'>Example {index + 1}:</p>
                                {example.img && <img src={example.img} alt='' className='mt-3' />}
                                <div className='example-card'>
                                    <pre><strong className='text-black'>Input:</strong> {example.inputText}
                                        <br />
                                        <strong>Output:</strong> {example.outputText}
                                        <br />
                                        {example.explanation && (
                                            <>
                                                <strong>Explanation:</strong> {example.explanation}
                                            </>
                                        )}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='my-8 pb-2'>
                        <div className='text-black font-medium'>Constraints:</div>
                        <ul className='list-disc ml-5 text-black text-sm'>
                            <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;

// Custom hook to get current problem data
function useGetCurrentProblem(problemId: string) {
    const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

    useEffect(() => {
        const getCurrentProblem = async () => {
            setLoading(true);
            const docRef = doc(firestore, "problems", problemId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const problem = docSnap.data();
                setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
                setProblemDifficultyClass(
                    problem.difficulty === "Easy"
                        ? "bg-green-200 text-green-400"
                        : problem.difficulty === "Medium"
                            ? "bg-yellow-200 text-yellow-400"
                            : "bg-red-200 text-red-400"
                );
            }
            setLoading(false);
        };
        getCurrentProblem();
    }, [problemId]);

    return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

// Custom hook to get user's problem data
function useGetUserDataOnProblem(problemId: string) {
    const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getUsersDataOnProblem = async () => {
            const userRef = doc(firestore, "users", user!.uid as string);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                const { solvedProblems, likedProblems, dislikedProblems, starredProblems } = data;
                setData({
                    liked: likedProblems.includes(problemId),
                    disliked: dislikedProblems.includes(problemId),
                    starred: starredProblems.includes(problemId),
                    solved: solvedProblems.includes(problemId)
                });
            }
        };

        if (user) getUsersDataOnProblem();
        return () => setData({ liked: false, disliked: false, starred: false, solved: false });
    }, [problemId, user]);

    return { ...data, setData };
}
