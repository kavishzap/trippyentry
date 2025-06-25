import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';;
import Swal from 'sweetalert2';
import { FaUser, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa';

import TopNavBar from './components/TopNavBar';
import FooterWithLinks from './components/FooterWithLinks';
import MyProfile from './userProfile';
import MyBookings from './myBookings';

const UserDashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState<'profile' | 'booking'>('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('zeko_username');
    if (!username) {
      navigate('/auth/sign-in');
    }

    // Read tab from URL
    const query = new URLSearchParams(location.search);
    const tabParam = query.get('tab');
    if (tabParam === 'booking' || tabParam === 'profile') {
      setTab(tabParam);
    }
  }, [location.search, navigate]);

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to sign out?',
      text: 'You will need to log in again to access your dashboard.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('zeko_username');
      Swal.fire('Signed out!', 'You have been successfully signed out.', 'success');
      navigate('/');
    }
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <TopNavBar />

        <main className="container py-5 flex-grow-1">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="list-group">
                <button
                  className={`list-group-item list-group-item-action ${tab === 'profile' ? 'active' : ''}`}
                  onClick={() => setTab('profile')}
                >
                  <FaUser className="me-2" />
                  My Profile
                </button>
                <button
                  className={`list-group-item list-group-item-action ${tab === 'booking' ? 'active' : ''}`}
                  onClick={() => setTab('booking')}
                >
                  <FaCalendarCheck className="me-2" />
                  My Tickets
                </button>
                <button
                  className="list-group-item list-group-item-action text-danger"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt className="me-2" />
                  Sign Out
                </button>
              </div>
            </div>

            <div className="col-md-9 mb-5">
              {tab === 'profile' && <MyProfile />}
              {tab === 'booking' && <MyBookings />}
            </div>
          </div>
        </main>
        <main>
          <FooterWithLinks />
        </main>

      </div>
    </>

  );
};

export default UserDashboard;
