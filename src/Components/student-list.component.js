import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import StudentTableRow from "./StudentTableRow";

const StudentList = () => {
const [students, setStudents] = useState([]);
const [filteredResults, setFilteredResults] = useState([]);
const [searchInput, setSearchInput] = useState('');

useEffect(() => {
	axios
	.get("http://localhost:4000/students/")
	.then(({ data }) => {
		console.log(data);
		setStudents(data);
	})
	.catch((error) => {
		console.log(error);
	});
}, []);

const searchItems = (searchValue) => {
	setSearchInput(searchValue)
	if (searchInput !== '') {
		const filteredData = students.filter((item) => {
			return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
		})
		setFilteredResults(filteredData)
	}
	else{
		setFilteredResults(students)
	}
}

const DataTable = () => {
	return filteredResults.map((res, i) => {
	return <StudentTableRow obj={res} key={i} />;
	});
};

return (
	<div className="table-wrapper">
	<input type="text" class="form-control"
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
	<Table striped bordered hover>
		<thead>
		<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Roll No</th>
			<th>Action</th>
		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>
	</div>
);
};

export default StudentList;
