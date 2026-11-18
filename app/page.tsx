import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: '60px auto', padding: 24 }}>
      <h1>Next.js Application Development and Deployment</h1>
      <p>Student Profile Management System</p>
      <Link href="/students">Open Student Profiles →</Link>
    </main>
  );
}
