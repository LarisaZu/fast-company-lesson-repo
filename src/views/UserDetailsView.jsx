import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AvatarCard,
  QualitiesCard,
  MeetingsCard,
  CommentCard,
} from '../components/user';
import CustomLoader from '../components/CustomLoader';
import { getUserById } from '../api/fake.api.new/user.api';
import './styles/UserDetailsView.css';

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
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <AvatarCard user={currentUser} />
              <QualitiesCard qualities={currentUser.qualities} />
              <MeetingsCard count={currentUser.completedMeetings} />
            </div>
            <div className="col-md-8">
              <CommentCard />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetailsView;
