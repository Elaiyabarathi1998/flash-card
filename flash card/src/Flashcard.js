
import React, { useState, useEffect, useRef } from 'react';

export default function Flashcard({ flashcard, questionNumber }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === flashcard.answer);
    if (option === flashcard.answer) {
      setFlip(true);
    }
  };

  const handleCardClick = () => {
    if (selectedOption !== null) {
      setFlip(!flip);
    }
  };

  return (
    <div
      className={`card ${flip ? 'flip' : ''} ${isCorrect === null ? '' : (isCorrect ? 'correct' : 'incorrect')}`}
      style={{ height: height }}
      onClick={handleCardClick}
    >
      <div className="front" ref={frontEl}>
        <span className="question-number">{questionNumber}</span>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option) => (
            <label key={option} className="flashcard-option">
              <input
                type="radio"
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  );
}

