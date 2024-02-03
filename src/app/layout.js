import './globals.css';
import { Providers } from './Providers';

export const metadata = {
  title: 'Taller JM',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
