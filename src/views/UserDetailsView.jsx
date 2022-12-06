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
// import { getUserById } from '../api/fake.api.new/user.api';
import { useUsers } from '../hooks/useUsers';
import './styles/UserDetailsView.css';

const UserDetailsView = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserById } = useUsers();

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserById(userId);
        if (data) {
          setCurrentUser(data);
        }
      } catch (error) {
        toast.error(`Что-то пошло не так! Повторите попытку позже.`, {
          position: 'top-center',
        });
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getUserById, userId]);

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
