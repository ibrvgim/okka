import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FormWindowProvider } from './contexts/FormWindowContext';
import { ThemeModeProvider } from './contexts/ThemeModeContext';
import { Suspense, lazy } from 'react';
import FullPageSpinner from './pages/FullPageSpinner';
import AuthenticationPage from './pages/AuthenticationPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

const ApplicationLayout = lazy(() => import('./pages/ApplicationLayout'));
const InvoiceDetail = lazy(() => import('./ui/InvoiceDetail'));
const Invoices = lazy(() => import('./ui/Invoices'));
const Profile = lazy(() => import('./pages/Profile'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeModeProvider>
        <FormWindowProvider>
          <BrowserRouter>
            <Suspense fallback={<FullPageSpinner />}>
              <Routes>
                <Route
                  path='/authentication'
                  element={<AuthenticationPage />}
                />

                <Route
                  element={
                    <ProtectedRoute>
                      <ApplicationLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path='/' element={<Invoices />} />
                  <Route path='invoice/:id' element={<InvoiceDetail />} />
                </Route>

                <Route
                  path='profile'
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </FormWindowProvider>
      </ThemeModeProvider>

      <Toaster
        position='bottom-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 6000,
          },

          error: {
            duration: 5000,
          },

          style: {
            textAlign: 'center',
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-200)',
            color: 'var(--color-grey-700)',
            letterSpacing: '0.1rem',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
