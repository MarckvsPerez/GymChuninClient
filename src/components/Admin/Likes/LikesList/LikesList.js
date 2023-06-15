import React, { useEffect, useState } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { map, size } from "lodash";
import { User, Like } from "api";
import { useAuth } from "hooks";
import { ExerciseItem } from "components/Shared/ExerciseItem";

const likeController = new Like();
const userController = new User();

export function LikesList(props) {
  const { reload, onReload, muscleFilter } = props;
  const { accessToken } = useAuth();
  const [exercises, setExercises] = useState(null);
  const [pagination, setPagination] = useState({});
  const [searchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(searchParams.get("page") || 1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { _id: userId } = await userController.getMe(accessToken);
        const { docs, limit, page, pages, total } =
          await likeController.getLikedExercises(
            accessToken,
            userId,
            activePage,
            10,
            muscleFilter
          );

        setExercises(docs);
        setPagination({ limit, page, pages, total });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activePage, reload, accessToken, muscleFilter]);

  useEffect(() => {
    setActivePage(1);
  }, [muscleFilter]);

  const handlePageChange = (_, { activePage }) => {
    setActivePage(activePage);
    navigate(`?page=${activePage}`);
  };

  if (loading || !exercises) return <Loader active inline="centered" />;
  if (!size(exercises)) return "No hay ningún ejercicio";

  return (
    <div className="list-exercise">
      {map(exercises, (exercise) => (
        <ExerciseItem
          key={exercise._id}
          exercise={exercise}
          onReload={onReload}
          editable={false}
        />
      ))}

      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          activePage={activePage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
