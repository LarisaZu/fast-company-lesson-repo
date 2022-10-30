import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserEditForm from '../components/UserEditForm';
import CustomLoader from '../components/CustomLoader';
import API from '../api';

const UserEditView = () => {
  const [user, setUser] = useState(null);
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();
  let history = useHistory();

  useEffect(() => {
    let isCleanup = false;

    const fetchData = async () => {
      if (userId) {
        setIsLoading(true);

        await Promise.all([
          API.fetchAllProfessions(),
          API.users.fetchQualities(),
          API.users.getUserById(userId),
        ])
          .then(res => {
            if (!isCleanup) {
              setProfessions(res[0]);
              setQualities(Object.values(res[1]));
              setUser(res[2]);

              setIsLoading(false);
            }
          })
          .catch(err => {
            console.log(err);
            setIsLoading(false);
          });
      }
    };

    fetchData();

    return () => {
      isCleanup = true;
      setIsLoading(false);
    };
  }, [userId]);

  const updateUserHandler = async data => {
    try {
      await API.users.updateUserById(userId, data);

      history.replace('/users');
    } catch (error) {
      console.log(error.message);
      toast.error('Что-то не так. Попробуйте сохранить позже', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h3 className="mb-4">Редактировать</h3>
            <UserEditForm
              currentUser={user}
              professions={professions}
              qualities={qualities}
              onSubmit={updateUserHandler}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditView;
