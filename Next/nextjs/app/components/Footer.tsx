import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="footer-content">

        <h3>David Enriquez</h3>

        <p>
          Desarrollador Web | Next.js & React
        </p>

        <div className="socials">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>

        <p className="copy">
          © 2026 Todos los derechos reservados
        </p>

      </div>
    </footer>
  );
}