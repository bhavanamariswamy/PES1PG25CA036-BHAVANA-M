'use client';

import { FormEvent, useMemo, useState } from 'react';
import styles from './student-manager.module.css';

type Student = {
  id: number;
  name: string;
  srn: string;
  course: string;
};

type FormState = {
  name: string;
  srn: string;
  course: string;
};

const initialForm: FormState = { name: '', srn: '', course: '' };

const initialStudents: Student[] = [
  { id: 1, name: 'Rahul Kumar', srn: 'PES001', course: 'MCA' },
  { id: 2, name: 'Ananya Sharma', srn: 'PES002', course: 'BCA' }
];

export default function StudentManager() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      [student.name, student.srn, student.course].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [search, students]);

  function handleChange(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const srn = form.srn.trim();
    const course = form.course.trim();

    if (!name || !srn || !course) {
      setError('Please fill in Student Name, SRN/ID and Course.');
      return;
    }

    const duplicate = students.some(
      (student) => student.srn.toLowerCase() === srn.toLowerCase() && student.id !== editingId
    );
    if (duplicate) {
      setError('A student with this SRN/ID already exists.');
      return;
    }

    if (editingId !== null) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingId ? { ...student, name, srn, course } : student
        )
      );
      setEditingId(null);
    } else {
      setStudents((current) => [
        ...current,
        { id: Date.now(), name, srn, course }
      ]);
    }

    setForm(initialForm);
  }

  function startEdit(student: Student) {
    setEditingId(student.id);
    setForm({ name: student.name, srn: student.srn, course: student.course });
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteStudent(id: number) {
    setStudents((current) => current.filter((student) => student.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm(initialForm);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setError('');
  }

  return (
    <div className={styles.page}>
      <section className={styles.card} aria-labelledby="page-title">
        <div className={styles.headingRow}>
          <div>
            
            <h1 id="page-title">Student Profiles</h1>
          </div>
          
        </div>

        <div className={styles.sectionHeader}>
          <h2>Student Management</h2>
          <button className={styles.addButton} type="button" onClick={() => document.getElementById('student-form')?.scrollIntoView({ behavior: 'smooth' })}>
            + Add
          </button>
        </div>

        <form id="student-form" className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGrid}>
            <label>
              Student Name
              <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Enter student name" />
            </label>
            <label>
              SRN / ID
              <input value={form.srn} onChange={(e) => handleChange('srn', e.target.value)} placeholder="Enter SRN or ID" />
            </label>
            <label>
              Course
              <input value={form.course} onChange={(e) => handleChange('course', e.target.value)} placeholder="e.g. MCA" />
            </label>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.formActions}>
            <button className={styles.primaryButton} type="submit">
              {editingId !== null ? 'Update Student' : 'Add Student'}
            </button>
            {editingId !== null && (
              <button className={styles.secondaryButton} type="button" onClick={cancelEdit}>Cancel</button>
            )}
          </div>
        </form>

        <div className={styles.searchArea}>
          <label htmlFor="student-search">Search:</label>
          <input
            id="student-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID or course"
          />
        </div>

        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.srn}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td><button className={styles.linkButton} onClick={() => startEdit(student)}>Edit</button></td>
                    <td><button className={styles.deleteButton} onClick={() => deleteStudent(student.id)}>Delete</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.empty}>No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

         </section>
    </div>
  );
}
