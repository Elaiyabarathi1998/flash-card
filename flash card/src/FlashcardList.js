
import React, { useState } from 'react';
import Flashcard from './Flashcard';
import ReactPaginate from 'react-paginate';

export default function FlashcardList({ flashcards }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;
  const pageCount = Math.ceil(flashcards.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentFlashcards = flashcards.slice(offset, offset + itemsPerPage);

  return (
    <div className="flashcard-list-container">
      <div className="card-grid">
        {currentFlashcards.map(flashcard => (
          <Flashcard flashcard={flashcard} key={flashcard.id} />
        ))}
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}



