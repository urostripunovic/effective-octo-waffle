import { AppRoutes } from './AppRoutes'
import { AppHeader } from './components/AppHeader/AppHeader'
import './index.css'

/**
 *
 */
import { worker } from './server/mock';
worker.start({
  onUnhandledRequest: 'bypass',
});

export function App() {
  return (
    <div>
      <AppHeader />

      <div className="container">
        <AppRoutes />
      </div>
    </div>
  )
}
