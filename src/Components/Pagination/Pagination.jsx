import React from 'react';
import './Pagination.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Pagination({ currentPage, totalItems, itemsPerPage, nextPage, prevPage, handlePageChange, handleItemsPerPageChange }) {
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const packagesArray = Array.from({ length: totalItems }, (_, index) => index + 1);

    return (
        <footer className='footer'>
            <div className='pagination'>
                <section className='pagination__chose'>
                    <MdKeyboardArrowRight
                        style={{ cursor: 'pointer' }} 
                        onClick={prevPage} 
                        disabled={currentPage === 1} 
                    />
                    <input 
                        className='pagination__input' 
                        type="number" 
                        value={currentPage} 
                        onChange={handlePageChange}
                        min="1"
                        max={totalPages}
                    />
                    <p className='pagination__text'>از {totalPages}</p>
                    <MdKeyboardArrowLeft
                        style={{ cursor: 'pointer' }} 
                        onClick={nextPage} 
                        disabled={currentPage === totalPages} 
                    />
                </section>

                <section className='pagination__number-of-page'>
                    <p className='pagination__label'>تعداد نمایش در جدول:</p>
                    <select 
                        className='pagination__select' 
                        onChange={handleItemsPerPageChange}
                    >
                      {packagesArray.map((Page)=>
                        <option value={Page} >{Page}</option>
                      )
                      
                      }
                        
                    </select>
                </section>
            </div>

            <button className='footer__submit-button'>
                ثبت
            </button>
        </footer>
    );
}

export default Pagination;
