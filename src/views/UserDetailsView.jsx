import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserById } from '../api/fake.api.new/user.api';
import CustomLoader from '../components/CustomLoader';
import User from '../components/User';

const UserDetailsView = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    let isCleanup = false;

    const fetchData = async () => {
      try {
        const data = await getUserById(userId);

        if (!isCleanup) {
          setCurrentUser(data);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(`Что-то пошло не так! Повторите попытку позже.`, {
          position: 'top-center',
        });
        console.log(error.message);
      }
    };

    fetchData();

    return () => {
      isCleanup = true;
    };
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="container-md">
          {!currentUser ? (
            <h3>Loading...</h3>
          ) : (
            <User currentUser={currentUser} />
          )}
        </div>
      )}
    </>
  );
};

export default UserDetailsView;
