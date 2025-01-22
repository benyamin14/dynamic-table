import React, { useEffect, useState } from 'react';
import './TableSection.css';
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { BsFiletypeMp4 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";


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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQueries(prev => ({ ...prev, [name]: value }));
    };

    const filteredCourses = courses.filter(course => {
        return Object.keys(searchQueries).every(key => {
            return course[key]?.toString().toLowerCase().includes(searchQueries[key].toLowerCase());
        });
    });

    return (
        <main>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>تاریخ شروع</th>
                        <th>تاریخ پایان</th>
                        <th>توضیحات</th>
                        <th>وضعیت</th>
                        <th>فعال</th>
                        <th>قابل نمایش</th>
                        <th>ویدئو</th>
                        <th>تصویر</th>
                        <th>زیرمجموعه</th>
                        <th>عملیات</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {Object.keys(searchQueries).map(query => (
                            <td key={query}>
                                <div className="input-with-icon">
                                    <CiSearch className="search-icon" />
                                    <input
                                        type="text"
                                        name={query}
                                        value={searchQueries[query]}
                                        onChange={handleSearchChange}
                                        aria-label={`جستجو ${query}`}
                                    />
                                </div>
                            </td>
                        ))}
                    </tr>

                    {filteredCourses.map(course => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.start}</td>
                            <td>{course.end}</td>
                            <td>{course.details}</td>
                            <td>{course.status}</td>
                            <td>{course.active ? <FaRegCircleCheck style={{ color: 'green' }} /> : <ImCancelCircle style={{ color: 'red' }} />}</td>
                            <td>{course.show ? <FaRegCircleCheck style={{ color: 'green' }} /> : <ImCancelCircle style={{ color: 'red' }} />}</td>
                            <td><button className="show-video">{course.video} <BsFiletypeMp4 /></button></td>
                            <td><button className="show-pic">{course.pic} <BsFiletypeMp4 /></button></td>
                            <td><button className="show-course">{course.submodule}</button></td>
                            <td style={{display:'flex'}}>
                                <RiDeleteBin5Line className="delete-icon" />
                                <GrDocumentText className="write-icon" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default TableSection;
