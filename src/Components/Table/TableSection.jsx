import React, { useEffect, useState } from 'react';
import './TableSection.css';
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { BsFiletypeMp4 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Pagination from '../Pagination/Pagination';

function TableSection() {
    const [courses, setCourses] = useState([]);
    const [searchQueries, setSearchQueries] = useState({
        title: '',
        start: '',
        end: '',
        details: '',
        status: '',
        active: '',
        show: '',
        video: '',
        pic: '',
        submodule: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetch('http://localhost:3000/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;


    const filteredCourses = courses.filter(course => {
        return (
            course.title.toLowerCase().includes(searchQueries.title.toLowerCase()) &&
            course.start.toLowerCase().includes(searchQueries.start.toLowerCase()) &&
            course.end.toLowerCase().includes(searchQueries.end.toLowerCase()) &&
            course.details.toLowerCase().includes(searchQueries.details.toLowerCase()) &&
            course.status.toLowerCase().includes(searchQueries.status.toLowerCase()) &&
            (searchQueries.active === '' || (course.active && searchQueries.active === 'active') || (!course.active && searchQueries.active === 'inactive')) &&
            (searchQueries.show === '' || (course.show && searchQueries.show === 'show') || (!course.show && searchQueries.show === 'hide')) &&
            course.video.toLowerCase().includes(searchQueries.video.toLowerCase()) &&
            course.pic.toLowerCase().includes(searchQueries.pic.toLowerCase()) &&
            course.submodule.toLowerCase().includes(searchQueries.submodule.toLowerCase())
        );
    });

    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredCourses.length / itemsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handlePageChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= Math.ceil(filteredCourses.length / itemsPerPage)) {
            setCurrentPage(value);
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQueries(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const deleteHandler = (id) => {
        fetch(`http://localhost:3000/courses/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setCourses(courses.filter(course => course.id !== id));
            } else {
                console.error('Failed to delete the course from the server');
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    return (
        <main>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>تاریخ شروع</th>
                        <th>تاریخ پایان</th>
                        <th>توضیحات</th>
                        <th>توضیحات</th>
                        <th>فعال</th>
                        <th>قابل نمایش</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="title" value={searchQueries.title} onChange={handleSearchChange} aria-label="جستجو عنوان" />
                            </div>
                        </td>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="start" value={searchQueries.start} onChange={handleSearchChange} aria-label="جستجو تاریخ شروع" />
                            </div>
                        </td>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="end" value={searchQueries.end} onChange={handleSearchChange} aria-label="جستجو تاریخ پایان" />
                            </div>
                        </td>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="details" value={searchQueries.details} onChange={handleSearchChange} aria-label="جستجو توضیحات" />
                            </div>
                        </td>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="status" value={searchQueries.status} onChange={handleSearchChange} aria-label="جستجو وضعیت" />
                            </div>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="video" value={searchQueries.video} onChange={handleSearchChange} aria-label="جستجو ویدئو" />
                            </div>
                        </td>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="pic" value={searchQueries.pic} onChange={handleSearchChange} aria-label="جستجو تصویر" />
                            </div>
                        </td>
                        <td>
                            <div className="input-with-icon">
                                <CiSearch className="search-icon" />
                                <input type="text" name="submodule" value={searchQueries.submodule} onChange={handleSearchChange} aria-label="جستجو زیرمجموعه" />
                            </div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    {currentCourses.map(course => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.start}</td>
                            <td>{course.end}</td>
                            <td>{course.details}</td>
                            <td>{course.status}</td>
                            {course.active ?
                                <td><FaRegCircleCheck style={{ color: 'green' }} /></td> :
                                <td><ImCancelCircle style={{ color: 'red' }} /></td>}
                            {course.show ?
                                <td><FaRegCircleCheck style={{ color: 'green' }} /></td> :
                                <td><ImCancelCircle style={{ color: 'red' }} /></td>}
                            <td><button className='show-video'>{course.video} <BsFiletypeMp4 /></button></td>
                            <td><button className='show-pic'>{course.pic} <BsFiletypeMp4 /></button></td>
                            <td><button className='show-course'>{course.submodule}</button></td>
                            <td style={{ width: '3rem' }}>
                                <RiDeleteBin5Line onClick={(e)=>deleteHandler(course.id)} className='delete-icon' />
                                <GrDocumentText className='write-icon' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalItems={filteredCourses.length}
                itemsPerPage={itemsPerPage}
                nextPage={nextPage}
                prevPage={prevPage}
                handlePageChange={handlePageChange}
                handleItemsPerPageChange={handleItemsPerPageChange}
            />
        </main>
    );
}

export default TableSection;
