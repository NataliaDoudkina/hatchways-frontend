import React, { useEffect, useState } from "react";
import Student from "./components/student";
import SearchName from "./components/searchName";
import SearchTag from "./components/searchTag";
import "./App.css";
import removeDuplicates  from "./helpers/helpers";

function App() {
  const [initialStudents, setInitialStudents] = useState([]);
  const [studentsAfterFilter, setStudentsAfterFilter] = useState([]);
  const [searchNames, setSearchNames] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const listStyle = { listStyle: "none" };
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line array-callback-return
        data.students.map((student) => {
          let tags = [];
          student["tags"] = tags;
        });
        setInitialStudents(data.students);
      });
  }, []);

  const filterByName = (str) => {
    let newNames = [];

    // eslint-disable-next-line array-callback-return
    initialStudents.map((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(str)) {
        newNames.push(student);
      }
    });

    return newNames;
  };

  const filterByTag = (filter) => {
    return initialStudents.filter((student) =>
      student.tags.some((tag) => tag.includes(filter))
    );
  };

  const searchByFilters = (filters) => {
    if (filters.name === "") {
      setSearchNames([]);
    }
    if (filters.tag === "") {
      setSearchTags([]);
    }
    let names = [];
    let newTags = [];

    if (filters.name) {
      names = filterByName(filters.name);
      setSearchNames(names);
    }
    if (filters.tag) {
      newTags = filterByTag(filters.tag);
      setSearchTags(newTags);
    }
  };


  
  useEffect(() => {
    const result = removeDuplicates(searchNames, searchTags);
    setStudentsAfterFilter(result);
  }, [searchNames, searchTags]);

  const addTag = (str, index = undefined, filteredIndex = undefined) => {
    if (index !== undefined) {
      const studentsWithTags = [...initialStudents];
      studentsWithTags[index].tags.push(str);
      setInitialStudents(studentsWithTags);
    } else if (filteredIndex !== undefined) {
      const studentTags = [...studentsAfterFilter];
      if (studentTags.length > 0) {
        studentTags[filteredIndex].tags.push(str);
      }
      setStudentsAfterFilter(studentTags);
    }
  };

  return (
    <div className="App">
      <SearchName searchByFilters={searchByFilters} />
      <SearchTag searchByFilters={searchByFilters} />
      {studentsAfterFilter.length === 0 ? (
        <ul style={listStyle}>
          {initialStudents.map((student, index) => (
            <li>
              <Student student={student} addTag={addTag} index={index} />
            </li>
          ))}
        </ul>
      ) : (
        <ul style={listStyle}>
          {studentsAfterFilter.map((student, index) => (
            <li>
              <Student
                student={student}
                addTag={addTag}
                indexAfterSearch={index}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
