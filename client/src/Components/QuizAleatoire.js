import React, { useEffect, useState } from "react";

const QuizAleatoire = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    try {
      const data = require("./QuestionsReponses.json");
      setQuestions(data.questions);
    } catch (error) {
      console.error("Erreur lors du chargement des questions", error);
    }
  };

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    setCurrentQuestion(question);
    setShowAnswer(false);
  };

  const showQuestionAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className="d-flex flex-column">
      <div>
        <button onClick={generateQuestion} className="btn btn-warning my-2">
          Générer une question
        </button>
      </div>
      {currentQuestion && (
        <div>
          <h3 className="mt-3">Question :</h3>
          <p className="mx-2 my-2">{currentQuestion.question}</p>
          {!showAnswer && (
            <div>
              <button
                onClick={showQuestionAnswer}
                className="btn btn-primary my-5"
              >
                Afficher la réponse
              </button>
            </div>
          )}
          {showAnswer && (
            <div>
              <h3 className="mt-5">Réponse :</h3>
              <p className="mx-2 my-2">{currentQuestion.answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizAleatoire;
