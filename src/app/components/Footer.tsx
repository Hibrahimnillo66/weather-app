export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} WeatherApp. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-blue-400">Términos</a>
            <a href="#" className="hover:text-blue-400">Privacidad</a>
          </div>
        </div>
      </footer>
    );
  }