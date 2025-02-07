function renderSimulation(containerId) {
    const FootprintQuiz = () => {
        const [currentQuestion, setCurrentQuestion] = React.useState(0);
        const attemptedQuestions = JSON.parse(localStorage.getItem('attemptedQuizQuestions') || '{}');
        const [selectedAnswer, setSelectedAnswer] = React.useState(null);
        const [showFeedback, setShowFeedback] = React.useState(false);
        const [isCorrect, setIsCorrect] = React.useState(false);
        const [earnedBuckle, setEarnedBuckle] = React.useState(false);
        const [showCoin, setShowCoin] = React.useState(false);

        const questions = [
            {
                question: "Why is your digital footprint important?",
                options: [
                    "It only matters for famous people",
                    "It can affect future job opportunities",
                    "It disappears after a few days",
                    "It only exists on social media"
                ],
                correctAnswer: 1,
                explanation: "Your digital footprint can impact future opportunities like jobs, school admissions, and more."
            },
            {
                question: "True or False: ALL advertisements you see on the internet are random.",
                options: [
                    "True",
                    "False",
                ],
                correctAnswer: 1,
                explanation: "Some might be random, but a lot of the ads you see are personalised and are influenced by your digital footprint and the websites you have browsed and searched."
            },
            {
                question: "What should you think about before posting online?",
                options: [
                    "Only if it will get likes",
                    "If it's true, kind, and appropriate",
                    "If your friends will share it",
                    "How many comments it might get"
                ],
                correctAnswer: 1,
                explanation: "Always consider if what you're posting is true, kind, and something you'd be comfortable with anyone seeing."
            },
            {
                question: "What can cookies be used for?",
                options: [
                    "Only showing ads",
                    "Remembering your login details and preferences",
                    "Making your computer faster",
                    "Downloading games"
                ],
                correctAnswer: 1,
                explanation: "Cookies help websites remember things like your login details, preferences, and shopping cart items."
            },
            {
                question: "Which is an example of an active digital footprint?",
                options: [
                    "Websites tracking what you view",
                    "Apps recording your location",
                    "Posting a comment on social media",
                    "Accepting website cookies"
                ],
                correctAnswer: 2,
                explanation: "An active digital footprint is created when you choose to share information online, like posting comments."
            },
            {
                question: "TRUE or FALSE: Posting a funny AI image of someone is harmless because it's obviously fake.",
                options: [
                    "TRUE",
                    "FALSE",
                ],
                correctAnswer: 1,
                explanation: "Even if an image is fake, some people might think it's real, and the image can still do massive damage to someone's reputation even if it's proven to be fake later on."
            },
            {
                question: "How can websites use cookies for advertising?",
                options: [
                    "By asking you what ads you want",
                    "By tracking which products you look at",
                    "By making you fill out surveys",
                    "By sending you emails"
                ],
                correctAnswer: 1,
                explanation: "Cookies can track which products you view, helping websites show you related ads later."
            },
            {
                question: "Which is a passive digital footprint?",
                options: [
                    "Writing a blog post",
                    "Sending an email",
                    "Liking a post",
                    "Your browser saving your search history"
                ],
                correctAnswer: 3,
                explanation: "Passive footprints are created automatically, like when your browser saves your history."
            },
            {
                question: "Which is NOT a way to protect your privacy online?",
                options: [
                    "Using strong privacy settings",
                    "Sharing everything with everyone",
                    "Being careful with location sharing",
                    "Only connecting with people you know"
                ],
                correctAnswer: 1,
                explanation: "Sharing everything publicly puts your privacy at risk. It's better to be selective about what you share and with whom."
            },
            {
                question: "What happens to information you post online?",
                options: [
                    "It disappears when you delete it",
                    "Only your friends can see it",
                    "It might stay online forever",
                    "It's always private"
                ],
                correctAnswer: 2,
                explanation: "Even if you delete something, it might have been saved or shared by others, potentially staying online forever."
            },
            {
                question: "What's the difference between required and optional cookies?",
                options: [
                    "Required cookies help websites work, optional are usually used for advertising",
                    "Required cookies are bigger",
                    "Optional cookies work better",
                    "There is no difference"
                ],
                correctAnswer: 0,
                explanation: "Required cookies are necessary for websites to function properly, while optional cookies provide extra features like personalized ads."
            },
            {
                question: "How can you manage your digital footprint?",
                options: [
                    "Delete everything you post immediately",
                    "Think carefully before posting and regularly review privacy settings",
                    "Never use the internet",
                    "Only post at night"
                ],
                correctAnswer: 1,
                explanation: "Managing your digital footprint involves being mindful of what you post and regularly checking your privacy settings across platforms."
            },
            {
                question: "What is a digital footprint?",
                options: [
                    "A new type of computer virus",
                    "The trace of digital activities you leave online",
                    "A way to measure computer speed",
                    "A type of internet connection"
                ],
                correctAnswer: 1,
                explanation: "Your digital footprint is the trail of data you create through your online activities, both intentional and unintentional."
            },
            {
                question: "Which action creates a permanent digital record?",
                options: [
                    "Turning off your computer",
                    "Deleting your browser history",
                    "Posting a photo on social media",
                    "Using private browsing mode"
                ],
                correctAnswer: 2,
                explanation: "Once you post something on social media, it can be saved or shared by others, creating a permanent digital record even if you delete it later."
            },
            {
                question: "Why do websites use tracking cookies?",
                options: [
                    "To make your computer faster",
                    "To collect data about your browsing habits",
                    "To prevent viruses",
                    "To save your passwords"
                ],
                correctAnswer: 1,
                explanation: "Tracking cookies collect data about your browsing habits to create user profiles and deliver personalized content and advertisements."
            }
        ];

        const handleAnswer = (index) => {
            const attemptedQuestions = JSON.parse(localStorage.getItem('attemptedQuizQuestions') || '{}');
            const questionKey = `footprint-${currentQuestion}`;
            
            setSelectedAnswer(index);
            const correct = index === questions[currentQuestion].correctAnswer;
            setIsCorrect(correct);
            setShowFeedback(true);
            
            if (correct && !attemptedQuestions[questionKey]) {
                const currentBuckles = parseInt(localStorage.getItem('totalBuckles') || '0');
                localStorage.setItem('totalBuckles', currentBuckles + 1);
                setEarnedBuckle(true);
                setShowCoin(true);
                
                attemptedQuestions[questionKey] = true;
                localStorage.setItem('attemptedQuizQuestions', JSON.stringify(attemptedQuestions));
                
                const bucklesCount = document.getElementById('buckles-count');
                if (bucklesCount) bucklesCount.textContent = currentBuckles + 1;

                setTimeout(() => setShowCoin(false), 2000);
            }
        };

        const nextQuestion = () => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setShowFeedback(false);
                setEarnedBuckle(false);
                setSelectedAnswer(null);
            }
        };

        return React.createElement('div', { 
            className: "w-full max-w-4xl mx-auto p-6 relative min-w-[850px] flex flex-col bg-gray-900" 
        }, [
            showCoin && React.createElement('div', {
                key: 'coin',
                className: "fixed inset-0 flex items-center justify-center z-50"
            }, 
            React.createElement('div', {
                className: "w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-4xl font-bold text-yellow-900",
                style: {
                    animation: "coinAnimation 2s ease-out forwards"
                }
            }, "B")),
            
            React.createElement('div', {
                key: 'progress',
                className: "text-sm text-gray-400 mb-4"
            }, `Question ${currentQuestion + 1} of ${questions.length}`),
            
            React.createElement('div', {
                key: 'card',
                className: "p-6 bg-gray-800 rounded-lg shadow-lg flex-1 flex flex-col"
            }, [
                React.createElement('h2', {
                    key: 'question',
                    className: "text-2xl font-bold mb-6"
                }, questions[currentQuestion].question),
                
                React.createElement('div', {
                    key: 'options',
                    className: "grid gap-4 mb-auto"
                }, questions[currentQuestion].options.map((option, index) => 
                    React.createElement('button', {
                        key: index,
                        onClick: () => !showFeedback && handleAnswer(index),
                        className: `p-4 ${
                            showFeedback
                                ? index === questions[currentQuestion].correctAnswer
                                    ? 'bg-green-700'
                                    : index === selectedAnswer
                                        ? 'bg-red-700'
                                        : 'bg-gray-700'
                                : 'bg-gray-700 hover:bg-gray-600'
                        } rounded-lg transition-colors`
                    }, option)
                )),
                
                showFeedback && React.createElement('div', {
                    key: 'feedback',
                    className: `mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-800' : 'bg-red-800'}`
                }, [
                    React.createElement('p', {
                        key: 'result',
                        className: "font-bold mb-2"
                    }, isCorrect ? "Correct!" : "Incorrect"),
                    React.createElement('p', {
                        key: 'explanation'
                    }, questions[currentQuestion].explanation),
                    React.createElement('button', {
                        key: 'next',
                        onClick: nextQuestion,
                        className: "mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                    }, currentQuestion < questions.length - 1 ? "Next Question" : "Complete")
                ])
            ])
        ]);
    };

    const style = document.createElement('style');
    style.textContent = `
        @keyframes coinAnimation {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            20% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            40% { transform: scale(1) rotate(360deg); opacity: 1; }
            60% { transform: scale(1) rotate(360deg); opacity: 1; }
            100% { transform: scale(0) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    ReactDOM.render(
        React.createElement(FootprintQuiz),
        document.getElementById(containerId)
    );
}

window.renderSimulation = renderSimulation;